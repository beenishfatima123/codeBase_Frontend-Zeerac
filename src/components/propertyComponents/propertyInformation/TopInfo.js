import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
// eslint-disable-next-line
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../../utils/helperFunctions";
//import IconsContainer from "../misc/IconsContainer";
import {
  HEADER_CONTENT_WIDTH,
  INITIAL_PROPERTY_ACTIONS,
} from "../../../utils/constants";
import { useSelector } from "react-redux";
import SingleLine from "./svg/SingleLine";
import { Button } from "@mui/material";
import ListingReport from "./ListingReport";
import { toast } from "react-toastify";
import CustomTooltip from "../../globalComponents/CustomTooltip";
import ButtonsIconContainer from "../misc/ButtonsIconContainer";
import OriginalPriceInfo from "../../globalComponents/OriginalPriceInfo";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const buttonSx = {
  border: "1px solid lightgrey",
  borderRadius: 20,
  width: "200px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "none",
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "20px 5%",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 240,
    marginBottom: 10,
  },
  iconsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.5,
    flexWrap: "wrap",
  },
  iconsInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 20,
    fontFamily: "medium",
    color: "#1A2954",
    marginLeft: 10,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  location: {
    color: "#6B7B88",
    fontSize: 32,
    marginTop: 10,
    marginBottom: 0,
  },
  description: {
    color: "#1A2954",
    fontSize: 42,
    //fontFamily: 'heavy',
    fontFamily: "light",
    margin: 0,
    textTransform: "capitalize",
  },

  price: {
    color: "#134696",
    fontSize: 32,
    //fontFamily: 'heavy',
    fontFamily: "light",
    margin: 0,
  },
  propertyDetails: {
    color: "#6B7B88",
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 20,
    marginBottom: 0,
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsIconStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  reportContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  "@media (max-width: 600px)": {
    priceContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    price: {
      fontSize: 32,
    },
    description: {
      fontSize: 32,
    },
  },
  "@media (max-width: 650px)": {
    topContainer: {
      flexDirection: "column",
    },
    reportContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    location: {
      fontSize: 24,
      marginBottom: 10,
    },
  },
  "@media (max-width: 1200px)": {
    iconsContainer: {
      flex: 1,
    },
  },
}));
const TopInfo = ({ property }) => {
  const classes = useStyles();

  const { darkMode } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const [propertyActions, setPropertyActions] = useState(
    INITIAL_PROPERTY_ACTIONS
  );
  return (
    <div className={classes.container}>
      <div style={{ position: "absolute", left: -90, marginRight: 10 }}>
        <SingleLine />
      </div>
      <div className={classes.topContainer}>
        <div className={classes.iconsContainer}>
          <div className={classes.iconsInner}>
            <FullscreenIcon
              sx={{ fontSize: 40, color: darkMode ? "white" : "#000" }}
            />
            <span
              className={classes.value}
              style={{
                color: darkMode ? "white" : "#134696",
              }}
            >
              {`${property?.size} ${
                property?.unit === "Square Feet" ? "Sq ft" : property?.unit
              }`}
            </span>
          </div>
          <div className={classes.iconsInner}>
            <BedIcon
              sx={{ fontSize: 40, color: darkMode ? "white" : "#000" }}
            />
            <span
              className={classes.value}
              style={{
                color: darkMode ? "white" : "#134696",
              }}
            >
              {property?.bedrooms}
            </span>
          </div>
          <div className={classes.iconsInner}>
            <BathtubIcon
              sx={{ fontSize: 40, color: darkMode ? "white" : "#000" }}
            />
            <span
              className={classes.value}
              style={{
                color: darkMode ? "white" : "#134696",
              }}
            >
              {property?.bathrooms}
            </span>
          </div>
        </div>

        <ButtonsIconContainer
          customStyle={classes.buttonsIconStyle}
          phoneNumber={property?.user?.phone_number}
          setPropertyActions={setPropertyActions}
          propertyActions={propertyActions}
          customColor={darkMode ? "#fff" : "#000"}
          customSize={20}
          property={property}
        />
      </div>
      <div className={classes.reportContainer}>
        <p
          className={classes.location}
          style={{
            color: darkMode ? "white" : "#6B7B88",
          }}
        >
          {`${property?.address}`}
        </p>
        <div>
          <Button
            sx={{
              ...buttonSx,
              color: darkMode ? "#0ed864" : "#134696",
              borderRadius: 3,
            }}
            onClick={() => {
              if (currentUser) {
                setOpen(true);
              } else {
                toast.warning("Please login first to report the listing", {
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: true,
                });
              }
            }}
          >
            Looks fake? Report it.
          </Button>
          {open && (
            <ListingReport open={open} setOpen={setOpen} property={property} />
          )}
        </div>
      </div>
      <div className={classes.priceContainer}>
        <p
          className={classes.description}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
            fontFamily: "heavy",
          }}
        >
          {`${property?.title}`}
        </p>
        <CustomTooltip
          title={`${currencyFormatInitials(
            property?.price,
            property?.currency
          )}`}
        >
          <p
            className={classes.price}
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
                placement={"top"}
                price={property?.price}
                currency={property?.currency}
              />
            </span>
          </p>
        </CustomTooltip>
      </div>

      <span
        className={classes.propertyDetails}
        style={{
          color: darkMode ? "white" : "#6B7B88",
        }}
      >
        {`${property?.description}`}
      </span>
    </div>
  );
};

export default TopInfo;
