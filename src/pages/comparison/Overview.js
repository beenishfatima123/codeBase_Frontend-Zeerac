import React from "react";
import { makeStyles } from "@mui/styles";
import { COMPARISON_TABS } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 20px",
    marginTop: -80,
  },
  title: {
    fontSize: 27,
    fontFamily: "heavy",
    color: "#0ED864",
    margin: "10px 0px",
  },
  tabsContainer: {
    backgroundColor: "#134696",
    minWidth: 255,
    borderRadius: 5,
  },
  tab: {
    color: "white",
    fontSize: 22,
    margin: "20px 20px",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const Overview = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <span className={classes.title}>OVERVIEW</span>
      <div className={classes.tabsContainer}>
        {COMPARISON_TABS?.map((elem, index) => (
          <p key={index} className={classes.tab}>
            {elem}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Overview;
