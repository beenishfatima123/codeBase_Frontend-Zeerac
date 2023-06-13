import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@mui/material";
import { checkAuctionDataValidation } from "../../../../utils/helpers/propertyCreation";
import { toast } from "react-toastify";
import {
  createAuction,
  resetCreateAuctions,
  resetCreateAuctionsApi,
} from "../../../../redux/slices/createPropertySlice";
import {
  //currencyFormatInitials,
  getAuctionFormData,
  getConcatenatedPrice,
} from "../../../../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import { setAllAuctions } from "../../../../redux/slices/auctionSlice";
import { useWindowDims } from "../../../../utils/useWindowDims";
import CustomTooltip from "../../../globalComponents/CustomTooltip";
import { TextTranslation } from "../../../../utils/translation";

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
    borderBottom: "1px solid #0ED864",
    height: 280,
    width: "100%",
    backgroundColor: "#DBDBDB",
    marginTop: 20,
    alignSelf: "center",
    objectFit: "fill",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 22,
    color: "#134696",
    fontWeight: "bold",
    display: "flex",
    flex: 1,
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0px",
  },
  title: {
    fontSize: 14,
    color: "#7D7D7D",
    fontFamily: "light",
    margin: "5px 0px",
  },
  value: {
    fontSize: 18,
    color: "#1A2954",
    marginTop: 10,
    fontFamily: "medium",
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    margin: 0,
    fontFamily: "medium",
  },
  email: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "medium",
  },
  priceTitle: {
    margin: 0,
    fontSize: 14,
    color: "#1A2954",
  },
  price: {
    margin: 0,
    fontSize: 26,
    color: "#134696",
    fontWeight: "bold",
  },
  headingContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottom: "1px solid #134696",
  },
}));
// const buttonSx = {
//   backgroundColor: "#FFFFFF",
//   color: "#1A2954",
//   borderRadius: "50px",
//   height: 35,
//   width: 130,
//   fontSize: 14,
//   fontWeight: "bold",
//   fontFamily: "medium",
//   border: "1px solid #707070",
//   p: 0,
//   "&:hover": {
//     backgroundColor: "#FFFFFF",
//   },
// };
const uploadButtonSx = {
  backgroundColor: "#134696",
  color: "white",
  borderRadius: "50px",
  height: 48,
  width: 145,
  fontSize: 15,
  fontWeight: "bold",
  fontFamily: "medium",
  p: 0,
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const AuctionPreview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef();
  const { width } = useWindowDims();

  const [parentWidth, setParentWidth] = useState();

  const { auctionData, listingType, selectedTab, createAuctionApiInfo } =
    useSelector((state) => state.createProperty);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allAuctions = useSelector((state) => state.auction.allAuctions);
  const { langIndex } = useSelector((state) => state.global);

  // const getCurrency = useMemo(() => {
  //   if (auctionData?.currency && auctionData?.price)
  //     return new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: auctionData?.currency,
  //       maximumFractionDigits: 0,
  //     }).format(auctionData?.price);
  //   else return "$ 0";
  // }, [auctionData]);

  useEffect(() => {
    if (createAuctionApiInfo?.error) {
      // // console.log({ error: createAuctionApiInfo?.error });
      toast.error(createAuctionApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetCreateAuctionsApi());
    }
    // eslint-disable-next-line
  }, [createAuctionApiInfo?.error]);
  useEffect(() => {
    if (createAuctionApiInfo?.response) {
      // // console.log({ response: createAuctionApiInfo?.response });
      toast.success("Auction posted successfully", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#134696" },
      });
      if (allAuctions)
        dispatch(
          setAllAuctions({
            ...allAuctions,
            result: {
              ...allAuctions?.result,
              count: allAuctions?.result?.count + 1,
              results: [
                ...allAuctions?.result?.results,
                createAuctionApiInfo?.response?.result,
              ],
            },
          })
        );
      navigate("/auctions");
      dispatch(resetCreateAuctions());
    }
    // eslint-disable-next-line
  }, [createAuctionApiInfo?.response]);
  useEffect(() => {
    if (containerRef)
      setParentWidth(containerRef?.current?.parentElement?.offsetWidth);
  }, [containerRef, width]);
  const postAuction = () => {
    const validationError = checkAuctionDataValidation(
      auctionData,
      listingType
    );
    if (validationError)
      toast.error(validationError, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    else {
      // console.log({ auctionData });
      dispatch(
        createAuction({
          values: getAuctionFormData(auctionData, listingType),
          token: currentUser?.token,
        })
      );
    }
  };
  const getBackgroundImage = () => {
    if (auctionData?.images?.length)
      return `linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,1)),url(${URL.createObjectURL(
        auctionData?.images[0]
      )})`;
  };
  return (
    <div className={classes.container}>
      {createAuctionApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          <div className={classes.headingContainer}>
            <span className={classes.heading}>
              {selectedTab === "Preview_auction"
                ? TextTranslation.youAreDoneAuction[langIndex]
                : TextTranslation.auctionPreview[langIndex]}
            </span>
            {selectedTab === "Preview_auction" && (
              <Button sx={uploadButtonSx} onClick={postAuction}>
                Proceed
              </Button>
            )}
          </div>

          <div
            className={classes.backgroundContainer}
            style={{
              backgroundImage: getBackgroundImage(),
            }}
          >
            <div className={classes.userContainer}>
              <Avatar
                src={`${currentUser?.photo}`}
                alt={currentUser?.first_name}
                sx={{ backgroundColor: "#969fed", height: 50, width: 50, m: 1 }}
              />
              <div style={{ marginLeft: 10 }}>
                <p className={classes.name}>{currentUser?.first_name}</p>
                <span className={classes.email}>{currentUser?.email}</span>
              </div>
            </div>
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
                <p className={classes.priceTitle}>Price</p>
                {/* <span className={classes.price}>{getCurrency}</span> */}
                <CustomTooltip
                  title={`${auctionData?.currency} ${" "} ${
                    auctionData?.price
                  }`}
                >
                  <span className={classes.price}>
                    {getConcatenatedPrice(
                      parseFloat(auctionData?.price).toFixed(2),
                      14
                    ) || "0"}{" "}
                    {auctionData?.currency}
                  </span>
                </CustomTooltip>
              </div>
              {/* <Button sx={buttonSx}>Place Bid</Button> */}
            </div>
          </div>

          <div className={classes.bottomContainer}>
            <div style={{ marginLeft: 20 }}>
              <p className={classes.title}>Area Size</p>
              <span className={classes.value}>{`${
                parseFloat(auctionData?.size).toFixed(2) || "0"
              } ${auctionData?.unit || "Sqft"}`}</span>
            </div>
            <div style={{ marginRight: 20 }}>
              <p className={classes.title}>Society/Location</p>
              <span className={classes.value}>{`${
                auctionData?.area || TextTranslation.area[langIndex]
              }, ${
                auctionData?.city || TextTranslation.city[langIndex]
              }`}</span>
            </div>
          </div>
          <div className={classes.bottomContainer}>
            {/* <div style={{ marginLeft: 20 }}>
              <p className={classes.title}>Description</p>
              <span className={classes.value}>{`${
                auctionData?.description || "description"
              } `}</span>
            </div> */}
            <div style={{ marginLeft: 20 }}>
              <p className={classes.title}>
                {TextTranslation.endDate[langIndex]}
              </p>
              <span className={classes.value}>{`${
                auctionData?.end_date || TextTranslation.endDate[langIndex]
              }`}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuctionPreview;
