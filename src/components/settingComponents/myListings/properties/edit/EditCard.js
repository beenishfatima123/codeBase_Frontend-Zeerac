import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setPropertyToEdit,
  setPropertyUpdateInfo,
} from "../../../../../redux/slices/propertiesSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },

  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

/* This EditCard takes label, options, prop and multiSelect as props and is rendered on the edit property page with different parameters for editing. */
const EditCard = ({ label, options, prop, multiSelect }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const containerRef = useRef();

  const [containerWidth, setContainerWidth] = useState();

  const { darkMode, langIndex } = useSelector((state) => state.global);
  const { propertyToEdit, propertyUpdateInfo } = useSelector(
    (state) => state.properties
  );

  /* this useEffect hook sets container width based on containerRef value. */
  useEffect(() => {
    if (containerRef)
      setContainerWidth(containerRef?.current?.parentElement?.offsetWidth);
  }, [containerRef]);

  /* getPropArray returns an array that contains all properties that exist in propertyToEdit.prop */
  const getPropArray = () => {
    let _temp = [];
    for (const property in propertyToEdit?.[prop]) {
      if (propertyToEdit?.[prop][property] === true) _temp?.push(property);
    }
    return _temp;
  };

  /* getButtonColor takes element and decides which color will be rendered on its button. If included in propArray, it is blue otherwise white. */
  const getButtonColor = (elem) => {
    // console.log({ elem });
    if (multiSelect) {
      const propArray = getPropArray();
      if (propArray?.includes(`${elem}`?.toLowerCase()?.replace(" ", "_"))) {
        return {
          backgroundColor: darkMode ? "#0ed864" : "#134696",
          color: "#fff",
        };
      } else
        return {
          backgroundColor: "#fff",
          color: "#134696",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        };
    } else {
      if (elem === propertyToEdit?.[prop])
        return {
          backgroundColor: darkMode ? "#0ed864" : "#134696",
          color: "#fff",
        };
      else
        return {
          backgroundColor: "#fff",
          color: "#134696",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        };
    }
  };

  /* handleUpdate takes value and dispatches to slice with updated property attribute value. */
  const handleUpdate = (value) => {
    //console.log({ prop, value });
    dispatch(setPropertyToEdit({ ...propertyToEdit, [prop]: value }));
    dispatch(setPropertyUpdateInfo({ ...propertyUpdateInfo, [prop]: value }));
  };

  /* to handle multiple selections and updating them accordingly, value shows what needs to be editted/updated. */
  const handleMultiSelectUpdate = (value) => {
    // // console.log({ prop, value });
    dispatch(
      setPropertyToEdit({
        ...propertyToEdit,
        [prop]: {
          ...propertyToEdit?.[prop],
          [value?.toLowerCase()?.replace(" ", "_")]:
            !propertyToEdit?.[prop]?.[value?.toLowerCase()?.replace(" ", "_")],
        },
      })
    );
    dispatch(
      setPropertyUpdateInfo({
        ...propertyUpdateInfo,
        [prop]: {
          ...propertyToEdit?.[prop],
          [value?.toLowerCase()?.replace(" ", "_")]:
            !propertyToEdit?.[prop]?.[value?.toLowerCase()?.replace(" ", "_")],
        },
      })
    );
  };

  return (
    <div
      className={classes.container}
      ref={containerRef}
      style={{
        flexDirection: containerWidth > 800 ? "row" : "column",
        alignItems: containerWidth > 800 ? "center" : "flex-start",
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
          marginBottom: containerWidth > 800 ? 0 : 10,
        }}
      >
        {label}
      </span>

      <Grid
        container
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          ml: containerWidth > 800 ? 2 : 0,
        }}
        spacing={2}
      >
        {options?.map((elem, index) => (
          <Grid item xs={6} lg={2} md={3} sm={4} key={index}>
            <Button
              fullWidth
              sx={{
                ...getButtonColor(elem[langIndex]),
                fontFamily: "heavy",
                borderRadius: 25,
                fontSize: 12,
                mr: 1,
                "&:hover": {
                  ...getButtonColor(elem[langIndex]),
                },
              }}
              onClick={() =>
                multiSelect
                  ? handleMultiSelectUpdate(elem[0])
                  : handleUpdate(elem[0])
              }
            >
              {typeof elem === "number" ? elem : elem[langIndex]}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EditCard;
