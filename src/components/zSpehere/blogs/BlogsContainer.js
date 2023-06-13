import React, { useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBlogs, getBlog } from "../../../redux/slices/newsSlice";
import { useMemo } from "react";
import TopFilter from "../news/rightSide/TopFilter";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import BlogsShowcase from "./BlogsShowcase";
import { CONTENT_WIDTH } from "../../../utils/constants";
import { useParams } from "react-router-dom";
import DetailsNewsContainer from "../news/details/DetailsNewsContainer";
import BlogsSlider from "./BlogsSlider";
import { useWindowDims } from "../../../utils/useWindowDims";
import useDebounceSearch from "../../../utils/hooks/useDebounceSearch";
import { searchBlogs } from "../../../api/socialApi";
import NotFound from "../../globalComponents/NotFound";

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "20px 0px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    width: CONTENT_WIDTH,
    maxWidth: "98%",
    alignSelf: "center",
    minHeight: "70vh",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 16,
    maxWidth: "98%",
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    maxWidth: "400px",
  },
  postContainer: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
    rightSide: {
      width: "100%",
    },
    contentContainer: {
      width: "100%",
    },
  },
}));

/* BlogsContainer renders all blog components when zSphere blogs are clicked. It displays blogs as grid of cards. */
const BlogsContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const sliderContainerRef = useRef(null);
  const { width } = useWindowDims();
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0);

  const { allBlogs, newsApiInfo, selectedBlog, blogsSearch } = useSelector(
    (state) => state.news
  );
  const { loading, searchResult } = useDebounceSearch(blogsSearch, searchBlogs);

  /* showCase stores all the blogs resulting from the API get request. */
  const showcase = useMemo(() => {
    if (allBlogs?.result?.results?.length) return allBlogs?.result?.results[0];
  }, [allBlogs]);

  /* this useEffect gets specific blog through dispatch ->getBlog. */
  useEffect(() => {
    // console.log({ params });
    if (params?.id) {
      dispatch(getBlog({ id: params?.id }));
    }
    // eslint-disable-next-line
  }, [params?.id]);
  
  /* this useEffect gets all the blogs from store. */
  useEffect(() => {
    // // console.log({ allNews });
    if (!allBlogs) {
      // // console.log("sending request");
      dispatch(getAllBlogs());
    }
    // eslint-disable-next-line
  }, [allBlogs]);

  /* set width of slider container using */
  useEffect(() => {
    setSliderContainerWidth(sliderContainerRef?.current?.offsetWidth);
  }, [width]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        {selectedBlog && params?.id ? (
          <DetailsNewsContainer story={selectedBlog} blog />
        ) : (
          <div className={classes.contentContainer} ref={sliderContainerRef}>
            <>
              <TopFilter
                blogs
                label={
                  blogsSearch?.length > 2
                    ? !loading
                      ? `Showing ${searchResult?.result?.count} results`
                      : "Searching..."
                    : null
                }
              />
              {newsApiInfo?.loadingAllBlogs || loading ? (
                <ComponentLoader />
              ) : (
                <>
                  {blogsSearch?.length > 2 ? (
                    <>
                      {searchResult?.result?.count > 0 ? (
                        <>
                          {searchResult?.result?.results?.map((elem, index) => (
                            <BlogsShowcase blog={elem} key={index} />
                          ))}
                        </>
                      ) : (
                        <NotFound label="No Blogs Found" />
                      )}
                    </>
                  ) : (
                    <>
                      <BlogsShowcase blog={showcase} />
                      <BlogsShowcase blog={showcase} reverse />
                      <BlogsSlider
                        blogs={allBlogs?.result?.results}
                        parentWidth={sliderContainerWidth}
                      />
                    </>
                  )}
                </>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsContainer;
