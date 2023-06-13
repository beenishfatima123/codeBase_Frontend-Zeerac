import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import TopSection from "./TopSection";
import TitleContainer from "./TitleContainer";
import moment from "moment";
import { CONTENT_WIDTH } from "../../../../utils/constants";
import parse from "html-react-parser";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import { useSelector } from "react-redux";
import BlogsSlider from "../../blogs/BlogsSlider";
import { useWindowDims } from "../../../../utils/useWindowDims";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  contentContainer: {
    width: CONTENT_WIDTH,
    maxWidth: "100%",
    alignSelf: "center",
  },
  userContainer: {
    display: "flex",
    flex: 1,
    margin: "8px 2%",
    alignItems: "center",
  },
  user: {
    fontSize: 18,
    color: "#6B7B88",
    textTransform: "capitalize",
  },
  time: {
    fontSize: 18,
    color: "#6B7B88",
    margin: "0px 20px",
  },
  content: {
    margin: "8px 2%",
    display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    wordBreak: "break-word",
  },
}));

/* get story and blog and display content with header and top section. */
const DetailsNewsContainer = ({ story, blog }) => {
  const classes = useStyles();
  const sliderContainerRef = useRef(null);
  const { width } = useWindowDims();
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0);

  /* setting slider container width based on width value. */
  const { allBlogs, newsApiInfo } = useSelector((state) => state.news);
  useEffect(() => {
    setSliderContainerWidth(sliderContainerRef?.current?.offsetWidth);
  }, [width]);
  // console.log({ content: story?.content });
  return (
    <div className={classes.container} ref={sliderContainerRef}>
      {newsApiInfo?.loadingStory ? (
        <ComponentLoader />
      ) : (
        <div className={classes.contentContainer}>
          <TopSection story={story} />
          <TitleContainer story={story} blog={blog} />
          <div className={classes.userContainer}>
            <span className={classes.user}>{story?.author?.full_name}</span>
            <p className={classes.time}>
              {moment(story?.updated_at).format("DD MMMM YYYY")}
            </p>
          </div>
          <div className={classes.content}>
            {story?.content ? parse(story?.content) : ""}
          </div>
        </div>
      )}
      {blog && (
        <BlogsSlider
          blogs={allBlogs?.result?.results}
          parentWidth={sliderContainerWidth}
          title={"Related Blogs"}
        />
      )}
    </div>
  );
};

export default DetailsNewsContainer;
