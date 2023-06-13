import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { DEFAULT_SHADOW } from "../../../../utils/constants";

import { useDispatch, useSelector } from "react-redux";
import {
  setPropertyData,
  setSelectedTab,
} from "../../../../redux/slices/createPropertySlice";
import { PROPERTY_ATTRIBUTES } from "../../../../utils/propertyConstants";
import {
  getCategoryLogos,
  getFeaturesLogos,
  getMultiSelectTacButtonSx,
  getServiceLogos,
  getTacButtonSx,
  getTypeLogo,
} from "../../../../utils/helpers/propertyCreation";
const gridSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    padding: "20px 0px",
    flexDirection: "column",
  },
  title: {
    fontSize: 15,
    color: "#134696",
    borderBottom: "1px solid #134696",
    padding: "10px 5%",
    marginRight: "5%",
    fontFamily: "heavy",
  },
  text: {
    fontSize: 15,
    marginTop: 20,
  },
  typeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    boxShadow: DEFAULT_SHADOW,
    borderRadius: 10,
    height: 120,
    width: 120,
  },
}));

const TacCards = ({ items, attribute, multiselect }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const selectedTab = useSelector((state) => state.createProperty.selectedTab);
  const allTabs = useSelector((state) => state.createProperty.allTabs);
  const { darkMode, langIndex } = useSelector((state) => state.global);

  const handleMultiSelect = (item) => {
    dispatch(
      setPropertyData({
        ...propertyData,
        [attribute]: propertyData?.[attribute]?.length ? setItem(item) : [item],
      })
    );
  };
  const setItem = (item) => {
    if (propertyData?.[attribute]?.includes(item))
      return propertyData?.[attribute]?.filter((elem) => elem !== item);
    else return [...propertyData?.[attribute], item];
  };
  const handleClick = (value) => {
    // console.log({ x: PROPERTY_ATTRIBUTES?.TYPE[0] });
    let _allTabs = allTabs?.map((item, index) => {
      return allTabs[index][0];
    });
    if (attribute === PROPERTY_ATTRIBUTES?.TYPE[0])
      dispatch(
        setPropertyData({ ...propertyData, [attribute]: value, category: null })
      );
    else dispatch(setPropertyData({ ...propertyData, [attribute]: value }));
    dispatch(setSelectedTab(_allTabs[_allTabs?.indexOf(selectedTab) + 1]));
  };

  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
          borderBottom: darkMode ? "1px solid #0ed864" : "1px solid #134696",
        }}
      >
        Select one to proceed
      </span>
      <Grid container columnSpacing={2}>
        {items?.map((elem, index) => {
          //console.log({ elem });
          return (
            <Grid key={index} item xs={6} sx={gridSx}>
              <Button
                disableRipple
                sx={
                  multiselect
                    ? getMultiSelectTacButtonSx(
                        elem[0],
                        propertyData?.[attribute],
                        darkMode
                      )
                    : getTacButtonSx(elem[0], propertyData, attribute, darkMode)
                }
                onClick={() =>
                  multiselect
                    ? handleMultiSelect(elem[0])
                    : handleClick(elem[0])
                }
              >
                {attribute === PROPERTY_ATTRIBUTES?.TYPE[0] &&
                  getTypeLogo(index, propertyData, darkMode)}
                {attribute === PROPERTY_ATTRIBUTES?.CATEGORY[0] &&
                  getCategoryLogos(index, propertyData, darkMode)}
                {attribute === PROPERTY_ATTRIBUTES?.SERVICES[0] &&
                  getServiceLogos(index, propertyData, darkMode)}
                {attribute === PROPERTY_ATTRIBUTES?.FEATURES[0] &&
                  getFeaturesLogos(index, propertyData, darkMode)}

                <span
                  className={classes.text}
                  style={{
                    color: multiselect
                      ? propertyData?.[attribute]?.includes(elem[langIndex])
                        ? "#fff"
                        : darkMode
                        ? "#0ed864"
                        : "#134696"
                      : propertyData?.[attribute] === elem[0]
                      ? "#fff"
                      : darkMode
                      ? "#0ed864"
                      : "#134696",
                  }}
                >
                  {elem[langIndex]}
                </span>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default TacCards;
