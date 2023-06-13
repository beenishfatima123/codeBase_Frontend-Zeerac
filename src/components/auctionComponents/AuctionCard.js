import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Button } from "@mui/material";
import moment from "moment/moment";
import defaultPost from "../../assets/defaultAssets/defaultPost.png";
import { useWindowDims } from "../../utils/useWindowDims";
import GlobalLoader from "../globalComponents/GlobalLoader";
import SubunitCardDetails from "./SubunitCardDetails";
import CustomTooltip from "../globalComponents/CustomTooltip";
import { useNavigate } from "react-router-dom";
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../utils/helperFunctions";
const BidModal = lazy(() => import("./BidModal"));
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
  backgroundColor: '#FFFFFF',
  color: '#1A2954',
  borderRadius: '50px',
  height: 30,
  width: 120,
  fontSize: 14,
  fontFamily: 'medium',
  textTransform: 'capitalize',
  border: '1px solid #707070',
  alignSelf: 'flex-end',
  p: 0,
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
};

/* AuctionCard is the individual container for auctions, it is displayed in form of grid. It changes views and details based on the type of trading detected. */
const AuctionCard = ({ auction }) => {
  const classes = useStyles();
  const containerRef = useRef();
  const navigate = useNavigate();

  const { width } = useWindowDims();

  const [parentWidth, setParentWidth] = useState();
  const [openBids, setOpenBids] = useState(false);

  const getBackgroundImage = () => {
    if (auction?.photos?.length)
      return `linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,1)),url(${auction?.photos[0]?.file_photo})`;
    else
      return `linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,1)),url(${defaultPost})`;
  };

  const getDifferenceFromNow = () => {
    const current_date = moment();
    const end_date = moment(auction?.end_date);
    const yearDif = end_date.diff(current_date, "years");
    const monthDif = end_date.diff(current_date, "months") % 12;
    const dayDiff = end_date.diff(current_date, "days") % 30;

    let diff = "";

    if (yearDif) diff = diff + yearDif + " years,";
    if (monthDif) diff = diff + monthDif + " months and,";

    diff = diff + dayDiff + " days";

    return diff;
  };

  useEffect(() => {
    if (containerRef)
      setParentWidth(containerRef.current.parentElement.offsetWidth);
  }, [containerRef, width]);

  return (
    <div className={classes.container}>
      <Suspense fallback={<GlobalLoader />}>
        {openBids && (
          <BidModal
            isOpen={openBids}
            setOpen={setOpenBids}
            type={auction?.auction_type}
            auction={auction}
          />
        )}
      </Suspense>

      <div
        className={classes.backgroundContainer}
        style={{
          backgroundImage:
            auction?.auction_type === "bulk" ? "none" : getBackgroundImage(),
          backgroundColor:
            auction?.auction_type === "bulk" ? "#134696" : "none",
          height: auction?.auction_type === "bulk" ? 120 : 280,
          //padding: auction?.auction_type === 'bulk' ? '20px 0' : 'none',
          paddingBottom: auction?.auction_type === "bulk" ? 10 : "none",
          borderBottom:
            auction?.auction_type === "sub_unit" ? "none" : "1px solid #0ED864",
        }}
      >
        {auction?.auction_type === "bulk" && (
          <div
            style={{
              width: "95%",
              padding: "5px 0px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontFamily: "medium", color: "#fff", fontSize: 22 }}>
              {auction?.total_files}
              <span
                style={{
                  fontFamily: "medium",
                  color: "#fff",
                  fontSize: 14,
                  marginLeft: 5,
                }}
              >
                Total Files
              </span>
            </div>
            <div>
              <CustomTooltip
                title={
                  currencyFormatInitials(auction?.price, auction?.currency) ||
                  ""
                }
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 22,
                    color: "#fff",
                    fontFamily: "medium",
                  }}
                >
                  {/* {getCurrency} */}
                  {getConcatenatedPrice(
                    `${currencyFormatInitials(
                      auction?.price,
                      auction?.currency
                    )}`,
                    14
                  )}
                </p>
              </CustomTooltip>
            </div>
          </div>
        )}
        <div></div>
        <div
          className={classes.userContainer}
          style={{
            justifyContent: "space-between",
            flexDirection: parentWidth > 365 ? "row" : "column",
            alignItems: parentWidth > 365 ? "center" : "flex-start",
          }}
          ref={containerRef}
        >
          <div style={{ marginLeft: 10 }}>
            {auction?.auction_type !== "sub_unit" &&
              auction?.auction_type !== "bulk" && (
                <>
                  <p className={classes.priceTitle}>Price</p>
                  {/* <span className={classes.price}>{getCurrency}</span> */}
                  <CustomTooltip
                    title={
                      currencyFormatInitials(
                        auction?.price,
                        auction?.currency
                      ) || ""
                    }
                  >
                    <span className={classes.price}>
                      {getConcatenatedPrice(
                        `${currencyFormatInitials(
                          auction?.price,
                          auction?.currency
                        )}`,
                        14
                      )}
                    </span>
                  </CustomTooltip>
                </>
              )}
          </div>
          {auction?.auction_type === "bulk" ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0px 10px",
                  width: 100,
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    fontFamily: "light",
                    margin: "5px 0px",
                  }}
                >
                  Area Size
                </p>
                <span
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    marginTop: 0,
                    fontFamily: "medium",
                  }}
                >{`${parseInt(auction?.size) || "0"} ${
                  auction?.unit === "Square Feet"
                    ? "Sqft"
                    : auction?.unit || "Sqft"
                }`}</span>
              </div>
              <div className={classes.verticalContainer}>
                <p
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    fontFamily: "light",
                    margin: "5px 0px",
                  }}
                >
                  Society/Location
                </p>
                <CustomTooltip
                  title={`${auction?.area || "area"}, ${
                    auction?.city || "city"
                  }`}
                >
                  <span
                    style={{
                      fontSize: 16,
                      color: "#fff",
                      marginTop: 0,
                      fontFamily: "medium",
                      height: 40,
                      overflow: "hidden",
                    }}
                  >{`${auction?.city || "city"}`}</span>
                </CustomTooltip>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  sx={buttonSx}
                  onClick={() => setOpenBids(true)}
                  // disabled={auction?.sold_files === auction?.total_files}
                >
                  {/* {buttonText} */}
                  Quick View
                </Button>
                <Button
                  sx={{ ...buttonSx, marginTop: 1 }}
                  onClick={() => {
                    navigate(`/auction/${auction?.id}`);
                  }}
                >
                  Detail
                </Button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column-reverse",
              }}
            >
              <Button
                sx={{ ...buttonSx, marginTop: 1 }}
                onClick={() => {
                  navigate(`/auction/${auction?.id}`);
                }}
              >
                Detail
              </Button>
              <Button
                sx={buttonSx}
                onClick={() => setOpenBids(true)}
                // disabled={auction?.sold_files === auction?.total_files}
              >
                {/* {buttonText} */}
                Quick View
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={classes.bottomContainer}>
        {auction?.auction_type === "sub_unit" ? (
          <SubunitCardDetails auction={auction} />
        ) : auction?.auction_type === "single" ? (
          <div className={classes.valueContainer}>
            <div className={classes.verticalContainer}>
              <p className={classes.title}>
                {/* {auction?.auction_type === 'bulk'
                  ? 'No. of FIles'
                  : 'Auction End'} */}
                Auction End
              </p>
              <span
                // className={
                //   auction?.auction_type === 'bulk'
                //     ? classes.value
                //     : classes.auctionEnd
                // }
                className={classes.auctionEnd}
              >
                {/* {auction?.auction_type === 'bulk'
                  ? auction?.total_files
                  : getEndDate(auction?.created_at)} */}
                {/* {getEndDate(auction?.created_at)} */}
                in {getDifferenceFromNow()}
                {/* {moment(auction?.end_date).format("DD") -
                  moment(currentDate).format("DD")}{" "} */}
                {/* days */}
              </span>
            </div>
            <div className={classes.verticalContainer}>
              <p className={classes.title}>Society/Location</p>
              <CustomTooltip
                title={`${auction?.area || "area"}, ${auction?.city || "city"}`}
              >
                <span
                  className={classes.value}
                  style={{
                    height: 42,
                    overflow: "hidden",
                  }}
                >{`${auction?.city || "city"}`}</span>
              </CustomTooltip>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 70,
              margin: "0 20px",
            }}
          >
            <Avatar
              sx={{ width: 60, height: 60 }}
              src={auction?.user_fk?.photo}
            />
            <div
              style={{
                marginLeft: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: "medium",
                  fontSize: 19,
                  color: "#134696",
                  textTransform: "capitalize",
                }}
              >
                {auction?.user_fk?.full_name}
              </div>
              <div
                style={{
                  fontFamily: "medium",
                  fontSize: 12,
                  color: "#707070",
                }}
              >
                {auction?.user_fk?.area},&nbsp;{auction?.user_fk?.city},&nbsp;
                {auction?.user_fk?.country}
              </div>
            </div>
          </div>
        )}
        {auction?.auction_type !== "bulk" && (
          <div className={classes.valueContainer}>
            <div className={classes.verticalContainer}>
              <p className={classes.title}>Area Size</p>
              <span className={classes.value}>{`${
                parseInt(auction?.size) || "0"
              } ${
                auction?.unit === "Square Feet"
                  ? "Sqft"
                  : auction?.unit || "Sqft"
              }`}</span>
            </div>
            <div className={classes.verticalContainer}>
              <p className={classes.title}>Listed by:</p>
              <span className={classes.value}>{`${
                auction?.user_fk?.full_name || "user"
              }`}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionCard;
