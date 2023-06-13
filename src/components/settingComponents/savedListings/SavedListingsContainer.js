import React from "react";

import { makeStyles } from "@mui/styles";
import TopSelector from "./TopSelector";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles(() => ({
  mainContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
}));
/* SavedListingsContainer is the main component displayed on the saved listings page from settings page. */
const SavedListingsContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <TopSelector />
        <Outlet />
      </div>
    </div>
  );
};

export default SavedListingsContainer;
