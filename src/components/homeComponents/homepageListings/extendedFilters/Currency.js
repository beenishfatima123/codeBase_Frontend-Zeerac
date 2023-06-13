import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import "./filterStyles.css";
import { CURRENCY_ENUM } from "../../../../utils/constants";
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
  },
}));

const Currency = ({ regional }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState("");

  const { currentLocation } = useSelector((state) => state.auth);
  const { selectedRegion, langIndex } = useSelector((state) => state.global);

  const listingsCountry = useMemo(() => {
    if (selectedRegion) return `${selectedRegion?.country}`?.toLowerCase();
    else return `${currentLocation?.country}`?.toLowerCase();
  }, [selectedRegion, currentLocation]);

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className={classes.container}>
      <p className={classes.text}>Currency</p>
      <div className={classes.budgetContainer}>
        <select
          className="custom-select"
          value={currency}
          onChange={handleCurrency}
        >
          {CURRENCY_ENUM?.map((elem, index) => (
            <option value={elem?.value} key={index}>
              {elem?.label}
            </option>
          ))}
        </select>
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
                  queryData: `currency=${currency}`,
                  country: listingsCountry,
                })
              )
            : dispatch(
                getAllGlobalProperties({
                  queryData: `currency=${currency}`,
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

export default Currency;
