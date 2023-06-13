import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { useRef } from "react";
import { useWindowDims } from "../../../utils/useWindowDims";
import Carousel from "nuka-carousel";
import "./customSlider.css";
import NotFound from "../../globalComponents/NotFound";
import { CONTENT_WIDTH } from "../../../utils/constants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    width: CONTENT_WIDTH,
    maxWidth: "98%",
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0px",
    margin: "40px 0px",
  },
  blogText: {
    fontSize: 25,
    color: "#134696",
    fontWeight: "bold",
  },
}));

/* A carousel to display blogs on the zSphere blogs page. */
const BlogsSlider = ({ blogs, parentWidth, title }) => {
  const classes = useStyles();
  const sliderRef = useRef();
  const { width } = useWindowDims();

  const { darkMode } = useSelector((state) => state.global);

  /* slidesToShow will store the blog slides which will be displayed in the carousel. */
  const slidesToShow = useMemo(() => {
    if (blogs?.length > 0) {
      if (parentWidth) {
        if (parentWidth > 1680)
          return blogs?.length > 5 ? 5 : blogs?.length - 1;
        else if (parentWidth < 1680 && parentWidth > 1200)
          return blogs?.length > 4 ? 4 : blogs?.length - 1;
        else if (parentWidth < 1200 && parentWidth > 950)
          return blogs?.length > 3 ? 3 : blogs?.length - 1;
        else if (parentWidth < 950 && parentWidth > 600)
          return blogs?.length > 2 ? 2 : blogs?.length - 1;
        else return 1;
      } else {
        if (width > 1680) return blogs?.length > 5 ? 5 : blogs?.length - 1;
        else if (width < 1680 && width > 1200)
          return blogs?.length > 4 ? 4 : blogs?.length - 1;
        else if (width < 1200 && width > 950)
          return blogs?.length > 3 ? 3 : blogs?.length - 1;
        else if (width < 950 && width > 600)
          return blogs?.length > 2 ? 2 : blogs?.length - 1;
        else return 1;
      }
    } else return 1;
  }, [blogs, width, parentWidth]);

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#303134" : "",
      }}
    >
      <p className={classes.blogText}>{title || "Latest Blogs"}</p>
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
        {blogs?.map((elem, index) => (
          <BlogCard key={index} blog={elem} />
        ))}
        {blogs?.length === 0 && <NotFound label="No Blogs found" />}
      </Carousel>
    </div>
  );
};

export default BlogsSlider;
