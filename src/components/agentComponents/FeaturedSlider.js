import React from "react";
import { makeStyles } from "@mui/styles";

import { useSelector } from "react-redux";
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";
import FeaturedAgent from "./FeaturedAgent";
import Carousel from "better-react-carousel";

const useStyles = makeStyles(() => ({
  container: {
    flexDirection: "column",
    flex: 1,
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    padding: "20px 0px",
    cursor: "pointer",
    overflowY: "hidden",
  },
  inner: {
    whiteSpace: "nowrap",
    transition: "transform 0.3s",
  },
  dotsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0px",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#134696",
    margin: "0px 5px",
    cursor: "pointer",
  },
}));

/* FeaturedSlider is displayed under AgentTop, it is a carousel that
shows featured agents with their details, listings, image and location. */
const FeaturedSlider = ({ featuredAgents, setOpenMap, setSelectedAgent }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <Carousel
        cols={1}
        rows={1}
        gap={20}
        loop
        dotColorActive={darkMode ? "#0ed864" : "#134696"}
        dotColorInactive={darkMode ? "#48745b" : "#3e5a88"}
        scrollSnap
        hideArrow
        showDots
        mobileBreakpoint={100}
      >
        {featuredAgents?.map((elem, index) => (
          <Carousel.Item
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "red",
              justifyContent: "center",
            }}
          >
            <FeaturedAgent
              agent={elem}
              setOpenMap={setOpenMap}
              setSelectedAgent={setSelectedAgent}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedSlider;
