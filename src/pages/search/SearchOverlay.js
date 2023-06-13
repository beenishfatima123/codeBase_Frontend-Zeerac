import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecentSearches,
  setSearchOverlay,
} from "../../redux/slices/globalSlice";
import "./searchStyles.css";
import {
  APP_BAR_EXTENDED_ITEMS,
  CONTENT_WIDTH,
  SEARCH_HEADINGS,
  SEARCH_OPTIONS,
} from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonsContainer from "../../components/globalComponents/search/ButtonsContainer";
import ResultsContainer from "../../components/globalComponents/search/ResultsContainer";
import { ClickAwayListener, Zoom } from "@mui/material";
import FiltersContainer from "../../components/globalComponents/search/FiltersContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import SearchAutocomplete from "./SearchAutocomplete";
import { TextTranslation } from "../../utils/translation";
import {
  getAllGlobalProperties,
  getAllRegionalProperties,
} from "../../redux/slices/propertiesSlice";
import {
  createCategoryQuery,
  createFilterQuery,
} from "../../utils/helperFunctions";
import useDarkMode from "../../utils/hooks/useDarkMode";
import { useWindowDims } from "../../utils/useWindowDims";

const useStyles = makeStyles(() => ({
  searchBoxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    maxHeight: 100,
    alignSelf: "center",
    width: CONTENT_WIDTH,
    maxWidth: "100%",
    padding: "0px 5%",
    position: "relative",
  },
  searchContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    margin: "0px 30px",
    borderRadius: 50,
    padding: "0px 20px",
    alignItems: "center",
  },
  searchText: {
    fontSize: 18,
    color: "",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    top: "125%",
    left: 0,
    right: 0,
    padding: "0px 5%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#134696",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: "40px 0px",
    minWidth: "90%",
    zIndex: 1200,
    overflowY: "scroll",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: "90%",
    alignSelf: "center",
    minWidth: "60%",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
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

  "@media (max-width: 600px)": {
    container: {
      top: "115%",
    },
  },
  "@media (max-width: 775px)": {
    searchContainer: {
      margin: "0px 10px",
    },
  },
  "@media (max-width: 500px)": {
    searchBoxContainer: {
      padding: "0px 10px",
    },
    container: {
      padding: "0px 10px",
    },
    searchContainer: {
      margin: "0px 4px",
      padding: "0px 8px",
    },
  },
}));
const backButtonSx = {
  fontSize: 18,
  textTransform: "none",
};
const applyButtonSx = {
  fontSize: 18,
  textTransform: "none",
  height: 40,
  width: 100,
  borderRadius: 25,
};
const SearchOverlay = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkMode = useDarkMode();
  const { width } = useWindowDims();

  const [selectedSearch, setSelectedSearch] = useState(SEARCH_HEADINGS[0]);
  const {
    langIndex,
    openSearchOverlay,
    recentSearches,
    darkMode,
    propertyFilter,
  } = useSelector((state) => state.global);
  const { currentLocation } = useSelector((state) => state.auth);
  const { selectedRegion } = useSelector((state) => state.global);
  const listingsCountry = useMemo(() => {
    if (selectedRegion) return `${selectedRegion?.country}`?.toLowerCase();
    else return `${currentLocation?.country}`?.toLowerCase();
  }, [selectedRegion, currentLocation]);

  /* links to show gives links under first heading i.e. popular or recent search. */
  const linksToShow = useMemo(() => {
    if (selectedSearch === SEARCH_HEADINGS[0]) return APP_BAR_EXTENDED_ITEMS;
    else return recentSearches?.length > 0 ? recentSearches : [];
  }, [selectedSearch, recentSearches]);
  const renderFilters = useMemo(() => {
    if (location?.pathname === "/" || location?.pathname === "/listings")
      return true;
    else return false;
  }, [location]);

  const handleNavigation = (target) => {
    console.log({ target, langIndex, APP_BAR_EXTENDED_ITEMS, recentSearches });
    APP_BAR_EXTENDED_ITEMS?.forEach((elem) => {
      if (elem?.url === target) {
        if (!recentSearches?.includes(elem)) {
          dispatch(setRecentSearches([...recentSearches, elem]));
        }
        navigate(elem?.url);
        dispatch(setSearchOverlay(false));
      }
    });
  };
  const handleSearch = (value) => {
    SEARCH_OPTIONS?.forEach((elem) => {
      if (elem?.label[langIndex] === value) {
        if (!recentSearches?.includes(elem)) {
          dispatch(setRecentSearches([...recentSearches, elem]));
        }
        navigate(elem?.url);
        dispatch(setSearchOverlay(false));
      }
    });
  };
  const handleApplyFilters = () => {
    if (location?.pathname === "/listings")
      dispatch(
        getAllRegionalProperties({
          country: listingsCountry,
          queryData: `order_by=trending${createFilterQuery(
            propertyFilter
          )}&purpose=${propertyFilter?.purpose?.toLowerCase()}${createCategoryQuery(
            propertyFilter?.category
          )}`,
        })
      );
    else
      dispatch(
        getAllGlobalProperties({
          queryData: `order_by=trending${createFilterQuery(
            propertyFilter
          )}&purpose=${propertyFilter?.purpose?.toLowerCase()}${createCategoryQuery(
            propertyFilter?.category
          )}`,
          country: listingsCountry,
        })
      );

    dispatch(setSearchOverlay(false));
  };
  return (
    <ClickAwayListener
      onClickAway={() => {
        dispatch(setSearchOverlay(false));
      }}
    >
      <Zoom in={openSearchOverlay}>
        <div className={classes.searchBoxContainer}>
          {/* back button */}
          <Button
            startIcon={
              <ArrowBackIcon style={{ color: darkMode ? "#fff" : "#000" }} />
            }
            sx={{ ...backButtonSx, color: darkMode ? "#fff" : "#000" }}
            onClick={() => dispatch(setSearchOverlay(false))}
          >
            {TextTranslation.back[langIndex]}
          </Button>
          {/* search bar */}
          <div
            className={classes.searchContainer}
            style={{
              border:
                isDarkMode || darkMode
                  ? "1px solid #FFFFFF"
                  : "1px solid #9DAFBD",
            }}
          >
            {/* Search input field. */}
            <SearchAutocomplete handleSearch={handleSearch} />
            <SearchIcon
              style={{ fontSize: width > 500 ? 30 : 22, color: "black" }}
            />
          </div>
          {/* Apply filters button. */}
          <Button
            sx={{
              ...applyButtonSx,
              color: darkMode ? "#fff" : "#b1b1b1",
              border: darkMode ? "1px solid #fff" : "1px solid #e6e6e6",
            }}
            onClick={handleApplyFilters}
          >
            {TextTranslation.apply[langIndex]}
          </Button>
          <div className={classes.container}>
            <div className={classes.content}>
              <div
                className={classes.contentContainer}
                style={{
                  height: renderFilters ? "78vh" : "fit-content",
                }}
              >
                <ButtonsContainer
                  selectedSearch={selectedSearch}
                  setSelectedSearch={setSelectedSearch}
                />
                <ResultsContainer
                  linksToShow={linksToShow}
                  handleNavigation={handleNavigation}
                />
                {renderFilters && <FiltersContainer />}
              </div>
            </div>
          </div>
        </div>
      </Zoom>
    </ClickAwayListener>
  );
};

export default SearchOverlay;
