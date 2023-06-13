import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import useApi from "../../../utils/hooks/useApi";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonLoader from "../../globalComponents/ButtonLoader";

import { placeBid, resetBidsApi } from "../../../redux/slices/auctionSlice";
import { TextTranslation } from "../../../utils/translation";
import CustomTooltip from "../../globalComponents/CustomTooltip";
import CustomPlaceBid from "./CustomPlaceBid";
import Hammer from "../svg/Hammer";
import Percentage from "../svg/Percentage";
import Files from "../svg/Files";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import {
  currencyConverter,
  currencyFormatInitials,
  exchangeCurrency,
  getConcatenatedPrice,
} from "../../../utils/helperFunctions";
import { HEADER_CONTENT_WIDTH } from "../../../utils/constants";
import AuctionEndTimer from "./AuctionEndTimer";
const useStyles = makeStyles(() => ({
  innerContainer: {
    lineHeight: 1.5,
  },
  label: {
    color: "#134696",
    fontFamily: "medium",
    fontSize: 20,
  },
  value: {
    color: "#134696",
    fontFamily: "heavy",
    fontSize: 24,
    textTransform: "uppercase",
  },
  location: {
    fontSize: 20,
    fontFamily: "medium",
    color: "#7b7b7b",
  },
  description: {
    fontSize: 14,
    fontFamily: "light",
    color: "#134696",
    margin: "20px 0",
  },
  auctionEndContainer: {
    minHeight: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "1px solid #0ed864",
  },
  auctionEndTimerContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  auctionEndText: {
    fontFamily: "heavy",
    fontSize: 30,
    color: "#134696",
  },
  button: {
    width: 90,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#134696",
    borderRadius: 10,
    cursor: "pointer",
    fontFamily: "medium",
    margin: "5px 0",
    "&:hover": {
      backgroundColor: "#134696",
    },
  },
}));

const TopInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const { langIndex } = useSelector((state) => state.global);
  const {
    auctionDetail,
    auctionBidsApiInfo,
    auctionDetailApiInfo,
    auctionBids,
  } = useSelector((state) => state.auction);

  const [bidData, setBidData] = useState();

  const bidPercentagePrice = useMemo(() => {
    let percentageValue = bidData?.bidPercentage / 100;
    let price = percentageValue * parseInt(auctionDetail?.result?.price);
    return price || 0;
    // eslint-disable-next-line
  }, [bidData?.bidPercentage, auctionDetail?.result]);
  const hasEnded = useMemo(() => {
    if (auctionDetail?.result?.available_files <= 0) return true;
    else return false;
  }, [auctionDetail]);
  const handleChange = (prop) => (event) => {
    setBidData((prev) => ({
      ...prev,
      [prop]: event?.target?.value,
      [`${prop}ValidationError`]: validateInputs(prop, event?.target?.value),
    }));
  };
  const validateInputs = (prop, value) => {
    switch (prop) {
      case "totalFiles":
        if (
          parseInt(value) <= 0 ||
          parseInt(value) > auctionDetail?.result?.available_files
        )
          return `${TextTranslation.totalFilesValidation[langIndex]} - ${auctionDetail?.result?.available_files}`;
        else return null;

      case "bid":
        if (
          parseFloat(value) <=
          parseFloat(
            currencyConverter(
              auctionDetail?.result?.highest_bid?.price
                ? auctionDetail?.result?.highest_bid?.price
                : auctionDetail?.result?.price,
              auctionDetail?.result?.currency
            )
          )
        )
          return `${TextTranslation.higherBidValidation[langIndex]} 
          ${currencyFormatInitials(
            auctionDetail?.result?.highest_bid?.price
              ? auctionDetail?.result?.highest_bid?.price
              : auctionDetail?.result?.price,
            auctionDetail?.result?.currency
          )}`;
        else return null;

      case "bidPercentage":
        if (
          parseInt(value) < 0 ||
          parseInt(value) >
            auctionDetail?.result?.available_sub_unit_share_percentage
        )
          return `${
            TextTranslation.bidPercentageValidation[langIndex]
          } - ${parseInt(
            auctionDetail?.result?.available_sub_unit_share_percentage
          )}%`;
        else return null;

      default:
        return null;
    }
  };

  const getBidFormData = () => {
    const formData = new FormData();
    formData?.append("user_fk", currentUser?.id);
    formData?.append("property_files_fk", auctionDetail?.result?.id);
    if (auctionDetail?.result?.auction_type === "sub_unit") {
      formData?.append(
        "sub_unit_share_percentage",
        parseInt(bidData?.bidPercentage)
      );
      formData?.append("price", parseInt(bidPercentagePrice));
    } else
      formData?.append(
        "price",
        `${parseFloat(
          exchangeCurrency(
            bidData?.bid,
            currentUser?.currency || auctionDetail?.result?.currency,
            auctionDetail?.result?.currency
          )
        ).toFixed(2)}`
      );
    formData?.append("file_count", bidData?.totalFiles || 1);
    return formData;
  };
  const handlePlaceBid = () => {
    if (
      bidData?.bidValidationError ||
      bidData?.totalFilesValidationError ||
      bidData?.bidPercentageValidationError ||
      (!bidData?.bid && !bidData?.bidPercentage)
    ) {
      toast.error(TextTranslation.pleaseProvideValidBid[langIndex], {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
        hideProgressBar: true,
      });
    } else {
      dispatch(
        placeBid({
          bidData: getBidFormData(),
          token: currentUser?.token,
        })
      );
    }
    setBidData("");
  };

  useApi(
    auctionBidsApiInfo.error,
    auctionBidsApiInfo?.createBidResponse,
    "Bid Placed",
    resetBidsApi
  );
  // console.log({ auctionDetail });

  return (
    <>
      {auctionDetailApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          <Grid
            container
            justifyContent={"center"}
            sx={{
              maxWidth: "90%",
              width: HEADER_CONTENT_WIDTH,
              margin: "auto",
              my: 1,
            }}
          >
            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
              <div className={classes.innerContainer}>
                <div className={classes.label}>
                  {TextTranslation.listedBy[langIndex]}:
                </div>
                <div className={classes.value}>
                  {auctionDetail?.result?.user_fk?.full_name}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
              <div className={classes.innerContainer}>
                <div className={classes.label}>
                  {TextTranslation.area[langIndex]}{" "}
                  {TextTranslation.size[langIndex]}:
                </div>
                <div className={classes.value}>
                  {" "}
                  {parseInt(auctionDetail?.result?.size)}{" "}
                  {auctionDetail?.result?.unit === "Square Feet"
                    ? "Sq Ft"
                    : auctionDetail?.result?.unit}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
              <div className={classes.innerContainer}>
                <div className={classes.label}>
                  {TextTranslation.amount[langIndex]}:
                </div>
                <div className={classes.value}>
                  {` ${currencyFormatInitials(
                    auctionDetail?.result?.price,
                    auctionDetail?.result?.currency
                  )}`}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            sx={{
              maxWidth: "90%",
              width: HEADER_CONTENT_WIDTH,
              margin: "auto",
              my: 1,
            }}
          >
            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
              <div className={classes.innerContainer}>
                <div className={classes.label}>
                  {!hasEnded ? TextTranslation.latestBid[langIndex] : "Won By"}:
                </div>

                <div className={classes.value}>
                  {hasEnded ? (
                    auctionDetail?.result?.closing_bid[0]?.user_fk?.full_name
                  ) : auctionDetail?.result?.bids[0]?.price ? (
                    currencyFormatInitials(
                      auctionBids?.result?.results[0]?.price,
                      auctionDetail?.result?.currency
                    )
                  ) : (
                    <div className={classes.value}>NA</div>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
              <div className={classes.innerContainer}>
                <div className={classes.label}>
                  {TextTranslation.totalBids[langIndex]}:
                </div>
                <div className={classes.value}>
                  {auctionBids?.result?.count ||
                    auctionDetail?.result?.bids?.length ||
                    auctionDetail?.result?.closing_bid?.length}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
              <div className={classes.innerContainer}>
                <div className={classes.label}>
                  {hasEnded
                    ? "Winning Bid"
                    : TextTranslation.currentHighestBid[langIndex]}
                  :
                </div>

                <div className={classes.value}>
                  {hasEnded ? (
                    auctionDetail?.result?.closing_bid[0]?.price ? (
                      currencyFormatInitials(
                        auctionDetail?.result?.closing_bid[0]?.price,
                        auctionDetail?.result?.currency
                      )
                    ) : (
                      <div className={classes.value}>NA</div>
                    )
                  ) : auctionDetail?.result?.highest_bid?.price ? (
                    currencyFormatInitials(
                      auctionDetail?.result?.highest_bid?.price,
                      auctionDetail?.result?.currency
                    )
                  ) : (
                    <div className={classes.value}>NA</div>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
          {auctionDetail?.result?.auction_type === "bulk" && !hasEnded && (
            <Grid
              container
              justifyContent={"flex-start"}
              sx={{
                maxWidth: "90%",
                width: HEADER_CONTENT_WIDTH,
                margin: "auto",
                my: 1,
              }}
            >
              <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                <div className={classes.innerContainer}>
                  <div className={classes.label}>Total Files</div>
                  {auctionDetail?.result?.total_files ? (
                    <div className={classes.value}>
                      {auctionDetail?.result?.total_files} Files
                    </div>
                  ) : (
                    <div className={classes.value}>NA</div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
                <div className={classes.innerContainer}>
                  <div className={classes.label}>Remaining Files</div>
                  {auctionDetail?.result?.available_files ? (
                    <div className={classes.value}>
                      {auctionDetail?.result?.available_files} Files
                    </div>
                  ) : (
                    <div className={classes.value}>NA</div>
                  )}
                </div>
              </Grid>
            </Grid>
          )}

          {/* <Grid container sx={{ maxWidth: "90%", margin: "auto", my: 1 }}>
       
        <Grid item md={12} lg={12}>
          <div className={classes.label}>
            {TextTranslation.description[langIndex]}:
          </div>
          <div className={classes.description}>
            {auctionDetail?.result?.description}
          </div>
        </Grid>
      </Grid> */}
          {auctionDetail?.result?.is_sold === false &&
          auctionDetail?.result?.available_files > 0 &&
          auctionDetail?.result?.user_fk?.id !== currentUser?.id ? (
            <Grid container justifyContent={"center"} spacing={4}>
              {auctionDetail?.result?.auction_type === "single" && (
                <Grid item xs={10} sm={10} md={5} lg={4}>
                  <CustomPlaceBid
                    bulk
                    icon={
                      <Hammer
                        color={"#fff"}
                        style={{ width: 30, height: 30 }}
                      />
                    }
                    label="place bid"
                    type="text"
                    currency={
                      currentUser?.currency
                        ? currentUser?.currency === "USD"
                          ? "$"
                          : currentUser?.currency === "PKR"
                          ? "₨"
                          : currentUser?.currency === "TRY"
                          ? "₺"
                          : ""
                        : auctionDetail?.result?.currency === "USD"
                        ? "$"
                        : auctionDetail?.result?.currency === "PKR"
                        ? "₨"
                        : auctionDetail?.result?.currency === "TRY"
                        ? "₺"
                        : ""
                    }
                    placeholder="Please Enter Amount"
                    onChange={handleChange("bid")}
                    onKeyPress={(event) => {
                      if (!/[0-9.]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    value={bidData?.bid}
                    validating={bidData?.bidValidationError}
                    onSubmit={handlePlaceBid}
                    disabled={
                      currentUser?.id === auctionDetail?.result?.user_fk?.id
                    }
                    buttonText={
                      auctionBidsApiInfo?.createBidLoading ? (
                        <ButtonLoader color="#ffffff" size={20} />
                      ) : (
                        TextTranslation.submit[langIndex]
                      )
                    }
                  />
                </Grid>
              )}
              {auctionDetail?.result?.auction_type === "sub_unit" && (
                <Grid item xs={10} sm={10} md={5} lg={4}>
                  <CustomPlaceBid
                    bulk
                    icon={
                      <Percentage
                        color={"#fff"}
                        style={{ width: 30, height: 30 }}
                      />
                    }
                    currency={
                      currentUser?.currency
                        ? currentUser?.currency === "USD"
                          ? "$"
                          : currentUser?.currency === "PKR"
                          ? "₨"
                          : currentUser?.currency === "TRY"
                          ? "₺"
                          : ""
                        : auctionDetail?.result?.currency === "USD"
                        ? "$"
                        : auctionDetail?.result?.currency === "PKR"
                        ? "₨"
                        : auctionDetail?.result?.currency === "TRY"
                        ? "₺"
                        : ""
                    }
                    label="percentage bid"
                    type="text"
                    placeholder="Please Enter Percentage Bid"
                    onChange={handleChange("bidPercentage")}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    value={bidData?.bidPercentage}
                    validating={bidData?.bidPercentageValidationError}
                    onSubmit={handlePlaceBid}
                    disabled={
                      currentUser?.id === auctionDetail?.result?.user_fk?.id
                    }
                    estimatedPriceOfPercentage={
                      <CustomTooltip
                        title={
                          currencyFormatInitials(
                            bidPercentagePrice,
                            auctionDetail?.result?.currency
                          ) || ""
                        }
                      >
                        <div
                          style={{
                            fontFamily: "medium",
                            fontSize: 14,
                            color: "#134696",
                          }}
                        >
                          Bid Price:
                          {getConcatenatedPrice(
                            `${currencyFormatInitials(
                              bidPercentagePrice,
                              auctionDetail?.result?.currency
                            )}`,
                            10
                          )}
                        </div>
                      </CustomTooltip>
                    }
                    buttonText={
                      auctionBidsApiInfo?.createBidLoading ? (
                        <ButtonLoader color="#ffffff" size={20} />
                      ) : (
                        TextTranslation.submit[langIndex]
                      )
                    }
                  />
                </Grid>
              )}
              {auctionDetail?.result?.auction_type === "bulk" && (
                <>
                  <Grid item xs={10} sm={10} md={5} lg={4}>
                    <CustomPlaceBid
                      icon={
                        <Hammer
                          color={"#fff"}
                          style={{ width: 30, height: 30 }}
                        />
                      }
                      currency={
                        currentUser?.currency === "USD"
                          ? "$"
                          : currentUser?.currency === "PKR"
                          ? "₨"
                          : "₺" || auctionDetail?.result?.currency === "USD"
                          ? "$"
                          : auctionDetail?.result?.currency === "PKR"
                          ? "₨"
                          : "₺"
                      }
                      label="place bid"
                      type="text"
                      placeholder="Please Enter Amount"
                      onChange={handleChange("bid")}
                      onKeyPress={(event) => {
                        if (!/[0-9.]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={bidData?.bid}
                      validating={bidData?.bidValidationError}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={5} lg={4}>
                    <CustomPlaceBid
                      icon={
                        <Files
                          color={"#fff"}
                          style={{ width: 40, height: 42 }}
                        />
                      }
                      label="No. of Files"
                      type="text"
                      placeholder="Please Enter no. of files"
                      onChange={handleChange("totalFiles")}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={bidData?.totalFiles}
                      validating={bidData?.totalFilesValidationError}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sm={10}
                    md={3}
                    lg={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      className={classes.button}
                      disabled={!bidData?.bid || !bidData?.totalFiles}
                      onClick={handlePlaceBid}
                      sx={{
                        backgroundColor: "#134696",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#134696",
                        },
                        "&:disabled": {
                          backgroundColor: "#c7c7c7",
                          cursor: "not-allowed",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          ) : null}
          <AuctionEndTimer />
        </>
      )}
    </>
  );
};

export default TopInfo;
