import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostComments,
  getSinglePost,
  setSelectedPost,
} from "../../../redux/slices/postsSlice";
import Post from "../socialPost/Post";

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    maxHeight: "90%",
    maxWidth: "95%",
    overflowY: "scroll",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
}));

/* displays post by rendering post and modal. */
const PostDetails = ({ isOpen, postId, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { darkMode } = useSelector((state) => state.global);
  const { selectedPost, allPosts, userPosts } = useSelector(
    (state) => state.posts
  );
  // console.log({ selectedPost, allPosts });

  /* this useEffect gets all the comments from store if one comment exists. */
  useEffect(() => {
    if (selectedPost?.comments_count > 1 && !selectedPost?.fetchedComments) {
      dispatch(
        getAllPostComments({
          token: currentUser?.token,
          id: postId,
        })
      );
    }

    // eslint-disable-next-line
  }, [selectedPost, postId]);

  /* This useEffect checks if a selected post is already available based on its ID. If not, it retrieves the post from the store using the provided ID. */
  useEffect(() => {
    // console.log({ selectedPost, postId });

    if (!selectedPost || `${selectedPost?.id}` !== `${postId}`) {
      let _post = null;
      allPosts?.results?.forEach((elem) => {
        if (`${elem?.id}` === `${postId}`) _post = elem;
      });
      userPosts?.results?.forEach((elem) => {
        if (`${elem?.id}` === `${postId}`) _post = elem;
      });
      if (!_post) {
        console.log("sending req..");
        dispatch(getSinglePost({ id: postId }));
      } else {
        dispatch(setSelectedPost(_post));
      }
    }
    // eslint-disable-next-line
  }, [selectedPost, postId, allPosts, userPosts]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div
        className={classes.container}
        style={{
          backgroundColor: darkMode ? "#212124" : "#fff",
          width: currentUser ? 500 : "",
        }}
      >
        <Post post={selectedPost} showAllComments details />
      </div>
    </Modal>
  );
};

export default PostDetails;
