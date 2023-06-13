import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import "../../../../loginComponents/loginStyles.css";
import { useSelector } from "react-redux";
const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    minWidth: "80%",
    marginTop: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 10px",
    borderRadius: 10,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
}));
const ExperienceDate = ({
  value,
  onChange,
  startIcon,
  endIcon,
  validating,
  helperText,
  max,
  name,
  placeholder,
  min,
}) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);
  const [showDate, setShowDate] = useState(false);
  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.container}
        style={{
          border:
            validating === false ? "1px solid #D83F50" : "1px solid #b2b2c9",
        }}
      >
        {startIcon}
        {showDate ? (
          <input
            name={name}
            placeholder={placeholder}
            type={"date"}
            className="login-input"
            value={value || ""}
            onChange={onChange}
            onBlur={() => setShowDate(false)}
            max={max}
            min={min}
            style={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        ) : (
          <input
            type={"text"}
            className="login-input"
            placeholder={placeholder}
            value={value || ""}
            onChange={(e) => {
              console.log({ val: e.target?.value });
            }}
            onFocus={() => setShowDate(true)}
            readOnly={true}
            style={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        )}

        {endIcon}
      </div>
      {typeof validating === "string" && (
        <span className={classes.helperText}>{validating}</span>
      )}
      {validating === false && (
        <span className={classes.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default ExperienceDate;
