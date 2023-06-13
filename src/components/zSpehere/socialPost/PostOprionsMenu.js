import { makeStyles } from "@mui/styles";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
const useStyles = makeStyles(() => ({
  list: {
    padding: "0",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
  },
}));

const menuItemSx = {
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#134696",
    color: "#fff",
  },
  transition: "all 0.2s ease",
};

/* show post options when user clicks menu icon on post, user can delete, edit and share their own post and can share others' posts. */
const PostOptionsMenu = ({
  anchorEl,
  handleClose,
  handleAfterClick,
  post,
  setOpenConfirmModal,
  setOpenEditModal,
  setOpenShareModal,
}) => {
  const classes = useStyles();

  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      classes={{ list: classes.list }}
      PaperProps={{ sx: { borderRadius: 5 } }}
    >
      {currentUser?.id === post?.user?.id && (
        <MenuItem
          onClick={() => {
            setOpenConfirmModal(true);
            handleAfterClick();
          }}
          sx={menuItemSx}
        >
          <HighlightOffIcon sx={{ color: "#FF6161" }} />{" "}
          <span style={{ marginLeft: 15, fontSize: 15, fontFamily: "medium" }}>
            Delete
          </span>
        </MenuItem>
      )}

      {currentUser?.id === post?.user?.id && (
        <MenuItem
          onClick={() => {
            setOpenEditModal(true);
            handleAfterClick();
          }}
          sx={menuItemSx}
        >
          <BorderColorOutlinedIcon />{" "}
          <span style={{ marginLeft: 15, fontSize: 15, fontFamily: "medium" }}>
            Edit
          </span>
        </MenuItem>
      )}

      <MenuItem
        onClick={() => {
          setOpenShareModal(true);
          handleAfterClick();
        }}
        sx={menuItemSx}
      >
        <IosShareOutlinedIcon />
        <span style={{ marginLeft: 15, fontSize: 15, fontFamily: "medium" }}>
          Share
        </span>
      </MenuItem>
    </Menu>
  );
};

export default PostOptionsMenu;
