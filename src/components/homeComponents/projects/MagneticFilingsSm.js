import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCategoryFilter } from "../../../redux/slices/globalSlice";
import { PROJECT_FILTERS } from "../../../utils/constants";
import { getArrayOfLength } from "../../../utils/helperFunctions";
import { PROPERTY_CATEGORIES } from "../../../utils/propertyConstants";
import "./filingStyles.css";

const grid = getArrayOfLength(120);
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: "40px 0px",
    width: 1000,
    maxWidth: "100%",
    alignSelf: "center",
  },
}));

const MagneticFilingsSm = ({ filter }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [elRefs, setElRefs] = useState([]);
  const { darkMode } = useSelector((state) => state.global);

  useEffect(() => {
    setElRefs((elRefs) =>
      Array(grid?.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, []);

  const handleMouseMove = (e) => {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    elRefs.forEach((dot) => {
      if (dot?.current?.offsetLeft) {
        const dotX = dot.current.offsetLeft + 20;
        const dotY = dot.current.offsetTop + 20;
        const diffX = mouseX - dotX;
        const diffY = mouseY - dotY;
        const radians = Math.atan2(diffY, diffX);
        const angle = (radians * 180) / Math.PI;
        dot.current.style.transform = `rotate(${angle}deg)`;
      }
    });
  };
  const renderContent = (index) => {
    if (filter === PROJECT_FILTERS[0]) return renderFiling(index);
    else if (filter === PROJECT_FILTERS[1])
      return renderCommercialFiling(index);
    else return renderPlotFiling(index);
  };
  const handleFilterCategory = (category) => {
    dispatch(setSelectedCategoryFilter(category));
    navigate("/listings");
  };
  const renderFiling = (index) => {
    switch (index) {
      case 10:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              color: darkMode ? "#fff" : "#6b7b88",
              fontFamily: "light",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[0])}
          >
            {PROPERTY_CATEGORIES[0]}
          </p>
        );
      case 16:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              color: darkMode ? "#fff" : "#6b7b88",
              fontFamily: "light",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[1])}
          >
            {PROPERTY_CATEGORIES[1]}
          </p>
        );
      case 44:
        return (
          <p
            className="filingText"
            style={{
              minWidth: "max-content",
              backgroundColor: darkMode ? "#212124" : "#fff",
              color: darkMode ? "#fff" : "#6b7b88",
              fontFamily: "light",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[2])}
          >
            {PROPERTY_CATEGORIES[2]}
          </p>
        );
      case 63:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              color: darkMode ? "#fff" : "#6b7b88",
              fontFamily: "light",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[3])}
          >
            {PROPERTY_CATEGORIES[3]}
          </p>
        );
      case 81:
        return (
          <p
            className="filingText"
            style={{
              minWidth: "max-content",
              backgroundColor: darkMode ? "#212124" : "#fff",
              color: darkMode ? "#fff" : "#6b7b88",
              fontFamily: "light",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[4])}
          >
            {PROPERTY_CATEGORIES[4]}
          </p>
        );
      case 103:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              color: darkMode ? "#fff" : "#6b7b88",
              fontFamily: "light",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[5])}
          >
            {PROPERTY_CATEGORIES[5]}
          </p>
        );
      default:
        return (
          <div
            className="filing"
            key={index}
            id={index}
            ref={elRefs[index]}
            style={{
              backgroundColor: darkMode ? "#0ed850" : "#134696",
              fontFamily: "light",
            }}
          />
        );
    }
  };
  const renderCommercialFiling = (index) => {
    switch (index) {
      case 8:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              color: darkMode ? "#fff" : "#6b7b88",
              fontFamily: "light",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[6])}
          >
            {PROPERTY_CATEGORIES[6]}
          </p>
        );
      case 15:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[7])}
          >
            {PROPERTY_CATEGORIES[7]}
          </p>
        );
      case 44:
        return (
          <p
            className="filingText"
            style={{
              minWidth: "max-content",
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[8])}
          >
            {PROPERTY_CATEGORIES[8]}
          </p>
        );
      case 64:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[9])}
          >
            {PROPERTY_CATEGORIES[9]}
          </p>
        );
      case 78:
        return (
          <p
            className="filingText"
            style={{
              minWidth: "max-content",
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[10])}
          >
            {PROPERTY_CATEGORIES[10]}
          </p>
        );
      case 87:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[11])}
          >
            {PROPERTY_CATEGORIES[11]}
          </p>
        );
      case 103:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[12])}
          >
            {PROPERTY_CATEGORIES[12]}
          </p>
        );
      case 170:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[13])}
          >
            {PROPERTY_CATEGORIES[13]}
          </p>
        );

      default:
        return (
          <div
            className="filing"
            key={index}
            id={index}
            ref={elRefs[index]}
            style={{
              fontFamily: "light",
              backgroundColor: darkMode ? "#0ed850" : "#134696",
            }}
          />
        );
    }
  };
  const renderPlotFiling = (index) => {
    switch (index) {
      case 8:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[14])}
          >
            {PROPERTY_CATEGORIES[14]}
          </p>
        );
      case 16:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[15])}
          >
            {PROPERTY_CATEGORIES[15]}
          </p>
        );
      case 40:
        return (
          <p
            className="filingText"
            style={{
              minWidth: "max-content",
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[16])}
          >
            {PROPERTY_CATEGORIES[16]}
          </p>
        );
      case 55:
        return (
          <p
            className="filingText"
            style={{
              minWidth: "max-content",
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[17])}
          >
            {PROPERTY_CATEGORIES[17]}
          </p>
        );
      case 74:
        return (
          <p
            className="filingText"
            style={{
              minWidth: "max-content",
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[18])}
          >
            {PROPERTY_CATEGORIES[18]}
          </p>
        );
      case 89:
        return (
          <p
            className="filingText"
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              fontFamily: "light",
              color: darkMode ? "#fff" : "#6b7b88",
            }}
            onClick={() => handleFilterCategory(PROPERTY_CATEGORIES[19])}
          >
            {PROPERTY_CATEGORIES[19]}
          </p>
        );
      default:
        return (
          <div
            className="filing"
            key={index}
            id={index}
            ref={elRefs[index]}
            style={{
              fontFamily: "light",
              backgroundColor: darkMode ? "#0ed850" : "#134696",
            }}
          />
        );
    }
  };

  return (
    <div className={classes.container}>
      <Grid
        container
        columns={12}
        sx={{
          width: "1000px",
          maxWidth: "90%",
          alignSelf: "center",
          p: 0,
          m: 0,
        }}
        onMouseOver={handleMouseMove}
      >
        {grid?.map((elem, index) => (
          <Grid
            item
            xs={1}
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              width: "40px",
              margin: "15px 0px",
            }}
          >
            {renderContent(index)}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MagneticFilingsSm;
