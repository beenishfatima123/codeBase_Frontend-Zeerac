import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

export const CustomBudgetSlider = styled(Slider)({
  color: "#52af77",
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
    color: "#134696",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
