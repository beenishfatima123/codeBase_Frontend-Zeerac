import React from "react";
import { makeStyles } from "@mui/styles";
//import lines from "../../../../assets/zSpehere/cardPattern.svg";
import mobilePromotionBackground from "../../../../assets/home/mobilePromotionBackground.png";
import { Divider } from "@mui/material";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: 300,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    marginTop: 100,
    marginBottom: 20,
  },
  innerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  imageContainer: {
    // position: "absolute",
    // transform: "translate(50%,-40%)",
    marginTop: -80,
  },
  groupImage: {
    width: 150,
    height: 150,
    border: "6px solid #134696",
    borderRadius: 10,
    objectFit: "cover",
  },
  heading: {
    color: "#134696",
    fontFamily: "heavy",
    fontSize: 24,
    textAlign: "center",
  },
  admin: {
    color: "#B5B5BE",
    fontSize: 14,
    fontFamily: "medium",
    textAlign: "center",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 20,
  },
  value: {
    color: "#134696",
    fontFamily: "light",
    fontSize: 16,
    textAlign: "center",
  },
  label: {
    color: "#92929D",
    fontFamily: "light",
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  groupBtn: {
    height: 40,
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: "#0ed864",
    fontSize: 14,
    fontFamily: "medium",
    color: "#fff",
    margin: "10px 5px",
    border: "none",
  },
  messageBtn: {
    height: 40,
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: "#F1F1F5",
    fontSize: 14,
    fontFamily: "medium",
    color: "#696974",
    margin: "10px 5px",
    border: "none",
  },
}));
const GroupCard1 = ({ group }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.imageContainer}>
          <img
            alt=""
            src={mobilePromotionBackground}
            className={classes.groupImage}
          />

          <div className={classes.heading}>CEO CLUB</div>
          <div className={classes.admin}>@ui_community</div>
        </div>
        {/* <img alt="" src={lines} /> */}
      </div>
      <div className={classes.statsContainer}>
        <div>
          <div className={classes.value}>20.6k</div>
          <div className={classes.label}>Posts</div>
        </div>
        <div>
          <div className={classes.value}>2,568</div>
          <div className={classes.label}>Members</div>
        </div>
        <div>
          <div className={classes.value}>297</div>
          <div className={classes.label}>Media</div>
        </div>
        <div>
          <div className={classes.value}>26</div>
          <div className={classes.label}>Events</div>
        </div>
      </div>
      <Divider
        sx={{ margin: "20px 20px 10px 20px", backgroundColor: "#F1F1F5" }}
      />
      <div className={classes.buttonContainer}>
        <button className={classes.groupBtn}>Join Group</button>
        <button className={classes.messageBtn}>Send Message</button>
      </div>
    </div>
  );
};

export default GroupCard1;
