import React from "react";
import { makeStyles } from "@mui/styles";
import "./creationStyles.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 10px",
    borderRadius: 10,
    minWidth: "80%",
    marginTop: 10,
  },
  label: {
    fontSize: 15,
    color: "#134696",
    fontFamily: "heavy",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
  // "@media screen and (min-width: 900px) and (max-width: 1300px)": {},
}));

const InputField = ({
  placeholder,
  value,
  onChange,
  type,
  label,
  validating,
  onFocus,
  onBlur,
  max,
  min,
}) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <span
        className={classes.label}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {label}
      </span>
      <div
        className={classes.inputContainer}
        style={{
          border:
            typeof validating === "string"
              ? "1px solid #D83F50"
              : "1px solid #b2b2c9",
        }}
      >
        {type === "area" ? (
          <textarea
            className="creation-input"
            rows="4"
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            style={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        ) : (
          <input
            type={type}
            className="creation-input"
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            max={max}
            min={min}
            style={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        )}
      </div>
      {typeof validating === "string" && (
        <span className={classes.helperText}>{validating}</span>
      )}
    </div>
  );
};

export default InputField;
