import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import "./inputStyles.css";
import useColor from "../../../../../../utils/hooks/useColor";

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
    borderBottom: "1px solid #c9c9c9",
    margin: "10px 0px",
  },
}));

const Dropdown = ({ values, handleChange, label, options, prop, noLabel }) => {
  const classes = useStyles();
  const { langIndex, colors } = useSelector((state) => state.global);
  useColor(colors);
  return (
    <div className={classes.container}>
      {!noLabel && (
        <p className={classes.text} style={{ color: colors?.primary }}>
          {label}
        </p>
      )}

      <div className={classes.budgetContainer}>
        <select
          className="custom-search-select"
          value={values?.[prop] ? values?.[prop] : "DEFAULT"}
          onChange={handleChange(prop)}
          style={{ color: colors?.primary }}
          //defaultValue={"DEFAULT"}
        >
          <option disabled value={"DEFAULT"}>
            select unit
          </option>
          {options?.map((elem, index) => (
            <option value={elem?.value} key={index} style={{ color: "#000" }}>
              {elem?.label[langIndex]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
