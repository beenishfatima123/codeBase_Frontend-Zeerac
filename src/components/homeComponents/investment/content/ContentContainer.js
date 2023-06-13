import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { INVESTMENT_SHOWCASE_BUTTONS } from "../../../../utils/constants";
import Buttons from "./Buttons";
import Images from "./Images";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "10px 0px",
    background:
      "linear-gradient(90deg, rgba(19,70,150,1) 0%, rgba(72,143,255,1) 100%)",
    flex: 1,
    minHeight: 600,
  },

  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const ContentContainer = () => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);
  const [selectedTitle, setSelectedTitle] = useState(
    INVESTMENT_SHOWCASE_BUTTONS[0]
  );
  return (
    <div
      className={classes.container}
      style={{
        background: darkMode
          ? "linear-gradient(90deg, rgba(33,33,36,1) 0%, rgba(19,70,150,1) 100%)"
          : "linear-gradient(90deg, rgba(19,70,150,1) 0%, rgba(72,143,255,1) 100%)",
      }}
    >
      <Buttons selected={selectedTitle} setSelected={setSelectedTitle} />
      <Images selected={selectedTitle} setSelected={setSelectedTitle} />
    </div>
  );
};

export default ContentContainer;
