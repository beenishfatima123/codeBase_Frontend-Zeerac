import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "20px 0px",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const MembersListContainer = () => {
  const classes = useStyles();
  return <div className={classes.container}>MembersListContainer</div>;
};

export default MembersListContainer;
