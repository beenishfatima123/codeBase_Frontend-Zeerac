import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReactComponent as PersonIcon } from "../../assets/icons/personIcon.svg";
import LoginInput from "./LoginInput";
import { useState } from "react";
import { validateEmail } from "../../utils/helperFunctions";
import { checkUniqueEmailExists, resetPassword } from "../../api/dataApi";
import ComponentLoader from "../globalComponents/ComponentLoader";
import { toast } from "react-toastify";
import { TextTranslation } from "../../utils/translation";

/* useStyles is being used to create custom styling using makeStyles from material UI.
It sets styling properties for container and title, it uses media
query to change flex direction of container. */
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    minWidth: 350,
    borderRadius: 10,
    padding: 20,
    transition: "0.5s",
    margin: "20px 0px",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#134696",
    margin: "5px 0px",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* 
ForgotPassword is the main component that is rendered when the user clicks
"Forgot Password" on the login page.
-This component takes style for 
styling properties in rendering and handleForgotPassword to go back
to login page by setting it onclick to back button. 
*/
const ForgotPassword = ({ style, handleForgotPassword }) => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState();
  const [loading, setLoading] = useState(false);

  /* handleChange takes event at the email input checks if the entered 
  email is valid or not and then sets email to entered email.*/
  const handleChange = (e) => {
    setIsValid(validateEmail(e.target.value));
    setEmail(e.target.value);
  };

  /* handleReset checks if the email is unique, if not, it generates an
  error in the toast and if unique, it sets reset password as true. Then the
  toast displays that reset password code is sent. */
  const handleReset = async () => {
    setLoading(true);
    const uniqueResponse = await checkUniqueEmailExists(email);
    // console.log({ uniqueResponse });
    if (uniqueResponse?.status) {
      toast.error(TextTranslation.emailNotExist[langIndex], {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
        hideProgressBar: true,
      });
    } else {
      const resetResponse = await resetPassword(email);
      if (resetResponse) {
        toast.success(TextTranslation.codeSent[langIndex], {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
          hideProgressBar: true,
        });
        handleForgotPassword();
      } else {
        toast.error(TextTranslation.somethingWentWrong[langIndex], {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
          hideProgressBar: true,
        });
      }
    }
    setLoading(false);

    // // console.log("resetting...", { uniqueResponse });
  };

  return (
    <>
      {loading ? (
        <ComponentLoader />
      ) : (
        <div
          className={classes.container}
          style={{
            ...style,
            backgroundColor: darkMode ? "#303134" : "#fff",
          }}
        >
          <IconButton
            sx={{ height: 30, width: 30, alignSelf: "flex-start" }}
            onClick={handleForgotPassword}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <span
            className={classes.title}
            style={{ color: darkMode ? "#0ED864" : "#134696" }}
          >
            {TextTranslation.enterEmailAddress[langIndex]}
          </span>
          <LoginInput
            placeholder={TextTranslation.enterEmailAddress[langIndex]}
            value={email}
            onChange={handleChange}
            startIcon={
              <PersonIcon
                style={{
                  marginRight: 10,
                  color: darkMode ? "#0ED864" : "#134696",
                }}
              />
            }
            type="text"
            validating={isValid}
            helperText={TextTranslation.pleaseEnterValidEmail[langIndex]}
          />
          <Button
            onClick={handleReset}
            disabled={!isValid || email === ""}
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
            {TextTranslation.sendResetLink[langIndex]}
          </Button>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
