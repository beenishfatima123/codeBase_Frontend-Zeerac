import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import PropertyFiltersContainer from "../../globalComponents/filters/PropertyFiltersContainer";
import HomeMapWrapper from "../../maps/HomeMap";
import SliderContainer from "./slider/SliderContainer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getAllRegionalProperties } from "../../../redux/slices/propertiesSlice";
import { CONTENT_WIDTH } from "../../../utils/constants";
import CustomAutocompleteInput from "../../globalComponents/misc/CustomAutocompleteInput";
import SliderCardSkeleton from "../../loadingSkeletons/SliderCardSkeleton";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const RegionalListings = () => {
  const classes = useStyles();

  const [mapOptions, setMapOptions] = useState();
  const [searchedProperties, setSearchedProperties] = useState();
  const [loadingSearch, setLoadingSearch] = useState(false);

  const { allRegionalProperties, allRegionalPropertiesApiInfo } = useSelector(
    (state) => state.properties
  );

  const propertiesToShow = useMemo(() => {
    if (searchedProperties) return searchedProperties;
    else return allRegionalProperties;
    // }
    // eslint-disable-next-line
  }, [allRegionalProperties, searchedProperties]);

  return (
    <div className={classes.container}>
      <CustomAutocompleteInput
        style={{
          width: CONTENT_WIDTH,
          maxWidth: "90%",
          alignSelf: "center",
          margin: "20px 0px",
        }}
        setMapData={setMapOptions}
        setData={setSearchedProperties}
        setLoading={setLoadingSearch}
      />
      <PropertyFiltersContainer getProperties={getAllRegionalProperties} />

      {allRegionalPropertiesApiInfo?.loading || loadingSearch ? (
        <SliderCardSkeleton />
      ) : (
        <>
          <HomeMapWrapper boundsInfo={mapOptions} markers={propertiesToShow} />
          <div style={{ width: "100%" }}>
            <SliderContainer properties={propertiesToShow?.result?.results} />
          </div>
        </>
      )}
    </div>
  );
};

export default RegionalListings;
