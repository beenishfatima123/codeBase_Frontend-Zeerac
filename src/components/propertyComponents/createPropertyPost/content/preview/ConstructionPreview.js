import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { CONSTRUCTION_DETAILS } from "../../../../../utils/constants";
import { getConstructionHeading } from "../../../../../utils/helperFunctions";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../../../utils/translation";

const useStyles = makeStyles(() => ({
  featureTitle: {
    fontSize: 18,
    color: "#134696",
    fontWeight: "bold",
  },
  feature: {
    fontSize: 10,
    color: "#707070",
    textTransform: "capitalize",
  },
  heading: {
    fontSize: 12,
    color: "#134696",
  },
}));
const ConstructionPreview = () => {
  const classes = useStyles();
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div>
      <p
        className={classes.featureTitle}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {TextTranslation.constructionDetails[langIndex]}:
      </p>
      <Grid container rowSpacing={2}>
        {CONSTRUCTION_DETAILS?.map((elem, index) => (
          <Grid item xs={6} key={index}>
            <span
              className={classes.heading}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              {getConstructionHeading(index)[langIndex]}
            </span>
            {elem?.map((item, index) => (
              <div key={index}>
                <span
                  className={classes.feature}
                  style={{
                    color: darkMode ? "#fff" : "#707070",
                  }}
                >
                  {item?.label[langIndex]}:
                </span>
                <span
                  className={classes.feature}
                  style={{
                    marginLeft: 20,
                    color: darkMode ? "#fff" : "#707070",
                  }}
                >
                  {propertyData?.[item?.key]}
                </span>
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ConstructionPreview;
