import { makeStyles } from "@mui/styles";

import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import filtersMapIcon from "../../../assets/filtersMap.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import "./filters.css";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1C1C1C",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 72,
  },
  titleText: {
    color: "white",
    fontSize: 16,
    margin: 0,
  },
  mapIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  locationInputContainer: {
    display: "flex",
    flex: 1,
    padding: 10,
    borderBottom: "1px solid white",
  },
}));
const LocationPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Accordion defaultExpanded sx={{ width: "100%", background: "none" }}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor: "#134696" }}
        >
          <p className={classes.titleText}> Listings</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.locationInputContainer}>
            <LocationOnIcon style={{ color: "white" }} />
            <input
              type="text"
              className="location-input"
              placeholder={"Destination, City, Address"}
            />
          </div>

          <div className={classes.mapIconContainer}>
            <img src={filtersMapIcon} alt="" />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default LocationPanel;
