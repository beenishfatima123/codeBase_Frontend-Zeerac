import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import TopSection from "../../components/auctionComponents/TopSection";
import { useState } from "react";
import AddContainer from "../../components/auctionComponents/AddContainer";
import AuctionFilters from "../../components/auctionComponents/AuctionFilters";
import Searchbar from "../../components/globalComponents/misc/Searchbar";
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";
import ExtendedFilters from "../../components/auctionComponents/ExtendedFilters";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../utils/translation";
import { useLocation, useSearchParams } from "react-router-dom";
import AuctionTrading from "../../components/auctionComponents/AuctionTrading";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

const Auctions = () => {
  const classes = useStyles();
  const { search } = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  const [hovering, setHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { langIndex } = useSelector((state) => state.global);

  const searchFromParams = useMemo(
    () => searchParams?.get("search"),
    [searchParams]
  );
  useEffect(() => {
    if (searchQuery?.length >= 3) delayedSearch(searchQuery);
    else {
      setSearchParams(`${search?.replace(`&search=${searchFromParams}`, ``)}`);
    }
    // eslint-disable-next-line
  }, [searchQuery]);

  const delayedSearch = useMemo(
    () => debounce((query) => searchAuctions(query, search), 500),
    // eslint-disable-next-line
    [search, searchParams]
  );
  const searchAuctions = async (query, prevSearch) => {
    const prevSearchValue = searchParams?.get("search");

    if (!prevSearchValue) setSearchParams(`${prevSearch}&search=${query}`);
    else
      setSearchParams(
        `${search?.replace(`search=${prevSearchValue}`, `&search=${query}`)}`
      );
  };

  return (
    <div className={classes.container}>
      <TopSection />
      <AddContainer hovering={hovering} setHovering={setHovering} />
      <AuctionFilters />
      <Searchbar
        style={{
          margin: "20px auto",
          width: HEADER_CONTENT_WIDTH,
          maxWidth: "90%",
        }}
        placeholder={TextTranslation.trading[langIndex]}
        searchQuery={searchFromParams || searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ExtendedFilters />
      <AuctionTrading />
    </div>
  );
};

export default Auctions;
