import React from "react";
import { makeStyles } from "@mui/styles";
import "./auctionStyles.css";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0px 5px",
  },
  label: {
    fontSize: 12,
    color: "#6B7B88",
    marginLeft: 5,
  },
  readOnlyInput: {
    borderBottom: "1px solid #707070",
    height: 42,
    width: 155,
    padding: "0px 5px",
    display: "flex",
    alignItems: "center",
  },
  inputValue: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#134696",
    // lett,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 31,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 5,
    padding: "0px 5px",
  },
}));

/* BidInput takes inputs like number of bids, 
highest bids, remaining bids etc. about a bid when bulk trading is selected. */
const BidInput = ({
  label,
  options,
  type,
  value,
  validating,
  placeholder,
  onChange,
  currency,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <span className={classes.label}>{label}</span>
      {options && (
        <div className="bidsSelectDiv">
          <select>
            {options?.map((elem, index) => (
              <option key={index} value={elem}>
                {elem}
              </option>
            ))}
          </select>
        </div>
      )}
      {type === "read-only" && (
        <div className={classes.readOnlyInput}>
          <span className={classes.inputValue}>{value}</span>
        </div>
      )}
      {type === "input" && (
        <>
          <div
            className={classes.inputContainer}
            style={{
              border:
                typeof validating === "string"
                  ? "1px solid #D83F50"
                  : "1px solid #707070",
            }}
          >
            {currency && (
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
            )}
            <input
              type={"number"}
              className="bid-input"
              placeholder={placeholder}
              value={value || ""}
              onChange={onChange}
            />
          </div>
          {typeof validating === "string" && (
            <span className={classes.helperText}>{validating}</span>
          )}
        </>
      )}
    </div>
  );
};

export default BidInput;
