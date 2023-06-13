import React from "react";
import { makeStyles } from "@mui/styles";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 5px",
    flex: 1,
  },
}));

const TableContainer = ({ handleRemoveProperty }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TableHeader remove={handleRemoveProperty} />
      <TableBody />
    </div>
  );
};

export default TableContainer;
