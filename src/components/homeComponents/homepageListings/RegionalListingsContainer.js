import React, { Suspense, lazy, useState, useMemo } from "react";

import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CONTENT_WIDTH, HOME_FEATURE_FILTERS } from "../../../utils/constants";
import RegionalSvg from "../svgs/RegionalSvg";
import HomeFeatureFilters from "../HomeFeatureFilters";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { TextTranslation } from "../../../utils/translation";
import { useSelector } from "react-redux";
const AgenciesList = lazy(() => import("./AgenciesList"));
const AgentsList = lazy(() => import("./AgentsList"));
const RegionalListings = lazy(() => import("./RegionalListings"));
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0px",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 5%",
    width: CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  "@media (max-width: 1024px)": {
    topSection: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

const RegionalListingsContainer = ({ refProp }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { langIndex } = useSelector((state) => state.global);
  const [featureFilter, setFeatureFilter] = useState(HOME_FEATURE_FILTERS[0]);

  const renderContent = useMemo(() => {
    switch (featureFilter) {
      case HOME_FEATURE_FILTERS[0]:
        return <RegionalListings />;
      case HOME_FEATURE_FILTERS[1]:
        return <AgentsList />;
      case HOME_FEATURE_FILTERS[2]:
        return <AgenciesList />;
      default:
        return <RegionalListings />;
    }
  }, [featureFilter]);

  const handleNavigate = () => {
    switch (featureFilter) {
      case HOME_FEATURE_FILTERS[0]:
        navigate("/listings", { replace: true });
        break;
      case HOME_FEATURE_FILTERS[1]:
        navigate("/agents", { replace: true });
        break;
      case HOME_FEATURE_FILTERS[2]:
        navigate("/agencies", { replace: true });
        break;
      default:
        navigate("/listings", { replace: true });
        break;
    }
  };
  return (
    <div className={classes.container} ref={refProp}>
      <div className={classes.topSection}>
        <RegionalSvg />
        <HomeFeatureFilters
          selectedFilter={featureFilter}
          setSelectedFilter={setFeatureFilter}
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
          borderRadius: 0,
          alignSelf: "flex-end",
        }}
        endIcon={<ArrowForwardIcon sx={{ color: "#134696" }} />}
        onClick={handleNavigate}
      >
        {TextTranslation.viewAll[langIndex]}
      </Button>
    </div>
  );
};

export default RegionalListingsContainer;
