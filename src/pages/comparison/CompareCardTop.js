import React from "react";
import { makeStyles } from "@mui/styles";
import { useMemo } from "react";
import defaultImage from "../../assets/home/footer/post_1.png";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { currencyFormatInitials } from "../../utils/helperFunctions";
import { useWindowDims } from "../../utils/useWindowDims";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #707070",
    borderRadius: 5,
    position: "relative",
    margin: "0 5px",
  },
  image: {
    alignSelf: "center",
    padding: "20px 20px 0 20px",
  },
  title: {
    color: "#1A2954",
    fontSize: 23,
    fontFamily: "heavy",
  },
  location: {
    color: "#1A2954",
    fontSize: 23,
  },

  price: {
    color: "#134696",
    fontSize: 27,
    fontFamily: "heavy",
  },
  tabsContainer: {
    borderTop: "1px solid #707070",
  },
  tab: {
    color: "#707070",
    fontSize: 22,
    margin: "20px 20px",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const crossButton = {
  position: "absolute",
  top: -7,
  right: -7,
  p: 0,
  zIndex: 10,
  backgroundColor: "#fff",
};

const CompareCardTop = ({ property, remove }) => {
  const classes = useStyles();
  const { width } = useWindowDims();

  const getImage = useMemo(() => {
    if (property?.image?.length) return ` ${property?.image[0]?.image}`;
    else if (property?.floor_image?.length)
      return ` ${property?.floor_image[0]?.floor_image}`;
    else return defaultImage;
  }, [property]);

  return (
    <div className={classes.container}>
      <IconButton
        sx={crossButton}
        component="label"
        onClick={() => remove(property)}
      >
        <CancelIcon style={{ color: "#014493", fontSize: 18 }} />
      </IconButton>

      <img
        src={getImage}
        alt=""
        className={classes.image}
        style={{
          height: width > 680 ? 250 : width * 0.4 || 250,
          width: width > 680 ? 250 : width * 0.4 || 250,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: width > 680 ? 250 : width * 0.4 || 250,
          alignSelf: "center",
          marginTop: 10,
          paddingBottom: 10,
        }}
      >
        <span className={classes.title}>{`${property?.title}`}</span>
        <span className={classes.location}>
          {`${property?.street}, ${property?.area}, ${property?.city}`}
        </span>
        <span className={classes.price}>
          {` ${currencyFormatInitials(property?.price, property?.currency)}`}
        </span>
      </div>

      <div className={classes.tabsContainer}>
        <p className={classes.tab}>{property?.city}</p>
        <p className={classes.tab}>{`${property?.size} ${property?.unit}`}</p>
        <p className={classes.tab}>
          {currencyFormatInitials(property?.price, property?.currency)}{" "}
        </p>
        <p className={classes.tab}>{property?.area}</p>
        <p className={classes.tab}>{property?.street}</p>
        <p className={classes.tab}>{property?.type}</p>
        <p className={classes.tab}>{property?.bedrooms}</p>
        <p className={classes.tab}>{property?.bathrooms}</p>
        <p className={classes.tab}>
          {property?.construction_details?.property_condition === null
            ? "NA"
            : property?.construction_details?.property_condition}
        </p>
        <p className={classes.tab}>{property?.purpose}</p>
        <p className={classes.tab}>{property?.year_built}</p>
      </div>
    </div>
  );
};

export default CompareCardTop;
