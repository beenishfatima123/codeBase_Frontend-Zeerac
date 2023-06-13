import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { PARTNER_LOGOS } from "../../../utils/constants";
import { useWindowDims } from "../../../utils/useWindowDims";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    padding: "20px 0px",
    borderTop: "1px solid #dddddd",
    borderBottom: "1px solid #dddddd",
    margin: "0px 5%",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 195,
    objectFit: "scale-down",
    "-webkit-filter": "grayscale(100%)" /* Safari 6.0 - 9.0 */,
    filter: "grayscale(100%)",
  },
}));
const PartnerLogos = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const getBorder = (index) => {
    if (index === 2 || index === 5 || width < 900) return "none";
    else return "1px solid #d0d0d0";
  };
  return (
    <div className={classes.container}>
      <Grid container>
        {PARTNER_LOGOS?.map((elem, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRight: getBorder(index),
              borderBottom:
                width > 900 && index < 3 ? "1px solid #d0d0d0" : "none",
            }}
          >
            <img src={elem?.image} className={classes.image} alt="" />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PartnerLogos;
