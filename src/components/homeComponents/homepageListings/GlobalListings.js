import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import PropertyFiltersContainer from "../../globalComponents/filters/PropertyFiltersContainer";
import SliderContainer from "./slider/SliderContainer";
import { useSelector } from "react-redux";
import { getAllGlobalProperties } from "../../../redux/slices/propertiesSlice";

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
const GlobalListings = () => {
  const classes = useStyles();

  const [searchedProperties, setSearchedProperties] = useState();
  const [loadingSearch, setLoadingSearch] = useState(false);

  const { allGlobalProperties, allGlobalPropertiesApiInfo } = useSelector(
    (state) => state.properties
  );
  const propertiesToShow = useMemo(() => {
    if (searchedProperties) return searchedProperties;
    else return allGlobalProperties;
    // }
    // eslint-disable-next-line
  }, [allGlobalProperties, searchedProperties]);

  return (
    <div className={classes.container}>
      <CustomAutocompleteInput
        style={{
          width: CONTENT_WIDTH,
          maxWidth: "90%",
          alignSelf: "center",
          margin: "20px 0px",
        }}
        setData={setSearchedProperties}
        setLoading={setLoadingSearch}
      />
      <PropertyFiltersContainer getProperties={getAllGlobalProperties} />

      {allGlobalPropertiesApiInfo?.loading || loadingSearch ? (
        <SliderCardSkeleton />
      ) : (
        <div style={{ width: "100%" }}>
          <SliderContainer
            properties={propertiesToShow?.result?.results}
            loading
          />
        </div>
      )}
    </div>
  );
};

export default GlobalListings;
