import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import "./filterStyles.css";
import {
  getAllGlobalProperties,
  getAllRegionalProperties,
} from "../../../../redux/slices/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { TextTranslation } from "../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: "#9DAFBD",
    fontSize: 14,
    margin: 0,
  },
  budgetContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #c9c9c9",
    margin: "10px 0px",
    // marginBottom: 10,
    // marginTop: 20,
    // backgroundColor: "red",
  },
}));
const Budget = ({ values, handleChange, regional }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentLocation } = useSelector((state) => state.auth);
  const { selectedRegion, langIndex } = useSelector((state) => state.global);

  const listingsCountry = useMemo(() => {
    if (selectedRegion) return `${selectedRegion?.country}`?.toLowerCase();
    else return `${currentLocation?.country}`?.toLowerCase();
  }, [selectedRegion, currentLocation]);

  return (
    <div className={classes.container}>
      <p className={classes.text}>Your budget</p>
      <div className={classes.budgetContainer}>
        <input
          type="text"
          className="filter-input"
          placeholder={"10,000 "}
          style={{ maxWidth: 75 }}
          value={values?.minBudged || "10,000"}
          onChange={handleChange("minBudged")}
        />
        <span>-</span>
        <input
          type="text"
          className="filter-input"
          placeholder={"1,00,000 "}
          value={values?.maxBudged || "1,00,000"}
          onChange={handleChange("maxBudged")}
        />
      </div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#134696",
          color: "white",
          borderRadius: 40,
          width: 125,
        }}
        onClick={() => {
          regional
            ? dispatch(
                getAllRegionalProperties({
                  country: listingsCountry,
                  queryData: `price_min=${parseFloat(
                    values?.minBudged
                  )}&price_max=${parseFloat(values?.maxBudged)}`,
                })
              )
            : dispatch(
                getAllGlobalProperties({
                  queryData: `price_min=${parseFloat(
                    values?.minBudged
                  )}&price_max=${parseFloat(values?.maxBudged)}`,
                  country: listingsCountry,
                })
              );
        }}
      >
        {TextTranslation.apply[langIndex]}
      </Button>
    </div>
  );
};

export default Budget;
