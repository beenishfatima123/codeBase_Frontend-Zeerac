import { makeStyles } from "@mui/styles";
import React from "react";
import investmentLines from "../../../../assets/home/investment/investmentLines.png";
// import investmentDots from "../../../../assets/investmentDots.png";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "black",
    position: "relative",
    // minHeight: 600,
  },
  image: {
    "-webkit-filter": "grayscale(100%)" /* Safari 6.0 - 9.0 */,
    filter: "grayscale(100%)",
    width: "100%",
    height: 600,
    transition: "0.5s",
    objectFit: "cover",
  },
  lines: {
    position: "absolute",
    top: 20,
    left: 0,
  },
  dots: {
    position: "absolute",
    top: 40,
    right: 150,
  },
}));
const ContentContainer = ({ selected }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {selected?.image && (
        <img src={selected?.image} alt="" className={classes.image} />
      )}
      <img src={investmentLines} alt="" className={classes.lines} />
      {/* <img src={investmentDots} alt="" className={classes.dots} /> */}
    </div>
  );
};

export default ContentContainer;
