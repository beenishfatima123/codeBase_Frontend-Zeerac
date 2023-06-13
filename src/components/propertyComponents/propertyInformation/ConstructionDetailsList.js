import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import {
  CONSTRUCTION_DETAILS,
  HEADER_CONTENT_WIDTH,
} from "../../../utils/constants";
import { getConstructionHeading } from "../../../utils/helperFunctions";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    margin: "0px 5%",
    padding: "20px 0px",
    borderTop: "1px solid #CCCCCC",
    borderBottom: "1px solid #CCCCCC",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  featureTitle: {
    fontSize: 24,
    color: "#134696",
    fontFamily: "heavy",
  },
  feature: {
    fontSize: 14,
    color: "#707070",
    textTransform: "capitalize",
  },
  heading: {
    fontSize: 16,
    color: "#134696",
    fontFamily: "heavy",
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 200,
  },
}));
const ConstructionDetailsList = ({ data }) => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <p
        className={classes.featureTitle}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {TextTranslation.constructionDetails[langIndex]}
      </p>
      <Grid container rowSpacing={2}>
        {CONSTRUCTION_DETAILS?.map((elem, index) => (
          <Grid item xs={6} md={4} key={index}>
            <span
              className={classes.heading}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
                marginBottom: 10,
              }}
            >
              {getConstructionHeading(index)[langIndex]}
            </span>
            {elem?.map((item, index) => (
              <div key={index} className={classes.itemContainer}>
                <span
                  className={classes.feature}
                  style={{
                    color: darkMode ? "#fff" : "#6B7B88",
                  }}
                >
                  {item?.label[langIndex]}:
                </span>
                <span
                  className={classes.feature}
                  style={{
                    color: darkMode ? "#fff" : "#6B7B88",
                    textAlign: "left",
                    minWidth: 50,
                  }}
                >
                  {data?.[item?.key]}
                </span>
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ConstructionDetailsList;
