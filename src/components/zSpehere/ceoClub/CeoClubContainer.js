import React from "react";
import { makeStyles } from "@mui/styles";
import CeoClubTop from "../../../assets/zSpehere/CeoClubTop.png";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CONTENT_WIDTH } from "../../../utils/constants";
import CardsContainer from "./groupCardsContainer/CardsContainer";
import MiddleSvg from "./MiddleSvg";
import EventsContainer from "./nearestEvents/EventsContainer";
import { TextTranslation } from "../../../utils/translation";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 40,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    alignItems: "center",
  },
  topImage: {
    width: "100%",
  },
  viewAllContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px 0px",
  },
  label: {
    fontSize: 24,
    color: "#134696",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: CONTENT_WIDTH,
    maxWidth: "95%",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

const CeoClubContainer = () => {
  const classes = useStyles();
  const { langIndex } = useSelector((state) => state.global);

  const handleViewAll = () => {
    // console.log("viewAll...");
  };
  return (
    <>
      <div className={classes.container}>
        <img src={CeoClubTop} alt="" className={classes.topImage} />
        <div className={classes.content}>
          <div className={classes.viewAllContainer}>
            <span className={classes.label}>Your Group</span>

            <Button
              sx={{
                background:
                  "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
                textTransform: "none",
                color: "#134696",
                width: 180,
                borderRadius: 0,
                alignSelf: "flex-end",
              }}
              endIcon={<ArrowForwardIcon sx={{ color: "#134696" }} />}
              onClick={handleViewAll}
            >
              {TextTranslation.viewAll[langIndex]}
            </Button>
          </div>
          <MiddleSvg />
          <div className={classes.content}>
            <EventsContainer />
          </div>
          <CardsContainer />
        </div>
      </div>
    </>
  );
};

export default CeoClubContainer;
