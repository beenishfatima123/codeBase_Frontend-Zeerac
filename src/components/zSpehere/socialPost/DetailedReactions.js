import React from "react";
import { makeStyles } from "@mui/styles";
import { ClickAwayListener, IconButton } from "@mui/material";
import { EMOJI_REACTIONS } from "../../../utils/constants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: "0px 10px",
    width: 240,
    flexWrap: "wrap",
    position: "absolute",
    top: "100%",
    zIndex: 1200,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  count: {
    fontSize: 12,
    color: "#000",
    marginRight: 5,
  },
}));

/* By clicking on reaction button on the post we can see further reactions that can be done.. */
const DetailedReaction = ({ setAnchorEl, handleAddReaction, comment }) => {
  const classes = useStyles();

  const getPosition = () => {
    return comment ? { left: 0 } : { right: 0 };
  };
  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div
        className={classes.container}
        style={{
          maxWidth: "80%",
          ...getPosition(),
        }}
      >
        {EMOJI_REACTIONS?.map((elem, index) => (
          <IconButton key={index} onClick={() => handleAddReaction(elem)}>
            {/* <span className={classes.count}>{details?.[`${elem}`] || 3}</span> */}
            <img src={elem?.image} alt="" />{" "}
          </IconButton>
        ))}
      </div>
    </ClickAwayListener>
  );
};

export default DetailedReaction;
