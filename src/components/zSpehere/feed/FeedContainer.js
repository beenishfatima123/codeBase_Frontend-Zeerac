import React, { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import FriendsContainer from "./FriendsContainer";
import SuggestionsContainer from "../suggestions/SuggestionsContainer";
import { POST_SORTING_BUTTONS } from "../../../utils/constants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import Post from "../socialPost/Post";
import { useNavigate, useParams } from "react-router-dom";
import PostDetails from "./PostDetails";
import PostSkeleton from "../../loadingSkeletons/PostSkeleton";
import { useWindowDims } from "../../../utils/useWindowDims";
import "./postModal/feedStyles.css";
import useSticky from "../../../utils/hooks/useSticky";
import FinishedContainer from "./FinishedContainer";
import { getSortedPosts, searchPosts } from "../../../redux/slices/postsSlice";
import { debounce } from "lodash";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 40,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    padding: "0px 5%",
    alignItems: "center",
    position: "relative",
  },

  postContainer: {
    width: "40vw",
    marginBottom: 10,
  },

  "@media (max-width: 1200px)": {
    leftSide: {
      width: "100%",
      maxWidth: "100%",
    },
    postContainer: {
      width: 500,
      maxWidth: "100%",
      marginBottom: 10,
    },
  },
}));

/* Renders all the components on the zSphere feed including friends, posts, suggestions and new post modal. */
const FeedContainer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { width } = useWindowDims();
  const stickyRef = useRef();
  const stick = useSticky(stickyRef);

  const [selectedFilter, setSelectedFilter] = useState(POST_SORTING_BUTTONS[0]);

  const { allPosts, allPostsApiInfo, searchQuery, searchedPosts } = useSelector(
    (state) => state.posts
  );
  const { darkMode } = useSelector((state) => state.global);
  const currentUser = useSelector((state) => state.auth.currentUser);

  // console.log({ allPosts });
  const [openDetailsContainer, setOpenDetailsContainer] = useState(null);

  const posts = useMemo(() => {
    if (searchQuery?.length >= 3) return searchedPosts;
    else return allPosts;
  }, [allPosts, searchQuery, searchedPosts]);

  const delayedSearch = useMemo(
    () => debounce((query) => searchFeed(query), 500),
    // eslint-disable-next-line
    []
  );
  // console.log({ posts });
  useEffect(() => {
    if (searchQuery?.length >= 3) delayedSearch(searchQuery);

    // eslint-disable-next-line
  }, [searchQuery]);
  useEffect(() => {
    // console.log({ selectedFilter });
    if (selectedFilter) {
      dispatch(
        getSortedPosts({
          token: currentUser?.token,
          query: getFilterQuery(selectedFilter),
        })
      );
    }
    // eslint-disable-next-line
  }, [selectedFilter]);
  useEffect(() => {
    // console.log({ params });
    if (params?.id) setOpenDetailsContainer(params?.id);
  }, [params?.id]);

  const getFilterQuery = (filter) => {
    switch (filter) {
      case POST_SORTING_BUTTONS[1]:
        return "?filter_by=following";
      case POST_SORTING_BUTTONS[2]:
        return "?sort_by=latest";
      case POST_SORTING_BUTTONS[3]:
        return "?sort_by=popular";

      default:
        return "";
    }
  };

  const searchFeed = async (query) => {
    dispatch(
      searchPosts({
        searchQuery: query,
        token: currentUser?.token,
      })
    );
  };
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#212124" : "#efefef",
      }}
    >
      <FriendsContainer
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className={classes.postContainer}>
        {allPostsApiInfo?.loading ? (
          <PostSkeleton />
        ) : (
          <>
            {openDetailsContainer && (
              <PostDetails
                isOpen={Boolean(openDetailsContainer)}
                postId={openDetailsContainer}
                handleClose={() => {
                  setOpenDetailsContainer(null);
                  navigate(`/zSphere/Feed`);
                }}
              />
            )}
            {posts?.results?.map((elem, index) => (
              <Post
                post={elem}
                key={index}
                setOpenDetailsContainer={setOpenDetailsContainer}
              />
            ))}
            <FinishedContainer posts={posts} />
          </>
        )}
      </div>
      {width > 1200 && (
        <div
          className={stick ? "is-sticky" : "suggestions-container"}
          ref={stickyRef}
        >
          <SuggestionsContainer />
        </div>
      )}
    </div>
  );
};

export default FeedContainer;
