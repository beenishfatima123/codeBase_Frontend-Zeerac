import React from "react";
import { makeStyles } from "@mui/styles";
import ListingsAccordion from "./ListingsAccordion";
import { LISTINGS_DRAWER_OPTIONS } from "../../../../utils/constants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));
const ListingsDrawer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {LISTINGS_DRAWER_OPTIONS?.slice(1, LISTINGS_DRAWER_OPTIONS?.length)?.map(
        (elem, index) => (
          <ListingsAccordion key={index} elem={elem} />
        )
      )}
    </div>
  );
};

export default ListingsDrawer;
