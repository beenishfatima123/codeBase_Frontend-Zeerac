import React, { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { POST_SORTING_BUTTONS } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { useState } from "react";
import CreatePostModal from "./postModal/CreatePostModal";
import useParentDims from "../../../utils/hooks/useParentDims";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0px",
    padding: "0px 16px",
    flex: 1,
  },
  title: {
    fontSize: "2em",
    fontWeight: "bold",
    color: "#134696",
    fontFamily: "medium",
  },
  horizontalContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  createText: {
    color: "#134696",
    fontSize: 16,
    fontFamily: "medium",
    marginTop: 4,
  },
  "@media (max-width: 800px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* Header is displayed inside the FriendsContainer component under friends list. It displays sorting options for posts and create post button which starts a modal.  */
const Header = ({ selectedFilter, setSelectedFilter }) => {
  const classes = useStyles();
  const containerRef = useRef();

  const parentWidth = useParentDims(containerRef);

  const [createPost, setCreatePost] = useState(false);
  const [hovering, setHovering] = useState(true);

  const { darkMode } = useSelector((state) => state.global);

  /* this useEffect conditionally changes create post button based on width. */
  useEffect(() => {
    if (parentWidth > 520) setHovering(true);
    else setHovering(false);
  }, [parentWidth]);
  return (
    <div className={classes.container}>
      {createPost && (
        <CreatePostModal isOpen={createPost} setOpen={setCreatePost} />
      )}

      <div className={classes.horizontalContainer}>
        <div className={classes.horizontal} style={{ marginRight: 20 }}>
          {POST_SORTING_BUTTONS?.map((elem, index) => (
            <Button
              onClick={() => setSelectedFilter(elem)}
              key={index}
              sx={{
                textTransform: "none",
                color: darkMode ? "#fff" : "#134696",
                borderBottom:
                  selectedFilter === elem
                    ? darkMode
                      ? "2px solid #0ED864"
                      : "2px solid #134696"
                    : "none",
                fontSize: "clamp(0.8rem, -0.875rem + 8.333vw, 1rem)",
                fontFamily: "medium",
                borderRadius: 0,
                mr: 2,
              }}
            >
              {elem}
            </Button>
          ))}
        </div>
        <IconButton
          ref={containerRef}
          sx={{
            textTransform: "none",
            backgroundColor: "#0ED864",
            borderRadius: 10,
            pl: hovering ? 2 : 1,
            pr: hovering ? 2 : 1,
            "&:hover": {
              backgroundColor: "#0ED864",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "0.2s ease",
            maxHeight: 40,
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            if (parentWidth < 520) setHovering(false);
          }}
          onClick={() => setCreatePost(true)}
        >
          <AddIcon />

          {hovering && <span className={classes.createText}>Create Post</span>}
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
