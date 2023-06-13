import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: 10,
    position: "absolute",
    bottom: 40,
    left: 40,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    border: "1px solid white",
    cursor: "pointer",
    margin: "0px 5px",
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: "#6684F2",
    cursor: "pointer",
    margin: "0px 5px",
  },
}));
const CustomSliderDots = ({ total, handleDotClick, currentDot }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {Array(total)
        ?.fill(0)
        .map((elem, index) => (
          <div
            className={currentDot === index ? classes.selectedDot : classes.dot}
            key={index}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
    </div>
  );
};

export default CustomSliderDots;
