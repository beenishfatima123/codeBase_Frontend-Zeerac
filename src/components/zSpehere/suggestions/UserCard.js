import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserSkeleton from "../../loadingSkeletons/UserSkeleton.js";
import { followAgent } from "../../../api/socialApi";
import { setZsphereData } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0px",
    maxWidth: 400,
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
}));
const UserCard = ({ user, customStyle }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.global);
  const { currentUser, zsphereData } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const [followResponse, setFollowResponse] = useState(false);

  /* check which accounts is the person following and set follow response for color rendering. */
  useEffect(() => {
    // console.log({ zsphereData });
    let _following = false;
    zsphereData?.followingIds?.forEach((element) => {
      if (element === user?.id) _following = true;
    });
    setFollowResponse(_following);
  }, [user, zsphereData]);

  /* handle follow checks response and performs follow/unfollow actions.*/
  const handleFollow = async () => {
    // console.log({ user });

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
    } else setFollowResponse(false);
    setLoading(false);
  };
  return (
    <div className={classes.container} style={customStyle}>
      {loading ? (
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
              <span className={classes.handle}>{`@${user?.first_name}`}</span>
            </div>
          </div>
          <Button
            onClick={handleFollow}
            disabled={currentUser?.id === user?.id}
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontFamily: "medium",
              backgroundColor: followResponse ? "white" : "#134696",
              color: followResponse ? "#415365" : "white",
              border: followResponse ? "1px solid #B7C1CF" : "none",
              width: 75,
              height: 35,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: followResponse ? "white" : "#134676",
              },
              "&:disabled": {
                color: "#fff",
                backgroundColor: "lightGray",
              },
            }}
          >
            {followResponse ? "Following" : "Follow"}
          </Button>
        </>
      )}
    </div>
  );
};

export default UserCard;
