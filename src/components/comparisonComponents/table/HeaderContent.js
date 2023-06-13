import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
// eslint-disable-next-line
import { currencyFormatInitials } from "../../../utils/helperFunctions";
import { useWindowDims } from "../../../utils/useWindowDims";
import defaultImage from "../../../assets/home/footer/post_1.png";
import { useSelector } from "react-redux";
import CustomTooltip from "../../globalComponents/CustomTooltip";
import OriginalPriceInfo from "../../globalComponents/OriginalPriceInfo";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "0px 10px",
  },
  title: {
    color: "#1A2954",
    fontSize: 23,
    fontFamily: "heavy",
    height: 30,
    overflow: "hidden",
  },
  location: {
    color: "#1A2954",
    fontSize: 23,
    height: 55,
    overflow: "hidden",
  },
  price: {
    color: "#134696",
    fontSize: 27,
    fontFamily: "heavy",
  },
  image: {
    alignSelf: "center",
  },
  "@media (max-width: 720px)": {
    price: {
      fontSize: 18,
    },
    location: {
      fontSize: 16,
    },
    title: {
      fontSize: 17,
    },
  },
  "@media (max-width: 480px)": {
    price: {
      fontSize: 14,
    },
    title: {
      fontSize: 13,
    },
    location: {
      fontSize: 12,
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

const HeaderContent = ({ property, remove }) => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { darkMode } = useSelector((state) => state.global);
  // eslint-disable-next-line
  const getImage = useMemo(() => {
    if (property?.image?.length) return `${property?.image[0]?.image}`;
    else if (property?.floor_image?.length)
      return `${property?.floor_image[0]?.floor_image}`;
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
          height: width > 800 ? 250 : width * 0.25 || 250,
          width: width > 800 ? 250 : width * 0.25 || 250,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: width > 800 ? 250 : width * 0.25 || 250,
          alignSelf: "center",
          marginTop: 10,
          paddingBottom: 10,
        }}
      >
        <CustomTooltip title={property?.title}>
          <div
            className={classes.title}
            style={{
              color: darkMode ? "#fff" : "#1A2954",
            }}
          >
            {`${property?.title}`}
          </div>
        </CustomTooltip>
        <CustomTooltip
          title={`${property?.street}, ${property?.area}, ${property?.city}`}
        >
          <div
            className={classes.location}
            style={{
              color: darkMode ? "#fff" : "#1A2954",
            }}
          >
            {`${property?.street}, ${property?.area}, ${property?.city}`}
          </div>
        </CustomTooltip>
        <span
          className={classes.price}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
            display: "flex",
          }}
        >
          {` ${currencyFormatInitials(property?.price, property?.currency)}`}
          <span style={{ marginLeft: 5 }}>
            <OriginalPriceInfo
              price={property?.price}
              currency={property?.currency}
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default HeaderContent;
