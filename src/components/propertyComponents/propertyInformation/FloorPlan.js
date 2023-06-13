import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { DEFAULT_PLANS, HEADER_CONTENT_WIDTH } from "../../../utils/constants";
import { useSelector } from "react-redux";
import LightBox from "../../globalComponents/LightBox";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 5%",
    padding: "20px 0px",
    borderBottom: "1px solid #CCCCCC",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  plan: {
    width: "95%",
    maxHeight: 350,
    objectFit: "contain",
  },
  title: {
    fontSize: 24,
    color: "#134696",
    margin: "20px 0px",
    fontFamily: "heavy",
  },
}));
const FloorPlan = ({ property }) => {
  const classes = useStyles();

  const [showLightBox, setShowLightBox] = useState();

  const { darkMode } = useSelector((state) => state.global);

  const floorPlans = useMemo(() => {
    if (property?.floor_image)
      return property?.floor_image?.map((elem) => {
        return `${elem?.floor_image}`;
      });
    else return DEFAULT_PLANS;
  }, [property]);

  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Floor Plan:
      </span>
      <Grid container rowSpacing={2}>
        {floorPlans?.map((elem, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={index}
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => setShowLightBox(true)}
          >
            <img src={elem} alt="" className={classes.plan} />
          </Grid>
        ))}
      </Grid>
      {showLightBox && (
        <LightBox
          images={floorPlans}
          setOpen={setShowLightBox}
          open={showLightBox}
        />
      )}
    </div>
  );
};

export default FloorPlan;
