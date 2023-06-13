import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Button, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { setZsphereData } from "../../../../redux/slices/authSlice";
import { followAgent } from "../../../../api/socialApi";

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
  maxWidth: 100,
};
const followingBtnSx = {
  textTransform: "none",
  color: "#fff",
  backgroundColor: "#134696",
  "&:hover": {
    color: "#000",
    backgroundColor: "#F1F1F5",
  },
  borderRadius: "5px",
  mr: 1,
  padding: "6px 24px",
  maxWidth: 100,
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0px",
  },
  nameContainer: {
    marginLeft: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    color: "#415365",
    cursor: "pointer",
  },
  handle: {
    fontSize: 12,
    color: "#B7C1CF",
  },
  invite: {
    backgroundColor: "#f1f1f5",
    border: "none",
    color: "#696974",
    cursor: "pointer",
    borderRadius: 5,
    fontFamily: "medium",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 10px",
  },
  btnDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 10,
  },
  endBtnContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

/* Individual CEO card displayed in lists. */
const CeoCard = ({ ceo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.global);
  const { currentUser, zsphereData } = useSelector((state) => state.auth);
  const { groupsApi } = useSelector((state) => state.groups);

  const [loading, setLoading] = useState(false);

  const isFollowing = useMemo(() => {
    let _following = false;

    zsphereData?.followingIds?.forEach((elem) => {
      if (elem + "" === ceo?.id + "") _following = true;
    });
    if (ceo?.id === currentUser?.id) _following = true;
    return _following;
  }, [ceo, zsphereData?.followingIds, currentUser?.id]);

  const handleFollow = async (user) => {
    setLoading(user?.id);
    const response = await followAgent({
      token: currentUser?.token,
      id: user?.id,
    });
    if (response) {
      if (response?.Following === "false") {
        dispatch(
          setZsphereData({
            ...zsphereData,
            followingIds: zsphereData?.followingIds?.filter(
              (elem) => elem + "" !== user?.id + ""
            ),
            following: zsphereData?.following
              ? {
                  ...zsphereData?.following,
                  count: zsphereData?.following?.count - 1,
                  results: zsphereData?.following?.results?.filter(
                    (elem) => elem?.id + "" !== user?.id + ""
                  ),
                }
              : zsphereData?.following,
          })
        );
      } else if (response?.Following === "true") {
        dispatch(
          setZsphereData({
            ...zsphereData,
            followingIds: [...zsphereData?.followingIds, user?.id],
            following: zsphereData?.following
              ? {
                  ...zsphereData?.following,
                  count: zsphereData?.following?.count + 1,
                  results: [...zsphereData?.following?.results, user],
                }
              : zsphereData?.following,
          })
        );
      }
      // console.log({ response });
    }

    setLoading(null);
  };

  return (
    <div className={classes.container}>
      <div style={{ display: "flex" }}>
        <Avatar
          alt={`${ceo?.first_name} ${ceo?.last_name}`}
          src={` ${ceo?.photo}`}
          sx={{ width: 42, height: 42 }}
        />
        <div className={classes.nameContainer}>
          <span
            className={classes.name}
            style={{
              color: darkMode ? "#fff" : "#415365",
            }}
            onClick={() => navigate(`/zSphere/user/${ceo?.id}`)}
          >
            {`${ceo?.first_name} ${ceo?.last_name}`}
          </span>
          <span className={classes.handle}>{`${
            ceo?.handle || "@anonymous"
          }`}</span>
        </div>
      </div>

      <>
        {loading === ceo?.id ||
        groupsApi?.addingModerator + "" === ceo?.id + "" ||
        groupsApi?.removingModerator + "" === ceo?.id + "" ||
        groupsApi?.removingMember + "" === ceo?.id + "" ? (
          <Skeleton height={40} width={100} variant="rectangular" />
        ) : (
          <div className={classes.endBtnContainer}>
            <Button
              startIcon={!isFollowing && <AddIcon />}
              sx={!isFollowing ? followingBtnSx : btnSx}
              onClick={() => handleFollow(ceo)}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        )}
      </>
    </div>
  );
};

export default CeoCard;
