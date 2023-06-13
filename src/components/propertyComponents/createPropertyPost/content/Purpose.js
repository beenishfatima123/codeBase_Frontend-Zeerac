import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  LISTING_TYPE,
  PROPERTY_PURPOSE,
} from "../../../../utils/propertyConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  setListingType,
  setPropertyData,
  setSelectedTab,
} from "../../../../redux/slices/createPropertySlice";
import { TextTranslation } from "../../../../utils/translation";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 0px",
  },
  title: {
    color: "#134696",
    fontSize: 15,
    marginLeft: 20,
    fontFamily: "heavy",
  },
}));
const Purpose = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const { selectedTab, allTabs, listingType } = useSelector(
    (state) => state.createProperty
  );
  // console.log({ listingType });
  const { darkMode, langIndex } = useSelector((state) => state.global);

  const handleSelect = (purpose) => {
    //console.log({ purpose, allTabs, selectedTab, propertyData });
    let _allTabs = allTabs?.map((item, index) => {
      return allTabs[index][0];
    });
    dispatch(setPropertyData({ ...propertyData, purpose }));
    dispatch(setSelectedTab(_allTabs[_allTabs?.indexOf(selectedTab) + 1]));
  };

  return (
    <div className={classes.container}>
      <Accordion
        sx={{
          boxShadow: "none",
          width: "70%",
          "@media (max-width: 800px)": {
            width: "90%",
          },
        }}
        defaultExpanded
      >
        <AccordionSummary
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 0px",
            backgroundColor: darkMode ? "#303134" : "#fff",
          }}
          expandIcon={
            <ArrowDropDownIcon
              style={{ color: darkMode ? "#0ed864" : "#134696" }}
            />
          }
        >
          <span
            className={classes.title}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            {TextTranslation.property[langIndex]}
          </span>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: darkMode ? "#303134" : "#fff",
          }}
        >
          {PROPERTY_PURPOSE?.map((elem, index) => (
            <Button
              onClick={() => handleSelect(elem[0])}
              key={index}
              sx={{
                border: darkMode ? "1px solid #0ed864" : "1px solid #134696",
                fontSize: 15,
                fontFamily: "medium",
                width: "90%",
                height: 50,
                borderRadius: 0,
                ml: 4,
                mr: 4,
                mt: 1,
                mb: 1,
                backgroundColor:
                  propertyData?.purpose === elem[0]
                    ? darkMode
                      ? "#0ed864"
                      : "#134696"
                    : "none",
                color:
                  propertyData?.purpose === elem[0]
                    ? "white"
                    : darkMode
                    ? "#fff"
                    : "#134696",
                "&:hover": {
                  backgroundColor:
                    propertyData?.purpose === elem[0] ? "#134696" : "none",
                },
              }}
            >
              {elem[langIndex]}
            </Button>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "none",
          width: "70%",
          "@media (max-width: 800px)": {
            width: "90%",
          },
        }}
        defaultExpanded
      >
        <AccordionSummary
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 0px",
            backgroundColor: darkMode ? "#303134" : "#fff",
          }}
          expandIcon={
            <ArrowDropDownIcon
              style={{ color: darkMode ? "#0ed864" : "#134696" }}
            />
          }
        >
          <span
            className={classes.title}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            {TextTranslation.purpose[langIndex]}
          </span>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: darkMode ? "#303134" : "#fff",
          }}
        >
          {LISTING_TYPE?.map((elem, index) => {
            //console.log({ elem });
            // console.log({ listingType });
            return (
              <Button
                onClick={() => {
                  dispatch(setListingType(elem[0]));
                  if (index !== 0) dispatch(setSelectedTab("Information"));
                }}
                key={index}
                sx={{
                  border: darkMode ? "1px solid #0ed864" : "1px solid #134696",
                  fontSize: 15,
                  width: "90%",
                  height: 50,
                  borderRadius: 0,
                  fontFamily: "medium",
                  ml: 4,
                  mr: 4,
                  mt: 1,
                  mb: 1,
                  backgroundColor:
                    listingType === elem[0]
                      ? darkMode
                        ? "#0ed864"
                        : "#134696"
                      : "none",
                  color:
                    listingType === elem[0]
                      ? "white"
                      : darkMode
                      ? "#fff"
                      : "#134696",
                  "&:hover": {
                    backgroundColor:
                      listingType === elem[0] ? "#134696" : "none",
                  },
                }}
              >
                {elem[langIndex]}
              </Button>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Purpose;
