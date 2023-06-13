import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import useColor from "../../../../../../utils/hooks/useColor";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 5,
  },
  label: {
    fontSize: 14,
    color: "#134696",
    margin: 0,
    marginRight: 10,
    marginLeft: 10,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
      alignItems: "flex-start",
      margin: "10px 0px",
    },
    label: {
      marginBottom: 10,
    },
  },
}));
const RoomButtons = ({ label, options, filter, handleChange, prop }) => {
  const classes = useStyles();
  const { darkMode, colors } = useSelector((state) => state.global);
  useColor(colors);
  const getColor = (elem) => {
    if (darkMode) {
      return {
        color: elem === filter?.[prop] ? "#fff" : "#fff",
        backgroundColor: elem === filter?.[prop] ? "#0ed864" : "#212124",
        border: "1px solid #707070",
      };
    } else {
      return {
        color: elem === filter?.[prop] ? "#fff" : "#134696",
        backgroundColor: elem === filter?.[prop] ? "#134696" : "#fff",
        border: "1px solid #fff",
      };
    }
  };
  return (
    <div className={classes.container}>
      <ThemeProvider
        theme={createTheme({
          breakpoints: {
            values: {
              large: 1920,
              small: 528,
            },
          },
        })}
      />
      <span className={classes.label} style={{ color: colors?.primary }}>
        {label}
      </span>
      <Grid container>
        {options?.map((elem, index) => (
          <Grid item key={index} lg={2.5} sm={4} sx={{ margin: "10px 0px" }}>
            <Button
              key={index}
              sx={{
                fontSize: 14,
                textTransform: "none",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                //margin: "0px 1px",
                ...getColor(elem),
              }}
              onClick={() => handleChange(prop)({ target: { value: elem } })}
            >
              {elem}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RoomButtons;
