import React from "react";
import { makeStyles } from "@mui/styles";
import "./loginStyles.css";
import { ROLE_ENUM } from "../../utils/constants";
import { useSelector } from "react-redux";

/* useStyles is being used to create custom styling using makeStyles from material UI.
It styles container only*/
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 10px",
    borderRadius: 10,
    flex: 1,
    marginLeft: 20,
    border: "1px solid #b2b2c9",
  },
}));

/* LoginDropDown is the dropdown component on login page that let's you select the role 
using a dropdown element. */
const LoginDropdown = ({
  placeholder,
  onChange,
  startIcon,
  endIcon,
  value,
}) => {
  const classes = useStyles();
  const { langIndex } = useSelector((state) => state.global);
  return (
    <div className={classes.container}>
      {startIcon}
      <select
        className="account-select"
        onChange={onChange}
        value={value || ""}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {ROLE_ENUM?.map((elem, index) => (
          <option value={elem[0]} key={index}>
            {elem[langIndex]}
          </option>
        ))}
      </select>

      {endIcon}
    </div>
  );
};

export default LoginDropdown;
