import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import CountryDropdown from "./CountryDropdown";
import useColor from "../../utils/hooks/useColor";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../globalComponents/ButtonLoader";
import { validateEmail } from "../../utils/helperFunctions";
//import FormLeftLines from './svgComponents.js/FormLeftLines';
import { isValidPhoneNumber } from "react-phone-number-input";
//import FormRightLines from './svgComponents.js/FormRightLines';
import CustomPhoneInput from "../loginComponents/CustomPhoneInput";
import { validateInputs } from "../../utils/helpers/accountCreation";
import AgentInputField from "../settingComponents/becomeAnAgent/AgentInputField";
import {
  contactUs,
  resetContactUsApi,
} from "../../redux/slices/contactUsSlice";
import { getWordCount } from "../../utils/helperFunctions";
import { TextTranslation } from "../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: "light",
    color: "#707070",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 10px",
    border: "1px solid #b2b2c9",
    borderRadius: 10,
    minWidth: "80%",
    marginTop: 10,
  },
  privacyText: {
    fontSize: 16,
    fontFamily: "light",
    color: "#5a7184",
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "medium",
  },
  updateButton: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#ffffff",
    backgroundColor: "#134696",
    width: 130,
    height: 40,
    borderRadius: 5,
    cursor: "pointer",
    border: "1px solid #707070",
    marginTop: 30,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
}));

const ContactForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { colors, darkMode, langIndex } = useSelector((state) => state.global);
  const { contactUsApiInfo } = useSelector((state) => state.contactUs);

  useColor(colors);

  const [user, setUser] = useState({
    name: "",
    country: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const handleInputChange = (prop) => (e) => {
    const validationError = validateInputs(prop, e.target.value);
    if (prop === "email") {
      setUser((prev) => ({
        ...prev,
        [prop]: e.target.value,
        [`${prop}Validation`]: validateEmail(e.target.value)
          ? null
          : "Please enter a valid email address",
      }));
    } else if (prop === "name") {
      setUser((prev) => ({
        ...prev,
        [prop]: e.target.value,
        [`${prop}Validation`]: validationError,
      }));
    } else if (prop === "message") {
      setUser((prev) => ({
        ...prev,
        [prop]: e.target.value,
        [`${prop}Validation`]:
          getWordCount(e.target.value) >= 10 &&
          getWordCount(e.target.value) <= 100
            ? true
            : false,
        // [`${prop}Validation`]: e.target.value?.length >= 20,
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [prop]: e.target.value,
        [`${prop}Validation`]: validationError,
      }));
    }
  };

  const handleCountryInput = (country) => {
    if (country)
      setUser({
        ...user,
        country,
      });
  };
  const handlePhoneInput = (phone_number) => {
    if (phone_number)
      setUser({
        ...user,
        phone_number,
        isPhoneValid: isValidPhoneNumber(phone_number),
      });
  };

  const isFormValid = async (data) => {
    if (!data?.name || data?.nameValidation)
      return TextTranslation.fullNameRequired[langIndex];
    else if (!data?.email || data?.emailValidation)
      return TextTranslation.emailRequired[langIndex];
    else if (!data?.messageValidation)
      return TextTranslation.messageValidation[langIndex];
  };

  const handleSubmit = () => {
    let formData = new FormData();
    user?.name && formData.append("name", user?.name);
    user?.email && formData.append("email", user?.email);
    user?.phone_number && formData.append("phone", user?.phone_number);
    user?.message && formData.append("message", user?.message);
    user?.country !== "" && formData.append("country", user?.country);

    dispatch(
      contactUs({
        token: currentUser?.token,
        formData,
      })
    );
  };

  useEffect(() => {
    if (contactUsApiInfo?.response) {
      toast.success(TextTranslation.ticketAdded[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      setUser({
        name: "",
        country: "",
        email: "",
        phone_number: "",
        message: "",
      });
      dispatch(resetContactUsApi());
    }
    // eslint-disable-next-line
  }, [contactUsApiInfo?.response]);

  useEffect(() => {
    if (contactUsApiInfo?.error) {
      toast.error(TextTranslation.somethingWentWrong[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetContactUsApi());
    }
    // eslint-disable-next-line
  }, [contactUsApiInfo?.error]);

  return (
    <>
      {/* <FormLeftLines
        style={{
          position: 'absolute',
          marginLeft: -80,
          marginTop: 150,
          zIndex: -999999,
        }}
      /> */}

      <div className={classes.container}>
        <Grid
          container
          justifyContent="space-around"
          spacing={2}
          sx={{ my: 2 }}
        >
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
            <label
              className={classes.label}
              style={{ color: darkMode ? colors?.primary : "" }}
            >
              {TextTranslation.yourName[langIndex]}
            </label>
            <AgentInputField
              required={true}
              name="name"
              value={user?.name}
              onChange={handleInputChange("name")}
              placeholder={TextTranslation.yourName[langIndex]}
              type="text"
              validating={user?.nameValidation}
              helperText={TextTranslation.nameValidation[langIndex]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
            <label
              className={classes.label}
              style={{ color: darkMode ? colors?.primary : "" }}
            >
              Country
            </label>
            <CountryDropdown
              placeholder={TextTranslation.selectCountry[langIndex]}
              value={user?.country}
              onChange={(e) => handleCountryInput(e.target.value)}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
            <label
              className={classes.label}
              style={{ color: darkMode ? colors?.primary : "" }}
            >
              {TextTranslation.contactEmail[langIndex]}
            </label>
            <AgentInputField
              required={true}
              name="email"
              value={user?.email}
              onChange={handleInputChange("email")}
              placeholder={TextTranslation.enterEmailAddress[langIndex]}
              type="email"
              validating={user?.emailValidation}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
            <label
              className={classes.label}
              style={{ color: darkMode ? colors?.primary : "" }}
            >
              {TextTranslation.phoneNumber[langIndex]}
            </label>
            <CustomPhoneInput
              name="phone_number"
              placeholder={TextTranslation.phoneNumber[langIndex]}
              value={user?.phone_number}
              onChange={handlePhoneInput}
              validating={user?.isPhoneValid}
              helperText={
                TextTranslation.pleaseEnterValidPhoneNumber[langIndex]
              }
            />
          </Grid>

          <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
            <label
              className={classes.label}
              style={{ color: darkMode ? colors?.primary : "" }}
            >
              {TextTranslation.yourMessage[langIndex]}
            </label>
            <div
              className={classes.descriptionContainer}
              style={{
                border: "1px solid #b2b2c9",
              }}
            >
              <textarea
                name="message"
                className="login-input"
                rows="4"
                placeholder={TextTranslation.typeYourMessage[langIndex]}
                value={user?.message || ""}
                onChange={handleInputChange("message")}
              />
            </div>
            {user?.messageValidation === false && (
              <span className={classes.helperText}>
                {TextTranslation.descriptionValidation[langIndex]}
              </span>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
            <div
              className={classes.privacyText}
              style={{
                color: darkMode ? "#fff" : "#5a7184",
              }}
            >
              {TextTranslation.bySubmittingThis[langIndex]}{" "}
              <a
                href="/terms-conditions"
                target="_blank"
                className={classes.link}
                style={{
                  color: darkMode ? "#0ed864" : "#134696",
                }}
              >
                {TextTranslation.termsAndConditions[langIndex]}
              </a>{" "}
              {TextTranslation.andOur[langIndex]}{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                className={classes.link}
                style={{
                  color: darkMode ? "#0ed864" : "#134696",
                }}
              >
                {TextTranslation.privacyPolicy[langIndex]}
              </a>{" "}
              {TextTranslation.whichExplains[langIndex]}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
            <button
              onClick={async () => {
                const isValid = await isFormValid(user);
                if (!isValid) handleSubmit();
                else
                  toast.error(isValid, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                  });
              }}
              type="submit"
              className={classes.updateButton}
              style={{
                color: darkMode ? "#000" : "#fff",
                backgroundColor: darkMode ? "#0ed864" : "#134696",
              }}
            >
              {contactUsApiInfo?.loading ? (
                <ButtonLoader color="#ffffff" size={20} />
              ) : (
                TextTranslation.contactSales[langIndex]
              )}
            </button>
          </Grid>
        </Grid>
      </div>

      {/* <FormRightLines
        style={{
          position: 'absolute',
          right: 0,
          marginRight: -200,
          zIndex: -999999,
          marginTop: -150,
        }}
      /> */}
    </>
  );
};

export default ContactForm;
