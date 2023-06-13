import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import topMask from "../../../assets/partners/projectDetailMask.png";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { TextTranslation } from "../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
  },
  thumbnail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "100%",
    minHeight: 400,
    transition: "0.5s",
    position: "relative",
  },
  mask: {
    position: "absolute",
    maxWidth: "90%",
    marginTop: 150,
    left: -140,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
  "@media (max-width: 900px)": {
    mask: {
      maxWidth: "80%",
    },
  },
}));

/* DetailsTop is the header on top of project page. */
const DetailsTop = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { projectDetails } = useSelector((state) => state.projects);
  const { langIndex } = useSelector((state) => state.global);
  return (
    <div
      className={classes.thumbnail}
      style={{
        background: `url(${projectDetails?.feature_photo})`,
      }}
    >
      <img alt="" src={topMask} className={classes.mask} />

      <Button
        sx={{
          background:
            "linear-gradient(90deg, rgba(14,216,100,0.9) 50%, rgba(0,0,0,0) 100%)",
          textTransform: "none",
          color: "#134696",
          width: 150,
          ml: 3,
          mt: 2,
          borderRadius: 0,
        }}
        startIcon={
          <KeyboardBackspaceSharpIcon
            style={{ color: "#134696", marginLeft: -30 }}
          />
        }
        onClick={() => navigate(-1)}
      >
        {TextTranslation.back[langIndex]}
      </Button>
    </div>
  );
};

export default DetailsTop;
