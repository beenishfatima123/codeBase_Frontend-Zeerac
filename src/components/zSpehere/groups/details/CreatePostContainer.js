import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import CreatePostModal from "../../feed/postModal/CreatePostModal";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
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

/* post creation button container in group details, by clicking "whats on your mind" button, create post modal opens. */
const CreatePostContainer = ({ CEO }) => {
  const classes = useStyles();
  const location = useLocation();
  const [createPost, setCreatePost] = useState(false);

  const { darkMode } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup } = useSelector((state) => state.groups);
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {createPost && CEO ? (
        <CreatePostModal isOpen={createPost} setOpen={setCreatePost} CEO />
      ) : (
        <CreatePostModal
          isOpen={createPost}
          setOpen={setCreatePost}
          group={selectedGroup?.id}
        />
      )}
      <span
        className={classes.createPostTitle}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {currentUser?.user_type !== 3 && location?.pathname?.includes("CEO")
          ? "Sponsored Post"
          : "Post"}
      </span>
      <Button
        onClick={() => setCreatePost(true)}
        sx={{
          border: "1px solid lightGray",
          borderRadius: 5,
          mt: 1,
          color: darkMode ? "#fff" : "#6B7B88",
          fontSize: 14,
          textTransform: "none",
          display: "flex",
          justifyContent: "flex-start",
          padding: "4px 16px",
        }}
      >
        Whats on your mind, {currentUser?.first_name}?
      </Button>
    </div>
  );
};

export default CreatePostContainer;
