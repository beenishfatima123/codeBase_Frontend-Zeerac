import "../myListingStyles.css";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import AuctionCard from "./AuctionCard";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, lazy, Suspense, useMemo } from "react";
import NotFound from "../../../globalComponents/NotFound";
import { TextTranslation } from "../../../../utils/translation";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import {
  getUserAuctions,
  setAllAuctions,
  setAuctionToEdit,
} from "../../../../redux/slices/auctionSlice";
import {
  resetVerificationApi,
  resetVerificationData,
} from "../../../../redux/slices/verificationRequestsSlice";
import {
  LISTINGS_DRAWER_OPTIONS,
  NEWS_FILTER,
  VERIFICATION_STATUS,
} from "../../../../utils/constants";
import { useLocation } from "react-router-dom";

const EditAuctionsContainer = lazy(() =>
  import("./edit/EditAuctionsContainer")
);
const AuctionDetailContainer = lazy(() =>
  import("./detail/AuctionDetailContainer")
);

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    flex: 1,
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
    textTransform: "capitalize",
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
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    margin: "20px 0px",
  },
  "@media (max-width: 500px)": {
    container: {
      padding: 5,
    },
  },
}));
const AuctionsContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { darkMode, langIndex } = useSelector((state) => state.global);
  const {
    userAuctionsData,
    userAuctionsDataApiInfo,
    auctionToEdit,
    showAuctionDetail,
  } = useSelector((state) => state.auction);
  const { currentUser } = useSelector((state) => state.auth);

  const { verificationApiInfo } = useSelector((state) => state.verification);

  // console.log({ param });

  const path = useMemo(
    () => pathname?.split("/")?.filter((elem) => elem !== ""),
    [pathname]
  );

  useEffect(() => {
    // console.log({ path });
    dispatch(
      getUserAuctions(
        `user_id=${currentUser?.id}&auction_type=${getAuctionType(path[3])}`
      )
    );
    // eslint-disable-next-line
  }, [path[3], currentUser?.id]);
  useEffect(() => {
    // console.log({ userAuctionsData });
    if (path?.length >= 5) {
      let _toEdit = null;
      userAuctionsData?.result?.results?.forEach((elem) => {
        if (elem?.id + "" === path[4]) _toEdit = elem;
      });
      // console.log({ userAuctionsData, path: path[4], _toEdit });
      if (_toEdit) dispatch(setAuctionToEdit(_toEdit));
    }
    // eslint-disable-next-line
  }, [path[4], userAuctionsData]);
  /* this useEffect checks for the response from the API, If the property file id exists, set auctions with result updated with verificaton in progress if the file id from response is equal to element id otherwise set results equal to elem. */
  useEffect(() => {
    if (verificationApiInfo?.response) {
      if (verificationApiInfo?.response?.result?.property_file?.id) {
        dispatch(
          setAllAuctions({
            ...userAuctionsData,
            result: {
              ...userAuctionsData?.result,
              results: userAuctionsData?.result?.results?.map((elem) => {
                if (
                  elem?.id ===
                  verificationApiInfo?.response?.result?.property_file?.id
                ) {
                  return {
                    ...elem,
                    verification_status: VERIFICATION_STATUS?.IN_PROGRESS,
                  };
                } else return elem;
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

  /* if the verification API responds with the error then toast displays that error message and dispatch reset data.  */
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

  // // console.log({ userAuctionsData });
  const getAuctionType = (filter) => {
    switch (filter) {
      case LISTINGS_DRAWER_OPTIONS[2]?.subCategories[0][0]
        ?.replaceAll(" ", "_")
        ?.toLowerCase():
        return "sub_unit";
      case LISTINGS_DRAWER_OPTIONS[2]?.subCategories[1][0]
        ?.replaceAll(" ", "_")
        ?.toLowerCase():
        return "single";
      case LISTINGS_DRAWER_OPTIONS[2]?.subCategories[2][0]
        ?.replaceAll(" ", "_")
        ?.toLowerCase():
        return "bulk";
      default:
        return "single";
    }
  };

  return (
    <Suspense fallback={<ComponentLoader />}>
      {auctionToEdit ? (
        <EditAuctionsContainer />
      ) : showAuctionDetail ? (
        <AuctionDetailContainer />
      ) : (
        <div className={classes.container}>
          <div className={classes.topSection}>
            <span
              className={classes.topLabel}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >{`${path[3]?.replaceAll("_", " ") || "My"}`}</span>
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
            <Grid container rowSpacing={2} sx={{ mb: 5 }}>
              {userAuctionsDataApiInfo?.loading ? (
                <ComponentLoader />
              ) : (
                <>
                  {userAuctionsData?.result?.results?.length > 0 ? (
                    userAuctionsData?.result?.results?.map((elem, index) => (
                      <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
                        {verificationApiInfo?.loading &&
                        verificationApiInfo?.itemId === elem?.id ? (
                          <ComponentLoader />
                        ) : (
                          <AuctionCard auction={elem} />
                        )}
                      </Grid>
                    ))
                  ) : (
                    <NotFound label="No Auctions Found" />
                  )}
                </>
              )}
            </Grid>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default AuctionsContainer;
