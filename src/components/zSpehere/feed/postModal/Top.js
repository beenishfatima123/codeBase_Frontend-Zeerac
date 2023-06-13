import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0px",
    borderBottom: "1px solid lightGray",
  },
  heading: {
    color: "#014493",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "heavy",
  },
}));

/* header of create image modal */
const Top = ({ handleClose, label }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <div />
      <span
        className={classes.heading}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {label || "Create Post"}
      </span>
      <IconButton onClick={handleClose}>
        <CancelIcon sx={{ color: "lightGray", fontSize: 28 }} />
      </IconButton>
    </div>
  );
};

export default Top;
