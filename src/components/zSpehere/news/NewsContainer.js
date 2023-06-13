import React from "react";
import { makeStyles } from "@mui/styles";
import LatestNews from "./latestNews/LatestNews";
import TopFilter from "./rightSide/TopFilter";
import NewsShowcase from "./rightSide/NewsShowcase";
import PopularNews from "./rightSide/PopularNews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllNews,
  getLatestNews,
  getNewsStory,
  setSelectedStory,
} from "../../../redux/slices/newsSlice";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { useMemo } from "react";
import DetailsNewsContainer from "./details/DetailsNewsContainer";
import { useParams } from "react-router-dom";
import { CONTENT_WIDTH } from "../../../utils/constants";
import { searchNews } from "../../../api/socialApi";
import NotFound from "../../globalComponents/NotFound";
import useDebounceSearch from "../../../utils/hooks/useDebounceSearch";

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
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    width: CONTENT_WIDTH,
    maxWidth: "98%",
    alignSelf: "center",
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "70%",
    maxWidth: "850px",
    margin: "20px 15px",
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
    leftSide: {
      width: "98%",
      margin: "16px 0px",
    },
  },
}));

/* News page on zSphere. */
const NewsContainer = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const { allNews, latestNews, newsApiInfo, selectedStory, newsSearch } =
    useSelector((state) => state.news);

  const { loading, searchResult } = useDebounceSearch(newsSearch, searchNews);

  /* if searched, show search result otherwise show all news. */
  const newsToShow = useMemo(() => {
    // console.log({ searchResult });
    if (newsSearch?.length > 1) return searchResult;
    else return allNews;
  }, [searchResult, allNews, newsSearch]);

  /* showcase contains first news article. */
  const showcase = useMemo(() => {
    if (allNews?.result?.results?.length) return allNews?.result?.results[0];
  }, [allNews]);

  /* get param and set selected story, if not found, get news story using param id. */
  useEffect(() => {
    // console.log({ params });
    if (params?.id) {
      if (allNews?.result?.results?.length > 0) {
        allNews?.result?.results?.forEach((element) => {
          if (element?.id + "" === params?.id + "")
            dispatch(setSelectedStory(element));
        });
      } else {
        dispatch(getNewsStory({ id: params?.id }));
      }
    }
    // eslint-disable-next-line
  }, [params?.id, allNews]);

  /* get all news from store. */
  useEffect(() => {
    // console.log({ allNews });
    if (!allNews) {
      // // console.log("sending request");
      dispatch(getAllNews());
    }
    // eslint-disable-next-line
  }, [allNews]);

  /* get latest news from store. */
  useEffect(() => {
    // // console.log({ latestNews });
    if (!latestNews) {
      // // console.log("sending request");
      dispatch(getLatestNews());
    }
    // eslint-disable-next-line
  }, [latestNews]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        {selectedStory && params?.id ? (
          <DetailsNewsContainer story={selectedStory} />
        ) : (
          <>
            <div className={classes.leftSide}>
              <TopFilter
                blogs
                label={
                  newsSearch?.length > 2
                    ? !loading
                      ? `Showing ${newsToShow?.result?.count} results`
                      : "Searching..."
                    : null
                }
              />
              {newsApiInfo?.loadingAllNews || loading ? (
                <ComponentLoader />
              ) : (
                <>
                  {newsSearch?.length < 3 && (
                    <>
                      <NewsShowcase newsStory={showcase} />
                    </>
                  )}

                  {newsToShow?.result?.count > 0 ? (
                    <PopularNews
                      news={newsToShow?.result?.results}
                      searched={Boolean(newsSearch?.length > 2)}
                    />
                  ) : (
                    <NotFound label="No News Stories Found" />
                  )}
                </>
              )}
            </div>
            <div className={classes.rightSide}>
              {newsApiInfo?.loadingLatestNews ? (
                <ComponentLoader />
              ) : (
                <LatestNews news={latestNews?.result?.results} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsContainer;
