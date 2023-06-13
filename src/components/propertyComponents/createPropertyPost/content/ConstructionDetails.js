import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyData } from "../../../../redux/slices/createPropertySlice";
import CreationSelect from "./CreationSelect";
import { CONSTRUCTION_DETAILS } from "../../../../utils/constants";
import {
  getConstructionHeading,
  getPastYears,
} from "../../../../utils/helperFunctions";
import { TextTranslation } from "../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "20px 0%",
  },
  title: {
    fontSize: 22,
    color: "#134696",
    borderBottom: "1px solid #134696",
    padding: "10px 5%",
    marginRight: "5%",
    fontFamily: "heavy",
  },
  selectContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "20px 5%",
  },
  heading: {
    fontSize: 16,
    color: "#134696",
    fontFamily: "heavy",
  },
}));

const ConstructionDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const handleChange = (prop) => (event) => {
    // console.log({ propertyData, prop });
    dispatch(setPropertyData({ ...propertyData, [prop]: event.target.value }));
  };

  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
          borderBottom: darkMode ? "1px solid #0ed864" : "1px solid #134696",
        }}
      >
        {TextTranslation.constructionDetails[langIndex]}
      </span>
      <div className={classes.selectContainer}>
        {CONSTRUCTION_DETAILS?.map((elem, index) => (
          <div key={index}>
            <span
              className={classes.heading}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              {getConstructionHeading(index)[langIndex]}
            </span>
            <div style={{ marginBottom: 30 }}>
              {elem?.map((item, index) => (
                <CreationSelect
                  key={index}
                  label={item?.label[langIndex]}
                  onChange={handleChange(item?.key)}
                  value={propertyData?.[item?.key]}
                  options={
                    item?.key !== "year_built"
                      ? item?.options
                      : getPastYears(100)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructionDetails;
