import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar } from "@mui/material";
import mobilePromotionBackground from "../../../../assets/home/mobilePromotionBackground.png";
import groupLines from "../../../../assets/zSpehere/groupLines.png";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  top: {
    display: "flex",
    flex: 1,
    padding: 10,
    backgroundColor: "#134696",
    position: "relative",
  },
  topContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 17,
    color: "#fff",
    fontFamily: "medium",
  },
  total: {
    fontSize: 15,
    color: "#0ED864",
    fontFamily: "medium",
  },
  image: {
    width: "100%",
    height: 190,
    objectFit: "cover",
    filter: "grayscale(100%)",
    "&:hover": {
      filter: "grayscale(0%)",
    },
  },
  lines: {
    position: "absolute",
    right: 0,
    top: "50%",
  },
}));
const GroupCard = ({ group }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <img src={groupLines} alt="" className={classes.lines} />
        <Avatar src={null} alt={"Group Image"} />
        <div className={classes.topContent}>
          <span className={classes.title}>{group?.title}</span>
          <span
            className={classes.total}
          >{`${group?.totalMembers} Total Members`}</span>
        </div>
      </div>
      <img src={mobilePromotionBackground} alt="" className={classes.image} />
    </div>
  );
};

export default GroupCard;
