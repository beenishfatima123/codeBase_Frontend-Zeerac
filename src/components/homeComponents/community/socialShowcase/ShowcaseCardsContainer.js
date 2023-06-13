import React from "react";
import { makeStyles } from "@mui/styles";
import Slider from "react-slick";
import ShowcaseCard from "./ShowcaseCard";
import { SOCIAL_SHOWCASE_SLIDER_SETTINGS } from "../../../../utils/constants";
import { IconButton } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRef } from "react";
import { useWindowDims } from "../../../../utils/useWindowDims";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0px",
    width: "100%",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
}));
const ShowcaseCardsContainer = () => {
  const classes = useStyles();
  const sliderRef = useRef();
  const { width } = useWindowDims();
  return (
    <div
      className={classes.container}
      style={{ width: width > 900 ? width * 0.4 : width }}
    >
      <Slider {...SOCIAL_SHOWCASE_SLIDER_SETTINGS} ref={sliderRef}>
        {[...Array(12)]?.map((elem, index) => (
          <ShowcaseCard key={index} />
        ))}
      </Slider>
      <div className={classes.btnContainer}>
        <IconButton
          sx={{
            backgroundColor: "#134696",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            "&:hover": {
              backgroundColor: "#134696",
            },
          }}
          onClick={() => sliderRef?.current?.slickPrev()}
        >
          <ArrowBackIosNewIcon
            style={{
              color: "white",
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "white",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            ml: 2,
          }}
          onClick={() => sliderRef?.current?.slickNext()}
        >
          <ArrowForwardIos
            style={{
              color: "#134696",
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ShowcaseCardsContainer;
