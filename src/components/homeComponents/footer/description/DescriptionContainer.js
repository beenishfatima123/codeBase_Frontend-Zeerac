import React from "react";
import { makeStyles } from "@mui/styles";
import LogoSvg from "./LogoSvg";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "center",
  },
  description: {
    fontSize: 18,
    color: "#9DAFBD",
    margin: 0,
  },
}));
const DescriptionContainer = () => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <LogoSvg />
      <p
        className={classes.description}
        style={{
          color: darkMode ? "white" : "#9DAFBD",
        }}
      >
        {TextTranslation.footerDescription[langIndex]}
      </p>
    </div>
  );
};

export default DescriptionContainer;
