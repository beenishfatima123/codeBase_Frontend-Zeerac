import { makeStyles } from "@mui/styles";

import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LuggageIcon from "@mui/icons-material/Luggage";

import "./filters.css";
import { TYPE_FILTERS } from "../../../utils/constants";
import { Button, Grid } from "@mui/material";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1C1C1C",
    alignItems: "center",
    justifyContent: "center",
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
const TypeFilter = () => {
  const classes = useStyles();
  const [selectedFilters, setSelectedFilters] = useState([]);

  const renderIcon = (item) => {
    switch (item) {
      case "Commercial":
        return <CorporateFareIcon />;
      case "Plot":
        return <LuggageIcon />;
      case "House":
        return <HouseIcon />;
      case "Rent":
        return <BedroomParentIcon />;
      case "Flat":
        return <ApartmentIcon />;
      case "Plaza":
        return <LocationCityIcon />;

      default:
        break;
    }
  };
  const handleFilter = (item) => {
    if (selectedFilters?.includes(item))
      setSelectedFilters((prev) =>
        prev?.filter((filterItem) => filterItem !== item)
      );
    else setSelectedFilters((prev) => [...prev, item]);
  };
  return (
    <div className={classes.container}>
      <Accordion sx={{ width: "100%", background: "none" }}>
        <AccordionSummary
          //   expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor: "#134696" }}
        >
          <p className={classes.titleText}> Property Type</p>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3, pb: 3 }}>
          <Grid
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            rowSpacing={1}
            columnSpacing={3}
          >
            {TYPE_FILTERS?.map((elem, index) => (
              <Grid
                item
                xs={2}
                sm={4}
                md={6}
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  sx={{
                    fontSize: 14,
                    color: selectedFilters?.includes(index)
                      ? "#337FF8"
                      : "white",
                    textTransform: "none",
                    // width: "50%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                  startIcon={renderIcon(elem)}
                  onClick={() => handleFilter(index)}
                >
                  {elem}
                </Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TypeFilter;
