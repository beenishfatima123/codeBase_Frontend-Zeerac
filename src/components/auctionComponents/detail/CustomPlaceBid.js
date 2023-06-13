import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
//import "./OtherAuctions.css";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 20,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 10,
    width: "90%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    minWidth: "80%",
    marginTop: 10,
  },
  leftContainer: {
    width: 75,
    height: 75,
    borderRadius: "50%",
    backgroundColor: "#134696",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 30,
  },
  label: {
    color: "#134696",
    textTransform: "uppercase",
    fontFamily: "medium",
    fontSize: 20,
    margin: "5px 0",
  },
  input: {
    margin: "5px 0",
    height: 35,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
    borderRadius: 10,
    outline: "none",
    paddingLeft: 15,
    border: "1px solid transparent",
    backgroundColor: "#e5e5e5",
    color: "#9e9e9e",
    fontSize: 12,
    minWidth: "75%",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    marginTop: 3,
  },
  button: {
    width: 90,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#134696",
    borderRadius: 10,
    cursor: "pointer",
    fontFamily: "medium",
    margin: "5px 0",
    "&:hover": {
      backgroundColor: "#134696",
    },
  },
}));

const CustomPlaceBid = ({
  icon,
  label,
  placeholder,
  type,
  value,
  onChange,
  validating,
  disabled,
  estimatedPriceOfPercentage,
  onSubmit,
  onKeyPress,
  buttonText,
  bulk,
  currency,
  //options,
  //onChangeSelect,
  //showSelect,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}>{icon}</div>
      <div className={classes.rightContainer}>
        <div className={classes.label}>{label}</div>
        <div className={classes.inputContainer}>
          <span
            style={{
              position: "absolute",
              marginLeft: 5,
              color: "#134698",
              fontSize: 14,
              fontFamily: "medium",
            }}
          >
            {currency}
          </span>
          <input
            type={type}
            className={classes.input}
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            onKeyPress={onKeyPress}
            // style={{ minWidth: showSelect ? "100%" : "75%" }}
          />

          {/* {showSelect && (
            <select className="creation-select" onChange={onChangeSelect}>
              {options?.map((elem, index) => (
                <option key={index} value={elem?.value}>
                  {elem?.label}
                </option>
              ))}
            </select>
          )} */}
        </div>
        {typeof validating === "string" && (
          <div className={classes.helperText}>{validating}</div>
        )}
        <div>{estimatedPriceOfPercentage}</div>
        {bulk && (
          <Button
            className={classes.button}
            disabled={disabled}
            onClick={onSubmit}
            sx={{
              backgroundColor: "#134696",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#134696",
              },
            }}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomPlaceBid;
