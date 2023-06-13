import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import { Button, IconButton } from "@mui/material";
import LoginInput from "../../components/loginComponents/LoginInput";
import { ReactComponent as PasswordIcon } from "../../assets/icons/passwordIcon.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eyeIcon.svg";
import {
  getPasswordHelper,
  validatePassword,
} from "../../utils/helperFunctions";
import { useSelector } from "react-redux";
import { DEFAULT_SHADOW } from "../../utils/constants";
import { toast } from "react-toastify";
import { createNewPassword } from "../../api/dataApi";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

/* useStyles is being used to create custom styling using makeStyles from material UI.
This makeStyles is defining style attributes for mainContainer, container, title, helperText.
It changes flex direction to column using media query at width 1024px. */
const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    minWidth: 350,
    borderRadius: 10,
    padding: 20,
    transition: "0.5s",
    margin: "20px 0px",
    alignItems: "center",
    boxShadow: DEFAULT_SHADOW,
    width: 400,
    maxWidth: "90%",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    color: "#134696",
    margin: "5px 0px",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
    margin: "auto",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* 
ResetPassword is the component allowing user to enter a new password
and confirm new password and update the login data accordingly.
*/
const ResetPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { code, email } = useParams();

  const { darkMode } = useSelector((state) => state.global);

  const [loginData, setLoginData] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  /* handleChnage takes prop and updates Login data with the new prop value
  and its validation status. */
  const handleChange = (prop) => (event) => {
    setLoginData((prev) => ({
      ...prev,
      [prop]: event.target.value,
      [`${prop}Validation`]: validatePassword(event.target.value),
    }));
  };

  /* handleResst checks for the validation of password and sends
  new data to createNewPassword and navigates to login page 
  otherwise displays error on toast. */
  const handleReset = async () => {
    if (
      loginData?.confirmPasswordValidation &&
      loginData?.passwordValidation &&
      loginData?.password === loginData?.confirmPassword
    ) {
      setLoading(true);
      await createNewPassword({
        code,
        email,
        password: loginData?.password,
      });
      setLoading(false);
      navigate("/login");
    } else {
      toast.error("Invalid details", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    }
  };
  return (
    <>
      {loading ? (
        <ComponentLoader />
      ) : (
        <div className={classes.mainContainer}>
          <div
            className={classes.container}
            style={{
              backgroundColor: darkMode ? "#303134" : "#fff",
            }}
          >
            <span
              className={classes.title}
              style={{ color: darkMode ? "#0ED864" : "#134696" }}
            >
              Create new password
            </span>
            <LoginInput
              placeholder="Password"
              value={loginData?.password}
              onChange={handleChange("password")}
              startIcon={
                <PasswordIcon
                  fill={darkMode ? "#0ED864" : "#134696"}
                  style={{
                    marginRight: 10,
                  }}
                />
              }
              type={showPassword ? "text" : "password"}
              endIcon={
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  sx={{ p: 0 }}
                >
                  {showPassword ? (
                  <EyeIcon
                    style={{
                      color: darkMode ? "#0ED864" : "#134696",
                    }}
                  /> ) : (
                    <VisibilityOffIcon sx={{ width: 14, height: 12 }} />
                  )}
                </IconButton>
              }
              validating={loginData?.passwordValidation}
              helperText={getPasswordHelper(loginData?.password)}
            />
            <LoginInput
              placeholder="Confirm Password"
              value={loginData?.confirmPassword}
              onChange={handleChange("confirmPassword")}
              startIcon={
                <PasswordIcon
                  fill={darkMode ? "#0ED864" : "#134696"}
                  style={{
                    marginRight: 10,
                  }}
                />
              }
              type={showConfirmPass ? "text" : "password"}
              endIcon={
                <IconButton
                  onClick={() => setShowConfirmPass((prev) => !prev)}
                  sx={{ p: 0 }}
                >
                  {showConfirmPass ? (
                  <EyeIcon
                    style={{
                      color: darkMode ? "#0ED864" : "#134696",
                    }}
                  /> ) : (
                    <VisibilityOffIcon sx={{ width: 14, height: 12 }} />
                  )}
                </IconButton>
              }
              validating={loginData?.confirmPasswordValidation}
              helperText={getPasswordHelper(loginData?.confirmPassword)}
            />
            {loginData?.password !== loginData?.confirmPassword && (
            <span className={classes.helperText}>
                New and Confirm Password does not match.
            </span>
          )}
            <Button
              onClick={handleReset}
              disabled={(loginData?.password !== loginData?.confirmPassword)}
              sx={{
                textTransform: "none",
                fontSize: 12,
                color: "#FFFFFF",
                fontFamily: "medium",
                backgroundColor: darkMode ? "#0ED864" : "#134696",
                borderRadius: "10px",
                width: 300,
                maxWidth: "85%",
                marginTop: "10px",
                mb: 1,
                padding: 1,
                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: darkMode ? "#0ED864" : "#134696",
                },
                "&:disabled": {
                  color: "#FFFFFF",
                  backgroundColor: "#026FC2",
                },
              }}
            >
              Reset Password
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
