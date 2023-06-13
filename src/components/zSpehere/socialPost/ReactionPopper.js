import React from "react";
import { ClickAwayListener, Fade, IconButton, Popper } from "@mui/material";
import { EMOJI_REACTIONS } from "../../../utils/constants";
import { useWindowDims } from "../../../utils/useWindowDims";

/* on clicking the reaction button, pop up the other reaction options. */
const ReactionPopper = ({ anchorEl, setAnchorEl, handleAddReaction }) => {
  const { width } = useWindowDims();
  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement={"top"}
        transition
        keepMounted={false}
        sx={{ zIndex: 1500 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "#FFFFFF",
                border: "1px solid #707070",
                borderRadius: 20,
                padding: "0px 10px",
                width: 500,
                maxWidth: width * 0.8 || 500,
                flexWrap: "wrap",
              }}
            >
              {EMOJI_REACTIONS?.map((elem, index) => (
                <IconButton key={index} onClick={() => handleAddReaction(elem)}>
                  <img src={elem?.image} alt="" />
                </IconButton>
              ))}
            </div>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );
};

export default ReactionPopper;
