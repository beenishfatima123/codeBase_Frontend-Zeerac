import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import tabLines from "../../../../assets/properties/createPost/tabLines.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllTabs,
  setSelectedTab,
} from "../../../../redux/slices/createPropertySlice";
import { getTabTitle } from "../../../../utils/helperFunctions";
import { POST_TABS, PROPERTY_TYPES } from "../../../../utils/propertyConstants";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    padding: "0px 5%",
    backgroundColor: "#134696",
    position: "relative",
    height: "85vh",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  lines: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  "@media (max-width: 1100px)": {
    container: {
      height: "100vh",
    },
  },
}));
const LeftSection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedTab, propertyData, allTabs } = useSelector(
    (state) => state.createProperty
  );
  const { langIndex } = useSelector((state) => state.global);

  useEffect(() => {
    if (propertyData?.type === PROPERTY_TYPES[1][0])
      dispatch(
        setAllTabs(
          allTabs?.filter(
            (elem) =>
              !elem?.includes("Construction") &&
              !elem?.includes("Features") &&
              !elem?.includes("Services")
          )
        )
      );
    else dispatch(setAllTabs(POST_TABS));
    // eslint-disable-next-line
  }, [propertyData]);

  const { inValidCategory, inValidAuctionCategory } = useSelector(
    (state) => state.createProperty
  );
  // console.log({ inValidCategory, propertyData });

  return (
    <motion.div className={classes.container} variants={variants}>
      <img src={tabLines} alt="" className={classes.lines} />
      {allTabs?.map((elem, index) => {
        //console.log({ elem, inValidAuctionCategory });
        return (
          <Button
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "none",
              color:
                selectedTab === elem[0]
                  ? "#0ED864"
                  : inValidCategory?.[elem[0]?.toLowerCase()]?.isValid === false
                  ? "red"
                  : inValidAuctionCategory?.[elem[0]?.toLowerCase()]
                      ?.isValid === false
                  ? "red"
                  : "#ACACAC",
              fontSize: selectedTab === elem[0] ? 32 : 24,
              fontFamily: selectedTab === elem[0] ? "heavy" : "medium",
              height: 90,
              width: 250,
              transition: "font-size 0.3s",
            }}
            onClick={() => dispatch(setSelectedTab(elem[0]))}
            disableRipple
          >
            {selectedTab !== elem[0] ? (
              <PlayArrowIcon
                style={{ fontSize: 18, color: "#ACACAC", transition: "0.3s" }}
              />
            ) : (
              <PlayCircleIcon
                style={{ fontSize: 50, color: "#FFFFFF", transition: "0.3s" }}
              />
            )}
            <span style={{ marginLeft: 20 }}>
              {getTabTitle(elem[langIndex])}
            </span>
          </Button>
        );
      })}
    </motion.div>
  );
};

export default LeftSection;
