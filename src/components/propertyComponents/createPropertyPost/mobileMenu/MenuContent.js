import React from "react";
import { motion } from "framer-motion";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../../../../redux/slices/createPropertySlice";
import { getTabTitle } from "../../../../utils/helperFunctions";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuContent = ({ toggle }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.createProperty.selectedTab);
  const allTabs = useSelector((state) => state.createProperty.allTabs);
  const { inValidCategory, inValidAuctionCategory } = useSelector(
    (state) => state.createProperty
  );
  const { langIndex } = useSelector((state) => state.global);

  return (
    <motion.ul variants={variants}>
      {allTabs.map((elem, index) => (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          key={index}
          style={{
            color:
              selectedTab === elem[0]
                ? "#0ED864"
                : inValidCategory?.[elem[0]?.toLowerCase()]?.isValid === false
                ? "red"
                : inValidAuctionCategory?.[elem[0]?.toLowerCase()]?.isValid ===
                  false
                ? "red"
                : "#ACACAC",
            fontSize: selectedTab === elem[0] ? 32 : 24,
            fontFamily: selectedTab === elem[0] ? "heavy" : "medium",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "20px 0px",
          }}
          onClick={() => {
            dispatch(setSelectedTab(elem[0]));
            toggle();
          }}
        >
          {selectedTab !== elem ? (
            <PlayArrowIcon
              style={{ fontSize: 18, color: "#ACACAC", transition: "0.3s" }}
            />
          ) : (
            <PlayCircleIcon
              style={{ fontSize: 30, color: "#FFFFFF", transition: "0.3s" }}
            />
          )}
          <span style={{ marginLeft: 20 }}>
            {" "}
            {getTabTitle(elem[langIndex])}
          </span>
        </motion.div>
      ))}
    </motion.ul>
  );
};

export default MenuContent;
