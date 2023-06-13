import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TopSection from "./TopSection";
import { Button, Grid } from "@mui/material";
import phonePng from "../../../assets/home/phonePng.png";
import { SOCIAL_CONTENT_SELECTION } from "../../../utils/constants";
import TopFilters from "./socialShowcase/TopFilters";
import ShowcaseCardsContainer from "./socialShowcase/ShowcaseCardsContainer";
import { useSelector } from "react-redux";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  phone: {
    // width: "100%",
    height: 480,
    objectFit: "contain",
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#134696",
    textAlign: "left",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const exploreBtnSx = {
  fontSize: 14,

  textTransform: "none",

  borderRadius: "20px",
  margin: "10px 0px",
  width: "154px",
  height: "40px",
};
const CommunityContainer = () => {
  const classes = useStyles();

  const { darkMode } = useSelector((state) => state.global);

  const [selectedFilter, setSelectedFilter] = useState(
    SOCIAL_CONTENT_SELECTION[0]
  );
  return (
    <div className={classes.container}>
      <TopSection />
      <Grid container sx={{ margin: "0px 5%" }}>
        <Grid item md={6}>
          <img src={phonePng} alt="" className={classes.phone} />
        </Grid>
        <Grid item md={6}>
          <TopFilters
            selected={selectedFilter}
            setSelected={setSelectedFilter}
          />
          <div style={{ maxWidth: "90%", margin: "5px 0px" }}>
            <span
              className={classes.title}
              style={{
                color: darkMode ? "white" : "#134696",
              }}
            >
              Making Strides in Real Estate with Unbeatable Customer Experience
            </span>
          </div>
          <Button
            sx={{
              ...exploreBtnSx,
              color: darkMode ? "white" : "#134696",
              border: darkMode ? "1px solid white" : "1px solid #134696",
            }}
          >
            Explore More
          </Button>
          <ShowcaseCardsContainer />
        </Grid>
      </Grid>
    </div>
  );
};

export default CommunityContainer;
