import React from "react";
import { makeStyles } from "@mui/styles";

import CardImageDetails from "./CardImageDetails";
import { INITIAL_PROPERTY_ACTIONS } from "../../../../utils/constants";
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../../../utils/helperFunctions";
import "./customSlider.css";
import IconsContainer from "../../../propertyComponents/misc/IconsContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultPost from "../../../../assets/defaultAssets/defaultPost.png";
import { TextTranslation } from "../../../../utils/translation";
import OriginalPriceInfo from "../../../globalComponents/OriginalPriceInfo";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 300,
    // margin: "0px 10px",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    minHeight: 130,
  },
  text: {
    color: "#1A2954",
    fontSize: 18,
    margin: 0,
  },
  currencyText: {
    color: "#134696",
    fontSize: 27,
    margin: 0,
    borderBottom: "1px solid #707070",
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // "@media (max-width: 1024px)": {
  //   iconsStyle: {
  //     flexDirection: "row",
  //   },
  // },
}));
const PropertySliderCard = ({ property, comparison, additionStyles }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { darkMode, langIndex } = useSelector((state) => state.global);

  const [propertyActions, setPropertyActions] = useState(
    INITIAL_PROPERTY_ACTIONS
  );
  // eslint-disable-next-line
  const getBackgroundImage = () => {
    let background = "";
    if (property?.image?.length)
      background = `linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1)),url(${property?.image[0]?.image})`;
    else if (property?.floor_image?.length)
      background = `linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1)),url(${property?.floor_image[0]?.floor_image})`;
    else
      background = `linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1)),url(${defaultPost})`;
    // // console.log({ background });
    return background;
  };

  return (
    <div
      className={classes.container}
      style={{
        ...additionStyles,
      }}
    >
      <div
        onClick={() =>
          comparison
            ? comparison(property)
            : navigate(`/listing/${property?.id}`, { replace: true })
        }
        className="background-image"
        style={{
          backgroundImage: getBackgroundImage(),
          width: 300,
          height: 200,
          cursor: "pointer",
        }}
      >
        <CardImageDetails property={property} />
      </div>
      <div
        className={classes.bottomContainer}
        style={{
          width: 300,
          alignSelf: "center",
        }}
      >
        <div className={classes.contentContainer}>
          <p
            className={classes.text}
            style={{
              color: darkMode ? "#fff" : "#134696",
              fontFamily: "heavy",
              textTransform: "capitalize",
            }}
          >
            {`${property?.size} ${
              property?.unit === "Square Feet" ? "Sq ft" : property?.unit
            }, For ${property?.purpose}`}
          </p>
          <p
            className={classes.text}
            style={{
              color: darkMode ? "#fff" : "#134696",
            }}
          >
            {property?.area === "undefined"
              ? property?.city
              : `${property?.area},
              ${property?.city}`}
            {/* {`${property?.area}, ${property?.city}`} */}
          </p>
          <p
            className={classes.currencyText}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
              fontFamily: "heavy",
              display: "flex",
            }}
          >
            {getConcatenatedPrice(
              `${currencyFormatInitials(property?.price, property?.currency)}`,
              14
            )}

            <span style={{ marginLeft: 5 }}>
              <OriginalPriceInfo
                price={property?.price}
                currency={property?.currency}
              />
            </span>
          </p>
          <p
            className={classes.text}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
              fontSize: 14,
            }}
          >
            {TextTranslation.listedBy[langIndex]}:{" "}
            <span
              style={{ fontFamily: "heavy", fontSize: 18, cursor: "pointer" }}
              onClick={() => navigate(`/agents/${property?.user?.id}`)}
            >
              {`${property?.user?.full_name || "Anonymous"}`}{" "}
            </span>
          </p>
        </div>
        <IconsContainer
          customStyle={classes.iconsStyle}
          phoneNumber={property?.user?.phone_number}
          setPropertyActions={setPropertyActions}
          propertyActions={propertyActions}
          customColor={darkMode ? "#fff" : "#134696"}
          property={property}
        />
      </div>
    </div>
  );
};

export default PropertySliderCard;
