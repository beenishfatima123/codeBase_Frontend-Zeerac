import React from "react";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import "./auctionStyles.css";
import { useSelector } from "react-redux";
import {
  CURRENCY_ENUM,
  AUCTION_UNIT_FILTERS,
  HEADER_CONTENT_WIDTH,
} from "../../utils/constants";
import { Button } from "@mui/material";
//import Autocomplete from "react-google-autocomplete";
import { createAuctionFilterQuery } from "../../utils/helperFunctions";
import { TextTranslation } from "../../utils/translation";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px auto",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    border: "1px solid #707070",
    padding: 10,
    borderRadius: "10px",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    flexWrap: "wrap",
  },
  heading: {
    fontSize: 14,
    color: "#9DAFBD",
  },
  budgetContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #c9c9c9",
    margin: "10px 0px",
    flex: 1,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0px 10px",
  },
  btnContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
  "@media (max-width: 1100px)": {
    content: {
      flexDirection: "column",
    },
  },
  "@media (max-width: 490px)": {
    budgetContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

/* Extended filters are diplayed above AuctionSeparator on auctions page
it has these options "Budget", "Size" and "Location". */
const ExtendedFilters = ({ selectedFilter }) => {
  const classes = useStyles();
  const { search } = useLocation();
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const [values, setValues] = useState({});
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let _values = {};
    for (const entry of searchParams?.entries()) {
      const [prop, value] = entry;
      _values = { ..._values, [prop]: value };
    }

    setValues(_values);
  }, [searchParams]);
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };
  const handleApplyFilters = () => {
    setSearchParams(`${search}${createAuctionFilterQuery(values)}`);
  };

  return (
    <div
      className={classes.container}
      style={{ border: darkMode ? "1px solid #fff" : "1px solid #707070" }}
    >
      <div className={classes.content}>
        <div className={classes.itemContainer}>
          <span
            className={classes.heading}
            style={{ color: darkMode ? "#fff" : "#9DAFBD" }}
          >
            {TextTranslation.yourBudget[langIndex]}
          </span>
          <div className={classes.budgetContainer}>
            <input
              type="number"
              className="filter-input"
              placeholder={TextTranslation.minBudget[langIndex]}
              style={{ color: darkMode ? "#fff" : "#134696" }}
              value={values?.price_min || ""}
              onChange={handleChange("price_min")}
              onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <span>-</span>
            <input
              type="number"
              className="filter-input"
              placeholder={TextTranslation.maxBudget[langIndex]}
              value={values?.price_max || ""}
              onChange={handleChange("price_max")}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              style={{ color: darkMode ? "#fff" : "#134696" }}
            />
            <select
              className="custom-select"
              value={values?.currency || ""}
              onChange={handleChange("currency")}
            >
              <option value={""} disabled>
                {TextTranslation.currency[langIndex]}
              </option>
              {CURRENCY_ENUM?.map((elem, index) => (
                <option value={elem?.value} key={index}>
                  {elem?.label[langIndex]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={classes.itemContainer}>
          <span
            className={classes.heading}
            style={{ color: darkMode ? "#fff" : "#9DAFBD" }}
          >
            {TextTranslation.yourSize[langIndex]}
          </span>
          <div className={classes.budgetContainer}>
            {/* <input
              type="number"
              className="filter-input"
              placeholder={"Size"}
              value={values?.size || ""}
              onChange={handleChange("size")}
              style={{
                maxWidth: 100,
                marginRight: 20,
                color: darkMode ? "#fff" : "#134696",
              }}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            /> */}
            <input
              type="number"
              className="filter-input"
              placeholder={TextTranslation.minSize[langIndex]}
              style={{ color: darkMode ? "#fff" : "#134696" }}
              value={values?.size_min || ""}
              maxLength="6"
              onChange={handleChange("size_min")}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />

            <span>-</span>
            <input
              type="number"
              className="filter-input"
              placeholder={TextTranslation.maxSize[langIndex]}
              style={{ color: darkMode ? "#fff" : "#134696" }}
              value={values?.size_max || ""}
              maxLength="6"
              onChange={handleChange("size_max")}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <select
              className="custom-select"
              value={values?.unit || ""}
              onChange={handleChange("unit")}
            >
              <option value={""} disabled>
                {TextTranslation.unit[langIndex]}
              </option>
              {AUCTION_UNIT_FILTERS?.map((elem, index) => (
                <option value={elem?.value} key={index}>
                  {elem?.label[langIndex]}
                </option>
              ))}
            </select>
          </div>
          {values?.minSize?.length > 6 && (
            <span
              style={{
                color: "red",
                fontSize: 12,
                fontFamily: "light",
              }}
            >
              min size must be between 0 - 100000
            </span>
          )}
          {values?.maxSize?.length > 6 && (
            <span
              style={{
                color: "red",
                fontSize: 12,
                fontFamily: "light",
              }}
            >
              max size must be between 0 - 100000
            </span>
          )}
        </div>
        <div className={classes.itemContainer}>
          <span
            className={classes.heading}
            style={{ color: darkMode ? "#fff" : "#9DAFBD" }}
          >
            {TextTranslation.yourLocation[langIndex]}
          </span>
          <div className={classes.budgetContainer}>
            {/* <Autocomplete
              id="autocomplete"
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
              className={"filter-input"}
              options={{
                types: ["address"],
                fields: ["name"],
              }}
              onPlaceSelected={(event) =>
                handleChange("location")({ target: { value: event?.name } })
              }
              placeholder={TextTranslation.area[langIndex]}
              style={{ flex: 1 }}
            /> */}
            <input
              type="text"
              className="filter-input"
              placeholder={TextTranslation.area[langIndex]}
              style={{ color: darkMode ? "#fff" : "#134696" }}
              value={values?.area || ""}
              onChange={handleChange("area")}
            />
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#134696",
            color: "white",
            borderRadius: 40,
            width: 125,
          }}
          onClick={handleApplyFilters}
        >
          {TextTranslation.apply[langIndex]}
        </Button>
      </div>
    </div>
  );
};

export default ExtendedFilters;
