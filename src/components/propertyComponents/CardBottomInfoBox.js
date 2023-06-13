import { Button, IconButton, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { currencyFormatInitials } from "../../utils/helperFunctions";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 10,
    paddingBottom: 30,
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 30,
    flex: 1,
  },
  slideContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    width: "100% !important",
  },
  features: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    width: "90% !important",
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // margin: 10,
  },
  location: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 0,
    textAlign: "left",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
    margin: 0,
  },
}));
const CardBottomInfoBox = ({ hovering, property }) => {
  const classes = useStyles();
  const containerRef = useRef(null);

  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.vertical}>
        <p className={classes.location}>{property?.city || "Lahore"}</p>
        <p className={classes.title}>{property?.name || "Property"}</p>
        <Slide
          direction="up"
          in={hovering}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <div className={classes.slideContent}>
            <div className={classes.features}>
              <div className={classes.horizontal}>
                <BedIcon />
                {property?.bedrooms}
              </div>
              <div className={classes.horizontal}>
                <BathtubIcon />
                {property?.bathrooms}
              </div>
              <div className={classes.horizontal}>
                <BedIcon />
                {property?.space?.split(0, 2) + " "}
                {property?.unit}
              </div>
            </div>
            <p className={classes.location}>Demand</p>
            <p className={classes.title}>
              {` ${currencyFormatInitials(
                property?.price,
                property?.currency
              )}`}{" "}
            </p>
            <Button
              variant="contained"
              sx={{
                borderRadius: 10,
                fontSize: 10,
                color: "white",
                fontWeight: "bold",
                marginTop: 2,
                marginBottom: 1,
                textAlign: "left",
              }}
            >
              Interested
            </Button>
          </div>
        </Slide>
      </div>

      <IconButton>
        <StarBorderIcon style={{ color: "white" }} />
      </IconButton>
    </div>
  );
};

export default CardBottomInfoBox;
