import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { TextTranslation } from "../../utils/translation";
import { useSelector } from "react-redux";

/* useStyles is being used to create custom styling using makeStyles from material UI.
It sets styling properties for container and radioLabel. */
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "85%",
    marginTop: 10,
  },
  radioLabel: {
    fontSize: 10,
    color: "#7D7D7D",
  },
}));

/* 
- RememberContainer is the component on Login Page that allows user
  to select whether they want the site to remember their login info to
  enable auto login for the next time.
- The component takes login data,
  setLoginData method and handleForgotPassword method. 
*/
const RememberContainer = ({
  loginData,
  setLoginData,
  handleForgotPassword,
}) => {
  const classes = useStyles();
  const { langIndex } = useSelector((state) => state.global);

  /* handleCheck sends loginData to setLoginData in AuthSlice after toggling the 
  remember attribute value. */
  const handleCheck = () => {
    setLoginData((prev) => ({
      ...prev,
      remember: !prev?.remember,
    }));
  };
  return (
    <div className={classes.container}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleCheck}
      >
        <input
          type="checkbox"
          checked={loginData?.remember || false}
          onChange={(event) => {
            setLoginData((prev) => ({
              ...prev,
              remember: event?.target?.checked,
            }));
          }}
          className="login-checkbox"
        />
        <span className={classes.radioLabel}>
          {TextTranslation.rememberMe[langIndex]}
        </span>
      </div>
      <Button
        sx={{
          textTransform: "none",
          fontSize: 10,
          color: "#7D7D7D",
          fontFamily: "medium",
          p: 0,
        }}
        onClick={() => handleForgotPassword()}
      >
        {TextTranslation.forgotPassword[langIndex]}
      </Button>
    </div>
  );
};

export default RememberContainer;
