import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import BudgetFilter from "./BudgetFilter";
import LocationPanel from "./LocationPanel";
import SizeFilter from "./SizeFilter";
import TypeFilter from "./TypeFilter";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#1C1C1C",
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
  },
  filterContainer: {
    display: "flex",
    flexDirection: "column",
  },
  searchBtnContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1C1C1C",
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
}));
const DrawerContent = ({ setOpen }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <LocationPanel />
        <TypeFilter />
        <SizeFilter />
        <BudgetFilter />
      </div>
      {/* <PropertyFilters /> */}
      <div className={classes.searchBtnContainer}>
        <Button
          variant="contained"
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            borderRadius: 50,
            textTransform: "none",
            padding: "10px 50px",
          }}
        >
          Search now
        </Button>
      </div>
    </div>
  );
};

export default DrawerContent;
