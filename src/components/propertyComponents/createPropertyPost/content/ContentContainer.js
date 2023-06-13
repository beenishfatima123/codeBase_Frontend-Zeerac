import React, { Suspense, lazy, useEffect } from "react";

import { makeStyles } from "@mui/styles";
import { useWindowDims } from "../../../../utils/useWindowDims";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllTabs,
  setInvalidAuctionCategory,
  setInvalidCategory,
} from "../../../../redux/slices/createPropertySlice";
import {
  AUCTION_TABS,
  LISTING_TYPE,
  POST_TABS,
} from "../../../../utils/propertyConstants";
import ComponentLoader from "../../../globalComponents/ComponentLoader";

const RightSection = lazy(() => import("./RightSection"));
const LeftSection = lazy(() => import("./LeftSection"));
const LoginPrompt = lazy(() => import("../LoginPrompt"));

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: "100%",
  },
}));

/* ContentContainer is on add listings page, it has left and right sections. Left section
shows tabs while creating property. If the user is not logged in, the right section 
shows login page otherwise it shows create property page. */
const ContentContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { width } = useWindowDims();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { allTabs, allAuctionTabs, selectedTab, listingType } = useSelector(
    (state) => state.createProperty
  );

  const inValidCategory = useSelector(
    (state) => state.createProperty.inValidCategory
  );
  const inValidAuctionCategory = useSelector(
    (state) => state.createProperty.inValidAuctionCategory
  );

  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const auctionData = useSelector((state) => state.createProperty.auctionData);

  /* This useEffect is executed when propertyData or selectedTab is changed.
  It checks which tab is selected in left setion and sets
  validity of that tab as true if the tab has been filled with data. It dispatches
  the invalid data */
  useEffect(() => {
    let inValidData = {};
    let _allTabs = allTabs?.map((item, index) => {
      return allTabs[index][0];
    });
    if (_allTabs?.indexOf(selectedTab) >= 1)
      inValidData = {
        ...inValidData,
        type: { isValid: propertyData?.type ? true : false },
      };
    if (_allTabs?.indexOf(selectedTab) >= 2)
      inValidData = {
        ...inValidData,
        categories: { isValid: propertyData?.category ? true : false },
      };
    if (_allTabs?.indexOf(selectedTab) >= 3)
      inValidData = {
        ...inValidData,
        details: { ...inValidCategory?.details, isValid: checkDetails() },
      };
    if (_allTabs?.indexOf(selectedTab) >= 6)
      inValidData = {
        ...inValidData,
        location: { isValid: propertyData?.location ? true : false },
      };
    if (_allTabs?.indexOf(selectedTab) >= 7)
      inValidData = {
        ...inValidData,
        images: {
          isValid: propertyData?.images?.length ? true : false,
        },
      };
    dispatch(
      setInvalidCategory({
        ...inValidCategory,
        ...inValidData,
      })
    );

    // eslint-disable-next-line
  }, [propertyData, selectedTab]);

  /* This useEffect hook checks if the selectedTab in auctions is 1, 
  it check auction category and validates by calling checkAuctionDetails
  if selectedTab is 2 or greater, the inValidData for image_subunit is 
  updated as either true or false. Finally the invalid data is dispatched to
  inValidAuctionCategory. */
  useEffect(() => {
    let inValidData = {};
    let _allAuctionTabs = allAuctionTabs?.map((item, index) => {
      return allAuctionTabs[index][0];
    });
    if (_allAuctionTabs?.indexOf(selectedTab) >= 1)
      inValidData = {
        ...inValidData,
        information: {
          ...inValidAuctionCategory?.information,
          isValid: checkAuctionDetails(),
        },
      };
    if (_allAuctionTabs?.indexOf(selectedTab) >= 2)
      inValidData = {
        ...inValidData,
        images_subunit: {
          isValid: auctionData?.images?.length > 0 ? true : false,
        },
      };

    dispatch(
      setInvalidAuctionCategory({
        ...inValidAuctionCategory,
        ...inValidData,
      })
    );

    // eslint-disable-next-line
  }, [auctionData, selectedTab]);

  /* This useEffect checks listing type, if the listing type is not "property", it
  dispatches selected tabs to AUCTION_TABS otherwise same as POST_TABS */
  useEffect(() => {
    if (listingType !== LISTING_TYPE[0][0]) dispatch(setAllTabs(AUCTION_TABS));
    else dispatch(setAllTabs(POST_TABS));

    // eslint-disable-next-line
  }, [listingType]);

  /* checkDetails is used to check validity of entered details. It checks title, price
  and size. Then a for loop checks if any property in inValidCategory has truthy values.
  It returns isValid. */
  const checkDetails = () => {
    let isValid = true;
    if (!propertyData?.title || !propertyData?.price || !propertyData?.size)
      isValid = false;
    for (const property in inValidCategory?.details) {
      if (property !== "isValid" && inValidCategory?.details?.[property]) {
        isValid = false;
      }
    }
    return isValid;
  };

  /* checkAuctionDetails checks if certain properties exist and are truthy in an object named auctionData. 
  The properties being checked are description, area, city, size, price, and end_date. 
  If any of these properties are missing or falsy, isValid is set to false. */
  const checkAuctionDetails = () => {
    let isValid = true;
    if (
      !auctionData?.description ||
      !auctionData?.area ||
      !auctionData?.city ||
      !auctionData?.size ||
      !auctionData?.price ||
      !auctionData?.end_date
    )
      isValid = false;

    return isValid;
  };

  return (
    <div className={classes.container}>
      <Suspense fallback={<ComponentLoader />}>
        <>
          {width > 900 && <LeftSection />}
          {currentUser ? <RightSection /> : <LoginPrompt />}
        </>
      </Suspense>
    </div>
  );
};

export default ContentContainer;
