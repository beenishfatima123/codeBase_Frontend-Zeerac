import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_DETAIL_CONTENT } from "../../../../utils/constants";
import coverImage from "../../../../assets/defaultAssets/podcastBackground.png";
import { Button, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { toast } from "react-toastify";
import {
  joinGroup,
  leaveGroup,
  resetGroup,
  resetSendJoinRequest,
  sendJoinRequest,
} from "../../../../redux/slices/groupsSlice";
import EditGroupModal from "../modals/EditGroup";
import ButtonLoader from "../../../globalComponents/ButtonLoader";
import UserModalContainer from "../modals/usersModal/UserModalContainer";
import useApi from "../../../../utils/hooks/useApi";
import CustomTooltip from "../../../globalComponents/CustomTooltip";

const joinBtnSx = {
  textTransform: "none",
  color: "#fff",
  backgroundColor: "#134696",
  borderRadius: "5px",
  padding: "6px 24px",
  "&:hover": {
    color: "#000",
    backgroundColor: "#F1F1F5",
  },
  mr: 1,
};
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
    display: "flex",
    flexDirection: "column",
    margin: "10px 0px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  cover: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    zIndex: 10,
  },
  editProfile: {
    position: "absolute",
    right: 20,
    marginTop: 20,
    backgroundColor: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    cursor: "pointer",
    height: 40,
    width: 100,
    borderRadius: 10,
    fontFamily: "medium",
    fontSize: 14,
    zIndex: 20,
  },
  userContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0px 16px",
    alignItems: "flex-end",
  },
  leftContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  profileImage: {
    width: 125,
    height: 125,
    objectFit: "cover",
    borderRadius: 5,
    border: "2px solid #134696",
    marginTop: -75,
    zIndex: 20,
  },
  name: {
    textTransform: "capitalize",
    color: "#134696",
    fontFamily: "medium",
    fontSize: 22,
    marginBottom: 5,
  },
  rightContainer: {
    display: "flex",
    paddingBottom: 5,
  },

  description: {
    margin: "24px 16px",
    fontSize: 15,
    color: "#44444F",
    wordSpacing: 2,
    fontFamily: "medium",
  },
  "@media (max-width: 650px)": {
    rightContainer: {
      display: "flex",
      flexDirection: "column",
    },

    profileImage: {
      width: 100,
      height: 100,
      marginTop: -50,
    },
  },
  "@media (max-width: 500px)": {
    userContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    rightContainer: {
      display: "flex",
      flexDirection: "row",
      alignSelf: "flex-end",
      margin: "10px 0px",
    },
  },
}));

/* TopDetails show detailed profile header in the groups page.  */
const TopDetails = ({ setSelectedContent }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup, groupsApi } = useSelector((state) => state.groups);
  useApi(
    groupsApi?.joinError,
    groupsApi?.joinSuccess,
    "Group joined successfully",
    resetGroup
  );
  useApi(
    groupsApi?.leaveError,
    groupsApi?.leaveSuccess,
    "You have left this group",
    resetGroup
  );
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openInviteModal, setInviteModal] = useState(false);

  /* If current user is admin or moderator, provide admin previliges.*/
  const adminPrivileges = useMemo(() => {
    let _privileges = false;
    if (selectedGroup?.admin + "" === currentUser?.id + "") _privileges = true;
    selectedGroup?.moderators?.forEach((mod) => {
      if (mod === currentUser?.id) _privileges = true;
    });
    return _privileges;
  }, [currentUser, selectedGroup]);

  /* If current user is a member, return joined true.*/
  const joined = useMemo(() => {
    // console.log({ selectedGroup, currentUser });
    let _isJoined = false;
    selectedGroup?.members?.forEach((member) => {
      if (currentUser?.id + "" === member + "") _isJoined = true;
    });
    selectedGroup?.moderators?.forEach((mod) => {
      if (currentUser?.id + "" === mod + "") _isJoined = true;
    });
    return _isJoined;
  }, [currentUser, selectedGroup]);
  // console.log(joined);

  /* Slice group's name */
  const groupName = useMemo(() => {
    let _name = selectedGroup?.name;
    if (_name?.length > 25) return _name?.slice(0, 25) + "...";
    else return _name;
  }, [selectedGroup]);

  /* toggle membership when join/leave clicked. */
  const handleGroupMembership = () => {
    // console.log({ selectedGroup });
    if (currentUser) {
      if (joined)
        dispatch(
          leaveGroup({
            id: selectedGroup?.id,
            token: currentUser?.token,
            user: currentUser?.id,
          })
        );
      else {
        if (selectedGroup?.visibility === "Public") {
          dispatch(
            joinGroup({
              id: selectedGroup?.id,
              token: currentUser?.token,
              user: currentUser?.id,
            })
          );
        } else joinGroupRequest();
      }
    } else
      toast.error("You need to login first", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
  };

  /* On join request, dispatch request with user info. */
  const joinGroupRequest = () => {
    if (currentUser) {
      let formData = new FormData();
      formData.append("group", selectedGroup?.id);
      dispatch(
        sendJoinRequest({
          formData,
          token: currentUser?.token,
        })
      );
    } else
      toast.error("You need to login first", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
  };

  /* Join request success failure. */
  useEffect(() => {
    if (groupsApi?.responseSendJoinRequest) {
      toast.success("Request has been sent to join this group", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetSendJoinRequest());
    }
    // eslint-disable-next-line
  }, [groupsApi?.responseSendJoinRequest]);
  useEffect(() => {
    if (groupsApi?.errorSendJoinRequest) {
      toast.error("You already requested to join this group", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetSendJoinRequest());
    }
    // eslint-disable-next-line
  }, [groupsApi?.errorSendJoinRequest]);

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {openEditModal && (
        <EditGroupModal isOpen={openEditModal} setOpen={setOpenEditModal} />
      )}
      {openInviteModal && (
        <UserModalContainer isOpen={openInviteModal} setOpen={setInviteModal} />
      )}
      <div style={{ position: "relative" }}>
        {adminPrivileges && (
          <button
            className={classes.editProfile}
            onClick={() => setOpenEditModal(true)}
          >
            Edit Group
          </button>
        )}

        <img
          className={classes.cover}
          alt=""
          src={
            selectedGroup?.cover_photo ? selectedGroup?.cover_photo : coverImage
          }
        />
      </div>
      <div className={classes.userContainer}>
        <div className={classes.leftContainer}>
          <img
            className={classes.profileImage}
            alt=""
            src={selectedGroup?.photo}
          />
          <CustomTooltip title={selectedGroup?.name || ""}>
            <span
              className={classes.name}
              style={{
                marginLeft: 10,
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              {groupName}
            </span>
          </CustomTooltip>
        </div>
        <div className={classes.rightContainer}>
          {groupsApi?.loadingJoin || groupsApi?.loadingLeave ? (
            <>
              <Skeleton
                height={40}
                width={100}
                variant="rectangular"
                sx={{ marginRight: "5px" }}
              />
            </>
          ) : (
            <>
              {currentUser?.id + "" !== selectedGroup?.admin + "" && (
                <Button sx={joinBtnSx} onClick={handleGroupMembership}>
                  {joined ? (
                    "Leave Group"
                  ) : selectedGroup?.visibility === "Public" ? (
                    "Join Group"
                  ) : groupsApi?.loadingSendJoinRequest ? (
                    <ButtonLoader color={"#134696"} size={20} />
                  ) : (
                    "Send Join Request"
                  )}
                </Button>
              )}
              {adminPrivileges && (
                <Button
                  sx={btnSx}
                  startIcon={<AddIcon />}
                  onClick={() => setInviteModal(true)}
                >
                  Invite
                </Button>
              )}
              {currentUser?.id + "" === selectedGroup?.admin + "" && (
                <Button
                  sx={btnSx}
                  startIcon={<SettingsIcon />}
                  onClick={() =>
                    setSelectedContent(GROUP_DETAIL_CONTENT.SETTINGS)
                  }
                >
                  Settings
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <p
        className={classes.description}
        style={{ color: darkMode ? "#fff" : "#44444F" }}
      >
        {selectedGroup?.description}
      </p>
    </div>
  );
};

export default TopDetails;
