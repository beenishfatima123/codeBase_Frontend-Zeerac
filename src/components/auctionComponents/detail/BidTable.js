import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import { Avatar, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import TableRow from "@mui/material/TableRow";
import {
  //useNavigate,
  useParams,
} from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { AUCTION_TYPE, BID_STATUS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  acceptABid,
  getAuctionBids,
  paginateAuctions,
  rejectABid,
  //resetAuctionsApi,
  resetBidsApi,
  resetRejectedBidApi,
} from "../../../redux/slices/auctionSlice";
import { TextTranslation } from "../../../utils/translation";
import moment from "moment/moment";
import { currencyFormatInitials } from "../../../utils/helperFunctions";
import Pagination from "../../globalComponents/Pagination";
import NotFound from "../../globalComponents/NotFound";

const singleFileColumns = [
  ["Name", "Name"],
  ["Bid Amount", "Bid Amount"],
  ["Date", "Date"],
  ["", "", "", ""],
  ["", "", "", ""],
];

const bulkFileColumns = [
  ["Name", "Name"],
  ["Bid Amount", "Bid Amount"],
  ["No. of Files", "No. of Files"],
  ["Date", "Date"],
  ["", "", "", ""],
  ["", "", "", ""],
];

const useStyles = makeStyles(() => ({
  data: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
  },
  description: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
    height: 50,
    overflow: "hidden",
    textAlign: "center",
  },
  accept: {
    backgroundColor: "#0ed864",
    color: "#fff",
    fontSize: 12,
    fontFamily: "light",
    cursor: "pointer",
    border: "none",
    borderRadius: 5,
    height: 30,
    width: 100,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#0ed864",
    },
  },
  decline: {
    backgroundColor: "red",
    color: "#fff",
    fontSize: 12,
    fontFamily: "light",
    cursor: "pointer",
    border: "none",
    borderRadius: 5,
    height: 30,
    width: 100,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

const acceptSx = {
  backgroundColor: "#0ed864",
  color: "#fff",
  fontSize: 12,
  fontFamily: "light",
  cursor: "pointer",
  border: "none",
  height: 30,
  width: 100,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#0ed864",
  },
};
const declineSx = {
  backgroundColor: "red",
  color: "#fff",
  fontSize: 12,
  fontFamily: "light",
  cursor: "pointer",
  border: "none",
  height: 30,
  width: 100,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "red",
  },
};

/* bidTable is created to display the list of bids on the auction.
It shows the bidder and bid amount. Accept and decline buttons are also 
visible to auction creator. */
const BidTable = () => {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const { langIndex } = useSelector((state) => state.global);
  const {
    auctionDetail,
    auctionBidsApiInfo,
    rejectBidApiInfo,
    //allAuctionsDataApiInfo,
    auctionBids,
  } = useSelector((state) => state.auction);
  // console.log({ auctionBids });
  //console.log({ allAuctionsDataApiInfo });

  useEffect(() => {
    dispatch(
      getAuctionBids({
        auctionId: params?.id,
        token: currentUser?.token,
      })
    );
    // eslint-disable-next-line
  }, [params?.id]);

  const cols = useMemo(() => {
    // console.log({ auctionDetail, type: auctionDetail?.result?.auction_type });
    if (auctionDetail?.result?.auction_type === AUCTION_TYPE?.single)
      return singleFileColumns;
    else if (auctionDetail?.result?.auction_type === AUCTION_TYPE?.bulk)
      return bulkFileColumns;
    else return singleFileColumns;
  }, [auctionDetail]);
  const bidsToShow = useMemo(() => {
    return auctionBids?.result?.results?.filter(
      (el) => el?.status === BID_STATUS?.pending
    );
  }, [auctionBids]);
  const paginateAuction = (url) => {
    dispatch(
      paginateAuctions({
        url,
      })
    );
  };
  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (auctionBids?.result?.next)
      pageSplit = auctionBids?.result?.next?.split("page=");
    else pageSplit = auctionBids?.result?.previous?.split("page=");
    if (pageSplit?.length > 2) {
      newLink = `${pageSplit[0]}&status=pending&auction_id=${
        params?.id
      }page=${pageNumber}${pageSplit[1]?.substring(
        pageSplit[1]?.indexOf("&"),
        pageSplit[1]?.length
      )}`;
    } else if (pageSplit[0].includes("?")) {
      newLink = `${pageSplit[0]}page=${pageNumber}`;
    } else {
      newLink = `${pageSplit[0]}auction_id=${params?.id}&status=pending?page=${pageNumber}`;
    }
    paginateAuction(newLink.replace("http", "https"));
  };

  const getBidFormData = (bid) => {
    const formData = new FormData();
    formData?.append("property_biding_fk", bid?.id);

    return formData;
  };

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

  //console.log({ auctionDetail });

  useEffect(() => {
    if (auctionBidsApiInfo?.response) {
      toast.success(TextTranslation.bidAccepted[langIndex], {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetBidsApi());
    }
    // eslint-disable-next-line
  }, [auctionBidsApiInfo?.response, auctionBids]);

  useEffect(() => {
    if (rejectBidApiInfo?.response) {
      toast.success("Bid Rejected", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetRejectedBidApi());
    }
    // eslint-disable-next-line
  }, [rejectBidApiInfo?.response, auctionBids]);

  return (
    <>
      {auctionBidsApiInfo?.loading ? (
        <ComponentLoader />
      ) : bidsToShow?.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            mt: 2,
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                borderTop: "1.5px solid #0ed864",
                borderBottom: "1.5px solid #0ed864",
              }}
            >
              <TableRow>
                {cols?.map((item, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      color: "#134696",
                      fontSize: 17,
                      fontFamily: "medium",
                    }}
                  >
                    {item[langIndex]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {bidsToShow?.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "1px solid #8b8b8b" }}
                  >
                    <TableCell align="center">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Avatar
                          src={row?.user_fk?.photo}
                          sx={{ width: 50, height: 50, marginRight: 3 }}
                        />
                        <div className={classes.data}>
                          {row?.user_fk?.full_name}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      <div className={classes.data}>
                        {currencyFormatInitials(row?.price, row?.currency)}
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      <div className={classes.data}>{row?.file_count}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div className={classes.data}>
                        {moment(row?.updated_at).format("L")}
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      {currentUser?.id ===
                        auctionDetail?.result?.user_fk?.id && (
                        <Button
                          sx={acceptSx}
                          onClick={() => {
                            handleAcceptBid(row);
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: 14, marginRight: 0.5 }}
                            />
                            {TextTranslation.accept[langIndex]}
                          </div>
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {currentUser?.id ===
                        auctionDetail?.result?.user_fk?.id && (
                        <Button
                          sx={declineSx}
                          onClick={() => {
                            handleRejectBid(row?.id);
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CancelOutlinedIcon
                              sx={{ fontSize: 14, marginRight: 0.5 }}
                            />
                            {TextTranslation.declined[langIndex]}
                          </div>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {bidsToShow.length > 10 && (
            <Pagination
              data={bidsToShow?.result}
              page={handlePageSelect}
              paginate={paginateAuction}
            />
          )}
        </TableContainer>
      ) : (
        <NotFound label="No Bids Found" />
      )}
    </>
  );
};

export default BidTable;
