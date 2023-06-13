import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useWindowDims } from "../../../utils/useWindowDims";
// eslint-disable-next-line
import { currencyFormatInitials } from "../../../utils/helperFunctions";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  tabsContainer: {
    borderRadius: 5,
    margin: "0px 10px",
  },
  tab: {
    color: "#707070",
    fontSize: 22,
    margin: "20px 0px",
  },
  "@media (max-width: 720px)": {
    tab: {
      fontSize: 18,
    },
  },
  "@media (max-width: 480px)": {
    tab: {
      fontSize: 14,
    },
  },
}));

const TableContent = ({ property, sizeConversion }) => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { darkMode } = useSelector((state) => state.global);

  const tabColor = useMemo(() => {
    return { color: darkMode ? "#fff" : "#707070" };
  }, [darkMode]);

  const Conversion = (value, unit) => {
    if (unit === "Marla") {
      if (sizeConversion === "Marla") {
        return value;
      } else if (sizeConversion === "Kanal") {
        return value / 20;
      } else {
        return value * 272.3;
      }
    } else if (unit === "Kanal") {
      if (sizeConversion === "Kanal") {
        return value;
      } else if (sizeConversion === "Marla") {
        return value * 20;
      } else {
        return value * 5445;
      }
    } else {
      if (sizeConversion === "Square Feet") {
        return value;
      } else if (sizeConversion === "Marla") {
        return value / 272.3;
      } else {
        return value / 5445;
      }
    }
  };

  return (
    <div className={classes.tabsContainer}>
      <p
        className={classes.tab}
        style={{
          width: width > 800 ? 250 : width * 0.25 || 250,
          ...tabColor,
        }}
      >
        {property?.city}
      </p>
      <p className={classes.tab} style={tabColor}>
        {`${
          sizeConversion
            ? parseFloat(Conversion(property?.size, property?.unit)).toFixed(2)
            : property?.size
        } ${
          sizeConversion ? sizeConversion : property?.unit
          // : property?.unit === "Square Feet"
          // ? "Sq ft"
          // : property?.unit
        }`}
      </p>
      <p className={classes.tab} style={tabColor}>
        {currencyFormatInitials(property?.price, property?.currency)}
      </p>
      <p className={classes.tab} style={tabColor}>
        {property?.area}
      </p>
      <p className={classes.tab} style={tabColor}>
        {property?.street}
      </p>
      <p className={classes.tab} style={tabColor}>
        {property?.type}
      </p>
      <p className={classes.tab} style={tabColor}>
        {property?.bedrooms}
      </p>
      <p className={classes.tab} style={tabColor}>
        {property?.bathrooms}
      </p>
      <p className={classes.tab} style={tabColor}>
        {property?.construction_details?.property_condition === null
          ? "NA"
          : property?.construction_details?.property_condition}
      </p>
      <p className={classes.tab} style={tabColor}>
        {property?.purpose}
      </p>
      <p className={classes.tab} style={tabColor}>
        {property?.year_built}
      </p>
    </div>
  );
};

export default TableContent;
