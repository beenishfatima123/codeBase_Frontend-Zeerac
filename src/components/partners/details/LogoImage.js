import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
// eslint-disable-next-line
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
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* Back button on agencies page. */
const LogoImage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const { langIndex } = useSelector((state) => state.global);
  const partnerDetails = useSelector((state) => state.partners.partnerDetails);
  return (
    <div
      className={classes.thumbnail}
      style={{
        background: `url(${partnerDetails?.company_logo})`,
      }}
    >
      <Button
        sx={{
          background:
            "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
          textTransform: "none",
          color: "#134696",
          width: 180,
          mt: 3,
          ml: 3,
          borderRadius: 0,
        }}
        startIcon={<ArrowBackIos style={{ color: "#134696" }} />}
        onClick={() => navigate(-1)}
      >
        {TextTranslation.back[langIndex]}
      </Button>
      {/* <Button
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#6B7B88",
          fontSize: 17,
          background: "none",
          position: "absolute",
          right: "5%",
          bottom: "5%",
          boxShadow: "none",
          "&:hover": {
            color: "white",
            background: "#6B7B88",
          },
        }}
      >
        Download Brochure
      </Button> */}
    </div>
  );
};

export default LogoImage;
