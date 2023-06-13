import React, { useEffect, useMemo, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import useOnScreen from "../../../../utils/hooks/useOnScreen";
import { paginateUserPosts } from "../../../../redux/slices/postsSlice";
import PostSkeleton from "../../../loadingSkeletons/PostSkeleton";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 0px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 8,
    margin: "20px 0px",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "medium",
    margin: "5px 0px",
    alignSelf: "center",
  },
  text2: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
}));

/* Ending message at members posts in groups. */
const FinishedMemberPostsContainer = ({ posts }) => {
  const classes = useStyles();
  const containerRef = useRef();
  const dispatch = useDispatch();
  const isOnScreen = useOnScreen(containerRef);

  const { darkMode } = useSelector((state) => state.global);
  const { allPostsApiInfo } = useSelector((state) => state.posts);

  const paginationUrl = useMemo(
    () => posts?.next?.replace("http", "https"),
    [posts]
  );
  useEffect(() => {
    if (isOnScreen && posts?.next && !allPostsApiInfo?.loadingPagination) {
      getPaginatedPosts();
    }
    // eslint-disable-next-line
  }, [isOnScreen, posts, allPostsApiInfo?.loadingPagination]);

  const getPaginatedPosts = async () => {
    console.log("pagination...");
    dispatch(
      paginateUserPosts({
        url: paginationUrl,
      })
    );
  };
  return (
    <div
      className={classes.container}
      ref={containerRef}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {allPostsApiInfo?.loadingUserPagination ? (
        <PostSkeleton />
      ) : (
        <>
          <span
            className={classes.text1}
            style={{
              color: darkMode ? "#fff" : "#65676b",
            }}
          >
            No more posts
          </span>
          <span
            className={classes.text2}
            style={{
              color: darkMode ? "#fff" : "#65676b",
            }}
          >
            You are all caught up
          </span>
        </>
      )}
    </div>
  );
};

export default FinishedMemberPostsContainer;
