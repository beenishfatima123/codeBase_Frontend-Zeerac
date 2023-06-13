import React from "react";
import { makeStyles } from "@mui/styles";
import TradingLinesSvg from "./TradingLinesSvg";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ContentContainer from "./TradingContent/ContentContainer";
import { CONTENT_WIDTH } from "../../../utils/constants";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0px",
    width: CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "20px 5% 0px 0px",
  },

  "@media (max-width: 1024px)": {
    topSection: {
      flexDirection: "column",
      alignItems: "flex-end",
    },
  },
}));
const TradingContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        <TradingLinesSvg />
        <Button
          variant="contained"
          sx={{
            background:
              "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
            textTransform: "none",
            color: "#134696",
            width: 230,
          }}
          endIcon={<ArrowForwardIcon style={{ color: "#0ED864" }} />}
        >
          See how it works
        </Button>
      </div>
      <ContentContainer />
    </div>
  );
};

export default TradingContainer;
