import React, { Suspense, lazy, useEffect, useMemo } from "react";

import { makeStyles } from "@mui/styles";
import ContentSelection from "../../components/zSpehere/ContentSelection";
import Header from "../../components/zSpehere/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowers,
  getFollowing,
  setZsphereData,
} from "../../redux/slices/authSlice";
import { fetchFollowersCount, fetchFollowingCount } from "../../api/socialApi";
import { SOCIAL_CONTENT_SELECTION } from "../../utils/constants";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";

const GroupsContainer = lazy(() =>
  import("../../components/zSpehere/groups/GroupsContainer")
);
const NewsContainer = lazy(() =>
  import("../../components/zSpehere/news/NewsContainer")
);
const BlogsContainer = lazy(() =>
  import("../../components/zSpehere/blogs/BlogsContainer")
);
const FeedContainer = lazy(() =>
  import("../../components/zSpehere/feed/FeedContainer")
);
const PodcastsContainer = lazy(() =>
  import("../../components/zSpehere/podcast/PodcastsContainer")
);
const Container = lazy(() =>
  import("../../components/zSpehere/groups/CEO_CLUB/Container")
);

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));

/* zSphereContainer renders the entire zSphere page and components. */
const ZSphereContainer = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const { currentUser, zsphereData } = useSelector((state) => state.auth);

  /* Render specific content based on param route value. */
  const renderContent = useMemo(() => {
    switch (params?.route) {
      case SOCIAL_CONTENT_SELECTION[0]:
        return <FeedContainer />;
      case SOCIAL_CONTENT_SELECTION[1]:
        return <NewsContainer />;
      case SOCIAL_CONTENT_SELECTION[2]:
        return <BlogsContainer />;
      case SOCIAL_CONTENT_SELECTION[3]:
        return <PodcastsContainer />;
      case SOCIAL_CONTENT_SELECTION[4]:
        return <GroupsContainer />;
      case SOCIAL_CONTENT_SELECTION[5]?.replace(" ", "_"):
        return <Container />;
      default:
        return <FeedContainer />;
    }
  }, [params]);

  /* Retrieve a member's following anf followers count. */
  const getFollowCounts = async () => {
    const followers = await fetchFollowersCount({
      id: currentUser?.id,
      token: currentUser?.token,
    });
    const following = await fetchFollowingCount({
      id: currentUser?.id,
      token: currentUser?.token,
    });
    dispatch(
      setZsphereData({
        ...zsphereData,
        followerIds: followers,
        followingIds: following,
      })
    );
  };

  /* Get following/follower from store. */
  useEffect(() => {
    if (currentUser) {
      getFollowCounts();
      dispatch(
        getFollowers({
          id: currentUser?.id,
          token: currentUser?.token,
        })
      );
      dispatch(
        getFollowing({
          id: currentUser?.id,
          token: currentUser?.token,
        })
      );
    }
    // eslint-disable-next-line
  }, [currentUser]);
  return (
    <div className={classes.container}>
      <Header />
      <ContentSelection />
      <Suspense fallback={<ComponentLoader />}>{renderContent}</Suspense>
    </div>
  );
};

export default ZSphereContainer;
