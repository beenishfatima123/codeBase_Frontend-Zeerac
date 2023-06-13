import React from "react";
import { makeStyles } from "@mui/styles";
// eslint-disable-next-line
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../../../utils/helperFunctions";
import { useSelector } from "react-redux";
import CustomTooltip from "../../../globalComponents/CustomTooltip";
import { TextTranslation } from "../../../../utils/translation";
import OriginalPriceInfo from "../../../globalComponents/OriginalPriceInfo";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    cursor: "pointer",
    padding: "0px 20px",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 240,
    marginBottom: 10,
  },
  iconsContainer: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
    flex: 1,
    flexWrap: "wrap",
  },
  iconsInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#1A2954",
    margin: "0 10px",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  location: {
    color: "#1A2954",
    fontSize: 16,
    margin: 0,
  },
  description: {
    color: "#1A2954",
    fontSize: 22,
    margin: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "rgb(201 201 201)",
    width: "100%",
    margin: "10px 0px",
  },
  listedBy: {
    color: "#7D7D7D",
    fontSize: 14,
    // fontWeight: 'lighter',
    fontFamily: "light",
    margin: 0,
  },
  price: {
    color: "#134696",
    fontSize: 20,
    fontFamily: "heavy",
    margin: 0,
    textTransform: "uppercase",
  },
  userDetails: {
    color: "#1A2954",
    fontSize: 18,
    fontWeight: "normal",
    margin: 0,
  },
  "@media (max-width: 600px)": {
    priceContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  "@media (max-width: 1024px)": {
    container: {
      width: "100%",
      marginBottom: 10,
      padding: 0,
    },
  },
}));
const CardMiddle = ({ property, onClick }) => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.topContainer}>
        <div className={classes.iconsContainer}>
          <div className={classes.iconsInner}>
            <FullscreenIcon sx={{ fontSize: 20 }} />
            <span className={classes.value}>
              {`${property?.size} ${
                property?.unit === "Square Feet" ? "Sq ft" : property?.unit
              }`}
            </span>
          </div>
          <div className={classes.iconsInner}>
            <BedIcon sx={{ fontSize: 20 }} />
            <span className={classes.value}>{property?.bedrooms}</span>
          </div>
          <div className={classes.iconsInner}>
            <BathtubIcon sx={{ fontSize: 20 }} />
            <span className={classes.value}>{property?.bathrooms}</span>
          </div>
        </div>
      </div>
      <p
        className={classes.location}
        style={{
          color: darkMode ? "#0ed864" : "#1A2954",
        }}
      >
        {`${property?.street}, ${property?.area}, ${property?.city}`}
      </p>
      <div className={classes.priceContainer}>
        <p
          className={classes.description}
          style={{
            color: darkMode ? "white" : "#1A2954",
            fontFamily: "heavy",
            textTransform: "capitalize",
          }}
        >
          {`${property?.title}`}
        </p>
      </div>
      <div style={{ marginTop: 2 }}>
        <CustomTooltip
          title={`${currencyFormatInitials(
            property?.price,
            property?.currency
          )}`}
        >
          <p
            className={classes.price}
            style={{
              color: darkMode ? "#0ed864" : "#1A2954",
              display: "flex",
            }}
          >
            {getConcatenatedPrice(
              currencyFormatInitials(property?.price, property?.currency),
              14
            )}
            <span style={{ marginLeft: 5 }}>
              <OriginalPriceInfo
                placement={"top"}
                price={property?.price}
                currency={property?.currency}
              />
            </span>
          </p>
        </CustomTooltip>
      </div>
      <div className={classes.divider}></div>
      <p
        className={classes.listedBy}
        style={{
          color: darkMode ? "#0ed864" : "#1A2954",
        }}
      >
        {TextTranslation.listedBy[langIndex]}:{" "}
        <span
          className={classes.userDetails}
          style={{
            color: darkMode ? "white" : "#1A2954",
            fontFamily: "heavy",
          }}
        >
          {`${property?.user?.full_name || "Anonymous"}`}
        </span>
      </p>
    </div>
  );
};

export default CardMiddle;
