import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import facebookIcon from "../../../assets/icons/facebook.png";
import instagramIcon from "../../../assets/icons/instagram.png";
import pinterestIcon from "../../../assets/icons/pinterest.png";
import twitterIcon from "../../../assets/icons/twitter.png";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  socialIcon: {
    height: 56,
    width: 56,
  },
}));
const SocialsContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button>
        <img src={facebookIcon} alt="" className={classes.socialIcon} />
      </Button>
      <Button>
        <img src={instagramIcon} alt="" className={classes.socialIcon} />
      </Button>
      <Button>
        <img src={pinterestIcon} alt="" className={classes.socialIcon} />
      </Button>
      <Button>
        <img src={twitterIcon} alt="" className={classes.socialIcon} />
      </Button>
    </div>
  );
};

export default SocialsContainer;
