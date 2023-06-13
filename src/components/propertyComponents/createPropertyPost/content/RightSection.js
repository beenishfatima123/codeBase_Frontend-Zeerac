import React, { useEffect, Suspense, lazy } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import createLines from "../../../../assets/properties/createPost/createLines.png";
import {
  LISTING_TYPE,
  PROPERTY_ATTRIBUTES,
  PROPERTY_CATEGORIES,
  PROPERTY_FEATURES,
  PROPERTY_SERVICES,
  PROPERTY_TYPES,
} from "../../../../utils/propertyConstants";
import { useMemo } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useWindowDims } from "../../../../utils/useWindowDims";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../../../../redux/slices/createPropertySlice";
import { useRef } from "react";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import { TextTranslation } from "../../../../utils/translation";

const Purpose = lazy(() => import("./Purpose"));
const TacCards = lazy(() => import("./TacCards"));
const Details = lazy(() => import("./Details"));
const ConstructionDetails = lazy(() => import("./ConstructionDetails"));
const Location = lazy(() => import("./Location"));
const ContentUploads = lazy(() => import("./ContentUploads"));
const Preview = lazy(() => import("./preview/Preview"));
const Information = lazy(() => import("./Information"));
const AuctionUploads = lazy(() => import("./AuctionUploads"));
const AuctionPreview = lazy(() => import("./AuctionPreview"));
const MobileMenuContainer = lazy(() =>
  import("../mobileMenu/MobileMenuContainer")
);

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    position: "relative",
    height: "80vh",
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
  lines: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: -1,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    boxShadow: " rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
    padding: 20,
    zIndex: 5,
  },
  emptyDiv: {
    display: "block",
  },
  "@media (max-width: 800px)": {
    lines: {
      display: "none",
    },
    emptyDiv: {
      display: "none",
    },
  },
}));

const RightSection = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const containerRef = useRef();
  const dispatch = useDispatch();

  const { selectedTab, allTabs, listingType, propertyData } = useSelector(
    (state) => state.createProperty
  );

  const { darkMode, langIndex } = useSelector((state) => state.global);
  const tacCategory = useMemo(() => {
    switch (propertyData?.type) {
      case PROPERTY_TYPES[0][0]:
        return PROPERTY_CATEGORIES?.slice(0, 6);
      case PROPERTY_TYPES[2][0]:
        return PROPERTY_CATEGORIES?.slice(6, 12);
      case PROPERTY_TYPES[1][0]:
        return PROPERTY_CATEGORIES?.slice(12, 18);
      default:
        return PROPERTY_CATEGORIES?.slice(0, 6);
    }
    // eslint-disable-next-line
  }, [propertyData]);

  const renderContent = useMemo(() => {
    switch (selectedTab) {
      // case TextTranslation.purpose[langIndex]:
      case "Purpose":
        return <Purpose />;
      // case TextTranslation.type[langIndex]:
      case "Type":
        return (
          <TacCards
            items={PROPERTY_TYPES}
            attribute={PROPERTY_ATTRIBUTES?.TYPE[0]}
          />
        );
      // case TextTranslation.categories[langIndex]:
      case "Categories":
        return (
          <TacCards
            items={tacCategory}
            attribute={PROPERTY_ATTRIBUTES?.CATEGORY[0]}
          />
        );
      // case TextTranslation.details[langIndex]:
      case "Details":
        return <Details />;
      // case TextTranslation.construction[langIndex]:
      case "Construction":
        return <ConstructionDetails />;
      // case TextTranslation.location[langIndex]:
      case "Location":
        return <Location />;
      // case TextTranslation.images[langIndex]:
      case "Images":
        return <ContentUploads />;
      // case TextTranslation.features[langIndex]:
      case "Features":
        return (
          <TacCards
            items={PROPERTY_FEATURES}
            attribute={PROPERTY_ATTRIBUTES?.FEATURES[0]}
            multiselect
          />
        );
      // case TextTranslation.services[langIndex]:
      case "Services":
        return (
          <TacCards
            items={PROPERTY_SERVICES}
            attribute={PROPERTY_ATTRIBUTES?.SERVICES[0]}
            multiselect
          />
        );
      // case TextTranslation.preview[langIndex]:
      case "Preview":
        return <Preview />;
      // case LISTING_TYPE[1][langIndex]:
      case "Information":
        return <Information />;
      case "Images_subunit":
        return <AuctionUploads />;
      case "Preview_auction":
        return <AuctionPreview />;
      default:
        return <Purpose />;
    }
    // eslint-disable-next-line
  }, [selectedTab, tacCategory, langIndex]);

  const renderPreview = useMemo(() => {
    switch (selectedTab) {
      // case TextTranslation.purpose[langIndex]:
      case "Purpose":
        return null;
      // case TextTranslation.preview[langIndex]:
      case "Preview":
        return null;
      case "Preview_auction":
        return null;
      // case TextTranslation.type[langIndex]:
      case "Type":
        return null;
      // case TextTranslation.categories[langIndex]:
      case "Categories":
        return null;
      default:
        return (
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {listingType === LISTING_TYPE[0][0] ? (
              <Preview />
            ) : (
              <AuctionPreview />
            )}
          </Grid>
        );
    }
  }, [selectedTab, listingType]);

  const renderLines = useMemo(() => {
    switch (selectedTab) {
      // case TextTranslation.purpose[langIndex]:
      case "Purpose":
        return <img src={createLines} alt="" className={classes.lines} />;
      // case TextTranslation.preview[langIndex]:
      case "Preview":
        return <img src={createLines} alt="" className={classes.lines} />;
      case "Preview_auction":
        return <img src={createLines} alt="" className={classes.lines} />;
      // case TextTranslation.type[langIndex]:
      case "Type":
        return <img src={createLines} alt="" className={classes.lines} />;
      // case TextTranslation.categories[langIndex]:
      case "Categories":
        return <img src={createLines} alt="" className={classes.lines} />;
      default:
        return null;
    }
    // eslint-disable-next-line
  }, [selectedTab, listingType]);

  useEffect(() => {
    if (containerRef) containerRef?.current?.scrollTo(0, 0);
  }, [selectedTab]);

  return (
    <div className={classes.container} ref={containerRef}>
      <Suspense fallback={<ComponentLoader />}>
        <>
          {width < 900 && (
            <MobileMenuContainer
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          )}
          <Grid
            container
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              flex: 1,
              width: 1250,
              maxWidth: "100%",
            }}
          >
            {renderLines}
            <Grid item xs={12} md={8}>
              {renderContent}
            </Grid>
            {renderPreview}
          </Grid>
        </>
      </Suspense>
      <div className={classes.footer}>
        <Button
          startIcon={<ArrowLeftIcon />}
          sx={{
            color: darkMode ? "#0ed864" : "#134696",
            fontSize: 15,
            fontFamily: "medium",
          }}
          disabled={selectedTab === 0}
          onClick={() => {
            let _allTabs = allTabs?.map((item, index) => {
              return allTabs[index][0];
            });

            dispatch(
              setSelectedTab(_allTabs[_allTabs?.indexOf(selectedTab) - 1])
            );
          }}
        >
          {TextTranslation.back[langIndex]}
        </Button>
        <Button
          sx={{
            color: darkMode ? "#0ed864" : "#134696",
            fontSize: 15,
            fontFamily: "medium",
          }}
          endIcon={<ArrowRightIcon />}
          disabled={
            selectedTab === "Preview" || selectedTab === "Preview_auction"
          }
          onClick={() => {
            let _allTabs = allTabs?.map((item, index) => {
              return allTabs[index][0];
            });
            dispatch(
              setSelectedTab(_allTabs[_allTabs?.indexOf(selectedTab) + 1])
            );
          }}
        >
          {TextTranslation.next[langIndex]}
        </Button>
        <div className={classes.emptyDiv}></div>
      </div>
    </div>
  );
};

export default RightSection;
