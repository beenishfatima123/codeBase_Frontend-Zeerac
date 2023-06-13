import React, { Suspense, lazy, useState, useMemo } from "react";

import { makeStyles } from "@mui/styles";
import { CONTENT_WIDTH, HOME_FEATURE_FILTERS } from "../../../utils/constants";
import HomeFeatureFilters from "../HomeFeatureFilters";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import GlobalSvg from "../svgs/GlobalSvg";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { TextTranslation } from "../../../utils/translation";
import { useSelector } from "react-redux";

const AgenciesList = lazy(() => import("./AgenciesList"));
const AgentsList = lazy(() => import("./AgentsList"));
const GlobalListings = lazy(() => import("./GlobalListings"));

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0px",
  },

  topSvgSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    width: CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  "@media (max-width: 1024px)": {
    topSvgSection: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 20,
    },
  },
}));
const GlobalListingsContainer = ({ refProp }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { langIndex } = useSelector((state) => state.global);

  const [featureFilter, setFeatureFilter] = useState(HOME_FEATURE_FILTERS[0]);
  const renderContent = useMemo(() => {
    switch (featureFilter) {
      case HOME_FEATURE_FILTERS[0]:
        return <GlobalListings />;
      case HOME_FEATURE_FILTERS[1]:
        return <AgentsList />;
      case HOME_FEATURE_FILTERS[2]:
        return <AgenciesList />;
      default:
        return <GlobalListings />;
    }
  }, [featureFilter]);
  return (
    <div className={classes.container}>
      <div className={classes.topSvgSection} ref={refProp}>
        <GlobalSvg />
        <HomeFeatureFilters
          selectedFilter={featureFilter}
          setSelectedFilter={setFeatureFilter}
          extraStyles={{
            marginRight: "5%",
          }}
        />
      </div>
      <Suspense fallback={<ComponentLoader />}>{renderContent}</Suspense>

      <Button
        sx={{
          background:
            "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
          textTransform: "none",
          color: "#134696",
          width: 180,
          margin: "10px 5%",
          alignSelf: "flex-end",
          borderRadius: 0,
        }}
        endIcon={<ArrowForwardIcon style={{ color: "#134696" }} />}
        onClick={() => navigate("/listings", { replace: true })}
      >
        {TextTranslation.viewAll[langIndex]}
      </Button>
    </div>
  );
};

export default GlobalListingsContainer;
