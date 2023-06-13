import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Select, Slider } from "@mui/material";

import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { CURRENCY_ENUM } from "../../../utils/constants";
import "./filters.css";
import { formatCurrency } from "../../../utils/helperFunctions";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    background: "none",
    borderBottom: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    color: "white",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "none",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

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
  sliderLabelsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
  },
  sliderLabels: {
    color: "#78797A",
    fontSize: 16,
    margin: 0,
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  minMaxContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  locationInputContainer: {
    display: "flex",
    padding: 10,
    borderBottom: "1px solid #78797a",
    width: "100%",
    alignItems: "center",
  },
}));

const minDistance = 10;

const BudgetFilter = () => {
  const classes = useStyles();
  const [unit, setUnit] = useState("");
  const [sizeSlider, setSizeSlider] = useState([0, 100]);

  const handleSizeSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setSizeSlider([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setSizeSlider([clamped - minDistance, clamped]);
      }
    } else {
      setSizeSlider(newValue);
    }
  };
  return (
    <div className={classes.container}>
      <Accordion
        expanded={unit !== ""}
        sx={{ width: "100%", background: "none" }}
      >
        <AccordionSummary
          sx={{
            backgroundColor: "#134696",
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          <div className={classes.headerContainer}>
            <p className={classes.titleText}> Budget</p>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <Select
                displayEmpty
                IconComponent={() => (
                  <ArrowDropDownIcon style={{ color: "white" }} />
                )}
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                label="Unit"
                input={<BootstrapInput />}
              >
                <MenuItem value="" disabled>
                  Currency
                </MenuItem>
                {CURRENCY_ENUM?.map((elem, index) => (
                  <MenuItem value={elem} key={index}>
                    {elem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 3 }}>
          <div className={classes.minMaxContainer} style={{ marginBottom: 20 }}>
            <div className={classes.locationInputContainer}>
              <p className={classes.sliderLabels}>{`${formatCurrency(
                sizeSlider[0]
              )} ${unit}`}</p>
            </div>
            <div className={classes.locationInputContainer}>
              <p className={classes.sliderLabels}>{`${formatCurrency(
                sizeSlider[1]
              )} ${unit}`}</p>
            </div>
          </div>
          <Slider
            value={sizeSlider}
            onChange={handleSizeSlider}
            min={0}
            max={10000}
          />
          <div className={classes.sliderLabelsContainer}>
            <p className={classes.sliderLabels}>{`${formatCurrency(
              sizeSlider[1]
            )} ${unit}`}</p>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default BudgetFilter;
