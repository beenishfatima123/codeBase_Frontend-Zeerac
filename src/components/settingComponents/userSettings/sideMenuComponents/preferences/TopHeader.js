import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import useColor from "../../../../../utils/hooks/useColor";

const useStyles = makeStyles(() => ({
  container: {
    border: "1px solid #c9c9c9",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    maxWidth: "98%",
  },
  headingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
  },
  heading: {
    fontSize: 24,
    fontFamily: "heavy",
    color: "#134696",
  },
  resetFilters: {
    color: "#707070",
    fontSize: 16,
    fontFamily: "light",
    cursor: "pointer",
  },
  subHeading: {
    color: "#707070",
    fontSize: 16,
    fontFamily: "light",
    margin: "0 0 10px 20px",
  },

  "@media (max-width: 420px)": {},
}));

const TopHeader = ({
  heading,
  resetFilters,
  subHeading,
  onResetFilter,
  showReset,
  update,
  children,
}) => {
  const classes = useStyles();
  const { colors, darkMode } = useSelector((state) => state.global);
  useColor(colors);
  return (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <div className={classes.heading} style={{ color: colors?.primary }}>
          {heading}
        </div>
        {showReset && (
          <div
            className={classes.resetFilters}
            onClick={onResetFilter}
            style={{ color: darkMode ? "#fff" : "#707070" }}
          >
            {resetFilters}
          </div>
        )}
        {update && <div>{children}</div>}
      </div>
      <div
        className={classes.subHeading}
        style={{ color: darkMode ? "#fff" : "#707070" }}
      >
        {subHeading}
      </div>
    </div>
  );
};

export default TopHeader;
