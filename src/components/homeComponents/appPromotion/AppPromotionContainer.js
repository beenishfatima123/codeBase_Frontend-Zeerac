import React from "react";
import { makeStyles } from "@mui/styles";
import mobilePromotionBackground from "../../../assets/home/mobilePromotionBackground.png";
import googlePlayBadge from "../../../assets/home/google-play-badge.png";
import appStoreBadge from "../../../assets/home/app-store-badge.png";

import { Button } from "@mui/material";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    minHeight: 550,
    background: "none",

    padding: "5% 5%",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    objectFit: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 30%, rgba(255,255,255,255)),url(${mobilePromotionBackground})`,
    zIndex: 0,
    width: "100%",
    "-webkit-filter": "grayscale(100%)" /* Safari 6.0 - 9.0 */,
    filter: "grayscale(100%)",
    height: 550,
  },
  text: {
    fontSize: 54,
    margin: 0,
    color: "#134696",
    zIndex: 10,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  btnTopText: {
    fontSize: 14,
    color: "white",
    margin: 0,
    lineHeight: 1,
    textAlign: "left",
  },
  btnBottomText: {
    fontSize: 25,
    color: "white",
    margin: 0,
    textAlign: "left",
    lineHeight: 1,
  },
  playBadge: {
    width: 275,
    margin: 5,
    borderRadius: 5,
  },
  appStoreBadge: {
    width: 250,
    margin: "5px 5px",
  },
  "@media (max-width: 1024px)": {
    btnContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));
const AppPromotionContainer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img
        src={mobilePromotionBackground}
        alt=""
        className={classes.backgroundImage}
      />
      <p className={classes.text}>
        Mobile App <br /> Promotion
      </p>
      <div className={classes.btnContainer}>
        <Button
          sx={{
            p: 0,
            background: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              background: "none",
            },
          }}
          variant="contained"
        >
          <img src={appStoreBadge} alt="" className={classes.appStoreBadge} />
        </Button>
        <Button
          sx={{
            p: 0,
            background: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              background: "none",
            },
          }}
          variant="contained"
        >
          <img src={googlePlayBadge} alt="" className={classes.playBadge} />
        </Button>
      </div>
    </div>
  );
};

export default AppPromotionContainer;
