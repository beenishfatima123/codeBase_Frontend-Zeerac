import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ClickAwayListener, Grow, IconButton } from "@mui/material";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "2px solid #0ed864",
    position: "relative",
    transition: "0.5s",
    cursor: "pointer",
  },
  label: {
    fontSize: 24,
    fontFamily: "medium",
  },
  dropdownLabel: {
    fontSize: 18,
    fontFamily: "medium",
    paddingBottom: 5,
  },
  dropdownContainer: {
    position: "absolute",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    width: "95%",
    zIndex: 500,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    top: "103%",
    transition: "0.5s",
    padding: "8px 5%",
    minWidth: 215,
  },
  dropdownInner: {
    display: "flex",
    flexDirection: "column",
  },
}));
const CountrySelector = ({ options, handleMove }) => {
  const classes = useStyles();

  const { darkMode, selectedRegion } = useSelector((state) => state.global);
  const { currentLocation } = useSelector((state) => state.auth);

  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#212124" : "white",
        color: darkMode ? "white" : "#134696",
      }}
    >
      <span
        className={classes.label}
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {selectedRegion ? selectedRegion?.country : currentLocation?.country}
      </span>
      <IconButton
        sx={{ p: 0, ml: 2 }}
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        <ArrowDropDownIcon
          style={{
            color: darkMode ? "#0ed864" : "#134696",
          }}
        />
      </IconButton>
      {openMenu && (
        <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
          <div
            className={classes.dropdownContainer}
            style={{
              backgroundColor: darkMode ? "#212124" : "white",
            }}
          >
            <Grow in={openMenu} mountOnEnter unmountOnExit>
              <div className={classes.dropdownInner}>
                {options?.map((elem, index) => (
                  <span
                    className={classes.dropdownLabel}
                    key={index}
                    style={{
                      "&:hover": {
                        color: "#0ed864",
                      },
                    }}
                    onClick={() => {
                      handleMove(elem);
                      setOpenMenu(false);
                    }}
                  >
                    {elem?.properties?.ADMIN}
                  </span>
                ))}
              </div>
            </Grow>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default CountrySelector;
