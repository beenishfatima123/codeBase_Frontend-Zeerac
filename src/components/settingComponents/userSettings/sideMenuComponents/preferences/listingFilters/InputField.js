import React from "react";
import { makeStyles } from "@mui/styles";
import "./inputStyles.css";
import { useSelector } from "react-redux";
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
    margin: "10px 0px",
    justifyContent: "space-between",
  },
  side: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #c9c9c9",
    width: "40%",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#134696",
  },
  dividerText: {
    margin: "0px 10px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
}));
const InputField = ({ values, handleChange, label, prop1, prop2 }) => {
  const classes = useStyles();
  const { colors } = useSelector((state) => state.global);
  useColor(colors);

  return (
    <div className={classes.container}>
      <p className={classes.text} style={{ color: colors?.primary }}>
        Your {label}
      </p>
      <div className={classes.budgetContainer}>
        <div className={classes.side}>
          <input
            type="number"
            className="search-filter-input"
            placeholder={"10,000 "}
            value={values?.[prop1] || 0}
            onChange={(e) => {
              handleChange(prop1)({
                target: { value: parseInt(e.target.value) },
              });
            }}
            style={{ color: colors?.primary }}
          />
        </div>
        <p className={classes.dividerText}>TO</p>
        <div className={classes.side}>
          <input
            type="number"
            className="search-filter-input"
            placeholder={"1,00,000 "}
            value={values?.[prop2] || 1000}
            onChange={(e) => {
              handleChange(prop2)({
                target: { value: parseInt(e.target.value) },
              });
            }}
            style={{ color: colors?.primary }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputField;
