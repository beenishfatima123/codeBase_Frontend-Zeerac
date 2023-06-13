import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  featureTitle: {
    fontSize: 18,
    color: "#134696",
    fontWeight: "bold",
  },
  feature: {
    fontSize: 16,
    color: "#6B7B88",
  },
}));
const ItemsList = ({ data, heading }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div>
      <p
        className={classes.featureTitle}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {heading}:
      </p>
      <Grid
        container
        rowSpacing={2}
        sx={{ borderBottom: "1px solid #707070", pb: 2 }}
      >
        {data?.map((elem, index) => (
          <Grid item xs={4} key={index}>
            <span
              className={classes.feature}
              style={{
                color: darkMode ? "#fff" : "#6B7B88",
              }}
            >
              {elem}
            </span>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemsList;
