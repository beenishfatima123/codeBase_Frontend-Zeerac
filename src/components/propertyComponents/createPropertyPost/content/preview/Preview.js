import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import IconsSvg from "./IconsSvg";
import { useWindowDims } from "../../../../../utils/useWindowDims";
import ItemsList from "./ItemsList";
import ConstructionPreview from "./ConstructionPreview";
import FloorPlanPreview from "./FloorPlanPreview";
import { Button } from "@mui/material";
import {
  createProperty,
  resetCreateProperties,
  resetCreatePropertiesApi,
} from "../../../../../redux/slices/createPropertySlice";
import { getPostFormData } from "../../../../../utils/helperFunctions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";
import { useNavigate } from "react-router-dom";
import { TextTranslation } from "../../../../../utils/translation";
import { PROPERTY_TYPES } from "../../../../../utils/propertyConstants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 5%",
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
    height: "68vh",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottom: "1px solid #134696",
  },
  title: {
    fontSize: 22,
    color: "#134696",
    fontFamily: "heavy",
    display: "flex",
    flex: 1,
  },
  thumbnail: {
    height: 250,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DBDBDB",
    marginTop: 20,
    alignSelf: "center",
    objectFit: "fill",
  },
  address: {
    fontSize: 18,
    color: "#1A2954",
    marginTop: 10,
  },
  tagline: {
    fontSize: 24,
    fontFamily: "heavy",
    color: "#1A2954",
    marginTop: 10,
  },
  price: {
    fontSize: 36,
    fontFamily: "heavy",
    marginTop: 10,
    color: "#134696",
  },
  description: {
    padding: "20px 0px",
    borderTop: "0.5px solid #707070",
    borderBottom: "1px solid #707070",
    marginTop: 10,
  },
  featureTitle: {
    fontSize: 18,
    color: "#134696",
  },
  feature: {
    fontSize: 16,
    color: "#6B7B88",
  },
  listedBy: {
    color: "#7D7D7D",
    fontSize: 14,
    fontWeight: "lighter",
    padding: "20px 0px",
    borderTop: "0.5px solid #707070",
  },
  userDetails: {
    color: "#1A2954",
    fontSize: 18,
    fontWeight: "normal",
    margin: 0,
  },
}));
const buttonSx = {
  backgroundColor: "#134696",
  color: "white",
  borderRadius: "50px",
  height: 48,
  width: 145,
  fontSize: 15,
  fontWeight: "bold",
  fontFamily: "medium",
  p: 0,
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const Preview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { height } = useWindowDims();
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );

  const currentUser = useSelector((state) => state.auth.currentUser);
  const selectedTab = useSelector((state) => state.createProperty.selectedTab);
  const inValidCategory = useSelector(
    (state) => state.createProperty.inValidCategory
  );
  const createPropertyApiInfo = useSelector(
    (state) => state.createProperty.createPropertyApiInfo
  );
  const { darkMode, langIndex } = useSelector((state) => state.global);

  const inValid = useMemo(() => {
    // // console.log({ inValidCategory });
    let _temp = false;
    for (const property in inValidCategory) {
      if (!inValidCategory[property]?.isValid) {
        _temp = `Some information in ${property} are missing`;
      }
    }
    return _temp;
  }, [inValidCategory]);

  useEffect(() => {
    if (createPropertyApiInfo?.error) {
      // // console.log({ error: createPropertyApiInfo?.error });
      toast.error(createPropertyApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetCreatePropertiesApi());
    }
    // eslint-disable-next-line
  }, [createPropertyApiInfo?.error]);
  useEffect(() => {
    if (createPropertyApiInfo?.response) {
      // // console.log({ response: createPropertyApiInfo?.response });
      toast.success("Listing posted successfully", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#134696" },
      });
      navigate("/listings");
      dispatch(resetCreateProperties());
    }
    // eslint-disable-next-line
  }, [createPropertyApiInfo?.response]);

  const getCurrency = useMemo(() => {
    if (propertyData?.currency && propertyData?.price)
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: propertyData?.currency,
      }).format(propertyData?.price);
    else return "$ 0";
  }, [propertyData]);

  const postListing = () => {
    if (inValid) {
      toast.error(inValid, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    } else {
      dispatch(
        createProperty({
          values: getPostFormData(propertyData, currentUser?.id),
          token: currentUser?.token,
        })
      );
    }
  };

  return (
    <div className={classes.container}>
      {createPropertyApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          <div
            className={classes.titleContainer}
            style={{
              borderBottom: darkMode
                ? "1px solid #0ed864"
                : "1px solid #134696",
            }}
          >
            <span
              className={classes.title}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              {selectedTab === "Preview"
                ? TextTranslation.youAreDone[langIndex]
                : TextTranslation.listingPreview[langIndex]}
            </span>
            {selectedTab === "Preview" && (
              <Button sx={buttonSx} onClick={postListing}>
                {TextTranslation.proceed[langIndex]}
              </Button>
            )}
          </div>
          {propertyData?.images?.length ? (
            <img
              src={URL.createObjectURL(propertyData?.images[0])}
              alt=""
              className={classes.thumbnail}
              style={{
                height: height * 0.35 || 300,
              }}
            />
          ) : (
            <div className={classes.thumbnail}></div>
          )}

          <IconsSvg data={propertyData} />
          <span
            className={classes.address}
            style={{
              color: darkMode ? "#fff" : "#134696",
              fontFamily: "heavy",
            }}
          >{`${
            propertyData?.location?.area ||
            TextTranslation.selectAnArea[langIndex]
          }, ${
            propertyData?.location?.city ||
            TextTranslation.selectACity[langIndex]
          }`}</span>
          <span
            className={classes.tagline}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >{`
      ${propertyData?.size?.substring(0, 3) || 0} ${
            propertyData?.unit || "Kanal"
          }, ${
            propertyData?.category || TextTranslation.selectACategory[langIndex]
          }`}</span>
          <span
            className={classes.price}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >{`${getCurrency} `}</span>
          <span
            className={classes.description}
            style={{
              color: darkMode ? "#fff" : "#000",
            }}
          >
            {propertyData?.description ||
              TextTranslation.pleaseEnterDescription[langIndex]}
          </span>
          {propertyData?.type !== PROPERTY_TYPES[1][0] && (
            <>
              <ItemsList heading="Features" data={propertyData?.features} />
              <ItemsList heading="Services" data={propertyData?.services} />
            </>
          )}

          <FloorPlanPreview data={propertyData?.floorPlan} />
          {propertyData?.type !== PROPERTY_TYPES[1][0] && (
            <ConstructionPreview />
          )}

          <p
            className={classes.listedBy}
            style={{
              color: darkMode ? "#fff" : "#7D7D7D",
            }}
          >
            {TextTranslation.listedBy[langIndex]}:{" "}
            <span
              className={classes.userDetails}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >{`${currentUser?.first_name || "Anonymous"}`}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Preview;
