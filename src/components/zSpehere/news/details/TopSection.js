import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    height: 500,
    position: "relative",
  },
  image: {
    position: "absolute",
    height: 500,
    width: "100%",
    WebkitFilter: "grayscale(100%)",
    filter: "grayscale(100%)",
    "&:hover": {
      WebkitFilter: "none",
      filter: "none",
    },
  },
}));
/* contains news cover image and back butto. */
const TopSection = ({ story }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <img src={` ${story?.feature_photo}`} className={classes.image} alt="" />
      <Button
        sx={{
          background:
            "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
          textTransform: "none",
          color: "#134696",
          width: 180,
          height: 45,
          ml: 3,
          mt: 2,
        }}
        startIcon={<ArrowBackIos style={{ color: "#134696" }} />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
};

export default TopSection;
