import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PARTNER_LOGOS } from "../../utils/constants";
import { useWindowDims } from "../../utils/useWindowDims";
import NotFound from "../globalComponents/NotFound";

const useStyles = makeStyles(() => ({
  image: {
    width: 300,
    height: 195,
    objectFit: "scale-down",
  },

  view: {
    fontSize: 18,
    color: "#134696",
  },
}));
const LogosGrid = ({ logos }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { width } = useWindowDims();
  const { darkMode } = useSelector((state) => state.global);

  const [hovering, setHovering] = useState(null);

  const getBorder = (index) => {
    if (width > 900) {
      return index % 3 !== 0 ? "1px solid #d0d0d0 !important" : "none";
    } else if (width > 600)
      return index % 2 !== 0 ? "1px solid #d0d0d0 !important" : "none";
    else return "none";
  };
  // eslint-disable-next-line
  const getLogo = (logo, index) => {
    if (logo) return `${logo}`;
    else return `${PARTNER_LOGOS[index]}`;
  };
  return (
    <Grid container sx={{ padding: "20px 5%" }}>
      <div
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#d0d0d0",
          marginBottom: 20,
        }}
      />
      {logos?.length <= 0 && <NotFound label="No Projects Found" />}
      {logos?.map((elem, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          onMouseEnter={() => setHovering(index)}
          onMouseLeave={() => setHovering(null)}
          sx={{
            borderBottom: "1px solid #d0d0d0 !important",
            display: "flex !important",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRight: getBorder(index + 1),
            cursor: "pointer",
            minHeight: 215,
          }}
          key={index}
          onClick={() => navigate(`/project/${elem?.id}`)}
        >
          <img
            src={getLogo(elem?.feature_photo, index)}
            className={classes.image}
            style={{
              WebkitFilter: hovering === index ? "none" : "grayscale(100%)",
              filter: hovering === index ? "none" : "grayscale(100%)",
            }}
            alt=""
          />
          {hovering === index && (
            <span
              className={classes.view}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              VIEW PROJECT
            </span>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default LogosGrid;
