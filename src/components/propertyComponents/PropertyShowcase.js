import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 46,
    color: "white",
    fontWeight: "normal",
    margin: "5px 0px",
  },
  content: {
    fontSize: 14,
    color: "white",
    fontWeight: "normal",
    margin: "5px 0px",
  },
}));
const PropertyShowcase = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <p className={classes.title}>Featured Properties</p>
      <p className={classes.content}>
        Morbi mollis vestibulum sollicitudin. Nunc in eros a justo facilisis
        rutrum. Aenean id ullamcorper libero. Vestibulum imperdiet nibh vel
        magna lacinia ultrices. commodo tristique. Duis lacus urna, condimentum
        a vehicula a, hendrerit ac nisi Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Aliquam vulputate, tortor nec commodo ultricies, lectus
        nisl facilisis enim, vitae viverra urna nulla sed turpis.
      </p>

      <Button
        endIcon={<ArrowForwardIosIcon />}
        sx={{
          textTransform: "none",
          fontSize: 16,
          color: "white",
          padding: 0,
          marginTop: 5,
        }}
      >
        Bowse More
      </Button>
    </div>
  );
};

export default PropertyShowcase;
