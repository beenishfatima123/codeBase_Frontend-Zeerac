import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import AuctionSeparator from "./AuctionSeparator";
import AuctionCard from "./AuctionCard";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import Pagination from "../globalComponents/Pagination";
import { useDispatch, useSelector } from "react-redux";
import ComponentLoader from "../globalComponents/ComponentLoader";
import {
  getAllAuctions,
  paginateAuctions,
} from "../../redux/slices/auctionSlice";
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";
import NotFound from "../globalComponents/NotFound";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 5%",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    margin: "auto",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* AuctionTrading is simply the component displaying the resulting
auctions after a search or filter query.  */
const AuctionTrading = ({ selectedFilter, searchQuery }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { search } = useLocation();

  const { allAuctionsData, allAuctionsDataApiInfo, queryAuctionData } =
    useSelector((state) => state.auction);

  /* getAuctionType takes filter and uses it to decide which auction type to display. */
  // const getAuctionType = (filter) => {
  //   switch (filter) {
  //     case AUCTION_FILTERS[0][0]:
  //       return "single";
  //     case AUCTION_FILTERS[1][0]:
  //       return "bulk";
  //     case AUCTION_FILTERS[2][0]:
  //       return "sub_unit";
  //     default:
  //       return "single";
  //   }
  // };

  const paginateAuction = (url) => {
    dispatch(
      paginateAuctions({
        url,
      })
    );
  };

  /* handlePageSelect assists in generating a new link to paginate
  to when user changes pages, it takes the pageNumber and decides which
  page to navigate. */
  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (allAuctionsData?.result?.next)
      pageSplit = allAuctionsData?.result?.next?.split("page=");
    else pageSplit = allAuctionsData?.result?.previous?.split("page=");
    if (pageSplit?.length > 2) {
      newLink = `${pageSplit[0]}page=${pageNumber}${pageSplit[1]?.substring(
        pageSplit[1]?.indexOf("&"),
        pageSplit[1]?.length
      )}`;
    } else if (pageSplit[0].includes("?")) {
      newLink = `${pageSplit[0]}page=${pageNumber}`;
    } else {
      newLink = `${pageSplit[0]}?page=${pageNumber}`;
    }
    paginateAuction(newLink.replace("http", "https"));
  };

  /* auctionsToShow is the list of auctions that are shortlisted
  after the search query has run. */
  const auctionsToShow = useMemo(() => {
    if (searchQuery?.length === 0) {
      return allAuctionsData;
    } else if (searchQuery?.length >= 3 && queryAuctionData) {
      return queryAuctionData;
    } else {
      return allAuctionsData;
    }
    // eslint-disable-next-line
  }, [queryAuctionData, allAuctionsData]);

  /* this useEffect gets auctions from the store when either query, filter,
  or sorting is changed. */
  useEffect(() => {
    // console.log({ search });
    if (search && search?.length > 0) {
      dispatch(getAllAuctions(search));
    }
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className={classes.container}>
      <AuctionSeparator />
      <>
        {auctionsToShow?.result?.results?.length > 0 ? (
          <Grid container columnSpacing={2}>
            {allAuctionsDataApiInfo?.loading ? (
              <ComponentLoader />
            ) : (
              <>
                {auctionsToShow?.result?.results?.map((elem, index) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                    <AuctionCard auction={elem} />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        ) : (
          <NotFound label={"No Record Found"} />
        )}
        {auctionsToShow?.result?.results?.length > 0 && (
          <Pagination
            data={auctionsToShow?.result}
            page={handlePageSelect}
            paginate={paginateAuction}
          />
        )}
      </>
    </div>
  );
};

export default AuctionTrading;
