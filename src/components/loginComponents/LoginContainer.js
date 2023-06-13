import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import LoginInput from "./LoginInput";
import { ReactComponent as PersonIcon } from "../../assets/icons/personIcon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icons/passwordIcon.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eyeIcon.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebookIcon.svg";
import googleIcon from "../../assets/icons/googleIcon.png";
import { toast } from "react-toastify";
import { Button, IconButton } from "@mui/material";
import "./loginStyles.css";
import RememberContainer from "./RememberContainer";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import {
  login,
  resetLoginApi,
  setCurrentUser,
} from "../../redux/slices/authSlice";
import { checkFirestoreDoc, signInWithGoogle } from "../../utils/authHelpers";
import { auth } from "../../utils/firebase";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import ComponentLoader from "../globalComponents/ComponentLoader";
import {
  getPasswordHelper,
  validateEmail,
  validatePassword,
} from "../../utils/helperFunctions";
import ForgotPassword from "./ForgotPassword";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextTranslation } from "../../utils/translation";
import { getUserPreferences } from "../../redux/slices/preferenceSlice";

/* useStyles is being used to create custom styling using makeStyles from material UI.
It sets styling properties for container, title, tagline and account, it uses media
query to change flex direction of container. */
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    borderRadius: 10,
    padding: 10,
    transition: "0.5s",
    margin: "20px 0px",
    maxWidth: "100%",
  },
  title: {
    fontSize: 18,
    color: "#134696",
    margin: "5px 0px",
  },
  tagline: {
    fontSize: 12,
    color: "#7D7D7D",
    marginBottom: 10,
  },
  account: {
    fontSize: 12,
    color: "#7D7D7D",
  },

  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/*LoginContainer is the main component that contains the login form element.
It takes destructured style and closeMenu as parameters and uses style to set
components' style properties while rendering and uses closeMenu bool to decide
whether to call the closeMenu method or not.
*/
const LoginContainer = ({ style, closeMenu }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginApi = useSelector((state) => state.auth.loginApi);
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const googleAuthProvider = useMemo(() => new GoogleAuthProvider(), []);
  const facebookAuthProvider = useMemo(() => new FacebookAuthProvider(), []);

  const [loginData, setLoginData] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openForgotContainer, setOpenForgotContainer] = useState(false);

 /* This useEffect is used to handle errors in login and display error in the toast */
  useEffect(() => {
    if (loginApi?.error) {
      // // console.log({ error: loginApi?.error });
      toast.error(loginApi?.error?.message, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetLoginApi());
      if (closeMenu) closeMenu();
    }
    // eslint-disable-next-line
  }, [loginApi?.error]);

  /* This useEffect reads the response given by loginApi and passes it on to checkLoginResponse function */
  useEffect(() => {
    if (loginApi?.response) {
      if (closeMenu) closeMenu();

      checkLoginResponse(loginApi?.response);
    }
    // eslint-disable-next-line
  }, [loginApi?.response]);
  
  /* 
  - checkLoginResponse takes response from API as parameter and passes
  names, email, photoURL and uid (email) from response to checkFirestoreDoc and 
  waits for checked response.
  - It then dispatches the response and sets firebaseDocId to email from response.
  - It dispatches response token to the userPreferences function.
  - If the user selects "remember me" then his email is strored in localStorage.
  - If the current location is login page then it navigates to "/" and dispatches 
  the function resetLoginApi. 
  */ 
  const checkLoginResponse = async (response) => {
    // // console.log("sending...", { response });
    setLoading(true);
    await checkFirestoreDoc({
      displayName: `${response?.first_name} ${response?.last_name}`,
      email: response?.email,
      photoURL: response?.photo,
      uid: response?.email,
    });
    setLoading(false);
    if (closeMenu) closeMenu();
    dispatch(setCurrentUser({ ...response, firebaseDocId: response?.email }));

    dispatch(getUserPreferences({ token: response?.token }));
    if (loginData?.remember) {
      window.localStorage.setItem("remember_me", true);
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...response, firebaseDocId: response?.email })
      );
    }
    if (location?.pathname === "/login") navigate(`/`, { replace: true });
    dispatch(resetLoginApi());
  };

  /* handleChange controls actions that need to be taken when email or password
  is changed. It validates the changed attribute and sets it as the new attribute */
  const handleChange = (prop) => (event) => {
    setLoginData((prev) => ({ ...prev, [prop]: event.target.value }));
    if (prop === "email") {
      setLoginData((prev) => ({
        ...prev,
        isEmailValid: validateEmail(event.target.value),
      }));
    }
    if (prop === "password") {
      setLoginData((prev) => ({
        ...prev,
        isPasswordValid: validatePassword(event.target.value),
      }));
    }
  };

  /* handleLogin dispatches the login information i.e. email and password to the authSlice*/
  const handleLogin = () => {
    // // console.log({ loginData });
    //PRODUCTION
    dispatch(
      login({
        email: loginData?.email,
        password: loginData?.password,
      })
    );
  };

  /* handleSignup is called when user clicks Sign Up button, it navigates to sign up page */
  const handleSignup = () => {
    navigate(`/signup`);
  };

  /* handleNavigate will navigate to main if the current location is login */
  const handleNavigate = () => {
    if (location?.pathname === "/login") navigate(`/`, { replace: true });
  };

  /* handleForgotPassword toggles forgotContainer to decide whether to render
  the forgot password div or not.*/
  const handleForgotPassword = () => {
    setOpenForgotContainer((prev) => !prev);
  };

  return (
    <>
      {loginApi?.loading || loading ? (
        <ComponentLoader />
      ) : (
        <>
          {openForgotContainer ? (
            <ForgotPassword
              style={style}
              handleForgotPassword={handleForgotPassword}
            />
          ) : (
            <div
              className={classes.container}
              style={{
                ...style,
                backgroundColor: darkMode ? "#303134" : "#fff",
              }}
            >
              <span
                className={classes.title}
                style={{ color: darkMode ? "#0ED864" : "#134696" }}
              >
                {TextTranslation.loginToYourAccount[langIndex]}
              </span>
              <span
                className={classes.tagline}
                style={{ color: darkMode ? "#fff" : "#7D7D7D" }}
              >
                {TextTranslation.loginDescription[langIndex]}
              </span>
              <LoginInput
                placeholder={TextTranslation.enterEmailAddress[langIndex]}
                value={loginData?.email}
                onChange={handleChange("email")}
                startIcon={
                  <PersonIcon
                    style={{
                      marginRight: 10,
                      color: darkMode ? "#fff" : "#134696",
                    }}
                  />
                }
                type="text"
                validating={loginData?.isEmailValid}
                helperText="Please enter a valid email address"
              />

              <LoginInput
                placeholder={TextTranslation.password[langIndex]}
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
                      />
                    ) : (
                      <VisibilityOffIcon sx={{ width: 14, height: 12 }} />
                    )}
                  </IconButton>
                }
                validating={loginData?.isPasswordValid}
                helperText={getPasswordHelper(loginData?.password)}
              />
              {/* {!loginData?.isPasswordValid && showPasswordHelper} */}
              <RememberContainer
                loginData={loginData}
                setLoginData={setLoginData}
                handleForgotPassword={handleForgotPassword}
              />
              <Button
                onClick={handleLogin}
                disabled={
                  !loginData?.isEmailValid || !loginData?.isPasswordValid
                }
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
                {TextTranslation.loginToContinue[langIndex]}
              </Button>

              <div>
                <span
                  className={classes.account}
                  style={{ color: darkMode ? "#fff" : "#7D7D7D" }}
                >
                  {TextTranslation.donthaveAnAccount[langIndex]}
                </span>
                <Button
                  onClick={handleSignup}
                  sx={{
                    textTransform: "none",
                    fontSize: 12,
                    color: darkMode ? "#0ED864" : "#134696",
                    fontFamily: "medium",
                    p: 0,
                    m: 0,
                  }}
                >
                  {TextTranslation.signUp[langIndex]}
                </Button>
              </div>

              <Button
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "10px 5px",
                  border: "1px solid #b2b2c9",
                  borderRadius: "10px",
                  width: 300,
                  maxWidth: "85%",
                  mt: 1,
                  textTransform: "none",
                }}
                onClick={() => {
                  if (closeMenu) closeMenu();
                  signInWithGoogle(
                    auth,
                    googleAuthProvider,
                    handleNavigate,
                    dispatch,
                    setLoading
                  );
                }}
              >
                <img src={googleIcon} alt="" style={{ marginRight: 10 }} />
                <span
                  className={classes.account}
                  style={{ color: darkMode ? "#fff" : "#7D7D7D" }}
                >
                  {TextTranslation.loginWithGmail[langIndex]}
                </span>
              </Button>
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "10px 5px",
                  border: "1px solid #b2b2c9",
                  borderRadius: "10px",
                  width: 300,
                  maxWidth: "85%",
                  mt: 1,
                  textTransform: "none",
                }}
                onClick={() => {
                  if (closeMenu) closeMenu();
                  signInWithGoogle(
                    auth,
                    facebookAuthProvider,
                    handleNavigate,
                    dispatch,
                    setLoading
                  );
                }}
              >
                <FacebookIcon style={{ marginRight: 10 }} />
                <span
                  className={classes.account}
                  style={{ color: darkMode ? "#fff" : "#7D7D7D" }}
                >
                  {TextTranslation.loginWithFacebook[langIndex]}
                </span>
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LoginContainer;
