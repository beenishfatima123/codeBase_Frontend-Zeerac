import React from "react";
import { makeStyles } from "@mui/styles";
import "./loginStyles.css";
import ReactInputMask from "react-input-mask";
import { useSelector } from "react-redux";

/* useStyles is being used to create custom styling using makeStyles from material UI.
It styles mainContainer, container and helperText */
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

/* 
LoginInput is the component that allows input to user, it uses
validating for border color, mask parameter to mask the input field with some
mask value.
It uses input for text input field and sets its all the attributes sent to it using
props  
*/
const LoginInput = ({
  placeholder,
  value,
  onChange,
  startIcon,
  endIcon,
  type,
  validating,
  helperText,
  inputRef,
  onFocus,
  onBlur,
  mask,
  max,
  name,
  defaultValue,
  readOnly,
  onKeyPress,
}) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

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
        {mask ? (
          <ReactInputMask
            mask={mask}
            maskChar="*"
            placeholder={placeholder}
            value={value || ""}
            className="login-input"
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        ) : (
          <input
            ref={inputRef}
            type={type}
            name={name}
            className="login-input"
            placeholder={placeholder}
            value={value || ""}
            defaultValue={defaultValue}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readOnly}
            max={max}
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

export default LoginInput;
