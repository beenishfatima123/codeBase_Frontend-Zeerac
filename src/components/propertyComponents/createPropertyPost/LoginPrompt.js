import React from "react";
import { makeStyles } from "@mui/styles";
import LoginContainer from "../../loginComponents/LoginContainer";
import { ReactComponent as Content } from "../../../assets/registration/loginTitle.svg";
import RegistrationTop from "../../globalComponents/misc/RegistrationTop";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
}));

/* This loginPrompt component is displayed in right section of addProperty page
if the user has not logged in.  */
const LoginPrompt = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <RegistrationTop content={<Content />} />
      <LoginContainer />
    </div>
  );
};

export default LoginPrompt;
