import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import TvLounge from "../createPropertyPost/content/svgs/features/TvLounge";
import StoreRoom from "../createPropertyPost/content/svgs/features/StoreRoom";
import LaundryRoom from "../createPropertyPost/content/svgs/features/LaundryRoom";
import Kitchen from "../createPropertyPost/content/svgs/features/Kitchen";
import Balcony from "../createPropertyPost/content/svgs/features/Balcony";
import Garden from "../createPropertyPost/content/svgs/features/Garden";
import useColor from "../../../utils/hooks/useColor";

const useStyles = makeStyles(() => ({
  container: {
    display: "column",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
  },
  text: {
    fontSize: 16,
    color: "#6B7B88",
    textTransform: "capitalize",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const FeaturesList = ({ property }) => {
  const classes = useStyles();
  const { darkMode, colors } = useSelector((state) => state.global);
  useColor(colors);

  const allFeatures = useMemo(() => {
    if (property?.features)
      return (
        Object.keys(property?.features)
          // eslint-disable-next-line
          .map((key) => {
            if (property?.features[key] === true) return key;
          })
          .filter((elem) => elem)
      );
  }, [property]);
  const getFeaturesLogos = (feature) => {
    switch (feature) {
      case "tv_lounge":
        return (
          <TvLounge color={colors?.primary} style={{ height: 20, width: 20 }} />
        );
      case "store_room":
        return (
          <StoreRoom
            color={colors?.primary}
            style={{ height: 20, width: 20 }}
          />
        );
      case "laundry_room":
        return (
          <LaundryRoom
            color={colors?.primary}
            style={{ height: 20, width: 20 }}
          />
        );
      case "kitchen":
        return (
          <Kitchen color={colors?.primary} style={{ height: 20, width: 20 }} />
        );
      case "balcony":
        return (
          <Balcony color={colors?.primary} style={{ height: 20, width: 20 }} />
        );
      case "garden":
        return (
          <Garden color={colors?.primary} style={{ height: 20, width: 20 }} />
        );

      default:
        return (
          <TvLounge color={colors?.primary} style={{ height: 20, width: 20 }} />
        );
    }
  };
  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Features:
      </span>
      <Grid container rowSpacing={2} sx={{ mt: 2 }}>
        {allFeatures?.map((elem, index) => (
          <React.Fragment key={index}>
            {/* {index > 0 && ( */}
            <Grid
              item
              xs={6}
              md={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {getFeaturesLogos(elem)}

              <span
                className={classes.text}
                style={{
                  color: darkMode ? "#fff" : "#6B7B88",
                  marginLeft: 10,
                  marginTop: 5,
                }}
              >
                {elem?.replace("_", " ")}
              </span>
            </Grid>
            {/* )} */}
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
};

export default FeaturesList;
