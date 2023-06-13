import React, { Suspense, lazy, useEffect, useMemo } from "react";

import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import ComponentLoader from "../../../components/globalComponents/ComponentLoader";
import Pagination from "../../../components/globalComponents/Pagination";
import {
  getAllGlobalProperties,
  paginate,
} from "../../../redux/slices/propertiesSlice";
import NotFound from "../../globalComponents/NotFound";
import { TextTranslation } from "../../../utils/translation";
const Card = lazy(() =>
  import("../../propertyComponents/propertyDetails/cards/Card")
);

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 8px",
  },
  heading: {
    color: "#134696",
    fontSize: 32,
    fontFamily: "heavy",
  },
  slider: {
    margin: "20px 5%",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.1em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    height: "65vh",
  },
}));
/* Display properties saved by user in form of a list. */
const SavedProperties = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { allGlobalProperties, allGlobalPropertiesApiInfo } = useSelector(
    (state) => state.properties
  );

  const { currentLocation, currentUser } = useSelector((state) => state.auth);
  const { selectedRegion, langIndex, darkMode } = useSelector(
    (state) => state.global
  );

  const listingsCountry = useMemo(() => {
    if (selectedRegion) return `${selectedRegion?.country}`?.toLowerCase();
    else return `${currentLocation?.country}`?.toLowerCase();
  }, [selectedRegion, currentLocation]);

  /* this useEffect gets all the properties by dispatching get request. */
  useEffect(() => {
    // // console.log({ allGlobalProperties });
    // // console.log("sending request");
    dispatch(
      getAllGlobalProperties({
        queryData: `favourited_by=${currentUser?.id}`,
        // country: listingsCountry,
      })
    );
    // eslint-disable-next-line
  }, [currentUser, listingsCountry]);

  /* propertiesToShow stores all the properties received from the api result. */
  const propertiesToShow = useMemo(() => {
    return allGlobalProperties?.result?.results?.filter((elem) =>
      elem?.favorites_count?.includes(currentUser?.id)
    );
  }, [allGlobalProperties, currentUser]);

  const paginationUrl = useMemo(() => {
    if (allGlobalProperties?.result?.next)
      return `${
        allGlobalProperties?.result?.next
          ?.replace("http", "https")
          .split("page=")[0]
      }page=`;
    else
      return `${
        allGlobalProperties?.result?.previous
          ?.replace("http", "https")
          .split("page=")[0]
      }page=`;
  }, [allGlobalProperties]);

  const paginateProperties = (url) => {
    dispatch(paginate({ url }));
  };
  const handlePageSelect = (pageNumber) => {
    paginateProperties(`${paginationUrl}${pageNumber}`);
  };

  return (
    <div
      className={classes.container}
      style={{ backgroundColor: darkMode ? "#212124" : "" }}
    >
      <Suspense fallback={<ComponentLoader />}>
        {propertiesToShow?.length === 0 && (
          <NotFound label={TextTranslation.noSavedProperties[langIndex]} />
        )}

        {allGlobalPropertiesApiInfo?.loading ? (
          <ComponentLoader />
        ) : (
          <div className={classes.cardContainer}>
            {propertiesToShow?.map((elem, index) => (
              <Card property={elem} key={index} />
            ))}
          </div>
        )}
        {allGlobalProperties?.result?.results?.length > 0 &&
          !allGlobalPropertiesApiInfo?.loading && (
            <Pagination
              data={allGlobalProperties?.result}
              page={handlePageSelect}
              paginate={paginateProperties}
            />
          )}
      </Suspense>
    </div>
  );
};

export default SavedProperties;
