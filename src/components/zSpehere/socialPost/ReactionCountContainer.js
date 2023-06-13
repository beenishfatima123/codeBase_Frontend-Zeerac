import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { EMOJI_REACTIONS } from "../../../utils/constants";
import { useSelector } from "react-redux";
import ReactionsModal from "./reactonsModal/ReactionsModal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  reactions: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    cursor: "pointer",
    alignItems: "center",
    "&:hover": {
      textDecorationLine: "underline",
    },
  },
  emoji: {
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  reactionText: {
    fontSize: 16,
    color: "#545454",
    fontFamily: "medium",
    marginLeft: 5,
    marginTop: 4,
  },
}));

/* displaying reaction and its instances on a post under post contents */
const ReactionCountContainer = ({ post, comment }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  const [showAllReactions, setShowAllReactions] = useState(false);

  /* finding reactions to display from the post reactions. */
  const reactionsToShow = useMemo(() => {
    return EMOJI_REACTIONS?.filter((elem) => {
      if (post?.reactions?.[`${elem?.label}`] > 0) {
        return true;
      } else if (comment?.reactions?.[`${elem?.label}`] > 0) {
        return true;
      } else return false;
    });
  }, [post, comment]);
  return (
    <div className={classes.container}>
      {showAllReactions && (
        <ReactionsModal
          isOpen={showAllReactions}
          setOpen={setShowAllReactions}
          post={post}
          comment={comment}
        />
      )}
      <div
        className={classes.reactions}
        onClick={() => setShowAllReactions(true)}
      >
        {reactionsToShow?.map((elem, index) => (
          <img
            src={elem?.image}
            alt=""
            key={index}
            className={classes.emoji}
            style={{
              marginLeft: index > 0 ? -5 : 0,
            }}
          />
        ))}
        <span
          className={classes.reactionText}
          style={{
            color: darkMode ? "#fff" : "#545454",
          }}
        >
          {post?.reactions_count || comment?.reactions_count || ""}
        </span>
      </div>
    </div>
  );
};

export default ReactionCountContainer;
