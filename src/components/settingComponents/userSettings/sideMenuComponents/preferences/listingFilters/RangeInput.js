import React from "react";
import { makeStyles } from "@mui/styles";
import { currencyFormatInitials } from "../../../../../../utils/helperFunctions";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import useColor from "../../../../../../utils/hooks/useColor";
import { TextTranslation } from "../../../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: "#134696",
    fontSize: 14,
    margin: 0,
  },
  budgetContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  min: {
    fontSize: 9,
    color: "#134696",
    margin: 0,
    position: "absolute",
    bottom: 15,
    left: 0,
  },
  max: {
    fontSize: 9,
    color: "#134696",
    margin: 0,
    position: "absolute",
    bottom: 15,
    right: 0,
  },
}));
const RangeInput = ({
  values,
  prop1,
  prop2,
  handleChange,
  price,
  min,
  max,
  step,
}) => {
  const classes = useStyles();
  const { colors, langIndex, darkMode } = useSelector((state) => state.global);
  useColor(colors);

  return (
    <div className={classes.container}>
      <p className={classes.text} style={{ color: colors?.primary }}>
        {TextTranslation.range[langIndex]}
      </p>
      <div className={classes.budgetContainer}>
        <p className={classes.min} style={{ color: colors?.primary }}>
          {TextTranslation.min[langIndex]}
        </p>
        <p className={classes.max} style={{ color: colors?.primary }}>
          {TextTranslation.max[langIndex]}
        </p>
        <CustomRangeSlider
          getAriaLabel={() => "Budget range"}
          valueLabelFormat={(label) =>
            price
              ? currencyFormatInitials(
                  parseInt(label),
                  values?.currency || "PKR"
                )
              : label
          }
          valueLabelDisplay="auto"
          value={[values?.[prop1] || 0, values?.[prop2] || 100]}
          // onChange={(e, newValue) => {
          //   handleChange(prop1)({ target: { value: newValue[0] } });
          //   handleChange(prop2)({ target: { value: newValue[1] } });
          // }}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          sx={{
            "& .MuiSlider-track": {
              backgroundColor: darkMode ? "#0ed864" : "#134696",
            },
            "& .MuiSlider-thumb": {
              backgroundColor: darkMode ? "#0ed864" : "#134696",
            },
            "& .MuiSlider-valueLabel": {
              color: darkMode ? "#0ed864" : "#134696",
            },
          }}
        />
      </div>
    </div>
  );
};

export default RangeInput;

const CustomRangeSlider = styled(Slider)({
  color: "#134696",
  height: 22,
  padding: 0,
  marginBottom: 0,
  marginTop: 20,
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#134696",
    "&:before": {
      backgroundColor: "red",
    },
    height: 2,
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#c9c9c9",
    height: 2,
  },
  "& .MuiSlider-thumb": {
    height: 11,
    width: 11,
    backgroundColor: "#134696",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
