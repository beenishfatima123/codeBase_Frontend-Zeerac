import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import UserSkeleton from "../../../loadingSkeletons/UserSkeleton";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followAgent } from "../../../../api/socialApi";

import {
  removeFollower,
  setZsphereData,
} from "../../../../redux/slices/authSlice";
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
    fontSize: 16,
    color: "#415365",
    cursor: "pointer",
  },
  handle: {
    fontSize: 16,
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
  },
}));

/* individual member display card in lists with image, name, username and follow/unfollow button. */
const MemberCard = ({ user, following, customStyle, editing }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.global);
  const { currentUser, zsphereData, zsphereApi } = useSelector(
    (state) => state.auth
  );
  const [loading, setLoading] = useState(false);

  const isFollowing = useMemo(() => {
    let _following = false;
    // console.log({ zSphereMembersData });
    zsphereData?.followingIds?.forEach((element) => {
      if (element + "" === user?.id + "") _following = true;
    });
    return _following;
  }, [zsphereData?.followingIds, user]);

  const handleFollow = async () => {
    setLoading(true);
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
            following: {
              ...zsphereData?.following,
              count: zsphereData?.following?.count - 1,
              results: zsphereData?.following?.results?.filter(
                (elem) => elem?.id + "" !== user?.id + ""
              ),
            },
          })
        );
      } else if (response?.Following === "true") {
        dispatch(
          setZsphereData({
            ...zsphereData,
            followingIds: [...zsphereData?.followingIds, user?.id],
            following: {
              ...zsphereData?.following,
              count: zsphereData?.following?.count + 1,
              results: [...zsphereData?.following?.results, user],
            },
          })
        );
      }
      // console.log({ response });
    }

    setLoading(false);
  };
  const handleDelete = () => {
    // console.log({ user });
    const formData = new FormData();
    formData.append("user_id", user?.id);
    dispatch(
      removeFollower({
        values: formData,
        token: currentUser?.token,
      })
    );
  };
  return (
    <div className={classes.container} style={customStyle}>
      {loading || zsphereApi?.loadingRemove + "" === user?.id + "" ? (
        <UserSkeleton customSize={{ height: 40, width: 40 }} />
      ) : (
        <>
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
              <span className={classes.handle}>{`${
                user?.handle || "@anonymous"
              }`}</span>
            </div>
          </div>

          <div className={classes.btnDiv}>
            {following ? (
              <Button
                onClick={handleFollow}
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  fontFamily: "medium",
                  backgroundColor: isFollowing ? "white" : "#134696",
                  color: isFollowing ? "#415365" : "white",
                  border: isFollowing ? "1px solid #B7C1CF" : "none",
                  width: 75,
                  height: 35,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: isFollowing ? "white" : "#134676",
                  },
                }}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            ) : (
              <>
                {editing ? (
                  <button className={classes.invite} onClick={handleDelete}>
                    Remove
                  </button>
                ) : (
                  <button className={classes.invite}>Following</button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MemberCard;
