import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { HEADER_CONTENT_WIDTH } from "../../../utils/constants";
import Gas from "../createPropertyPost/content/svgs/serviceSvgs/Gas";
import Water from "../createPropertyPost/content/svgs/serviceSvgs/Water";
import Security from "../createPropertyPost/content/svgs/serviceSvgs/Security";
import Sewerage from "../createPropertyPost/content/svgs/serviceSvgs/Sewerage";
import Electricity from "../createPropertyPost/content/svgs/serviceSvgs/Electricity";
import Maintenance from "../createPropertyPost/content/svgs/serviceSvgs/Maintenance";
import useColor from "../../../utils/hooks/useColor";

const useStyles = makeStyles(() => ({
  container: {
    margin: "0px 5%",
    padding: "20px 0px",
    borderTop: "1px solid #CCCCCC",
    // borderBottom: "1px solid #CCCCCC",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  featureTitle: {
    fontSize: 24,
    color: "#134696",
    fontWeight: "bold",
  },
  feature: {
    fontSize: 16,
    color: "#6B7B88",
  },
}));
const ItemsList = ({ data, heading }) => {
  const classes = useStyles();
  const { darkMode, colors } = useSelector((state) => state.global);
  useColor(colors);

  const dataToShow = useMemo(() => {
    if (data)
      return (
        Object.keys(data)
          // eslint-disable-next-line
          ?.map((key) => {
            if (data[key] === true) return key;
          })
          .filter((elem) => elem)
      );
    // eslint-disable-next-line
  }, [data]);

  const getLogos = (item) => {
    switch (item) {
      case "electricity":
        return (
          <Electricity
            color={colors?.primary}
            style={{ height: 20, width: 20 }}
          />
        );
      case "gas":
        return (
          <Gas color={colors?.primary} style={{ height: 20, width: 20 }} />
        );
      case "water":
        return (
          <Water color={colors?.primary} style={{ height: 20, width: 20 }} />
        );
      case "maintenance":
        return (
          <Maintenance
            color={colors?.primary}
            style={{ height: 20, width: 20 }}
          />
        );
      case "security":
        return (
          <Security color={colors?.primary} style={{ height: 20, width: 20 }} />
        );
      case "sewerage":
        return (
          <Sewerage color={colors?.primary} style={{ height: 20, width: 20 }} />
        );

      default:
        return (
          <Electricity
            color={colors?.primary}
            style={{ height: 20, width: 20 }}
          />
        );
    }
  };
  return (
    <div className={classes.container}>
      <p
        className={classes.featureTitle}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
          fontFamily: "heavy",
        }}
      >
        {heading}:
      </p>
      <Grid
        container
        rowSpacing={2}
        sx={{ borderBottom: "1px solid #707070", pb: 2 }}
      >
        {dataToShow?.map((elem, index) => (
          <Grid
            item
            xs={4}
            key={index}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {getLogos(elem)}
            <span
              className={classes.feature}
              style={{
                color: darkMode ? "#fff" : "#6B7B88",
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              {elem}
            </span>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemsList;
