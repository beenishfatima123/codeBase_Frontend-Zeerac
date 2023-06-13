import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar } from "@mui/material";

const useStyles = makeStyles(() => ({
  infoContainer: {
    display: "flex",
    margin: "10px 0",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  name: {
    textTransform: "capitalize",
    color: "#134696",
    fontFamily: "medium",
    fontSize: 18,
  },
  username: {
    color: "#B5B5BE",
    fontFamily: "medium",
    fontSize: 14,
  },
  invite: {
    backgroundColor: "#f1f1f5",
    border: "none",
    color: "#696974",
    cursor: "pointer",
    height: 35,
    width: 80,
    borderRadius: 10,
    fontFamily: "medium",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
}));

/* Group members list details with user avatar and icon button. */
const ListDetail = ({ userPhoto, name, username, onIconClick, iconButton }) => {
  const classes = useStyles();
  return (
    <div style={{ marginTop: 20 }}>
      <div className={classes.infoContainer}>
        <div className={classes.content}>
          <Avatar alt="" src={userPhoto} style={{ height: 60, width: 60 }} />
          <div style={{ marginLeft: 10 }}>
            <div className={classes.name}>{name}</div>
            <div className={classes.username}>{username}</div>
          </div>
        </div>
        <button className={classes.invite} onClick={onIconClick}>
          {iconButton}
        </button>
      </div>
    </div>
  );
};

export default ListDetail;
