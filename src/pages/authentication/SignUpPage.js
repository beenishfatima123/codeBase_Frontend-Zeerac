import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import RegistrationTop from "../../components/globalComponents/misc/RegistrationTop";
import { ReactComponent as Content } from "../../assets/registration/registrationTitle.svg";
import { useState } from "react";
import LoginInput from "../../components/loginComponents/LoginInput";
import { toast } from "react-toastify";
import { ReactComponent as PersonIcon } from "../../assets/icons/personIcon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icons/passwordIcon.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eyeIcon.svg";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { Button, IconButton } from "@mui/material";
import { SIGNUP_BUTTON_SX } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/googleIcon.png";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebookIcon.svg";
import { useMemo } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { checkFirestoreDoc, signInWithGoogle } from "../../utils/authHelpers";
import { auth } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { isValidPhoneNumber } from "react-phone-number-input";

import LoginDropdown from "../../components/loginComponents/loginDropdown";
import {
  createAccount,
  resetAccountCreation,
  setAccountCreationData,
  setActiveStep,
  setSteps,
} from "../../redux/slices/createAccountSlice";
import CustomPhoneInput from "../../components/loginComponents/CustomPhoneInput";
import {
  getPasswordHelper,
  validateEmail,
  validatePassword,
} from "../../utils/helperFunctions";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import {
  getSignupForm,
  getSignupValidation,
} from "../../utils/helpers/accountCreation";
import { TextTranslation } from "../../utils/translation";

/* useStyles is being used to create custom styling using makeStyles from material UI.
It is styling container, inputContainer, roleContainer, tosContainer and account. */
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100vh",
    alignItems: "center",
    justifyContent: "space-between",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
    marginBottom: 40,
    width: 500,
    maxWidth: "100%",
  },
  roleContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    width: "80%",
    justifyContent: "space-between",
  },
  tosContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: 13,
    color: "#7D7D7D",
    cursor: "pointer",
    marginTop: 20,
  },
  account: {
    fontSize: 12,
    color: "#7D7D7D",
  },
}));

/* The main sign up component for sign up page. */
const SignUpPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const allSteps = useSelector((state) => state.createAccount.allSteps);
  const { langIndex } = useSelector((state) => state.global);
  const apiInfo = useSelector(
    (state) => state.createAccount.createAccountApiInfo
  );

  useEffect(() => {
    if (apiInfo?.error) {
      toast.error(apiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetAccountCreation());
    }
    // eslint-disable-next-line
  }, [apiInfo?.error]);

  /* This useEffect reads the response given by apiInfo and passes it on to checkSignupResponse function */
  useEffect(() => {
    if (apiInfo?.response) {
      checkSignupResponse(apiInfo?.response?.result);
    }
    // eslint-disable-next-line
  }, [apiInfo?.response]);

  /* account creation data gets the data of created account */
  const accountCreationData = useSelector(
    (state) => state.createAccount.accountCreationData
  );

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const googleAuthProvider = useMemo(() => new GoogleAuthProvider(), []);

  /* 
  - checkSignupResponse takes response from API as parameter and passes
  DisplayName, email, photoURL and uid (email) from response to checkFirestoreDoc and 
  waits for checked response.
  - It displays toast on successful account creation showing success message.
  - It navigates to login page. 
  - Resets account creation and sets accountCreationData
  to null.
  */
  const checkSignupResponse = async (response) => {
    setLoading(true);
    await checkFirestoreDoc({
      displayName: `${response?.first_name} ${response?.last_name}`,
      email: response?.email,
      photoURL: response?.photo,
      uid: response?.email,
    });
    setLoading(false);
    toast.success(
      "Account created successfully a verification email has been sent",
      {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      }
    );
    navigate(`/login`, { replace: true });
    dispatch(resetAccountCreation());
    dispatch(setAccountCreationData(null));
  };

  /* handleChange controls actions that need to be taken when email, password 
  or fullname is changed. It takes event argument and updates the event target value.
  It validates the changed attribute and sets it as the new attribute */
  const handleChange = (prop) => (event) => {
    if (prop === "email") {
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          isEmailValid: validateEmail(event.target.value),
          [prop]: event.target.value,
        })
      );
    } else if (prop === "password") {
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          isPasswordValid: validatePassword(event.target.value),
          [prop]: event.target.value,
        })
      );
    } else if (prop === "fullName") {
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          isNameValid:
            event.target.value?.length > 5 && event.target.value?.length < 30,
          [prop]: event.target.value,
        })
      );
    } else
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          [prop]: event.target.value,
        })
      );
  };

  /* handlePhoneInput takes phoneNumber as parameter and validates the number
  then updating AccountCreatonData with new phoneNumber. */
  const handlePhoneInput = (phoneNumber) => {
    if (phoneNumber)
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          phoneNumber,
          isPhoneValid: isValidPhoneNumber(phoneNumber),
        })
      );
  };

  /* handleSignup is changing dispatched steps based on the role selected by
  user and then navigating to account creating page */
  const handleSignup = () => {
    setLoading(true);
    switch (accountCreationData?.role) {
      case "User":
        dispatch(createAccount(getSignupForm(accountCreationData)));
        setLoading(false);
        break;
      case "Agent":
        dispatch(setActiveStep(0));
        dispatch(setSteps(allSteps?.filter((elem) => elem !== "Agency")));
        navigate("/account-creation");
        setLoading(false);
        break;
      case "Agency":
        dispatch(setActiveStep(0));
        dispatch(setSteps([...allSteps, "Agency"]));
        navigate("/account-creation");
        setLoading(false);
        break;
      default:
        toast.error("Please select a valid role", {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        });
        setLoading(false);
        break;
    }
  };

  /* prefillData is dispatching some model information to the authSlice */
  const prefillData = () => {
    dispatch(
      setAccountCreationData({
        ...accountCreationData,
        email: "someEmail@gmail.com",
        password: "qweqwe123Q",
        username: "someEmail@gmail.com",
        phoneNumber: "+923044145274",
        fullName: "Test User",
        acceptTos: true,
        role: "User",
      })
    );
  };

  /* handleNavigate will navigate to main if the current location is login or signup */
  const handleNavigate = () => {
    if (location?.pathname === "/login" || location?.pathname === "/signup")
      navigate(`/`, { replace: true });
  };

  return (
    <div className={classes.container}>
      <RegistrationTop
        content={<Content />}
        customStyle={{ marginTop: "5%" }}
      />
      {apiInfo?.loading || loading ? (
        <ComponentLoader />
      ) : (
        <div className={classes.inputContainer}>
          <div className={classes.roleContainer}>
            <span onDoubleClick={prefillData}>Registering as</span>
            <LoginDropdown
              placeholder="Select a Role"
              value={accountCreationData?.role}
              onChange={handleChange("role")}
              startIcon={<PersonIcon style={{ marginRight: 10 }} />}
              type="text"
            />
          </div>
          <LoginInput
            placeholder="Full Name"
            value={accountCreationData?.fullName}
            onChange={handleChange("fullName")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            validating={accountCreationData?.isNameValid}
            helperText="name must be between 5 - 30 characters"
          />
          <CustomPhoneInput
            placeholder="Phone Number"
            value={accountCreationData?.phoneNumber}
            onChange={handlePhoneInput}
            startIcon={
              <PhoneAndroidOutlinedIcon
                style={{
                  marginRight: 10,
                  color: "#03014c",
                  height: 10,
                  width: 10,
                }}
              />
            }
            validating={accountCreationData?.isPhoneValid}
            helperText="Please enter a valid phone number"
          />

          <LoginInput
            placeholder={TextTranslation.enterEmailAddress[langIndex]}
            value={accountCreationData?.email}
            onChange={handleChange("email")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            validating={accountCreationData?.isEmailValid}
            helperText="Please enter a valid email address"
          />
          <LoginInput
            placeholder={TextTranslation.password[langIndex]}
            value={accountCreationData?.password}
            onChange={handleChange("password")}
            startIcon={<PasswordIcon style={{ marginRight: 10 }} />}
            type={showPassword ? "text" : "password"}
            endIcon={
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{ p: 0 }}
              >
                <EyeIcon />
              </IconButton>
            }
            validating={accountCreationData?.isPasswordValid}
            helperText={getPasswordHelper(accountCreationData?.password)}
          />

          <div
            className={classes.tosContainer}
            onClick={() => {
              dispatch(
                setAccountCreationData({
                  ...accountCreationData,
                  acceptTos: !accountCreationData.acceptTos,
                })
              );
            }}
          >
            <input
              type="radio"
              checked={accountCreationData?.acceptTos || false}
              onChange={(event) => {
                dispatch(
                  setAccountCreationData({
                    ...accountCreationData,
                    acceptTos: event?.target?.checked,
                  })
                );
              }}
              className="login-checkbox"
            />
            <span className={classes.radioLabel}>
              By Signing Up I agree with Terms & Conditions
            </span>
          </div>

          <Button
            onClick={async () => {
              const isValid = await getSignupValidation(
                accountCreationData,
                setLoading
              );
              if (!isValid) handleSignup();
              else
                toast.error(isValid, {
                  position: toast.POSITION.TOP_CENTER,
                  progressStyle: { backgroundColor: "#014493" },
                });
            }}
            sx={SIGNUP_BUTTON_SX}
          >
            {TextTranslation.signUp[langIndex]}
          </Button>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span className={classes.account}>Already have an account?</span>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "none",
                fontSize: 12,
                color: "#134696",
                fontFamily: "medium",
                p: 0,
                ml: "2px",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              Log in
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
              minWidth: "85%",
              mt: 1,
              textTransform: "none",
            }}
            onClick={() =>
              signInWithGoogle(
                auth,
                googleAuthProvider,
                handleNavigate,
                dispatch,
                setLoading
              )
            }
          >
            <img src={googleIcon} alt="" style={{ marginRight: 10 }} />
            <span className={classes.account}>Sign Up with Gmail</span>
          </Button>
          <Button
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "10px 5px",
              border: "1px solid #b2b2c9",
              borderRadius: "10px",
              minWidth: "85%",
              mt: 1,
              textTransform: "none",
            }}
          >
            <FacebookIcon style={{ marginRight: 10 }} />
            <span className={classes.account}>Sign Up with Facebook</span>
          </Button>
        </div>
      )}

      <div></div>
    </div>
  );
};

export default SignUpPage;
