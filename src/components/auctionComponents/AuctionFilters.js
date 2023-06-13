import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { AUCTION_FILTERS, HEADER_CONTENT_WIDTH } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: 190,
    justifyContent: "space-between",
    cursor: "pointer",
  },
  heading: {
    fontSize: 24,
    fontFamily: "heavy",
    marginTop: 20,
    marginLeft: "5%",
    color: "white",
    textTransform: "uppercase",
  },
}));

/* AuctionFitlers are on under the addContainer on trading page.
It displays options to select which type of trading the user
want to select. */
const AuctionFilters = ({ selectedFilter, setSelectedFilter }) => {
  const classes = useStyles();
  let [searchParams, setSearchParams] = useSearchParams();

  const { langIndex } = useSelector((state) => state.global);

  const getAuctionType = (filter) => {
    switch (filter) {
      case AUCTION_FILTERS[0][0]:
        return "single";
      case AUCTION_FILTERS[1][0]:
        return "bulk";
      case AUCTION_FILTERS[2][0]:
        return "sub_unit";
      default:
        return "single";
    }
  };

  return (
    <Grid
      container
      sx={{
        padding: "10px 0%",
        width: HEADER_CONTENT_WIDTH,
        maxWidth: "90%",
        margin: "auto",
      }}
      columnSpacing={2}
    >
      {AUCTION_FILTERS?.map((elem, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div
              className={classes.container}
              style={{
                background:
                  searchParams?.get("auction_type") === getAuctionType(elem[0])
                    ? "linear-gradient(90deg, rgba(19,70,150,1) 0%, rgba(10,35,75,1) 30%, rgba(10,35,75,1) 100%)"
                    : "#BEBEBE",
              }}
              onClick={() =>
                setSearchParams({
                  auction_type: getAuctionType(elem[0]),
                  sort_by: "latest",
                })
              }
            >
              <span className={classes.heading}>{elem[langIndex]}</span>
              {searchParams?.get("auction_type") === getAuctionType(elem[0]) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="424.013"
                  height="89.328"
                  viewBox="0 0 424.013 89.328"
                  style={{ maxWidth: "100%" }}
                >
                  <defs>
                    <linearGradient
                      id="linear-gradient1"
                      x1="0.037"
                      y1="-0.321"
                      x2="0.983"
                      y2="1.201"
                      gradientUnits="objectBoundingBox"
                    >
                      <stop offset="0" stopColor="#0ed864" stopOpacity="0" />
                      <stop offset="0.527" stopColor="#0ed864" />
                      <stop offset="1" stopColor="#0ed864" />
                    </linearGradient>
                  </defs>
                  <g
                    id="Group_5947"
                    data-name="Group 5947"
                    transform="translate(-82.388 143.844) rotate(180)"
                  >
                    <path
                      id="Path_43"
                      data-name="Path 43"
                      d="M-53.692,87.5V95h-92.78a55,55,0,0,1-43.561-22.179L-203.179,55.1a55.037,55.037,0,0,0-43.549-22.179l-6.435-.058-158.662.1a54.624,54.624,0,0,0,1.278-7.462h167.6A55.094,55.094,0,0,1-199.4,47.694l13.135,17.672a55.025,55.025,0,0,0,43.584,22.168Z"
                      transform="translate(-94.576 29.012)"
                      fill="url(#linear-gradient1)"
                    />
                    <path
                      id="Path_44"
                      data-name="Path 44"
                      d="M64.61,99.984v7.45H-100.44a54.762,54.762,0,0,1-43.407-22.168l-13.1-17.683A54.741,54.741,0,0,0-199.8,45.416H-315.913a54.451,54.451,0,0,0,3.6-7.416h115.768a54.808,54.808,0,0,1,43.373,22.168l13.085,17.683a54.82,54.82,0,0,0,43.419,22.237Z"
                      transform="translate(-146.998 36.409)"
                      fill="url(#linear-gradient1)"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="93"
                  height="10"
                  viewBox="0 0 93 10"
                  style={{ alignSelf: "flex-end", margin: 20 }}
                >
                  <g id="Indikator" transform="translate(0.177 0.017)">
                    <rect
                      id="Vector_3"
                      data-name="Vector 3"
                      width="50"
                      height="10"
                      rx="5"
                      transform="translate(-0.177 -0.017)"
                      fill="#fff"
                    />
                    <rect
                      id="Vector_2"
                      data-name="Vector 2"
                      width="10"
                      height="10"
                      rx="5"
                      transform="translate(61.823 -0.017)"
                      fill="#dcdfe3"
                    />
                    <rect
                      id="Vector_1"
                      data-name="Vector 1"
                      width="10"
                      height="10"
                      rx="5"
                      transform="translate(82.823 -0.017)"
                      fill="#dcdfe3"
                    />
                  </g>
                </svg>
              )}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AuctionFilters;
