import React from "react";
import { makeStyles } from "@mui/styles";
import { DEFAULT_SHADOW } from "../../utils/constants";
import LoginContainer from "../../components/loginComponents/LoginContainer";

/* useStyles is being used to create custom styling using makeStyles from material UI*/
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
}));
const LoginPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <LoginContainer
        style={{
          boxShadow: DEFAULT_SHADOW,
        }}
      />
    </div>
  );
};

export default LoginPage;
