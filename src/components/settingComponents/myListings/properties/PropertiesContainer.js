import React, { useEffect, lazy, Suspense } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { NEWS_FILTER, VERIFICATION_STATUS } from "../../../../utils/constants";
import "../myListingStyles.css";
import { Grid } from "@mui/material";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import {
  getMyProperties,
  paginate,
  setGlobalProperties,
} from "../../../../redux/slices/propertiesSlice";
import MyPropertyCard from "./MyPropertyCard";
import NotFound from "../../../globalComponents/NotFound";
import Pagination from "../../../globalComponents/Pagination";
import { toast } from "react-toastify";
import { TextTranslation } from "../../../../utils/translation";
import {
  resetVerificationApi,
  resetVerificationData,
} from "../../../../redux/slices/verificationRequestsSlice";
const EditPropertyContainer = lazy(() =>
  import("./edit/EditPropertyContainer")
);
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 20,
  },
  topSection: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid lightGray",
    paddingBottom: 20,
  },
  topLabel: {
    fontSize: 20,
    fontFamily: "heavy",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sort: {
    fontSize: 14,
  },
  contentContainer: {
    height: "72vh",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    margin: "20px 20px",
  },
  "@media (max-width: 500px)": {
    container: {
      padding: 5,
    },
  },
}));

/* PropertiesContainer component is displayed in settings listings and it renders the properties in form of a grid based on the category selected. */
const PropertiesContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { listingCategories, showDrawer } = useSelector(
    (state) => state.settings
  );

  const { myProperties, myPropertiesApiInfo, propertyToEdit } = useSelector(
    (state) => state.properties
  );
  const { verificationApiInfo } = useSelector((state) => state.verification);
  const { currentUser } = useSelector((state) => state.auth);
  const { langIndex, darkMode } = useSelector((state) => state.global);

  /* get all properties from the slice */
  useEffect(() => {
    if (listingCategories?.subCategory)
      dispatch(
        getMyProperties({
          queryData: `user_id=${
            currentUser?.id
          }&purpose=${listingCategories?.subCategory[0]?.toLowerCase()}`,
        })
      );
    // eslint-disable-next-line
  }, [listingCategories]);

  /* check response from verification API when user clicks the get verified button. On success -> display in toast. */
  useEffect(() => {
    if (verificationApiInfo?.response) {
      if (verificationApiInfo?.response?.result?.property?.id) {
        dispatch(
          setGlobalProperties({
            ...myProperties,
            result: {
              ...myProperties?.result,
              results: myProperties?.result?.results?.map((elem) => {
                if (
                  elem?.id ===
                  verificationApiInfo?.response?.result?.property?.id
                ) {
                  return {
                    ...elem[langIndex],
                    verification_status: VERIFICATION_STATUS?.IN_PROGRESS,
                  };
                } else return elem[langIndex];
              }),
            },
          })
        );
      }
      if (verificationApiInfo?.response?.status) {
        toast.success(TextTranslation.verificationRequestSubmitted[langIndex], {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: "#014493" },
        });
      }
      dispatch(resetVerificationData());
      dispatch(resetVerificationApi());
    }
    // eslint-disable-next-line
  }, [verificationApiInfo?.response]);

  /* check error from verification API when user clicks the get verified button -> display in toast. */
  useEffect(() => {
    if (verificationApiInfo?.error) {
      toast.error(verificationApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetVerificationData());
      dispatch(resetVerificationApi());
    }
    // eslint-disable-next-line
  }, [verificationApiInfo?.error]);

  const paginateProperties = (url) => {
    dispatch(paginate({ url, destination: "global" }));
  };
  const handlePageSelect = (pageNumber) => {
    let pageSplit = "";
    if (myProperties?.result?.next)
      pageSplit = myProperties?.result?.next?.split("page=");
    else pageSplit = myProperties?.result?.previous?.split("page=");

    if (pageSplit?.length) {
      let newLink = `${pageSplit[0]}page=${pageNumber}${pageSplit[1]?.substring(
        pageSplit[1]?.indexOf("&"),
        pageSplit[1]?.length
      )}`;
      paginateProperties(`${newLink}`);
      paginateProperties(newLink.replace("http", "https"));
    }
  };

  return (
    <Suspense fallback={<ComponentLoader />}>
      <div className={classes.container}>
        {propertyToEdit ? (
          <EditPropertyContainer />
        ) : (
          <>
            <div className={classes.topSection}>
              <span
                className={classes.topLabel}
                style={{
                  color: darkMode ? "#0ed864" : "#134696",
                }}
              >{`${
                listingCategories?.subCategory
                  ? listingCategories?.subCategory[langIndex] || "My"
                  : "My"
              } Properties`}</span>
              <div className={classes.filterContainer}>
                <span
                  className={classes.sort}
                  style={{
                    color: darkMode ? "#fff" : "#9DB1BC",
                  }}
                >
                  {TextTranslation.sortBy[langIndex]}:
                </span>
                <div className="listingsSelectDiv">
                  <select>
                    {NEWS_FILTER?.map((elem, index) => (
                      <option key={index} value={elem}>
                        {elem[langIndex]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={classes.contentContainer}>
              <Grid container rowSpacing={2}>
                {myPropertiesApiInfo?.loading ? (
                  <ComponentLoader />
                ) : (
                  <>
                    {myProperties?.result?.count === 0 ? (
                      <NotFound
                        label={TextTranslation.noPropertyFound[langIndex]}
                      />
                    ) : (
                      myProperties?.result?.results?.map((elem, index) => (
                        <Grid
                          key={index}
                          item
                          xl={showDrawer ? 4 : 3}
                          lg={showDrawer ? 6 : 4}
                          md={showDrawer ? 12 : 6}
                          sm={12}
                          xs={12}
                        >
                          {verificationApiInfo?.loading &&
                          verificationApiInfo?.itemId === elem?.id ? (
                            <ComponentLoader />
                          ) : (
                            <MyPropertyCard property={elem} />
                          )}
                        </Grid>
                      ))
                    )}
                  </>
                )}
              </Grid>
              {myProperties?.result?.results?.length > 0 &&
                !myPropertiesApiInfo?.loading && (
                  <Pagination
                    data={myProperties?.result}
                    page={handlePageSelect}
                    paginate={paginateProperties}
                  />
                )}
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
};

export default PropertiesContainer;
