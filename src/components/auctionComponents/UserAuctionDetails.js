import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  currencyFormatInitials,
  getConcatenatedPrice,
  sortByPrice,
} from "../../utils/helperFunctions";
import { Button, Grid } from "@mui/material";
import {
  acceptABid,
  rejectABid,
  resetBidsApi,
} from "../../redux/slices/auctionSlice";
import NotFound from "../globalComponents/NotFound";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TextTranslation } from "../../utils/translation";
import CustomToolTip from "../globalComponents/CustomTooltip";

const acceptSx = {
  borderRadius: 20,
  backgroundColor: "#0ed864",
  color: "#fff",
  textTransform: "none",
  fontSize: 12,
  width: 100,
  height: 30,
  "&:hover": {
    backgroundColor: "#0ed864",
  },
};
const declineSx = {
  borderRadius: 20,
  backgroundColor: "red",
  color: "#fff",
  textTransform: "none",
  fontSize: 12,
  width: 100,
  height: 30,
  "&:hover": {
    backgroundColor: "red",
  },
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },

  title: {
    fontSize: 14,
    color: "#0ED864",
    margin: "5px 0px",
    fontWeight: "bold",
  },
  value: {
    fontSize: 20,
    color: "#134696",
    margin: 0,
    fontWeight: "bold",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 5%",
    marginTop: 10,
  },
  tableTitle: {
    fontSize: 14,
    color: "#9DAFBD",
    width: "20%",
  },
  tableContent: {
    fontSize: 14,
    color: "#134696",
    width: "20%",
    fontWeight: "bold",
  },
  tableContainer: {
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  "@media (max-width: 500px)": {},
}));

/* UserAuctionDetails is the view of each individual auction for the 
user who has posted the auction. This displays details of current bids,
highest bid and remaining days etc. 
Auction creator can not bid on the auction. */
const UserAuctionDetails = ({ auction }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { auctionBids, auctionBidsApiInfo, auctionDetail } = useSelector(
    (state) => state.auction
  );
  // console.log({ auctionBidsApiInfo });
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { langIndex } = useSelector((state) => state.global);

  const bidsToShow = useMemo(() => {
    return auctionBids?.result?.results?.filter(
      (elem) => elem?.file_count <= auction?.available_files
    );
    // eslint-disable-next-line
  }, [auctionBids, auction]);
  const totalBids = useMemo(() => {
    return bidsToShow?.length;
    // eslint-disable-next-line
  }, [bidsToShow]);
  const bidOptions = useMemo(() => {
    if (bidsToShow?.length)
      return bidsToShow?.map((elem) => {
        return getConcatenatedPrice(
          currencyFormatInitials(elem?.price, auction.currency),
          14
        );
      });
    // eslint-disable-next-line
  }, [bidsToShow]);

  const highestBid = useMemo(() => {
    if (bidsToShow?.length) {
      const _temp = [...auctionBids?.result?.results].sort(sortByPrice)[0];
      return getConcatenatedPrice(
        currencyFormatInitials(_temp?.price, auction.currency),
        14
      );
    }
    // eslint-disable-next-line
  }, [bidsToShow]);

  const handleAcceptBid = (bid) => {
    dispatch(
      acceptABid({
        transactionData: getBidFormData(bid),
        token: currentUser?.token,
      })
    );
  };
  const handleRejectBid = (id) => {
    dispatch(
      rejectABid({
        id: id,
        token: currentUser?.token,
      })
    );
  };
  const getBidFormData = (bid) => {
    const formData = new FormData();
    formData?.append("property_biding_fk", bid?.id);

    return formData;
  };

  useEffect(() => {
    if (auctionBidsApiInfo?.response) {
      toast.success(TextTranslation.bidAccepted[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetBidsApi());
    }
    // eslint-disable-next-line
  }, [auctionBidsApiInfo?.response]);

  return (
    <div className={classes.container}>
      <Grid
        container
        sx={{
          padding: "20px 5%",
          borderBottom: "1px solid lightGray",
        }}
      >
        <Grid item xs={6} sm={4}>
          <p className={classes.title}>
            {TextTranslation.latestBid[langIndex]}
          </p>
          <CustomToolTip
            title={currencyFormatInitials(
              bidsToShow[0]?.price,
              auction.currency
            )}
          >
            <p className={classes.value}>
              {bidOptions?.length > 0 ? bidOptions[0] : 0}
            </p>
          </CustomToolTip>
        </Grid>
        <Grid item xs={6} sm={4}>
          <p className={classes.title}>
            {TextTranslation.totalBids[langIndex]}
          </p>
          <p className={classes.value}>{totalBids}</p>
        </Grid>
        <Grid item xs={6} sm={4}>
          <p className={classes.title}>
            {TextTranslation.currentHighestBid[langIndex]}
          </p>
          <CustomToolTip
            title={currencyFormatInitials(
              auctionBids?.result?.results[0]?.price,
              auction.currency
            )}
          >
            <p className={classes.value}>{highestBid}</p>
          </CustomToolTip>
        </Grid>
      </Grid>

      <div className={classes.tableHeader}>
        <span className={classes.tableTitle}>
          {TextTranslation.bidBy[langIndex]}
        </span>
        <span className={classes.tableTitle}>
          {TextTranslation.bidAmount[langIndex]}
        </span>
        <span className={classes.tableTitle}>
          {auction?.auction_type === "sub_unit"
            ? TextTranslation.percentage[langIndex]
            : TextTranslation.noOfFiles[langIndex]}
        </span>
        <span className={classes.tableTitle}>
          {TextTranslation.bidId[langIndex]}
        </span>
        <span className={classes.tableTitle}></span>
        <span className={classes.tableTitle}></span>
      </div>
      <div className={classes.tableContainer}>
        {bidsToShow?.map((elem, index) => {
          return (
            <div
              className={classes.tableHeader}
              key={index}
              style={{
                borderBottom: "1px solid lightGray",
                padding: "10px 0px",
                margin: "0px 5%",
              }}
            >
              <span className={classes.tableContent}>
                {elem?.user_fk?.full_name}
              </span>
              <CustomToolTip
                title={currencyFormatInitials(elem?.price, auction?.currency)}
              >
                <span className={classes.tableContent}>
                  {getConcatenatedPrice(
                    `${currencyFormatInitials(elem?.price, auction?.currency)}`,
                    14
                  )}
                </span>
              </CustomToolTip>
              <span className={classes.tableContent}>
                {auction?.auction_type === "sub_unit"
                  ? elem?.sub_unit_share_percentage
                  : elem?.file_count}
              </span>
              <span className={classes.tableContent}>{elem?.id}</span>
              {currentUser?.id !== auctionDetail?.result?.user_fk?.id && (
                <Button sx={acceptSx} onClick={() => handleAcceptBid(elem)}>
                  {TextTranslation.acceptBid[langIndex]}
                </Button>
              )}
              {currentUser?.id !== auctionDetail?.result?.user_fk?.id && (
                <Button
                  sx={declineSx}
                  onClick={() => {
                    handleRejectBid(elem?.id);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {TextTranslation.declined[langIndex]}
                  </div>
                </Button>
              )}
            </div>
          );
        })}
        {bidsToShow?.length === 0 && (
          <NotFound label={TextTranslation.noBidsToShow[langIndex]} />
        )}
      </div>
    </div>
  );
};

export default UserAuctionDetails;
