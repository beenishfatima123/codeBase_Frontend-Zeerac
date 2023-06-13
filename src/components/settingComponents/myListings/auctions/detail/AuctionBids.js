import moment from "moment/moment";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import NotFound from "../../../../globalComponents/NotFound";
import Pagination from "../../../../globalComponents/Pagination";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";
import { currencyFormatInitials } from "../../../../../utils/helperFunctions";
import {
  getUserAuctionBids,
  paginateAuctions,
} from "../../../../../redux/slices/auctionSlice";
import {
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Avatar,
  Table,
  Paper,
} from "@mui/material";

const cols = [
  ["Name", "Name"],
  ["Bid Amount", "Bid Amount"],
  ["Date", "Date"],
  ["Status", "Status"],
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
  status: {
    fontSize: 14,
    fontFamily: "light",
    color: "#fff",
    padding: "10px 0",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "capitalize",
  },
}));

const ActionBids = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { langIndex } = useSelector((state) => state.global);
  const { showAuctionDetail, userAuctionBidsApiInfo, userAuctionBids } =
    useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(
      getUserAuctionBids({
        auctionId: showAuctionDetail?.id,
        //userId: showAuctionDetail?.user_fk?.id,
        token: currentUser?.token,
      })
    );
    // eslint-disable-next-line
  }, [showAuctionDetail]);

  /* paginateAuctions takes url, it goes to next auctions list. */
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
    if (userAuctionBids?.result?.next)
      pageSplit = userAuctionBids?.result?.next?.split("page=");
    else pageSplit = userAuctionBids?.result?.previous?.split("page=");
    if (pageSplit?.length > 2) {
      newLink = `${pageSplit[0]}auction_id=${
        showAuctionDetail?.id
      }page=${pageNumber}${pageSplit[1]?.substring(
        pageSplit[1]?.indexOf("&"),
        pageSplit[1]?.length
      )}`;
    } else if (pageSplit[0].includes("?")) {
      newLink = `${pageSplit[0]}&page=${pageNumber}`;
    } else {
      newLink = `${pageSplit[0]}auction_id=${showAuctionDetail?.id}&page=${pageNumber}`;
    }
    paginateAuction(newLink.replace("http", "https"));
  };

  return (
    <>
      {userAuctionBidsApiInfo?.loading ? (
        <ComponentLoader />
      ) : userAuctionBids?.result?.count > 0 ? (
        <TableContainer component={Paper} sx={{ boxShadow: "none", my: 3 }}>
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
              {userAuctionBids?.result?.results?.map((row, index) => {
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
                      <div className={classes.data}>
                        {moment(row?.updated_at).format("L")}
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      {currentUser?.id === showAuctionDetail?.user_fk?.id && (
                        <div
                          className={classes.status}
                          style={{
                            backgroundColor:
                              row?.status === "pending"
                                ? "#134696"
                                : row?.status === "accepted"
                                ? "#0ed864"
                                : "red",
                          }}
                        >
                          {row?.status}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {userAuctionBids?.result?.count > 10 && (
            <Pagination
              data={userAuctionBids?.result}
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

export default ActionBids;
