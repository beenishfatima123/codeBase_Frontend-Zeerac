import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import "./editStyles.css";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingRight: 10,
  },
  label: {
    fontSize: 14,
    color: "#707070",
  },
}));
/* EditSelect is used in construction details to map properties editing options. */
const EditSelect = ({ options, onChange, label, value }) => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <span
        className={classes.label}
        style={{
          color: darkMode ? "#fff" : "#707070",
        }}
      >
        {label}:
      </span>
      <div className="selectDiv">
        <select onChange={onChange} value={value || ""}>
          <option value={value} disabled>
            {value}
          </option>
          {options?.map((elem, index) => (
            <option
              key={index}
              value={typeof elem === "number" ? elem : elem[langIndex]}
            >
              {typeof elem === "number" ? elem : elem[langIndex]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EditSelect;
