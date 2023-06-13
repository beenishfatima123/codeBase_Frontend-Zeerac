import React from "react";
import { makeStyles } from "@mui/styles";
import partnersLeft from "../../assets/home/partners/partnersLeft.png";
import partnersRight from "../../assets/home/partners/partnersRight.png";
import { useWindowDims } from "../../utils/useWindowDims";
import PartnersSvg from "../../components/homeComponents/partners/PartnersSvg";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginRight: 100,
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "20px 0px",
    position: "relative",
  },
  leftLine: {
    alignSelf: "flex-start",
  },
  rightLine: {
    alignSelf: "flex-end",
  },
  text: {
    color: "#75848F",
    fontSize: 22,
    margin: 0,
    width: "90%",
    maxWidth: 650,
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    position: "absolute",
    right: "10%",
    top: "10%",
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
  "@media (max-width: 1024px)": {
    topSection: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

/* ShowcaseTopSection is on the top of PartnersShowcase which is loaded when
all projects are browsed. */
const ShowcaseTopSection = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.topSection}>
      <img
        src={partnersLeft}
        alt=""
        className={classes.leftLine}
        style={{ width: width * 0.2 || 300 }}
      />
      <div className={classes.contentContainer}>
        <PartnersSvg />
        <p
          className={classes.text}
          style={{
            color: darkMode ? "#fff" : "#75848F",
          }}
        >
          Grow your personal and professional projects through our partners. Our
          partners will be happy to assist you in all possibilities.
        </p>
      </div>

      <img
        src={partnersRight}
        alt=""
        className={classes.rightLine}
        style={{ width: width * 0.2 || 300 }}
      />
    </div>
  );
};

export default ShowcaseTopSection;
