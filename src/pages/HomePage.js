import { makeStyles } from "@mui/styles";
import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import ComponentLoader from "../components/globalComponents/ComponentLoader";
import {
  setHasSeenVideo,
  setIsVideoVisible,
} from "../redux/slices/globalSlice";
import ComingSoonContainer from "../components/homeComponents/ComingSoonContainer";
import { useWindowDims } from "../utils/useWindowDims";

const PolygonGlobe = lazy(() =>
  import("../components/homeComponents/globe/PolygonGlobe")
);
const RegionalListingsContainer = lazy(() =>
  import(
    "../components/homeComponents/homepageListings/RegionalListingsContainer"
  )
);
const GlobalListingsContainer = lazy(() =>
  import(
    "../components/homeComponents/homepageListings/GlobalListingsContainer"
  )
);
const IntroVideo = lazy(() =>
  import("../components/homeComponents/introVideo/IntroVideo")
);
const ProjectsContainer = lazy(() =>
  import("../components/homeComponents/projects/ProjectsContainer")
);
const InvestmentContainer = lazy(() =>
  import("../components/homeComponents/investment/InvestmentContainer")
);

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    transition: "0.5s",
    alignSelf: "center",
    zIndex: 1,
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const regionalRef = useRef();
  const globalRef = useRef();
  const polygonRef = useRef();

  const { height, width } = useWindowDims();
  const { darkMode } = useSelector((state) => state.global);

  useEffect(() => {
    if (height > width) dispatch(setIsVideoVisible(false));
    // eslint-disable-next-line
  }, [height, width]);

  const scrollToRegional = () => {
    regionalRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const scrollToGlobal = () => {
    globalRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleVideoEnd = () => {
    dispatch(setHasSeenVideo(true));
  };

  return (
    <div
      className={classes.container}
      style={{ backgroundColor: darkMode ? "#212124" : "white" }}
    >
      <div className={classes.homeContainer}>
        <Suspense fallback={<ComponentLoader />}>
          {width > height && <IntroVideo handleVideoEnd={handleVideoEnd} />}
          <PolygonGlobe
            regionalScroll={scrollToRegional}
            globalScroll={scrollToGlobal}
            refProp={polygonRef}
          />
          <RegionalListingsContainer refProp={regionalRef} />
          <ProjectsContainer />
          <GlobalListingsContainer refProp={globalRef} />
          <InvestmentContainer />
          <ComingSoonContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
