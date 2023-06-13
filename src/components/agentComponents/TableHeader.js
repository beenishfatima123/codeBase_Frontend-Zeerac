import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles(() => ({
  tableHeading: {
    fontSize: 12,
    color: "#134696",
    margin: 0,
  },
}));

/* this TableHeader is the heading component for the agents table 
having Name, Location, Agency Association and Listings. */
const TableHeader = ({ columns, xs }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      sx={{
        borderTop: "1px solid #8B8B8B",
        borderBottom: "1px solid #8B8B8B",
        pt: 2,
        pb: 2,
      }}
    >
      {columns?.map((elem, index) => (
        <Grid item xs={xs} key={index}>
          <p className={classes.tableHeading}>{elem}</p>
        </Grid>
      ))}
    </Grid>
  );
};

export default TableHeader;
