import React from "react";
import { makeStyles } from "@mui/styles";
import TopCard from "./TopCard";
import Information from "./Information";
import MainImage from "./MainImage";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.1em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    height: "78vh",
  },
}));

/* EditAuctionsContainer renders all components inside the edit auction page. */
const EditAuctionsContainer = () => {
  const classes = useStyles();
  const { allAuctionsDataApiInfo } = useSelector((state) => state.auction);

  return (
    <div className={classes.container}>
      {allAuctionsDataApiInfo?.loadingUpdate ? (
        <ComponentLoader />
      ) : (
        <>
          <TopCard />
          <MainImage />
          <Information />
        </>
      )}
    </div>
  );
};

export default EditAuctionsContainer;
