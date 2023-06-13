import Balcony from "../../components/propertyComponents/createPropertyPost/content/svgs/features/Balcony";
import Commercial from "../../components/propertyComponents/createPropertyPost/content/svgs/type/Commercial";
import Flat from "../../components/propertyComponents/createPropertyPost/content/svgs/categories/Flat";
import Garden from "../../components/propertyComponents/createPropertyPost/content/svgs/features/Garden";
import GuestHouse from "../../components/propertyComponents/createPropertyPost/content/svgs/categories/GuestHouse";
import Hostel from "../../components/propertyComponents/createPropertyPost/content/svgs/categories/Hostel";
import HotelSuites from "../../components/propertyComponents/createPropertyPost/content/svgs/categories/HotelSuites";
import House from "../../components/propertyComponents/createPropertyPost/content/svgs/categories/House";
import Kitchen from "../../components/propertyComponents/createPropertyPost/content/svgs/features/Kitchen";
import LaundryRoom from "../../components/propertyComponents/createPropertyPost/content/svgs/features/LaundryRoom";
import Plot from "../../components/propertyComponents/createPropertyPost/content/svgs/type/Plot";
import Residence from "../../components/propertyComponents/createPropertyPost/content/svgs/type/Residence";
import Room from "../../components/propertyComponents/createPropertyPost/content/svgs/categories/Room";
import StoreRoom from "../../components/propertyComponents/createPropertyPost/content/svgs/features/StoreRoom";
import TvLounge from "../../components/propertyComponents/createPropertyPost/content/svgs/features/TvLounge";

import { DEFAULT_SHADOW } from "../constants";
import {
  LISTING_TYPE,
  PROPERTY_CATEGORIES,
  PROPERTY_FEATURES,
  PROPERTY_SERVICES,
  PROPERTY_TYPES,
} from "../propertyConstants";
import Electricity from "../../components/propertyComponents/createPropertyPost/content/svgs/serviceSvgs/Electricity";
import Gas from "../../components/propertyComponents/createPropertyPost/content/svgs/serviceSvgs/Gas";
import Water from "../../components/propertyComponents/createPropertyPost/content/svgs/serviceSvgs/Water";
import Maintenance from "../../components/propertyComponents/createPropertyPost/content/svgs/serviceSvgs/Maintenance";
import Security from "../../components/propertyComponents/createPropertyPost/content/svgs/serviceSvgs/Security";
import Sewerage from "../../components/propertyComponents/createPropertyPost/content/svgs/serviceSvgs/Sewerage";
import { getWordCount } from "../helperFunctions";

/* Returns the styling object for a button component used for selecting a specific attribute. */
export const getTacButtonSx = (value, data, attribute, darkMode) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxShadow: DEFAULT_SHADOW,
    borderRadius: "10px",
    maxHeight: "90%",
    maxWidth: "90%",
    textTransform: "none",
    color: data?.[attribute] === value ? "#fff" : "#134696",
    backgroundColor:
      data?.[attribute] === value
        ? darkMode
          ? "#0ed864"
          : "#134696"
        : darkMode
        ? "#2f2f33"
        : "white",
    "&:hover": {
      backgroundColor:
        data?.[attribute] === value
          ? "#134696"
          : darkMode
          ? "#134696"
          : "white",
    },
    height: 200,
    width: 200,
  };
};

/* Returns the styling object for a button component used for selecting multiple attributes. */
export const getMultiSelectTacButtonSx = (value, data, darkMode) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxShadow: DEFAULT_SHADOW,
    borderRadius: "10px",
    maxHeight: "90%",
    maxWidth: "90%",
    textTransform: "none",
    color: data?.includes(value) ? "white" : "#134696",
    backgroundColor: data?.includes(value)
      ? darkMode
        ? "#0ed864"
        : "#134696"
      : darkMode
      ? "#2f2f33"
      : "white",
    "&:hover": {
      backgroundColor: data?.includes(value)
        ? "#134696"
        : darkMode
        ? "#134696"
        : "white",
    },
    height: 200,
    width: 200,
  };
};

/* Returns the SVG component for a specific property type logo based on the index. */
export const getTypeLogo = (index, data, darkMode) => {
  switch (index) {
    case 0:
      return (
        <Residence
          color={
            data?.type === PROPERTY_TYPES[index][0]
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 1:
      return (
        <Commercial
          color={
            data?.type === PROPERTY_TYPES[index][0]
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 2:
      return (
        <Plot
          color={
            data?.type === PROPERTY_TYPES[index][0]
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    default:
      break;
  }
};

/* Returns the SVG component for a specific property category logo based on the index. */
export const getCategoryLogos = (index, data, darkMode) => {
  switch (index) {
    case 0:
      return (
        <House
          color={
            data?.category === PROPERTY_CATEGORIES[index][0]
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 1:
      return (
        <GuestHouse
          color={
            data?.category === PROPERTY_CATEGORIES[index][0]
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 2:
      return (
        <Flat
          color={
            data?.category === PROPERTY_CATEGORIES[index][0]
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 3:
      return (
        <HotelSuites
          color={
            data?.category === PROPERTY_CATEGORIES[index][0]
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 4:
      return (
        <Hostel
          color={
            data?.category === PROPERTY_CATEGORIES[index][0]
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 5:
      return (
        <Room
          color={
            data?.category === PROPERTY_CATEGORIES[index][0]
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    default:
      break;
  }
};

/* Returns the SVG component for a specific property feature logo based on the index. */
export const getFeaturesLogos = (index, data, darkMode) => {
  switch (index) {
    case 0:
      return (
        <TvLounge
          color={
            data?.features?.includes(PROPERTY_FEATURES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 1:
      return (
        <StoreRoom
          color={
            data?.features?.includes(PROPERTY_FEATURES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 2:
      return (
        <LaundryRoom
          color={
            data?.features?.includes(PROPERTY_FEATURES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 3:
      return (
        <Kitchen
          color={
            data?.features?.includes(PROPERTY_FEATURES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 4:
      return (
        <Balcony
          color={
            data?.features?.includes(PROPERTY_FEATURES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 5:
      return (
        <Garden
          color={
            data?.features?.includes(PROPERTY_FEATURES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    default:
      break;
  }
};

/* Returns the SVG component for a specific property service logo based on the index. */
export const getServiceLogos = (index, data, darkMode) => {
  switch (index) {
    case 0:
      return (
        <Electricity
          color={
            data?.services?.includes(PROPERTY_SERVICES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 1:
      return (
        <Gas
          color={
            data?.services?.includes(PROPERTY_SERVICES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 2:
      return (
        <Water
          color={
            data?.services?.includes(PROPERTY_SERVICES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 3:
      return (
        <Maintenance
          color={
            data?.services?.includes(PROPERTY_SERVICES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 4:
      return (
        <Security
          color={
            data?.services?.includes(PROPERTY_SERVICES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    case 5:
      return (
        <Sewerage
          color={
            data?.services?.includes(PROPERTY_SERVICES[index][0])
              ? "white"
              : darkMode
              ? "white"
              : "#134696"
          }
        />
      );
    default:
      break;
  }
};

/* Validates the input value for a specific property attribute (e.g., title, description, size, price) and returns an error message if the value is invalid. */
export const validateInputs = (prop, value) => {
  switch (prop) {
    case "title":
      if (value?.length < 10 || value?.length > 100)
        return "Title must be between 10 - 100 characters";
      else return null;

    case "description":
      if (getWordCount(value) < 3 || getWordCount(value) > 100)
        return "description must be min. 3 and max. 100 words.";
      else return null;

    case "size":
      if (parseInt(value) <= 0 || parseInt(value) >= 10000)
        return "Size must be between 0 - 10000";
      else return null;

    case "price":
      if (parseInt(value) <= 0) {
        return "Price must be greater than 0";
      } else return null;
    default:
      return null;
  }
};

/*  Validates the input value for a specific auction attribute (e.g., area, city, description, size, price, sharePercentage, totalBidders, totalFiles) and returns an error message if the value is invalid. */
export const validateAuctionInputs = (prop, value) => {
  switch (prop) {
    case "area":
      if (value?.length < 3 || value?.length >= 100)
        return "area must be at least 3 and maximum 100 characters";
      else return null;
    case "city":
      if (value?.length < 5) return "city must be at least 5 characters";
      else return null;
    case "description":
      if (getWordCount(value) < 10 || getWordCount(value) > 100)
        return "description must be min. 10 and max. 100 words.";
      else return null;
    case "size":
      if (parseInt(value) <= 0 || parseInt(value) >= 100000)
        return "Size must be between 0 - 100000";
      else return null;
    case "price":
      if (parseInt(value) <= 0) return "Price must be greater than 0";
      else return null;
    case "sharePercentage":
      if (parseInt(value) <= 0 || parseInt(value) >= 100)
        return "Share Percentage must be between 0 and 100";
      else return null;
    case "totalBidders":
      if (parseInt(value) <= 0 || parseInt(value) >= 100)
        return "Total Bidders must be between 0 and 100";
      else return null;
    case "totalFiles":
      if (parseInt(value) <= 0) return "Total Files must be greater than 0";
      else return null;
    default:
      return null;
  }
};

/* Checks the overall validation of auction data based on the provided data object and listing type. */
export const checkAuctionDataValidation = (data, type) => {
  if (!data?.area || data?.area?.length < 3)
    return "area must be at least 3 characters";
  else if (!data?.city || data?.city?.length < 3)
    return "city must be at least 3 characters";
  // else if (!data?.country || data?.country?.length < 5)
  //   return 'country must be at least 5 characters';
  else if (!data?.size || parseInt(data?.size) <= 0)
    return "Size must be greater than 0";
  else if (!data?.price || parseInt(data?.price) <= 0)
    return "price must be greater than 0";
  else if (!data?.images) return "At least 1 auction image is required";
  else {
    if (type === LISTING_TYPE[1]) {
      if (
        !data?.sharePercentage ||
        parseInt(data?.sharePercentage) <= 0 ||
        parseInt(data?.sharePercentage) >= 100
      )
        return "Share Percentage must be between 0 and 100";
      else if (
        !data?.totalBidders ||
        parseInt(data?.totalBidders) <= 0 ||
        parseInt(data?.totalBidders) >= 100
      )
        return "Total Bidders must be between 0 and 100";
      else return null;
    } else if (type === LISTING_TYPE[3]) {
      if (!data?.totalFiles || parseInt(data?.totalFiles) <= 0)
        return "Total Files must be greater than 0";
      else return null;
    } else return null;
  }
};
export const IMAGE_LIMIT = 10;
