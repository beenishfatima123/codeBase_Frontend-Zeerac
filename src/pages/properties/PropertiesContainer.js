import React, { useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRegionalProperties,
  paginate,
} from "../../redux/slices/propertiesSlice";
import PropertyFiltersContainer from "../../components/globalComponents/filters/PropertyFiltersContainer";
import Pagination from "../../components/globalComponents/Pagination";
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";
import NotFound from "../../components/globalComponents/NotFound";
import PropertiesContainerSkeleton from "../../components/loadingSkeletons/PropertiesContainerSkeleton";
import MapSkeleton from "../../components/loadingSkeletons/MapSkeleton";
import CustomAutocompleteInput from "../../components/globalComponents/misc/CustomAutocompleteInput";
import TopSection from "../../components/propertyComponents/propertyDetails/TopSection";
import PropertyMap from "../../components/propertyComponents/map/PropertyMap";
import CardsContainer from "../../components/propertyComponents/propertyDetails/cards/CardsContainer";

/* useStyles is being used to create custom styling using makeStyles from material UI.
It sets styling properties for container, heading, slider, contentContainer,
mapContainer, content and changes map container display at 650px max-width. */
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    color: "#134696",
    fontSize: 32,
    fontFamily: "heavy",
  },
  slider: {
    margin: "20px 5%",
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    padding: "20px 0px",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  mapContainer: {
    display: "flex",
    width: 400,
    position: "relative",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    minHeight: "100vh",
  },
  "@media (max-width:650px)": {
    mapContainer: {
      display: "none",
    },
  },
}));

const PropertiesContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState();
  const [mapOptions, setMapOptions] = useState();
  const [searchedProperties, setSearchedProperties] = useState();
  const [loadingSearch, setLoadingSearch] = useState(false);

  const { allRegionalProperties, allRegionalPropertiesApiInfo } = useSelector(
    (state) => state.properties
  );

  const { darkMode } = useSelector((state) => state.global);

  /* This useMemo is executed when allRegionalProperties or searchedProperties
  change, it decides which properties need to be displayed on the page. */
  const propertiesToShow = useMemo(() => {
    // console.log({ allRegionalProperties });

    if (searchedProperties) return searchedProperties;
    else return allRegionalProperties;
    // eslint-disable-next-line
  }, [allRegionalProperties, searchedProperties]);

  /* paginateProperties takes url and dispatches paginate with the url, regional
  destination and without search filter. */
  const paginateProperties = (url) => {
    dispatch(
      paginate({
        url,
        destination: "regional",
        // isSearch: searchedProperty?.result?.count >= 0 ? true : false,
        isSearch: false,
      })
    );
  };

  /* handlePageSelect helps in pagination. It takes pageNumber paginates to either next or previous
  page and store newLink using the pageNumber for that page to be redirected to. */
  const handlePageSelect = (pageNumber) => {
    let pageSplit = "";
    if (propertiesToShow?.result?.next)
      pageSplit = propertiesToShow?.result?.next?.split("page=");
    else pageSplit = propertiesToShow?.result?.previous?.split("page=");
    if (pageSplit?.length) {
      let newLink = `${pageSplit[0]}page=${pageNumber}${pageSplit[1]?.substring(
        pageSplit[1]?.indexOf("&"),
        pageSplit[1]?.length
      )}`;
      paginateProperties(newLink.replace("http", "https"));
    }
  };

  return (
    <div
      className={classes.container}
      style={{ backgroundColor: darkMode ? "#212124" : "" }}
    >
      <TopSection />
      <CustomAutocompleteInput
        style={{
          width: HEADER_CONTENT_WIDTH,
          maxWidth: "90%",
          alignSelf: "center",
          margin: "20px 0px",
        }}
        options={{
          types: ["(cities)"],
          fields: ["name"],
        }}
        setMapData={setMapOptions}
        setData={setSearchedProperties}
        setLoading={setLoadingSearch}
      />

      <PropertyFiltersContainer
        getProperties={getAllRegionalProperties}
        sortOrder={sortOrder}
      />

      <div className={classes.contentContainer}>
        <div className={classes.mapContainer}>
          {allRegionalPropertiesApiInfo?.loading || loadingSearch ? (
            <MapSkeleton />
          ) : (
            <PropertyMap
              boundsInfo={mapOptions}
              properties={propertiesToShow}
            />
          )}
        </div>
        <div className={classes.content}>
          {allRegionalPropertiesApiInfo?.loading || loadingSearch ? (
            <PropertiesContainerSkeleton />
          ) : propertiesToShow?.result?.count > 0 ? (
            <CardsContainer
              total={propertiesToShow?.result?.count}
              properties={propertiesToShow?.result?.results}
              setSortOrder={setSortOrder}
            />
          ) : (
            <NotFound label="No properties found" />
          )}
        </div>
      </div>
      {propertiesToShow?.result?.results?.length > 0 && (
        <Pagination
          data={propertiesToShow?.result}
          page={handlePageSelect}
          paginate={paginateProperties}
        />
      )}
    </div>
  );
};

export default PropertiesContainer;
