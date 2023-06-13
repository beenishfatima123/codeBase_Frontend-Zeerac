import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { AUCTION_SEPARATED_FILTERS } from "../../utils/constants";
import { useWindowDims } from "../../utils/useWindowDims";
import { useLocation, useSearchParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    border: "1px solid #c9c9c9",
    borderRadius: 20,
    transition: "width 0.5s",
  },
  "@media (max-width: 1024px)": {
    container: {
      margin: "10px 0px",
    },
  },
}));

/* AuctionSeparator is displayed under the main filter of auctions
page, it has options New, Top Trending and Most Popular.
It takes filter and its setter to decide auction filtering. */
const AuctionSeparator = ({ filter, setFilter }) => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { search } = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  const { darkMode, langIndex } = useSelector((state) => state.global);

  const getBtnColor = (elem) => {
    if (darkMode)
      return searchParams?.get("sort_by") === getSortType(elem[0])
        ? "#0ED864"
        : "white";
    else
      return searchParams?.get("sort_by") === getSortType(elem[0])
        ? "#134696"
        : "#9DAFBD";
  };
  const getSortQuery = (value) => {
    let sortQuery = "&sort_by=";
    switch (value) {
      case AUCTION_SEPARATED_FILTERS[0][0]:
        return sortQuery + "latest";
      case AUCTION_SEPARATED_FILTERS[1][0]:
        return sortQuery + "trending";
      case AUCTION_SEPARATED_FILTERS[2][0]:
        return sortQuery + "popular";
      default:
        return sortQuery + "latest";
    }
  };
  const getSortType = (value) => {
    switch (value) {
      case AUCTION_SEPARATED_FILTERS[0][0]:
        return "latest";
      case AUCTION_SEPARATED_FILTERS[1][0]:
        return "trending";
      case AUCTION_SEPARATED_FILTERS[2][0]:
        return "popular";
      default:
        return "latest";
    }
  };
  const handleClick = (value) => {
    const prevSortValue = searchParams?.get("sort_by");
    // console.log({ prevSortValue, search });
    if (!prevSortValue) setSearchParams(`${search}${getSortQuery(value)}`);
    else {
      setSearchParams(
        `${search?.replace(`sort_by=${prevSortValue}`, getSortQuery(value))}`
      );
    }
  };
  return (
    <div
      className={classes.container}
      style={{
        width: "100%",
      }}
    >
      <Grid container>
        {AUCTION_SEPARATED_FILTERS?.map((elem) => {
          return (
            <Grid
              item
              xs={6}
              sm={4}
              key={elem}
              sx={{
                borderBottom: width < 600 ? "1px solid #c9c9c9" : "none",
              }}
            >
              <Button
                fullWidth
                sx={{
                  color: getBtnColor(elem[0]),
                  textTransform: "none",
                  borderRadius: 20,
                  pl: 4,
                  pr: 4,
                  "&:hover": {
                    backgroundColor: "none",
                  },
                  position: "relative",
                  fontFamily:
                    searchParams?.get("sort_by") === getSortType(elem[0])
                      ? "heavy"
                      : "light",
                }}
                onClick={() => handleClick(elem[0])}
              >
                {elem[langIndex]}
                {searchParams?.get("sort_by") === getSortType(elem[0]) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.005"
                    height="9.38"
                    viewBox="0 0 18.005 9.38"
                    style={{
                      position: "absolute",
                      bottom: 0,
                    }}
                  >
                    <path
                      id="Path_25871"
                      data-name="Path 25871"
                      d="M109.077,2021.93h18.005l-9.38-9.38Z"
                      transform="translate(-109.077 -2012.55)"
                      fill={"#134696"}
                    />
                  </svg>
                )}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default AuctionSeparator;
