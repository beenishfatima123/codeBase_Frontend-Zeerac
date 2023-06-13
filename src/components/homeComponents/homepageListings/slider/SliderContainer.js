import React, { useMemo, useRef } from "react";
import { makeStyles } from "@mui/styles";
import PropertySliderCard from "./PropertySliderCard";
import { useSelector } from "react-redux";
import NotFound from "../../../globalComponents/NotFound";
import Carousel from "nuka-carousel";
import "./customSlider.css";
import { useWindowDims } from "../../../../utils/useWindowDims";
import CustomSliderContainer from "../../../globalComponents/customSlider/CustomSliderContainer";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0px",
    margin: "40px 0px",
    alignSelf: "center",
  },
}));
const SliderContainer = ({ properties, parentWidth }) => {
  const classes = useStyles();
  const sliderRef = useRef();
  const containerRef = useRef();
  const { width } = useWindowDims();

  const { darkMode } = useSelector((state) => state.global);

  const showStatic = useMemo(() => {
    if (properties?.length > 0) {
      if (parentWidth) {
        if (parentWidth > 1680) return properties?.length > 5 ? false : true;
        else if (parentWidth < 1680 && parentWidth > 1200)
          return properties?.length > 4 ? false : true;
        else if (parentWidth < 1200 && parentWidth > 950)
          return properties?.length > 3 ? false : true;
        else if (parentWidth < 950 && parentWidth > 600)
          return properties?.length > 2 ? false : true;
        else return false;
      } else {
        if (width > 1680) return properties?.length > 5 ? false : true;
        else if (width < 1680 && width > 1200)
          return properties?.length > 4 ? false : true;
        else if (width < 1200 && width > 950)
          return properties?.length > 3 ? false : true;
        else if (width < 950 && width > 600)
          return properties?.length > 2 ? false : true;
        else return false;
      }
    } else return true;
  }, [properties, width, parentWidth]);

  const slidesToShow = useMemo(() => {
    if (properties?.length > 0) {
      if (parentWidth) {
        if (parentWidth > 1680)
          return properties?.length > 5 ? 5 : properties?.length - 1;
        else if (parentWidth < 1680 && parentWidth > 1200)
          return properties?.length > 4 ? 4 : properties?.length - 1;
        else if (parentWidth < 1200 && parentWidth > 950)
          return properties?.length > 3 ? 3 : properties?.length - 1;
        else if (parentWidth < 950 && parentWidth > 600)
          return properties?.length > 2 ? 2 : properties?.length - 1;
        else return 1;
      } else {
        if (width > 1680)
          return properties?.length > 5 ? 5 : properties?.length - 1;
        else if (width < 1680 && width > 1200)
          return properties?.length > 4 ? 4 : properties?.length - 1;
        else if (width < 1200 && width > 950)
          return properties?.length > 3 ? 3 : properties?.length - 1;
        else if (width < 950 && width > 600)
          return properties?.length > 2 ? 2 : properties?.length - 1;
        else return 1;
      }
    } else return 1;
  }, [properties, width, parentWidth]);
  // console.log({ slidesToShow, props: properties?.length });
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#303134" : "",
        // width: (slidesToShow + 1) * 305,
        // maxWidth: "100%",
      }}
      ref={containerRef}
    >
      {showStatic ? (
        <CustomSliderContainer properties={properties} />
      ) : (
        <Carousel
          innerRef={sliderRef}
          slidesToShow={slidesToShow}
          cellSpacing={0}
          cellAlign="center"
          wrapAround={true}
          renderCenterLeftControls={null}
          renderCenterRightControls={null}
          // slideIndex={properties?.length >= 2 ? 1 : 0}
          defaultControlsConfig={{
            pagingDotsContainerClassName: "dots-container-custom",
            pagingDotsStyle: {
              fill: darkMode ? "#0ed864" : "#134696",
            },
          }}
        >
          {properties?.map((elem, index) => (
            <PropertySliderCard key={index} property={elem} />
          ))}
          {properties?.length === 0 && <NotFound label="No properties found" />}
        </Carousel>
      )}
    </div>
  );
};

export default SliderContainer;
