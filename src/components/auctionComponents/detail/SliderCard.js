import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import defaultPost from "../../../assets/defaultAssets/defaultPost.png";
import CustomTooltip from "../../globalComponents/CustomTooltip";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 5%",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: 10,
    backgroundColor: "white",
  },
  backgroundContainer: {
    //height: 280,
    width: "100%",
    backgroundColor: "#DBDBDB",
    alignSelf: "center",
    objectFit: "fill",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userContainer: {
    display: "flex",
    width: "95%",
    marginBottom: 10,
  },
  priceTitle: {
    margin: 0,
    fontSize: 14,
    color: "#1A2954",
  },
  title: {
    fontSize: 14,
    color: "#7D7D7D",
    fontFamily: "light",
    margin: "5px 0px",
  },
  price: {
    margin: 0,
    fontSize: 26,
    color: "#134696",
    fontFamily: "heavy",
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: "10px 0px",
  },
  valueContainer: {
    display: "flex",
    margin: "5px 0px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 18,
    color: "#1A2954",
    marginTop: 0,
    fontFamily: "medium",
    height: 25,
    overflow: "hidden",
    textTransform: "capitalize",
  },
  city: {
    fontSize: 18,
    color: "#1A2954",
    marginTop: 0,
    fontFamily: "medium",
    height: 45,
    overflow: "hidden",
  },
  auctionEnd: {
    fontSize: 18,
    color: "#D0021B ",
    marginTop: 0,
    fontFamily: "medium",
  },
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 10px",
    width: 200,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
  "@media (max-width: 950px)": {
    price: {
      fontSize: 20,
    },
  },
}));
const buttonSx = {
  backgroundColor: "#FFFFFF",
  color: "#1A2954",
  borderRadius: "50px",
  height: 25,
  width: 80,
  fontSize: 12,
  fontFamily: "medium",
  textTransform: "capitalize",
  border: "1px solid #707070",
  alignSelf: "flex-end",
  p: 0,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
};

const SliderCard = ({
  currency,
  price,
  detailButtonClick,
  quickButtonClick,
  endDate,
  city,
  // country,
  area,
  size,
  listingBy,
  photo,
}) => {
  const classes = useStyles();

  const getBackgroundImage = (photo) => {
    if (photo)
      return `linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,1)),url(${photo})`;
    else
      return `linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,1)),url(${defaultPost})`;
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.backgroundContainer}
        style={{
          backgroundImage: getBackgroundImage(photo),
          height: 120,
          borderBottom: "1px solid #0ED864",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingBottom: 5,
          }}
        >
          <div
            style={{
              marginLeft: 10,
              width: "70%",
            }}
          >
            <p className={classes.priceTitle}>Price</p>
            <div className={classes.price}>
              {currency} {price}
            </div>
          </div>
          <Button sx={buttonSx} onClick={detailButtonClick}>
            Detail
          </Button>
        </div>
      </div>
      <div className={classes.bottomContainer}>
        <div className={classes.valueContainer}>
          <div className={classes.verticalContainer}>
            <p className={classes.title}>Auction End</p>
            <span className={classes.auctionEnd}>{endDate}</span>
          </div>
          <div className={classes.verticalContainer}>
            <p className={classes.title}>Society/Location</p>
            <CustomTooltip title={city || ""}>
              <div className={classes.city}>
                {city}
                {/* {country} */}
              </div>
            </CustomTooltip>
          </div>
        </div>
        <div className={classes.valueContainer}>
          <div className={classes.verticalContainer}>
            <p className={classes.title}>Area Size</p>
            <span className={classes.auctionEnd}>
              {area} {size}
            </span>
          </div>
          <div className={classes.verticalContainer}>
            <p className={classes.title}>Listing By:</p>
            <CustomTooltip title={listingBy || ""}>
              <div className={classes.value}>{listingBy}</div>
            </CustomTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
