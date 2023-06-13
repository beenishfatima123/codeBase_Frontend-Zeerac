import React from "react";
import { makeStyles } from "@mui/styles";
import leftLine from "../../../assets/properties/createPost/TopSectionLine.png";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { DEFAULT_SHADOW } from "../../../utils/constants";
import { useWindowDims } from "../../../utils/useWindowDims";
import { useNavigate } from "react-router-dom";
import { prefillPropertyData } from "../../../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyData } from "../../../redux/slices/createPropertySlice";
import { TextTranslation } from "../../../utils/translation";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    paddingBottom: 10,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    color: "#134696",
    marginLeft: -30,
    marginBottom: -30,
    fontFamily: "heavy",
  },

  "@media (max-width: 800px)": {
    container: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    leftContainer: {
      marginBottom: 20,
    },
    title: {
      fontSize: 30,
      color: "#134696",
      marginLeft: -30,
      marginBottom: -30,
      fontFamily: "heavy",
    },
  },
}));

/* TopSection is displayed on the top (below navbar) in listings and property
pages. It has a title in the center and a cancel button on right which
nacigates to main. */
const TopSection = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}>
        <img
          src={leftLine}
          alt=""
          style={{
            width: width < 800 ? width * 0.4 : 350,
          }}
        />
        <span
          className={classes.title}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
          }}
          //DEV USE ONLY
          onDoubleClick={() => dispatch(setPropertyData(prefillPropertyData()))}
        >
          {TextTranslation.addListings[langIndex]}
        </span>
      </div>
      <Button
        onClick={() => navigate("/")}
        endIcon={<CancelIcon />}
        sx={{
          backgroundColor: "white",
          color: "#1D396B",
          fontSize: 15,
          fontFamily: "medium",
          borderRadius: "20px",
          boxShadow: DEFAULT_SHADOW,
          padding: "5px 30px",
          mr: "5%",
          alignSelf: width > 800 ? "center" : "flex-end",
          mt: 2,
        }}
      >
        {TextTranslation.cancel[langIndex]}
      </Button>
    </div>
  );
};

export default TopSection;
