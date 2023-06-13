import React from "react";
import { makeStyles } from "@mui/styles";
import { HOME_FEATURE_FILTERS } from "../../utils/constants";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    transition: "width 0.5s",
    alignItems: "flex-end",
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginBottom: 20,
    transition: "0.5s",
    height: "22px !important",
    zIndex: 1200,
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
  "@media (max-width: 1024px)": {
    container: {
      margin: "40px 0px",
    },
  },
}));

const HomeFeatureFilters = ({
  selectedFilter,
  setSelectedFilter,
  extraStyles,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [hovering, setHovering] = useState(false);
  const { darkMode, langIndex } = useSelector((state) => state.global);

  const getBtnColor = (elem) => {
    if (darkMode) return selectedFilter === elem ? "white" : "white";
    else return selectedFilter === elem ? "white" : "#134696";
  };
  const getBackgroundColor = (elem) => {
    if (darkMode) return selectedFilter === elem ? "#0ed864" : "none";
    else return selectedFilter === elem ? "#134696" : "none";
  };
  return (
    <div className={classes.container} style={extraStyles}>
      <div
        className={classes.addBtn}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          padding: hovering ? "10px 40px" : 10,
        }}
        onClick={() => navigate("/create-post")}
      >
        {hovering ? (
          <span className={classes.btnText}>
            {TextTranslation.addListings[langIndex]}
          </span>
        ) : (
          <AddIcon style={{ color: "white" }} />
        )}
      </div>
      <Grid
        container
        sx={{
          transition: "0.5s",
          border: "1px solid lightGray",
          borderRadius: "20px",
          width: "fit-content",
        }}
      >
        {HOME_FEATURE_FILTERS?.map((elem) => (
          <Grid item xs={4} sm={4} key={elem}>
            <Button
              fullWidth
              sx={{
                backgroundColor: getBackgroundColor(elem),
                color: getBtnColor(elem),
                textTransform: "none",
                borderRadius: 20,
                height: "40px",
                borderRight: "1px solid lightGray",
                "&:hover": {
                  backgroundColor: getBackgroundColor(elem),
                },
                pl: 4,
                pr: 4,
              }}
              onClick={() => setSelectedFilter(elem)}
            >
              {elem[langIndex]}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomeFeatureFilters;
