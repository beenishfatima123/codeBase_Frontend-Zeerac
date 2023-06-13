import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Modal } from "@mui/material";
import BidInput from "./BidInput";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginContainer from "../loginComponents/LoginContainer";
import {
  getAuctionBids,
  placeBid,
  resetBids,
  resetBidsApi,
} from "../../redux/slices/auctionSlice";
import ComponentLoader from "../globalComponents/ComponentLoader";
import { toast } from "react-toastify";
import {
  currencyConverter,
  currencyFormatInitials,
  exchangeCurrency,
  sortByPrice,
} from "../../utils/helperFunctions";
import useApi from "../../utils/hooks/useApi";
import UserAuctionDetails from "./UserAuctionDetails";
import { useWindowDims } from "../../utils/useWindowDims";
import CancelIcon from "@mui/icons-material/Cancel";
import ModalPattren from "./svg/ModalPattren";
import { TextTranslation } from "../../utils/translation";

const useStyles = makeStyles(() => ({
  bidContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    maxWidth: "90%",
    minHeight: 330,
  },
  headings: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transform: "rotate(90deg)",
    height: 50,
  },
  detailsBtn: {
    backgroundColor: "#0ED864",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    borderRadius: 5,
    transform: "rotate(90deg)",
    position: "absolute",
    top: "28%",
    left: -85,
    padding: "10px 40px",
  },
  totalBtn: {
    backgroundColor: "#0ED864",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    borderRadius: 5,
    transform: "rotate(90deg)",
    position: "absolute",
    top: "34%",
    left: -96,
    padding: "10px 40px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
    marginLeft: 10,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0px 5px",
  },
  label: {
    fontSize: 12,
    color: "#6B7B88",
    marginLeft: 5,
  },
  readOnlyInput: {
    borderBottom: "1px solid #707070",
    height: 42,
    width: 155,
    padding: "0px 5px",
    display: "flex",
    alignItems: "center",
  },
  inputValue: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#134696",
    // lett,
  },
  "@media (max-width: 630px)": {
    bidContainer: {
      width: "90%",
      // height: "50%",
    },
  },
}));
const buttonSx = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  backgroundColor: "#134696",
  fontSize: 14,
  color: "#FFFFFF",
  fontWeight: "bold",
  height: 32,
  minWidth: 175,
  ml: 1,
  "&:hover": {
    backgroundColor: "#134696",
  },
  "&:disabled": {
    color: "#FFFFFF",
  },
};

/*  BidModal is the Modal that opens when "Quick View" button
at the auctionCard is clicked. It displays bid details and
input field to get bid from current user. */
const BidModal = ({ isOpen, setOpen, type, auction }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { height } = useWindowDims();
  const [bidData, setBidData] = useState();

  const { auctionBids, auctionBidsApiInfo } = useSelector(
    (state) => state.auction
  );

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { langIndex } = useSelector((state) => state.global);

  useApi(
    auctionBidsApiInfo.error,
    auctionBidsApiInfo?.createBidResponse,
    "Bid Placed",
    resetBidsApi
  );

  /* totalBids get number of bids on the auction. */
  const totalBids = useMemo(() => {
    return auctionBids?.result?.results?.length;
    // eslint-disable-next-line
  }, [auctionBids]);

  /* bidOptions stores the actions that can be performed on that bid. */
  const bidOptions = useMemo(() => {
    if (auctionBids?.result?.results?.length)
      return auctionBids?.result?.results?.map((elem) => {
        return currencyFormatInitials(elem?.price, auction.currency);
      });
    // eslint-disable-next-line
  }, [auctionBids]);

  /* highestBid gets the maximum valued bid from results array. */
  const highestBid = useMemo(() => {
    if (auctionBids?.result?.results?.length) {
      const _temp = [...auctionBids?.result?.results].sort(sortByPrice)[0];
      return currencyFormatInitials(_temp?.price, auction.currency);
    }
    // eslint-disable-next-line
  }, [auctionBids]);

  /* bidPercentagePrice gets price of a bid based on its percentage
  value. */
  const bidPercentagePrice = useMemo(() => {
    let percentageValue = bidData?.bidPercentage / 100;
    let price = percentageValue * parseInt(auction?.price);
    return price || 0;
    // eslint-disable-next-line
  }, [bidData?.bidPercentage, auction]);

  /* this useEffect dispatches to getAuctionBids by using token and auctionId. */
  useEffect(() => {
    if (currentUser) {
      dispatch(
        getAuctionBids({
          auctionId: auction?.id,
          token: currentUser?.token,
        })
      );
    }
    // eslint-disable-next-line
  }, [auction, currentUser]);

  /* once bid is placed, we close the Modal by this useEffect. */
  useEffect(() => {
    // // console.log({ auctionBids, auction });
    if (auctionBidsApiInfo?.createBidResponse?.status) {
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [auctionBidsApiInfo]);

  /* handleChange deals with any change in values on the modal and 
  validated them. */
  const handleChange = (prop) => (event) => {
    setBidData((prev) => ({
      ...prev,
      [prop]: event?.target?.value,
      [`${prop}ValidationError`]: validateInputs(prop, event?.target?.value),
    }));
  };

  /* validateInputs checks if values entered on bidInput are within allowed
  parameters or not. */
  const validateInputs = (prop, value) => {
    switch (prop) {
      case "totalFiles":
        if (parseInt(value) <= 0 || parseInt(value) > auction?.available_files)
          return `${TextTranslation.totalFilesValidation[langIndex]} - ${auction?.available_files}`;
        else return null;

      case "bid":
        if (
          parseFloat(value) <=
          parseFloat(
            currencyConverter(
              auction?.highest_bid?.price
                ? auction?.highest_bid?.price
                : auction?.price,
              auction?.currency
            )
          )
        )
          return `${TextTranslation.higherBidValidation[langIndex]}
          ${currencyFormatInitials(
            auction?.highest_bid?.price
              ? auction?.highest_bid?.price
              : auction?.price,
            auction?.currency
          )}`;
        else return null;

      case "bidPercentage":
        if (
          parseInt(value) < 0 ||
          parseInt(value) > auction?.available_sub_unit_share_percentage
        )
          return `${
            TextTranslation.bidPercentageValidation[langIndex]
          } - ${parseInt(auction?.available_sub_unit_share_percentage)}%`;
        else return null;

      default:
        return null;
    }
  };

  /* once place bid is clicked, if errors are found, toast diplays
  the error otherwise dispatch the bid. */
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
    } else
      dispatch(
        placeBid({
          bidData: getBidFormData(),
          token: currentUser?.token,
        })
      );
  };

  /* getBidFormData takes input data from the user on the modal 
  and converts it to formdata then returns it. */
  const getBidFormData = () => {
    const formData = new FormData();
    formData?.append("user_fk", currentUser?.id);
    formData?.append("property_files_fk", auction?.id);
    if (type === "sub_unit") {
      formData?.append("sub_unit_share_percentage", bidData?.bidPercentage);
      formData?.append("price", parseInt(bidPercentagePrice));
    } else
      formData?.append(
        "price",
        `${parseFloat(
          exchangeCurrency(
            bidData?.bid,
            currentUser?.currency,
            auction?.currency
          )
        ).toFixed(2)}`
      );
    formData?.append("file_count", bidData?.totalFiles || 1);
    return formData;
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        dispatch(resetBids());
        setOpen((prev) => !prev);
      }}
      sx={{ backdropFilter: "blur(1px)", background: "#13469670" }}
    >
      <div
        className={classes.bidContainer}
        style={{
          maxHeight: height * 0.9 || 350,
        }}
      >
        {currentUser ? (
          <div className={classes.content}>
            {auctionBidsApiInfo?.loading ||
            auctionBidsApiInfo?.createBidLoading ? (
              <ComponentLoader />
            ) : (
              <>
                {currentUser?.id === auction?.user_fk?.id ? (
                  <UserAuctionDetails auction={auction} />
                ) : (
                  <>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flex: 1,
                        padding: "20px 5%",
                        borderBottom: "1px solid #707070",
                        position: "relative",
                      }}
                    >
                      <div style={{ position: "absolute", right: -5, top: -5 }}>
                        <CancelIcon
                          sx={{
                            color: "#134696",
                            cursor: "pointer",
                          }}
                          onClick={() => setOpen(false)}
                        />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          right: 10,
                          top: -50,
                        }}
                      >
                        <ModalPattren style={{ height: 400, width: 100 }} />
                      </div>
                      <div className={classes.detailsBtn}>Details</div>
                      {type !== "sub_unit" && (
                        <Grid item xs={12} sm={6}>
                          <BidInput
                            label={TextTranslation.latestBid[langIndex]}
                            options={
                              bidOptions || [
                                TextTranslation.noBidsMade[langIndex],
                              ]
                            }
                          />
                        </Grid>
                      )}
                      <Grid item xs={12} sm={6}>
                        {type !== "sub_unit" ? (
                          <BidInput
                            label={TextTranslation.totalBids[langIndex]}
                            type="read-only"
                            value={
                              totalBids || TextTranslation.noBidsMade[langIndex]
                            }
                          />
                        ) : (
                          <BidInput
                            label={TextTranslation.remainingShares[langIndex]}
                            type="read-only"
                            value={`${
                              auction?.available_sub_unit_share_percentage &&
                              parseInt(
                                auction?.available_sub_unit_share_percentage
                              )
                            }%`}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <BidInput
                          label={TextTranslation.currentHighestBid[langIndex]}
                          type="read-only"
                          value={highestBid || "PKR 0"}
                        />
                      </Grid>
                      {type === "bulk" ? (
                        <Grid item xs={12} sm={6}>
                          <BidInput
                            label={TextTranslation.remainingFiles[langIndex]}
                            type="read-only"
                            value={auction?.available_files}
                          />
                        </Grid>
                      ) : null}
                    </Grid>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flex: 1,
                        padding: "20px 5%",
                        borderTop: "1px solid #707070",
                        position: "relative",
                        alignItems: "center",
                      }}
                    >
                      <div className={classes.totalBtn}>
                        {TextTranslation.totalBids[langIndex]}
                      </div>

                      <Grid item xs={12} sm={6}>
                        {type !== "sub_unit" ? (
                          <BidInput
                            label={TextTranslation.yourBid[langIndex]}
                            type="input"
                            onChange={handleChange("bid")}
                            value={bidData?.bid}
                            placeholder={TextTranslation.enterAmount[langIndex]}
                            validating={bidData?.bidValidationError}
                            currency={
                              currentUser?.currency
                                ? currentUser?.currency === "USD"
                                  ? "$"
                                  : currentUser?.currency === "PKR"
                                  ? "₨"
                                  : currentUser?.currency === "TRY"
                                  ? "₺"
                                  : ""
                                : auction?.currency === "USD"
                                ? "$"
                                : auction?.currency === "PKR"
                                ? "₨"
                                : auction?.currency === "TRY"
                                ? "₺"
                                : ""
                            }
                          />
                        ) : (
                          <BidInput
                            label={TextTranslation.bidOn[langIndex]}
                            type="input"
                            onChange={handleChange("bidPercentage")}
                            value={bidData?.bidPercentage}
                            placeholder={TextTranslation.percentage[langIndex]}
                            validating={bidData?.bidPercentageValidationError}
                          />
                        )}
                      </Grid>
                      {type === "sub_unit" && (
                        <div className={classes.priceContainer}>
                          <span className={classes.label}>
                            {TextTranslation.bidPrice[langIndex]}
                          </span>
                          <div className={classes.readOnlyInput}>
                            <span className={classes.inputValue}>
                              {currencyFormatInitials(
                                bidPercentagePrice,
                                auction?.currency
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                      <Grid item xs={12} sm={6}>
                        {type === "bulk" && (
                          <BidInput
                            label={TextTranslation.bidOn[langIndex]}
                            type="input"
                            onChange={handleChange("totalFiles")}
                            value={bidData?.totalFiles}
                            placeholder={
                              TextTranslation.bulkNoOfFiles[langIndex]
                            }
                            validating={bidData?.totalFilesValidationError}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button
                          sx={buttonSx}
                          onClick={handlePlaceBid}
                          disabled={currentUser?.id === auction?.user_fk?.id}
                        >
                          {TextTranslation.placeBid[langIndex]}
                        </Button>
                        {currentUser?.id === auction?.user_fk?.id && (
                          <span className={classes.helperText}>
                            {TextTranslation.cannotBid[langIndex]}
                          </span>
                        )}
                      </Grid>
                    </Grid>
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <LoginContainer
            style={{ backgroundColor: "white", height: "420px" }}
          />
        )}
      </div>
    </Modal>
  );
};

export default BidModal;
