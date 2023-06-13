import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { ReactComponent as SortSvg } from "../../../../assets/properties/sort.svg";
import Card from "./Card";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
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
  countContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    borderBottom: "1px solid #707070",
    paddingBottom: 10,
  },
  count: {
    fontSize: 28,
    margin: 0,
  },
}));

/* CardsContainer takes total, properties and setSortOrder where total is used to show how many total properties are being displayed,
properties is the properties array, setSortOrder tells how properties will be sorted. */
const CardsContainer = ({ total, properties, setSortOrder }) => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div
      className={classes.container}
      style={
        {
          // height: properties?.length >= 9 ? "100vh" : "",
        }
      }
    >
      <div className={classes.countContainer}>
        <p
          className={classes.count}
          style={{ color: darkMode ? "white" : "#134696" }}
        >
          {TextTranslation.displaying[langIndex]}{" "}
          <span style={{ fontFamily: "heavy" }}>{total}</span>{" "}
          {TextTranslation.properties[langIndex]}
        </p>
        <Button
          sx={{
            textTransform: "none",
            border: "1px solid #C9C9C9",
            width: 150,
            height: 45,
            borderRadius: 20,
            color: darkMode ? "white" : "#134696",
          }}
          endIcon={<SortSvg />}
          onClick={() => setSortOrder((prev) => (!prev ? "asc" : null))}
        >
          Sort By:
        </Button>
      </div>
      {properties?.map((elem, index) => (
        <Card property={elem} key={index} />
      ))}
    </div>
  );
};

export default CardsContainer;
