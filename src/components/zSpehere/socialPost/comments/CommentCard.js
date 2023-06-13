import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useState } from "react";
import { Avatar, IconButton, Skeleton } from "@mui/material";
import { EMOJI_REACTIONS } from "../../../../utils/constants";
import SendIcon from "@mui/icons-material/Send";
import "../postStyles.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCommentFormData } from "../../../../utils/helperFunctions";
import { useEffect } from "react";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import Slide from "@mui/material/Slide";
import DetailedReaction from "../DetailedReactions";
import ReactionPopper from "../ReactionPopper";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import {
  postNestedComment,
  reactToComment,
  updateCommentReaction,
} from "../../../../api/socialApi";
import ReactionCountContainer from "../ReactionCountContainer";
const useStyles = makeStyles(() => ({
  comment: {
    borderBottom: "1px solid #D6D6D6",
    display: "flex",
    flexDirection: "column",
    padding: "10px 0px",
    position: "relative",
  },
  userDetails: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    color: "#171725",
    marginRight: 10,
    textTransform: "capitalize",
  },
  time: {
    color: "#92929D",
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    color: "#696974",
    // marginBottom: 5,
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EDEDED",
    padding: "0px 16px",
    borderRadius: 20,
    marginTop: 10,
    position: "relative",
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
  reaction: {
    height: 26,
    width: 26,
  },
  commentReaction: {
    height: 26,
    width: 26,
    marginLeft: 20,
  },
  inputContainer: {
    display: "flex",
    flex: 1,
    borderRadius: 30,
    border: "1px solid #9DAFBD",
    height: 27,
    margin: "8px 5%",
    padding: "4px 20px",
  },
  commentReactionsContainer: {
    display: "flex",
    flex: 1,
    padding: "4px 16px",
    alignItems: "center",
  },
  reactionText: {
    fontSize: 12,
    color: "#92929D",
    fontFamily: "medium",
    marginLeft: 5,
  },
  nestedContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginLeft: "5%",
  },
  reactionIcons: {
    position: "absolute",
    right: 10,
    top: "90%",
  },
}));

/* comment card shows comments under a post with commentator's avatar, name, comment and reactions on that comment. */
const CommentCard = ({ comment, details, post }) => {
  const classes = useStyles();
  const containerRef = useRef();

  const [anchorEl, setAnchorEl] = useState(null);
  const [addingComment, setAddingComment] = useState(false);
  const [nestedComments, setNestedComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loaders, setLoaders] = useState({});
  const [myReaction, setMyReaction] = useState();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { darkMode } = useSelector((state) => state.global);

  /* nest the replies on a comment and set reactions. */
  useEffect(() => {
    if (comment?.comment_replies?.length > 0) {
      setNestedComments(comment?.comment_replies);
    }
    if (comment?.user_reaction) {
      EMOJI_REACTIONS?.forEach((elem) => {
        if (elem?.label === comment?.user_reaction?.reaction)
          setMyReaction(elem);
      });
    } else setMyReaction(null);
  }, [comment]);
  /* on submitting a comment, handleAddComment dispatches the updated post with comment to the store. If current user does not exit, display error in toast. */
  const handleAddComment = async () => {
    // console.log({ newComment, nestedComments, comment });
    if (currentUser) {
      setLoaders((prev) => ({ ...prev, newComment: true }));
      const nestedCommentResponse = await postNestedComment({
        values: getCommentFormData(
          {
            id: comment?.post_fk,
            user: currentUser?.id,
            comment: newComment,
            parent: comment?.id,
          },
          true
        ),
        token: currentUser?.token,
      });
      setLoaders((prev) => ({ ...prev, newComment: false }));

      if (nestedCommentResponse) {
        // console.log({ nestedCommentResponse });
        setNestedComments((prev) => [nestedCommentResponse, ...prev]);
        setNewComment("");
        // setAddingComment(false);
      }
    } else {
      toast.error("Login before proceeding", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    }
  };

  /* update reaction to post by calling updateReaction, otherwise display error in toast. */
  const handleAddReaction = (reaction) => {
    // console.log({ reaction, comment });
    if (currentUser) {
      if (comment?.user_reaction) {
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
  const addNewReaction = async (reaction) => {
    const formData = new FormData();
    formData.append("comment_fk", comment?.id);
    formData.append("reaction", reaction?.label);
    setLoaders((prev) => ({ ...prev, reaction: true }));

    const response = await reactToComment({
      values: formData,
      token: currentUser?.token,
      id: comment?.id,
      postId: post?.id,
    });
    // console.log({ res: response, comment });
    if (response && response?.comment_fk === comment?.id) {
      // console.log("found it...", { res: response, comment });
      EMOJI_REACTIONS?.forEach((elem) => {
        if (elem?.label === response?.reaction) setMyReaction(elem);
      });
    }
    setLoaders((prev) => ({ ...prev, reaction: false }));
  };

  /* update user's reaction on the post. */
  const updateReaction = async (reaction) => {
    const formData = new FormData();
    formData.append("reaction", reaction?.label);
    setLoaders((prev) => ({ ...prev, reaction: true }));

    const response = await updateCommentReaction({
      values: formData,
      token: currentUser?.token,
      id: comment?.id,
      reactionId: comment?.user_reaction?.id,
      postId: post?.id,
    });

    if (response && response?.comment_fk === comment?.id) {
      // console.log({ response });
      EMOJI_REACTIONS?.forEach((elem) => {
        if (elem?.label === response?.reaction) setMyReaction(elem);
      });
    }
    setLoaders((prev) => ({ ...prev, reaction: false }));
  };

  return (
    <div className={classes.comment} ref={containerRef}>
      {anchorEl && (
        <>
          {details ? (
            <DetailedReaction
              setAnchorEl={setAnchorEl}
              handleAddReaction={handleAddReaction}
              comment
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
      <div className={classes.userDetails}>
        <Avatar
          src={` ${comment?.user_fk?.photo}`}
          style={{ height: 24, width: 24, marginRight: 10 }}
        />
        <span
          className={classes.name}
          style={{
            color: darkMode ? "#0ed864" : "#171725",
          }}
        >
          {comment?.user_fk?.full_name}
        </span>
        <span className={classes.time}>
          {moment(comment?.updated_at)
            ?.add(5, "h")
            ?.format(" Do, MMMM  h:mm a")}
        </span>
      </div>
      <div
        className={classes.textContainer}
        style={{
          backgroundColor: darkMode ? "#212124" : "#EDEDED",
        }}
      >
        <div className={classes.reactionIcons}>
          <ReactionCountContainer comment={comment} />
        </div>
        <p
          className={classes.commentText}
          style={{
            color: darkMode ? "#fff" : "#696974",
          }}
        >
          {comment?.content}
        </p>
      </div>

      <div className={classes.commentReactionsContainer}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          {loaders?.reaction ? (
            <Skeleton width={30} height={30} variant="circular" />
          ) : (
            <>
              {myReaction ? (
                <img src={myReaction?.image} alt="" />
              ) : (
                <ThumbUpOffAltOutlinedIcon />
              )}

              <span className={classes.reactionText}>
                {myReaction?.textContent || "Like"}
              </span>
            </>
          )}
        </IconButton>
        <IconButton onClick={() => setAddingComment((prev) => !prev)}>
          <SmsOutlinedIcon
            style={{
              color: darkMode ? "#fff" : "#92929D",
            }}
          />
          <span className={classes.reactionText}>
            {addingComment ? "Hide replies" : "Reply"}
          </span>
        </IconButton>
        {comment?.comment_replies?.length > 0 && (
          <IconButton
            sx={{
              fontSize: 12,
              textTransform: "none",
              padding: "0px 20px",
              color: darkMode ? "#fff" : "#92929D",
            }}
            onClick={() => setAddingComment((prev) => !prev)}
          >
            {`${addingComment ? "Hide" : "View"} ${
              comment?.comment_replies?.length
            } replies`}
          </IconButton>
        )}
      </div>

      {addingComment && (
        <div
          className={classes.inputContainer}
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
          {loaders?.newComment ? (
            <Skeleton width={30} height={30} variant="circular" />
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
      )}
      {addingComment && (
        <Slide
          in={addingComment}
          direction="right"
          container={containerRef.current}
        >
          <div className={classes.nestedContainer}>
            {nestedComments?.map((elem, index) => (
              <CommentCard key={index} comment={elem} post={post} />
            ))}
          </div>
        </Slide>
      )}
    </div>
  );
};

export default CommentCard;
