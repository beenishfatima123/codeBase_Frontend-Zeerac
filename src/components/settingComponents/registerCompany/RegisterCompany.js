import { Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isValidPhoneNumber } from "react-phone-number-input";
import AgentInputField from "../becomeAnAgent/AgentInputField";
import { getWordCount, validateEmail } from "../../../utils/helperFunctions";
import CustomPhoneInput from "../../loginComponents/CustomPhoneInput";
import { validateInputs } from "../../../utils/helpers/accountCreation";
// import LoginAutocomplete from "../../loginComponents/LoginAutocomplete";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { ReactComponent as PersonIcon } from "../../../assets/icons/personIcon.svg";
import {
  becomeAgent,
  resetBecomeAnAgentApi,
  setBecomeAgentData,
  setMainDrawerItem,
  setSideMenuClick,
} from "../../../redux/slices/settingsSlice";
import { TextTranslation } from "../../../utils/translation";
import { setCurrentUser } from "../../../redux/slices/authSlice";
import { MAX_IMAGE_FILE_NAME, MAX_IMAGE_SIZE } from "../../../utils/constants";

const useStyles = makeStyles(() => ({
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
  expHeading: {
    fontSize: 26,
    fontFamily: "heavy",
    color: "#134696",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#134696",
    fontFamily: "medium",
    fontSize: 16,
    cursor: "pointer",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    width: 100,
    height: 40,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#C9C9C9",
    marginTop: 5,
    objectFit: "cover",
  },
}));

/* RegisterCompany component is displayed when "Register Agency" is clicked, it is a form component that inputs information about the company and registers it. */
const RegisterCompany = ({ setActiveTab }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { langIndex } = useSelector((state) => state.global);
  const { becomeAgentData, becomeAgentDetailApiInfo } = useSelector(
    (state) => state.settings
  );

  // const [location, setLocation] = useState();

  /* handleChange takes event as prop and dispatches data from event target value. */
  const handleChange = (prop) => (event) => {
    const validationError = validateInputs(prop, event.target.value);
    if (prop === "companyEmail") {
      dispatch(
        setBecomeAgentData({
          ...becomeAgentData,
          edited: true,
          [prop]: event.target.value,
          [`${prop}Validation`]: validateEmail(event.target.value)
            ? null
            : TextTranslation.pleaseEnterValidEmail[langIndex],
        })
      );
    } else if (prop === "company_description") {
      dispatch(
        setBecomeAgentData({
          ...becomeAgentData,
          edited: true,
          [prop]: event.target.value,
          [`${prop}Validation`]:
            getWordCount(event.target.value) >= 10 &&
            getWordCount(event.target.value) <= 100
              ? true
              : false,
        })
      );
    } else {
      dispatch(
        setBecomeAgentData({
          ...becomeAgentData,
          edited: true,
          [prop]: event.target.value,
          [`${prop}Validation`]: validationError,
        })
      );
    }
  };

  /* handleCompanyPhoneInput takes company phone and dispatches data with new phone number. */
  const handleCompanyPhoneInput = (company_phone) => {
    if (company_phone)
      dispatch(
        setBecomeAgentData({
          ...becomeAgentData,
          company_phone,
          isCompanyPhoneValid: isValidPhoneNumber(company_phone),
        })
      );
  };
// ghjfghj
  /* handleCompanyFaxInput takes company fax number and dispatches data with new fax number */
  const handleCompanyFaxInput = (company_fax) => {
    if (company_fax)
      dispatch(
        setBecomeAgentData({
          ...becomeAgentData,
          company_fax,
          isCompanyFaxValid: isValidPhoneNumber(company_fax),
        })
      );
  };
  // const handleAutocompleteChange = (prop) => (event) => {
  //   setLocation((prev) => ({
  //     ...prev,
  //     [prop]: event?.name,
  //   }));
  // };

  const isAgencyFormValid = async (data) => {
    if (!data?.companyName)
      return TextTranslation.companyNameRequired[langIndex];
    else if (!data?.companyEmail)
      return TextTranslation.companyEmailRequired[langIndex];
    else if (!data?.isCompanyPhoneValid)
      return TextTranslation.companyPhoneInvalid[langIndex];
    else if (!data?.company_address)
      return TextTranslation.company_addressValidation[langIndex];
    else if (!data?.company_description)
      return TextTranslation.companyDescriptionInvalid[langIndex];
  };

  const handleImagePicker = (event) => {
    if (
      event?.target?.files[0]?.name?.length < MAX_IMAGE_FILE_NAME &&
      event?.target?.files[0]?.size / 1024 ** 2 < MAX_IMAGE_SIZE
    ) {
      dispatch(
        setBecomeAgentData({
          ...becomeAgentData,
          company_logo: event?.target?.files[0],
        })
      );
    } else {
      toast.error("file name/size too lengthy", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  const handleSubmit = () => {
    let formData = new FormData();
    becomeAgentData?.company_logo &&
      formData.append("company_logo", becomeAgentData?.company_logo);
    becomeAgentData?.companyName &&
      formData.append("company_name", becomeAgentData?.companyName);
    becomeAgentData?.companyEmail &&
      formData.append("company_email", becomeAgentData?.companyEmail);
    becomeAgentData?.company_phone &&
      formData.append("company_phone", becomeAgentData?.company_phone);
    becomeAgentData?.company_fax &&
      formData.append("company_fax", becomeAgentData?.company_fax);
    becomeAgentData?.company_description &&
      formData.append(
        "company_description",
        becomeAgentData?.company_description
      );
    becomeAgentData?.company_address &&
      formData.append("company_address", becomeAgentData?.company_address);
    becomeAgentData?.company_address &&
      formData.append("company_city", becomeAgentData?.company_address);
    formData.append("is_company", true);
    formData.append("admin", currentUser?.id);

    dispatch(
      becomeAgent({
        token: currentUser?.token,
        formData,
      })
    );
  };

  // useEffect(() => {
  //   if (location)
  //     dispatch(setBecomeAgentData({ ...becomeAgentData, ...location }));
  //   // eslint-disable-next-line
  // }, [location]);

  // useEffect(() => {
  //   dispatch(
  //     setBecomeAgentData({
  //       ...becomeAgentData,
  //       edited: true,
  //       // companyNameValidation: "",
  //       // companyEmailValidation: "",
  //       // isCompanyPhoneValid: false,
  //       // isCompanyFaxValid: false,
  //       // company_descriptionValidation: false,
  //     })
  //   );
  // }, []);
  // console.log({ becomeAgentDetailApiInfo });
  useEffect(() => {
    if (becomeAgentDetailApiInfo?.response) {
      toast.success(TextTranslation.companyRegistered[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(
        setCurrentUser({
          ...currentUser,
          user_type: becomeAgentDetailApiInfo?.response?.user_type,
          company: becomeAgentDetailApiInfo?.response?.company,
        })
      );
      dispatch(resetBecomeAnAgentApi());
      dispatch(setSideMenuClick("overview"));
      dispatch(setMainDrawerItem("Settings"));
      // setActiveTab("Settings");
    }
    // eslint-disable-next-line
  }, [becomeAgentDetailApiInfo?.response]);

  useEffect(() => {
    if (becomeAgentDetailApiInfo?.error) {
      toast.error(TextTranslation.alreadyAgentWithCompany[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetBecomeAnAgentApi());
    }
    // eslint-disable-next-line
  }, [becomeAgentDetailApiInfo?.error]);

  return (
    <>
      <Grid container justifyContent={"center"} columnSpacing={2}>
        {/* <Grid item xs={12} sm={10} lg={8.4}>
          <div className={classes.expHeading}>Register a Company</div>
        </Grid> */}
        <Grid item xs={12} sm={10}>
          <div className={classes.profileContainer}>
            {becomeAgentData?.company_logo ? (
              <img
                src={URL.createObjectURL(becomeAgentData?.company_logo)}
                alt=""
                className={classes.image}
              />
            ) : (
              <div className={classes.image} />
            )}

            <Button
              sx={{
                backgroundColor: "#134696",
                width: 10,
                height: 30,
                color: "white",
                mt: 2,
                fontFamily: "medium",
                fontSize: 14,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#134696",
                },
              }}
              component="label"
            >
              {TextTranslation.upload[langIndex]}
              <input
                hidden
                accept="image/png, image/jpeg"
                type="file"
                onInput={handleImagePicker}
                multiple
              />
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={5} lg={4.2}>
          <AgentInputField
            placeholder={TextTranslation.companyName[langIndex]}
            value={becomeAgentData?.companyName || ""}
            onChange={handleChange("companyName")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            validating={becomeAgentData?.companyNameValidation}
            helperText={TextTranslation.companyNameValidation[langIndex]}
          />
        </Grid>
        <Grid item xs={12} sm={5} lg={4.2}>
          <AgentInputField
            placeholder={TextTranslation.companyEmail[langIndex]}
            value={becomeAgentData?.companyEmail || ""}
            onChange={handleChange("companyEmail")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            validating={becomeAgentData?.companyEmailValidation}
          />
        </Grid>

        <Grid item xs={12} sm={5} lg={4.2}>
          <CustomPhoneInput
            placeholder={TextTranslation.phoneNumber[langIndex]}
            name="company_phone"
            value={becomeAgentData?.company_phone || ""}
            onChange={handleCompanyPhoneInput}
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
            validating={becomeAgentData?.isCompanyPhoneValid}
            helperText={TextTranslation.pleaseEnterValidPhoneNumber[langIndex]}
          />
        </Grid>
        <Grid item xs={12} sm={5} lg={4.2}>
          <CustomPhoneInput
            placeholder={TextTranslation.fax[langIndex]}
            name="company_fax"
            value={becomeAgentData?.company_fax || ""}
            onChange={handleCompanyFaxInput}
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
            validating={becomeAgentData?.isCompanyFaxValid}
            helperText={TextTranslation.pleaseEnterValidFaxNumber[langIndex]}
          />
        </Grid>

        <Grid item xs={12} sm={10} lg={8.4}>
          {/* <LoginAutocomplete
            placeholder={TextTranslation.companyAddress[langIndex]}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            onPlaceSelected={handleAutocompleteChange("company_address")}
            label="Company Address"
            options={{
              types: ["address"],
              fields: ["name"],
            }}
          /> */}
          <AgentInputField
            placeholder={TextTranslation.companyAddress[langIndex]}
            value={becomeAgentData?.company_address || ""}
            onChange={handleChange("company_address")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            validating={becomeAgentData?.company_addressValidation}
            helperText={TextTranslation.company_addressValidation[langIndex]}
          />
        </Grid>

        <Grid item xs={12} sm={10} lg={8.4}>
          <div
            className={classes.descriptionContainer}
            style={{
              border:
                typeof becomeAgentData?.descriptionValidation === "string"
                  ? "1px solid #D83F50"
                  : "1px solid #b2b2c9",
            }}
          >
            <textarea
              className="login-input"
              rows="4"
              placeholder={TextTranslation.companyDescription[langIndex]}
              value={becomeAgentData?.company_description || ""}
              onChange={handleChange("company_description")}
            />
          </div>
          {becomeAgentData?.edited &&
            becomeAgentData?.company_descriptionValidation === false && (
              <span className={classes.helperText}>
                {TextTranslation.descriptionValidation[langIndex]}
              </span>
            )}
        </Grid>
        <Grid item xs={12} sm={10} lg={8.4} sx={{ mt: 3 }}>
          <div>
            <button
              className={classes.button}
              onClick={async () => {
                const isValid = await isAgencyFormValid(becomeAgentData);
                if (!isValid) handleSubmit();
                else
                  toast.error(isValid, {
                    position: toast.POSITION.TOP_CENTER,
                    progressStyle: { backgroundColor: "#014493" },
                  });
              }}
            >
              {TextTranslation.submit[langIndex]}
            </button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterCompany;
