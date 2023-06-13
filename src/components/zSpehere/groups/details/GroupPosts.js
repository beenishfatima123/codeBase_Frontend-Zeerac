import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import CreatePostContainer from "./CreatePostContainer";
import { useDispatch, useSelector } from "react-redux";
import PostSkeleton from "../../../loadingSkeletons/PostSkeleton";
import PostDetails from "../../feed/PostDetails";
import Post from "../../socialPost/Post";
import { getGroupPosts } from "../../../../redux/slices/postsSlice";
import FinishedContainer from "../../feed/FinishedContainer";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0px",
  },
  createPostContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 8,
    marginTop: 20,
  },
  createPostTitle: {
    fontSize: 18,
    fontFamily: "medium",
  },
}));

/* Group post component to render posts. */
const GroupPosts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup } = useSelector((state) => state.groups);

  const { allPosts, allPostsApiInfo } = useSelector((state) => state.posts);

  const [openDetailsContainer, setOpenDetailsContainer] = useState(null);

  // console.log({ allPosts });
  /* get all group posts with token. */
  useEffect(() => {
    dispatch(
      getGroupPosts({
        token: currentUser?.token,
        id: selectedGroup?.id,
      })
    );
    // eslint-disable-next-line
  }, [selectedGroup, currentUser]);

  return (
    <div className={classes.container}>
      <CreatePostContainer />
      {allPostsApiInfo?.loading ? (
        <PostSkeleton />
      ) : (
        <>
          {openDetailsContainer && (
            <PostDetails
              isOpen={Boolean(openDetailsContainer)}
              postId={openDetailsContainer}
              handleClose={() => setOpenDetailsContainer(null)}
            />
          )}
          {allPosts?.results?.map((elem, index) => (
            <Post
              post={elem}
              key={index}
              setOpenDetailsContainer={setOpenDetailsContainer}
            />
          ))}
          <FinishedContainer posts={allPosts} />
        </>
      )}
    </div>
  );
};

export default GroupPosts;
