import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { CustomBudgetSlider } from "./CustomBudgetSlider";
import { TextTranslation } from "../../../../utils/translation";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: "#9DAFBD",
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
    color: "#929292",
    margin: 0,
    position: "absolute",
    bottom: 15,
    left: 0,
  },
  max: {
    fontSize: 9,
    color: "#929292",
    margin: 0,
    position: "absolute",
    bottom: 15,
    right: 0,
  },
}));
const Range = ({ regional }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);
  const { langIndex } = useSelector((state) => state.global);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <p className={classes.text}>Range</p>
      <div className={classes.budgetContainer}>
        <p className={classes.min}>Min</p>
        <p className={classes.max}>Max</p>
        <CustomBudgetSlider
          getAriaLabel={() => "Budget range"}
          valueLabelDisplay="on"
          value={value}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#134696",
          color: "white",
          borderRadius: 40,
          width: 125,
        }}
      >
        {TextTranslation.apply[langIndex]}
      </Button>
    </div>
  );
};

export default Range;
