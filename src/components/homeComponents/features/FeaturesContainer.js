import React from "react";
import { makeStyles } from "@mui/styles";
import "./featureStyles.css";
import {
  Blockchain,
  Construction,
  HeadingSvg,
  NFT,
  ZCommerce,
  ZSphere,
} from "./svgs";
import { useWindowDims } from "../../../utils/useWindowDims";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "50px 0px",
    maxWidth: "100%",
    alignSelf: "center",
  },
  row: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    zIndex: 10,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
    row: {
      flexDirection: "column",
    },
  },
}));
const FeaturesContainer = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <HeadingSvg />
        <Blockchain />
      </div>
      <div className={classes.row}>
        <ZSphere customStyle={{ marginTop: width > 1024 ? -130 : 0 }} />
        <NFT />
      </div>
      <div className={classes.row}>
        <ZCommerce customStyle={{ marginTop: width > 1024 ? -130 : 0 }} />
        <Construction />
      </div>
    </div>
  );
};

export default FeaturesContainer;
