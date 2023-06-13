import React from "react";
import { makeStyles } from "@mui/styles";
import Autocomplete from "react-google-autocomplete";

import "./loginStyles.css";

/* useStyles is being used to create custom styling using makeStyles from material UI.
It styles mainContainer, container and helperText. */
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
  LoginAutoComplete nests Autocomplete component and sends API key to get
  autocompleted text in Login form. It takes   placeholder, onPlaceSelected,
  startIcon, endIcon, validating, helperText, options and defaultValue.
  It uses validating for border color and all other properties for the
  Autocomplete component.
*/
const LoginAutocomplete = ({
  placeholder,
  onPlaceSelected,
  startIcon,
  endIcon,
  validating,
  helperText,
  options,
  defaultValue,
}) => {
  const classes = useStyles();

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
        <Autocomplete
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
          className={"login-input"}
          options={options}
          onPlaceSelected={onPlaceSelected}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {endIcon}
      </div>
      {validating === false && (
        <span className={classes.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default LoginAutocomplete;
