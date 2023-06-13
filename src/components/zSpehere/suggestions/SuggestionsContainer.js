import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import PostCard from "./PostCard";
import { getSuggestedAgents } from "../../../redux/slices/agentsSlice";
import UserSkeleton from "../../loadingSkeletons/UserSkeleton";
import PostSkeleton from "../../loadingSkeletons/PostSkeleton";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid #D6D6D6",
    padding: "20px 10px",
    backgroundColor: "white",
    overflowY: "scroll",
    height: "80vh",
  },
  heading: {
    fontSize: 16,
    color: "#134696",
    fontWeight: "bold",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 400,
  },

  divider: {
    height: 1,
    width: "90%",
    backgroundColor: "#EAEEF3",
    alignSelf: "center",
    margin: "20px 0px",
  },
  postContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
}));

/* SuggestionsContainer renders all the components in suggested for you container on the right of screen which displays suggested users and latest posts. */
const SuggestionsContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.global);
  const { allPosts, allPostsApiInfo } = useSelector((state) => state.posts);
  const { suggestedAgents, suggestedApiInfo } = useSelector(
    (state) => state.agents
  );
  const currentUser = useSelector((state) => state.auth.currentUser);

  /* get suggested agents from the store. */
  useEffect(() => {
    if (!suggestedAgents)
      dispatch(
        getSuggestedAgents({
          pageSize: 3,
          token: currentUser?.token,
        })
      );

    // eslint-disable-next-line
  }, [suggestedAgents]);

  /* show suggested agents and store in memory. */
  const usersToShow = useMemo(() => {
    return suggestedAgents?.result?.results;
  }, [suggestedAgents]);

  // // console.log({ suggestedAgents, usersToShow });

  /* show only first two posts. */
  const posts = useMemo(() => allPosts?.results?.filter((item)=> item?.user?.id !== currentUser?.id)?.slice(0, 2), [allPosts,currentUser?.id]);

  /* get suggested agents from the store. */
  const handleAllUsers = () => {
    dispatch(
      getSuggestedAgents({
        pageSize: 10,
        token: currentUser?.token,
      })
    );
  };
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <div className={classes.topContainer}>
        <span
          className={classes.heading}
          style={{
            color: darkMode ? "#0ed85b" : "#134696",
          }}
        >
          Suggestions For You
        </span>
        {usersToShow?.length <= 3 && (
          <Button
            sx={{
              textTransform: "none",
              fontSize: 16,
              color: "#303037",
              fontFamily: "medium",
            }}
            onClick={handleAllUsers}
          >
            See All
          </Button>
        )}
      </div>
      {suggestedApiInfo?.loading ? (
        <>
          {[...Array(3)]?.map((elem, index) => (
            <UserSkeleton
              key={index}
              customSize={{ height: 40, width: 40 }}
              containerStyle={{ flex: "auto" }}
            />
          ))}
        </>
      ) : (
        <>
          {usersToShow?.map((elem, index) => (
            <UserCard user={elem} key={index} />
          ))}
        </>
      )}

      <div className={classes.divider}></div>
      <span
        className={classes.heading}
        style={{
          color: darkMode ? "#0ed85b" : "#134696",
        }}
      >
        Latest Post Activity
      </span>
      <div className={classes.postContainer}>
        {allPostsApiInfo?.loading ? (
          <PostSkeleton />
        ) : (
          <>
            {posts?.map((elem, index) => (
              <PostCard post={elem} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestionsContainer;
