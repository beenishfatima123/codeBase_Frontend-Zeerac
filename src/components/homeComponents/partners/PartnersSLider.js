import React from "react";
import { makeStyles } from "@mui/styles";
import Slider from "react-slick";
import { PARTNER_LOGOS } from "../../../utils/constants";
import { Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useMemo } from "react";
import { getAllPartners } from "../../../redux/slices/partnersSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextTranslation } from "../../../utils/translation";

export const sliderSettings = {
  className: "center",
  centerPadding: "60px",
  slidesToShow: 3,
  slidesToScroll: 1,
  rows: 2,
  lazyLoad: false,
  infinite: true,
  swipeToSlide: true,
  arrows: false,
  useCSS: true,
  style: {
    height: "100%",
    width: "100%",
  },
  dots: true,
  appendDots: (dots) => (
    <div>
      <div
        style={{
          height: 1,
          backgroundColor: "#d0d0d0",
          margin: "0px 5%",
          width: "90%",
        }}
      ></div>
      <ul style={{ margin: "0px" }}> {dots} </ul>
    </div>
  ),
  responsive: [
    {
      breakpoint: 925,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0px",
    position: "relative",
  },
  border: {
    height: 1,
    backgroundColor: "#d0d0d0",
    margin: "20px 0px",
    width: "90%",
  },
  image: {
    width: 300,
    height: 195,
    objectFit: "scale-down",
  },
  dotsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: "10px 5%",
  },
  view: {
    fontSize: 18,
    color: "#134696",
  },
}));
const PartnersSlider = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hovering, setHovering] = useState(null);

  const allPartners = useSelector((state) => state.partners.allPartners);
  const { darkMode, langIndex } = useSelector((state) => state.global);

  const dataToShow = useMemo(() => {
    // // console.log({ allPartners });
    if (allPartners)
      if (allPartners?.result?.results?.length > 6)
        return allPartners?.result?.results;
      else
        return [
          ...allPartners?.result?.results,
          ...PARTNER_LOGOS?.slice(
            0,
            PARTNER_LOGOS?.length - allPartners?.result?.results?.length
          ),
        ];
  }, [allPartners]);
  useEffect(() => {
    // // console.log({ allPartners });
    if (!allPartners) {
      // // console.log("sending request");
      dispatch(getAllPartners());
    }
    // eslint-disable-next-line
  }, [allPartners]);

  const getBottomBorder = (index) => {
    return index % 2 === 0 ? "1px solid #d0d0d0 !important" : "none";
  };
  const getLogo = (logo, index) => {
    if (logo) return `${logo}`;
    else return `${PARTNER_LOGOS[index]}`;
  };
  return (
    <div className={classes.container}>
      <div className={classes.border}></div>
      <Slider {...sliderSettings}>
        {dataToShow?.map((elem, index) => (
          <Box
            onMouseEnter={() => setHovering(index)}
            onMouseLeave={() => setHovering(null)}
            sx={{
              borderBottom: getBottomBorder(index),
              display: "flex !important",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid #d0d0d0",
              cursor: "pointer",
              minHeight: 215,
            }}
            onClick={() => navigate(`/partner/${elem?.id}`)}
            key={index}
          >
            <img
              src={getLogo(elem?.company_logo, index)}
              className={classes.image}
              style={{
                WebkitFilter:
                  hovering === index
                    ? "none"
                    : "grayscale(100%)" /* Safari 6.0 - 9.0 */,
                filter: hovering === index ? "none" : "grayscale(100%)",
              }}
              alt=""
            />
            {hovering === index && (
              <span
                className={classes.view}
                style={{
                  color: darkMode ? "white" : "#134696",
                }}
              >
                VIEW PROJECTS
              </span>
            )}
          </Box>
        ))}
      </Slider>
      <Button
        sx={{
          background:
            "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
          textTransform: "none",
          color: "#134696",

          position: "absolute",
          right: "5%",
          bottom: -50,
          borderRadius: 0,
        }}
        endIcon={<ArrowForwardIcon style={{ color: "#134696" }} />}
        onClick={() => navigate(`/partners`)}
      >
        {TextTranslation.viewAll[langIndex]}
      </Button>
    </div>
  );
};

export default PartnersSlider;
