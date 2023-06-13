import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { useDispatch, useSelector } from "react-redux";
import PostSkeleton from "../../../loadingSkeletons/PostSkeleton";
import PostDetails from "../../feed/PostDetails";
import Post from "../../socialPost/Post";
import {
  getAllSponsoredPosts,
  getGroupPosts,
} from "../../../../redux/slices/postsSlice";
import FinishedContainer from "../../feed/FinishedContainer";
import CreatePostContainer from "../details/CreatePostContainer";
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

/* Posts container at CEO club main page. */
const CeoPosts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup } = useSelector((state) => state.groups);

  const { allPosts, allPostsApiInfo, allSponsoredPosts } = useSelector(
    (state) => state.posts
  );

  const [openDetailsContainer, setOpenDetailsContainer] = useState(null);

  /* get all CEO club posts. */
  useEffect(() => {
    dispatch(
      getGroupPosts({
        token: currentUser?.token,
        queryData: `ceo_club=${true}`,
      })
    );
    // eslint-disable-next-line
  }, [selectedGroup, currentUser]);

  /* retrieve sponsored posts from store. */
  useEffect(() => {
    if (currentUser?.user_type !== 3)
      dispatch(
        getAllSponsoredPosts({
          token: currentUser?.token,
        })
      );
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <div className={classes.container}>
      <CreatePostContainer CEO />
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
          {currentUser?.user_type !== 3
            ? allSponsoredPosts?.results?.map((elem, index) => (
                <Post
                  post={elem}
                  key={index}
                  setOpenDetailsContainer={setOpenDetailsContainer}
                />
              ))
            : allPosts?.results?.map((elem, index) => (
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

export default CeoPosts;
