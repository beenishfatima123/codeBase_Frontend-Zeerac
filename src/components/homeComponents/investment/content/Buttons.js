import React from "react";
import { makeStyles } from "@mui/styles";
import { INVESTMENT_SHOWCASE_BUTTONS } from "../../../../utils/constants";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    paddingLeft: "6%",
    minHeight: 600,
    minWidth: 400,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "center",
    borderBottom: "1px solid #c9c9c9",
    cursor: "pointer",
    width: "100%",
    padding: "0px 5px",
    minHeight: 150,
    transition: "5s",
  },
  title: {
    fontSize: 27,
    transition: "0.5s",
    margin: 0,
  },
  tagline: {
    fontSize: 16,
    color: "white",
    margin: 0,
    maxWidth: 320,
  },
  "@media (max-width: 1024px)": {
    container: {
      minHeight: 0,
      paddingLeft: 5,
    },
    btnContainer: {
      minHeight: 0,
      borderBottom: "none",
      paddingBottom: 10,
    },
  },
}));
const Buttons = ({ selected, setSelected }) => {
  const classes = useStyles();
  const { langIndex } = useSelector((state) => state.global);
  return (
    <div className={classes.container}>
      {INVESTMENT_SHOWCASE_BUTTONS?.map((elem, index) => (
        <div
          key={index}
          className={classes.btnContainer}
          onClick={() => setSelected(elem)}
        >
          <p
            className={classes.title}
            style={{ color: selected !== elem ? "#C9C9C9" : "#0ED864" }}
          >
            {elem?.title[langIndex]}
          </p>
          {selected === elem && (
            <p className={classes.tagline}>{elem?.tagline[langIndex]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Buttons;
