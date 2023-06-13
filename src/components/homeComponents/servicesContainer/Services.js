import React from "react";
import { makeStyles } from "@mui/styles";
import TopSection from "./TopSection";
import { Grid } from "@mui/material";
import { useWindowDims } from "../../../utils/useWindowDims";
import { useMemo } from "react";
import { useState } from "react";
import Architects from "./Architects";
import Constructors from "./Constructors";
import { useSelector } from "react-redux";
import InteriorDesign from "./InteriorDesign";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0px",
    position: "relative",
    minHeight: 600,
  },
  text: {
    fontSize: 24,
    fontFamily: "light",
  },
  "@media (max-width: 1024px)": {
    top: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    text: {
      fontSize: 20,
    },
  },
}));

const gridContainerSx = { width: "100%", position: "absolute" };
const gridItemSx = {
  width: "200px !important",
  height: "200px !important",
  border: "1px solid #E8E8E8",
  transition: "0.5s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Services = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { darkMode } = useSelector((state) => state.global);

  const [hovering, setHovering] = useState(null);

  const gridArray = useMemo(() => {
    if (width > 900) return [...Array(21)];
    else return [...Array(9)];
  }, [width]);

  const renderContent = (index) => {
    switch (index) {
      case 8:
        return <InteriorDesign hovering={hovering === 8} />;
      case 10:
        return <Architects hovering={hovering === 10} />;
      // return <ArchitectsHover />;
      case 12:
        return <Constructors hovering={hovering === 12} />;
      case 15:
        return (
          <span
            className={classes.text}
            style={{ color: darkMode ? "white" : "#9DAFBD" }}
          >
            Interior Designers
          </span>
        );
      case 17:
        return (
          <span
            className={classes.text}
            style={{ color: darkMode ? "white" : "#9DAFBD" }}
          >
            Architects
          </span>
        );
      case 19:
        return (
          <span
            className={classes.text}
            style={{ color: darkMode ? "white" : "#9DAFBD" }}
          >
            Constructors
          </span>
        );
      default:
        break;
    }
  };
  const renderSmContent = (index) => {
    switch (index) {
      case 3:
        return <InteriorDesign hovering={hovering === 3} />;
      case 4:
        return <Architects hovering={hovering === 4} />;

      case 5:
        return <Constructors hovering={hovering === 5} />;
      case 6:
        return (
          <span
            className={classes.text}
            style={{ color: darkMode ? "white" : "#9DAFBD" }}
          >
            Interior Designers
          </span>
        );
      case 7:
        return (
          <span
            className={classes.text}
            style={{ color: darkMode ? "white" : "#9DAFBD" }}
          >
            Architects
          </span>
        );
      case 8:
        return (
          <span
            className={classes.text}
            style={{ color: darkMode ? "white" : "#9DAFBD" }}
          >
            Constructors
          </span>
        );
      default:
        break;
    }
  };
  return (
    <div className={classes.container}>
      <TopSection />
      <Grid container sx={gridContainerSx} columns={gridArray?.length / 3 || 7}>
        {gridArray?.map((elem, index) => (
          <Grid
            item
            key={index}
            sx={{
              ...gridItemSx,
              border: darkMode ? "1px solid #0ed864" : "1px solid #E8E8E8",
            }}
            md={1}
            sm={1}
            xs={1}
            onMouseOver={() => setHovering(index)}
            onMouseOut={() => setHovering(null)}
          >
            {width > 900
              ? renderContent(index, index)
              : renderSmContent(index, index)}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Services;
