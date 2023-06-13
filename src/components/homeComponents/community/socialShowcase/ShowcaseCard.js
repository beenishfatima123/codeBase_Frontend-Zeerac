import React from "react";
import { makeStyles } from "@mui/styles";
import defaultPost from "../../../../assets/defaultAssets/defaultPost.png";
import { Button } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useSelector } from "react-redux";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 300,
  },
  image: {
    height: 175,
    width: 300,
    borderRadius: "5px",
    "-webkit-filter": "grayscale(100%)" /* Safari 6.0 - 9.0 */,
    filter: "grayscale(100%)",
  },
  insights: {
    fontSize: 12,
    color: "#0ED864",
    margin: "10px 0px",
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
  },
  border: {
    height: 1,
    width: 298,
    backgroundColor: "#707070",
    margin: "20px 0px",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const ShowcaseCard = () => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <img src={defaultPost} alt="" className={classes.image} />
      <span className={classes.insights}>Insights</span>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "white" : "#134696",
        }}
      >
        Making Strides in Real Estate with Unbeatable Customer Experience
      </span>
      <div className={classes.border} />
      <Button
        sx={{
          textTransform: "none",
          color: darkMode ? "white" : "#134696",
          fontSize: 11,
          fontFamily: "medium",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        startIcon={<ArrowForwardIos style={{ fontSize: 11 }} />}
      >
        Read More
      </Button>
    </div>
  );
};

export default ShowcaseCard;
