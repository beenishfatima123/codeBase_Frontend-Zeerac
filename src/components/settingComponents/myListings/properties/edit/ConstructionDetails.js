import React from "react";
import { makeStyles } from "@mui/styles";
import {
  setPropertyToEdit,
  setPropertyUpdateInfo,
} from "../../../../../redux/slices/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { CONSTRUCTION_DETAILS } from "../../../../../utils/constants";
import {
  getConstructionHeading,
  getPastYears,
} from "../../../../../utils/helperFunctions";
import EditSelect from "./EditSelect";
import { TextTranslation } from "../../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 14,
    color: "#134696",
    fontFamily: "heavy",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

/* ConstructionDetails displays card ofor editing the construction properties. It also renders Edit Select using map for mapping details. */
const ConstructionDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { propertyToEdit, propertyUpdateInfo } = useSelector(
    (state) => state.properties
  );
  const { darkMode, langIndex } = useSelector((state) => state.global);

  /* on each changed value, prop and event are passed to handleChange and it updates properties. */
  const handleChange = (prop) => (event) => {
    // console.log({ propertyToEdit, prop });
    dispatch(
      setPropertyToEdit({
        ...propertyToEdit,
        construction_details: {
          ...propertyToEdit?.construction_details,
          [prop]: event.target.value,
        },
      })
    );
    dispatch(
      setPropertyUpdateInfo({
        ...propertyUpdateInfo,
        construction_details: {
          ...propertyUpdateInfo?.construction_details,
          [prop]: event.target.value,
        },
      })
    );
  };
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {TextTranslation.constructionDetails[langIndex]}
      </span>

      <Grid container sx={{ mt: 2 }} columnSpacing={2}>
        {CONSTRUCTION_DETAILS?.map((elem, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={5.5}
            lg={3.5}
            key={index}
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "10px",
              m: 1,
              width: 211,
              padding: "8px 0px",
            }}
          >
            <span
              className={classes.heading}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              {getConstructionHeading(index)[langIndex]}
            </span>
            <div style={{ marginBottom: 10 }}>
              {elem?.map((item, index) => (
                <EditSelect
                  key={index}
                  label={item?.label[langIndex]}
                  onChange={handleChange(item?.key)}
                  value={
                    propertyToEdit?.construction_details?.[item?.key] || "None"
                  }
                  options={
                    item?.key !== "year_built"
                      ? item?.options
                      : getPastYears(100)
                  }
                />
              ))}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ConstructionDetails;
