import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Button, IconButton, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import UserSkeleton from "../../../../loadingSkeletons/UserSkeleton";
import CancelIcon from "@mui/icons-material/Cancel";
import { inviteMemberToGroup } from "../../../../../api/socialApi";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { paginateFollowing } from "../../../../../redux/slices/authSlice";
const btnSx = {
  textTransform: "none",
  color: "#696974",
  backgroundColor: "#F1F1F5",
  "&:hover": {
    color: "#000",
    backgroundColor: "#F1F1F5",
  },
  borderRadius: "5px",
  mr: 1,
  padding: "6px 24px",
};
const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    height: 500,
    overflowY: "scroll",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    maxWidth: "98%",
    paddingRight: "0px !important",
  },
  cardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
    borderBottom: "1px solid lightGray",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
    borderBottom: "1px solid lightGray",
    maxHeight: 37,
  },
  title: {
    fontSize: 22,
    color: "#134696",
    margin: "16px 10px",
    fontWeight: "bold",
  },
  nameContainer: {
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    color: "#415365",
    cursor: "pointer",
  },
  handle: {
    fontSize: 16,
    color: "#B7C1CF",
  },
  heading: {
    fontSize: 24,
    color: "#134696",
    fontWeight: "bold",
    margin: 0,
  },
  notFoundContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
}));

/* Modal component for viewing users to allow invite to the group. */
const UserModalContainer = ({ isOpen, setOpen, events, handleEventInvite }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, zsphereData } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.global);
  const { zSphereMembersApi } = useSelector((state) => state.zSphereMembers);
  const { selectedGroup } = useSelector((state) => state.groups);

  const [loading, setLoading] = useState(null);
  const [invitedUsers, setInvitedUsers] = useState([]);

  /* Filter all members who are already in the group */
  const users = useMemo(() => {
    return {
      ...zsphereData?.following,
      results: zsphereData?.following?.results?.filter((elem) => {
        return (
          !selectedGroup?.members?.includes(elem?.id) &&
          elem?.id !== currentUser?.id
        );
      }),
    };
    // eslint-disable-next-line
  }, [zsphereData, selectedGroup, currentUser]);

  // console.log({ currentUser, users });
  /* Create form data and set invite request with user id */
  const handleInvite = async (user) => {
    // console.log({ user, selectedGroup, currentUser });
    const values = new FormData();
    values.append("group", selectedGroup?.id);
    values.append("user", user?.id);
    setLoading(user?.id);
    const response = await inviteMemberToGroup({
      token: currentUser?.token,
      values,
    });
    if (response?.error) {
      toast.error(response?.error, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    } else {
      toast.success("An invitation has been sent", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      setInvitedUsers((prev) => [...prev, user?.id]);
    }
    setLoading(null);
    // console.log({ response });
  };

  /* Dispatch with paginate URL. */
  const handlePagination = () => {
    //console.log({ users });
    dispatch(
      paginateFollowing({
        url: users?.next?.replace("http", "https"),
      })
    );
  };

  /* True if the user sent as parameter has been invited or not. */
  const getInviteStatus = (user) => {
    if (invitedUsers?.includes(user)) return true;
    else return false;
  };
  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen((prev) => !prev)}
      disableEnforceFocus
      disableAutoFocus
      disablePortal
    >
      <div
        className={classes.container}
        style={{
          backgroundColor: darkMode ? "#212124" : "#fff",
          minWidth: currentUser ? 500 : 350,
        }}
      >
        <div className={classes.topContainer}>
          <p className={classes.heading}>All Followers</p>
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            <CancelIcon style={{ color: "#134696" }} />
          </IconButton>
        </div>
        {users?.results?.length === 0 && (
          <div className={classes.notFoundContainer}>
            <p className={classes.heading}>Add followers to see them here</p>
          </div>
        )}
        {zSphereMembersApi?.loadingFollowers ? (
          <div style={{ padding: "8px 16px" }}>
            {Array.from(new Array(4)).map((elem, index) => (
              <UserSkeleton
                customSize={{ height: 40, width: 40 }}
                key={index}
              />
            ))}
          </div>
        ) : (
          <>
            {users?.results?.map((user, index) => (
              <div className={classes.cardContainer} key={index}>
                <div style={{ display: "flex" }}>
                  <Avatar
                    alt={`${user?.first_name} ${user?.last_name}`}
                    src={` ${user?.photo}`}
                    sx={{ width: 48, height: 48 }}
                  />
                  <div className={classes.nameContainer}>
                    <span
                      className={classes.name}
                      style={{
                        color: darkMode ? "#fff" : "#415365",
                      }}
                      onClick={() => navigate(`/zSphere/user/${user?.id}`)}
                    >
                      {`${user?.first_name} ${user?.last_name}`}
                    </span>
                    <span
                      className={classes.handle}
                    >{`@${user?.first_name}`}</span>
                  </div>
                </div>
                <LoadingButton
                  sx={btnSx}
                  startIcon={<AddIcon />}
                  onClick={() => {
                    if (events) {
                      handleEventInvite(user);
                    } else {
                      handleInvite(user);
                    }
                  }}
                  loading={loading === user?.id}
                  disabled={getInviteStatus(user?.id)}
                >
                  Invite
                </LoadingButton>
              </div>
            ))}
            {zSphereMembersApi?.loadingFollowingPagination ? (
              <div style={{ padding: "8px 16px" }}>
                <UserSkeleton customSize={{ height: 40, width: 40 }} />
              </div>
            ) : (
              <>
                {users?.next && (
                  <Button
                    fullWidth
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#F1F1F5",
                      color: "#696974",
                      fontSize: 14,
                    }}
                    onClick={handlePagination}
                  >
                    See More
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default UserModalContainer;
