import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import "./postStyles.css";
import { EMOJI_REACTIONS } from "../../../utils/constants";
import commentIcon from "../../../assets/zSpehere/commentIcon.png";
import SendIcon from "@mui/icons-material/Send";
import Skeleton from "@mui/material/Skeleton";

import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  editReaction,
  reactToPost,
  replyToPost,
} from "../../../redux/slices/postsSlice";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { toast } from "react-toastify";
import { getCommentFormData } from "../../../utils/helperFunctions";
import ReactionPopper from "./ReactionPopper";
import DetailedReaction from "./DetailedReactions";
import ReactionCountContainer from "./ReactionCountContainer";
import { useWindowDims } from "../../../utils/useWindowDims";

const reactionButtonSx = {
  display: "flex",
  alignItems: "center",
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    position: "relative",
  },
  textContainer: {
    display: "flex",
    flex: 1,
    padding: "0px 20px",
    borderRadius: 30,
    border: "1px solid #9DAFBD",
    height: 37,
  },
  reactions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "0px 10px",
  },
  reaction: {
    height: 26,
    width: 26,
  },
  horizontal: {
    display: "flex",
    alignItems: "center",
    marginRight: 20,
  },
  reactionText: {
    fontSize: 14,
    color: "#545454",
    marginLeft: 5,
  },
  allReactions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    border: "1px solid #707070",
    borderRadius: 20,
    padding: "0px 10px",
  },
  "@media (max-width: 450px)": {
    container: {
      flexDirection: "column-reverse",
    },
    textContainer: {
      minHeight: "37px !important",
    },
    reactions: {
      justifyContent: "flex-end",
    },
  },
}));

/* contains reactions on post and add, update reaction and comments using the post and details in parameters. */
const ReactionsContainer = ({ post, details, setOpenDetailsContainer }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { width } = useWindowDims();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newComment, setNewComment] = useState("");

  const { replyApiInfo, allPostsApiInfo } = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { darkMode } = useSelector((state) => state.global);

  /* myReaction is the reacted emoji on any post, default "in love" and then sets equal to user's reaction. */
  const myReaction = useMemo(() => {
    // console.log({ post });
    if (post?.user_reaction) {
      let _reaction = EMOJI_REACTIONS[0]?.image;
      EMOJI_REACTIONS?.forEach((elem) => {
        if (elem?.label === post?.user_reaction?.reaction)
          _reaction = elem?.image;
      });
      return _reaction;
    } else return EMOJI_REACTIONS[0]?.image;
  }, [post]);

  /* on submitting a comment, handleAddComment dispatches the updated post with comment to the store. If current user does not exit, display error in toast. */
  const handleAddComment = () => {
    // // console.log({ newComment });
    if (currentUser) {
      dispatch(
        replyToPost({
          values: getCommentFormData({
            id: post?.id,
            user: currentUser?.id,
            comment: newComment,
          }),
          token: currentUser?.token,
        })
      );
      setNewComment("");
    } else {
      toast.error("Login before proceeding", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    }
  };

  /* update reaction to post by calling updateReaction, otherwise display error in toast. */
  const handleAddReaction = (reaction) => {
    // console.log({ reaction });
    if (currentUser) {
      if (post?.user_reaction) {
        updateReaction(reaction);
      } else addNewReaction(reaction);

      setAnchorEl(null);
    } else {
      toast.error("Login before proceeding", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    }
  };

  /* if there was no reaction from user, then add this ew reaction. */
  const addNewReaction = (reaction) => {
    const formData = new FormData();
    formData.append("post_fk", post?.id);
    formData.append("reaction", reaction?.label);
    dispatch(
      reactToPost({
        values: formData,
        token: currentUser?.token,
        id: post?.id,
      })
    );
  };

  /* update user's reaction on the post. */
  const updateReaction = (reaction) => {
    const formData = new FormData();
    formData.append("reaction", reaction?.label);
    dispatch(
      editReaction({
        values: formData,
        token: currentUser?.token,
        id: post?.id,
        reactionId: post?.user_reaction?.id,
      })
    );
  };

  return (
    <div>
      <ReactionCountContainer post={post} />
      <div className={classes.container}>
        {anchorEl && (
          <>
            {details ? (
              <DetailedReaction
                setAnchorEl={setAnchorEl}
                handleAddReaction={handleAddReaction}
              />
            ) : (
              <ReactionPopper
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleAddReaction={handleAddReaction}
              />
            )}
          </>
        )}

        <div
          className={classes.textContainer}
          style={{
            backgroundColor: darkMode ? "#212124" : "",
            border: darkMode ? "none" : "1px solid #9DAFBD",
          }}
        >
          <input
            type="text"
            className="comments-input"
            placeholder="Write a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e?.key === "Enter" && handleAddComment()}
            style={{
              color: darkMode ? "#fff" : "#6b7b88",
            }}
          />
          {replyApiInfo?.loading === `${post?.id}` ? (
            <ComponentLoader customImageStyle={{ height: 20, width: 20 }} />
          ) : (
            <IconButton
              sx={{ p: 0, m: 0 }}
              onClick={handleAddComment}
              disabled={newComment === ""}
            >
              <SendIcon
                style={{
                  color: darkMode ? "#fff" : "#000",
                }}
              />
            </IconButton>
          )}
        </div>
        <div className={classes.reactions}>
          <Button
            sx={{
              ...reactionButtonSx,
              marginRight: width > 450 ? "10px" : "2px",
              width: width > 450 ? "auto" : "32px !important",
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            disabled={`${allPostsApiInfo?.loadingReaction}` === `${post?.id}`}
          >
            {`${allPostsApiInfo?.loadingReaction}` === `${post?.id}` ? (
              <Skeleton width={30} height={30} variant="circular" />
            ) : (
              <>
                <img src={myReaction} alt="" />
              </>
            )}
          </Button>

          <Button
            sx={{
              ...reactionButtonSx,
              marginRight: width > 450 ? "10px" : "2px",
              width: width > 450 ? "auto" : "32px !important",
            }}
            onClick={() => {
              if (!details) setOpenDetailsContainer(post?.id);
              // navigate(`/zSphere/Feed/${post?.id}`);
            }}
          >
            <img src={commentIcon} alt="" className={classes.reaction} />
            <span
              className={classes.reactionText}
              style={{
                color: darkMode ? "#fff" : "#545454",
              }}
            >
              {post?.comments_count}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReactionsContainer;
