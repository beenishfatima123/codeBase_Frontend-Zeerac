import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { makeStyles } from "@mui/styles";
import { POST_MENU_VARIANTS } from "../../../../utils/propertyConstants";
import { useDimensions } from "../../../../utils/use-dimensions";
import MenuContent from "./MenuContent";
import tabLines from "../../../../assets/properties/createPost/tabLines.png";

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    bottom: 0,
    width: "100%",
    zIndex: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    backgroundColor: "#134696",
    minHeight: "100vh",
  },
  lines: {
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
}));

const MobileMenuContainer = () => {
  const classes = useStyles();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={classes.container} variants={POST_MENU_VARIANTS}>
        <img src={tabLines} alt="" className={classes.lines} />
        <MenuContent toggle={toggleOpen} />
      </motion.div>
      <MenuToggle toggle={() => toggleOpen()} isOpen={isOpen} />
    </motion.nav>
  );
};
export default MobileMenuContainer;
