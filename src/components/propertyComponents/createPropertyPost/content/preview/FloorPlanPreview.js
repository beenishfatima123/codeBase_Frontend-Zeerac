import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { DEFAULT_SHADOW } from "../../../../../utils/constants";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../../../utils/translation";

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
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxShadow: DEFAULT_SHADOW,
    borderRadius: "10px",
    height: "80%",
    width: "80%",
  },
}));
const FloorPlanPreview = ({ data }) => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div>
      <p
        className={classes.featureTitle}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {TextTranslation.floorPlan[langIndex]}
      </p>
      <Grid
        container
        rowSpacing={2}
        sx={{ borderBottom: "1px solid #707070", pb: 2 }}
      >
        {data?.map((elem, index) => (
          <Grid item xs={6} key={index}>
            <img
              src={URL.createObjectURL(elem)}
              alt=""
              className={classes.image}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FloorPlanPreview;
