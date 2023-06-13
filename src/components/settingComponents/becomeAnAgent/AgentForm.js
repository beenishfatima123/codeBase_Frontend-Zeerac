import moment from "moment";
import { Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import AgentInputField from "./AgentInputField";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { setCurrentUser } from "../../../redux/slices/authSlice";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import CustomPhoneInput from "../../loginComponents/CustomPhoneInput";
import LoginAutocomplete from "../../loginComponents/LoginAutocomplete";
import { validateInputs } from "../../../utils/helpers/accountCreation";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { ReactComponent as PersonIcon } from "../../../assets/icons/personIcon.svg";
import {
  becomeAgent,
  resetBecomeAnAgentApi,
  setBecomeAgentData,
  setMainDrawerItem,
} from "../../../redux/slices/settingsSlice";
import { getWordCount, validateEmail } from "../../../utils/helperFunctions";
import useColor from "../../../utils/hooks/useColor";
import { TextTranslation } from "../../../utils/translation";
import { MAX_IMAGE_FILE_NAME, MAX_IMAGE_SIZE } from "../../../utils/constants";

const useStyles = makeStyles(() => ({
  tosContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: 13,
    color: "#7D7D7D",
    cursor: "pointer",
    marginTop: 20,
  },
  heading: {
    fontSize: 26,
    color: "#134196",
    textAlign: "center",
    fontFamily: "heavy",
    marginTop: 20,
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
  expHeading: {
    fontSize: 16,
    fontFamily: "heavy",
    color: "#134696",
    marginTop: 20,
  },
  addMore: {
    color: "#134696",
    fontSize: 14,
    fontFamily: "medium",
    cursor: "pointer",
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px 0",
    maxWidth: "85%",
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
    marginTop: 20,
    objectFit: "cover",
  },
}));

/* From for become an agent application with option to set up agency organization. */
const AgentForm = () => {
  const classes = useStyles();
  const dobInputRef = useRef();
  const dispatch = useDispatch();

  const [isCompany, setIsCompany] = useState(false);
  const [location, setLocation] = useState();

  const { colors, langIndex } = useSelector((state) => state.global);
  useColor(colors);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { becomeAgentData, becomeAgentDetailApiInfo } = useSelector(
    (state) => state.settings
  );

  /* this useEffect dispotches becomeAgentData with location to the store. */
  useEffect(() => {
    if (location)
      dispatch(setBecomeAgentData({ ...becomeAgentData, ...location }));
    // eslint-disable-next-line
  }, [location]);

  /* this useEffect takes entered data from the form and dispatches it to set become agent data method in slice. */
  useEffect(() => {
    dispatch(
      setBecomeAgentData({
        ...becomeAgentData,
        first_name: currentUser?.first_name,
        last_name: currentUser?.last_name,
        email: currentUser?.email,
        phone_number: currentUser?.phone_number,
        cnic: currentUser?.cnic,
        date_of_birth: currentUser?.date_of_birth,
        personal_description:
          currentUser?.personal_description?.length > 0
            ? currentUser?.personal_description
            : "",
        personal_descriptionValidation:
          currentUser?.personal_description?.length >= 100 &&
          currentUser?.personal_description?.length <= 500,
        isPhoneValid: isValidPhoneNumber(currentUser?.phone_number || ""),
      })
    );
    // eslint-disable-next-line
  }, []);

  /* handleChange takes prop and event, checks validation for for entries and if valid -> dispatches to the beome agent data. If prop is cnic, companyEmail or company_description, it separately checks for entered values validity. */
  const handleChange = (prop) => (event) => {
    const validationError = validateInputs(prop, event.target.value);
    if (prop === "cnic") {
      dispatch(
        setBecomeAgentData({
          ...becomeAgentData,
          edited: true,
          [prop]: event.target.value,
          [`${prop}Validation`]:
            event?.target?.value?.indexOf("*") > 0
              ? TextTranslation.pleaseEnterValidCnic[langIndex]
              : null,
        })
      );
    } else if (prop === "companyEmail") {
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
          [`${prop}Validation`]:
            event.target.name === "personal_description"
              ? getWordCount(event.target.value) >= 10 &&
                getWordCount(event.target.value) <= 100
                ? true
                : false
              : validationError,
        })
      );
    }
  };

  /* on phone input, set become agent data with phone number and validation status. */
  const handlePhoneInput = (phone_number) => {
    if (phone_number)
      dispatch(
        setBecomeAgentData({
          ...becomeAgentData,
          phone_number,
          isPhoneValid: isValidPhoneNumber(phone_number),
        })
      );
  };

  /* when agency organization checkbox is true and phone number for company is entered, dispatch data with new company phone number and its validation status. */
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

  /* when agency organization checkbox is true and fax number for company is entered, dispatch data with new company fax number and its validation status. */
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

  /* handling auto complete when area prop is entered, setting location as received from event target.  */
  const handleAutocompleteChange = (prop) => (event) => {
    //console.log({ prop, event });
    setLocation((prev) => {
      if (prop === "area")
        return {
          ...prev,
          area: event?.name,
          lat: event?.geometry?.location?.lat(),
          lng: event?.geometry?.location?.lng(),
        };
      else return { ...prev, [prop]: event?.name };
    });
  };

  /* handleImagePicker takes prop event and sets file equal to the image uploaded on the event target. It also validated image sizes and idspatches to update auction info. */
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

  /* taking data from form as parameter and checking for validity of agent information. */
  const isAgentFormValid = (data) => {
    if (
      data?.first_nameValidation ||
      data?.last_nameValidation ||
      data?.date_of_birthValidation ||
      data?.cnicValidation ||
      !data?.personal_descriptionValidation ||
      !data?.isPhoneValid
    ) {
      return false;
    }
    return true;
  };

  /* taking data from form as parameter and checking for validity of agency information. */
  const isAgencyFormValid = (data) => {
    if (
      data?.companyNameValidation ||
      data?.companyEmailValidation ||
      !data?.company_descriptionValidation ||
      !data?.isCompanyPhoneValid ||
      !data?.isCompanyFaxValid
    ) {
      return false;
    }
    return true;
  };

  /* upon submission of the forms, create form data from the entered information and dispatch the form data to become Agent. */
  const handleSubmit = () => {
    let formData = new FormData();
    becomeAgentData?.first_name &&
      formData.append("first_name", becomeAgentData?.first_name);
    becomeAgentData?.last_name &&
      formData.append("last_name", becomeAgentData?.last_name);
    becomeAgentData?.phone_number &&
      formData.append("phone_number", becomeAgentData?.phone_number);
    becomeAgentData?.cnic && formData.append("cnic", becomeAgentData?.cnic);
    becomeAgentData?.date_of_birth &&
      formData.append(
        "date_of_birth",
        moment(becomeAgentData?.date_of_birth).format("YYYY-MM-DD")
      );
    becomeAgentData?.personal_description &&
      formData.append("description", becomeAgentData?.personal_description);
    becomeAgentData?.city && formData.append("city", becomeAgentData?.city);
    becomeAgentData?.area && formData.append("area", becomeAgentData?.area);
    becomeAgentData?.area && formData.append("lat", becomeAgentData?.lat);
    becomeAgentData?.area && formData.append("lng", becomeAgentData?.lng);
    becomeAgentData?.address &&
      formData.append("address", becomeAgentData?.address);
    if (isCompany) {
      formData.append("is_company", isCompany);
      formData.append("admin", currentUser?.id);
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
    } else {
      formData.append("is_company", false);
    }
    dispatch(
      becomeAgent({
        token: currentUser?.token,
        formData,
      })
    );
  };

  /* if become agent API returns a response then show success message in toast
  and set current user type equal to response result user type. */
  useEffect(() => {
    if (becomeAgentDetailApiInfo?.response) {
      toast.success(TextTranslation.registeredAsAgent[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });

      dispatch(
        setCurrentUser({
          ...currentUser,
          user_type: becomeAgentDetailApiInfo?.response?.user_type,
        })
      );
      dispatch(resetBecomeAnAgentApi());
      dispatch(setMainDrawerItem("Settings"));
    }
    // eslint-disable-next-line
  }, [becomeAgentDetailApiInfo?.response]);

  /* if become agent API returns an error then show error message in toast
  and reset become agent data. */
  useEffect(() => {
    if (becomeAgentDetailApiInfo?.error) {
      toast.error(TextTranslation.somethingWentWrong[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetBecomeAnAgentApi());
    }
    // eslint-disable-next-line
  }, [becomeAgentDetailApiInfo?.error]);

  return (
    <div style={{ width: "100%", marginTop: 15, marginBottom: 15 }}>
      {becomeAgentDetailApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          <Grid container justifyContent={"center"} columnSpacing={2}>
            <Grid item xs={12} sm={5} lg={4.2}>
              <AgentInputField
                placeholder={TextTranslation.firstName[langIndex]}
                value={becomeAgentData?.first_name}
                onChange={handleChange("first_name")}
                startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                type="text"
                validating={becomeAgentData?.first_nameValidation}
              />
            </Grid>
            <Grid item xs={12} sm={5} lg={4.2}>
              <AgentInputField
                placeholder={TextTranslation.lastName[langIndex]}
                value={becomeAgentData?.last_name}
                onChange={handleChange("last_name")}
                startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                type="text"
                validating={becomeAgentData?.last_nameValidation}
              />
            </Grid>

            <Grid item xs={12} sm={5} lg={4.2}>
              <AgentInputField
                name="email"
                placeholder={TextTranslation.enterEmailAddress[langIndex]}
                value={becomeAgentData?.email}
                startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                type="text"
                readOnly={true}
              />
            </Grid>
            <Grid item xs={12} sm={5} lg={4.2}>
              <CustomPhoneInput
                placeholder={TextTranslation.phoneNumber[langIndex]}
                name="phone_number"
                value={becomeAgentData?.phone_number}
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
                validating={becomeAgentData?.isPhoneValid}
                helperText={
                  TextTranslation.pleaseEnterValidPhoneNumber[langIndex]
                }
              />
            </Grid>

            <Grid item xs={12} sm={5} lg={4.2}>
              <AgentInputField
                placeholder={TextTranslation.cnic[langIndex]}
                value={becomeAgentData?.cnic}
                onChange={handleChange("cnic")}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                mask="*****-*******-*"
                validating={becomeAgentData?.cnicValidation}
                helperText={TextTranslation.pleaseEnterValidCnic[langIndex]}
              />
            </Grid>
            <Grid item xs={12} sm={5} lg={4.2}>
              <AgentInputField
                inputRef={dobInputRef}
                placeholder={TextTranslation.dob[langIndex]}
                value={becomeAgentData?.date_of_birth}
                onChange={handleChange("date_of_birth")}
                startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                type="text"
                onFocus={() => (dobInputRef.current.type = "date")}
                onBlur={() => (dobInputRef.current.type = "text")}
                max={new Date().toISOString().split("T")[0]}
              />
            </Grid>
          </Grid>
          <div className={classes.heading}>
            {TextTranslation.fillInformation[langIndex]}
          </div>
          <Grid container justifyContent={"center"} columnSpacing={2}>
            <Grid item xs={12} sm={10} lg={8.4}>
              <div
                className={classes.descriptionContainer}
                style={{
                  border:
                    typeof currentUser?.descriptionValidation === "string"
                      ? "1px solid #D83F50"
                      : "1px solid #b2b2c9",
                }}
              >
                <textarea
                  name="personal_description"
                  className="login-input"
                  rows="4"
                  placeholder={TextTranslation.biography[langIndex]}
                  value={becomeAgentData?.personal_description}
                  onChange={handleChange("personal_description")}
                />
              </div>
              {becomeAgentData?.edited &&
                becomeAgentData?.personal_descriptionValidation === false && (
                  <span className={classes.helperText}>
                    {TextTranslation.biographyValidation[langIndex]}
                  </span>
                )}
            </Grid>

            <Grid item xs={12} sm={5} lg={4.2}>
              <LoginAutocomplete
                placeholder={TextTranslation.city[langIndex]}
                defaultValue={becomeAgentData?.city || currentUser?.city}
                startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                onPlaceSelected={handleAutocompleteChange("city")}
                label={TextTranslation.city[langIndex]}
                options={{
                  types: ["(cities)"],
                  fields: ["name"],
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5} lg={4.2}>
              <LoginAutocomplete
                placeholder={TextTranslation.area[langIndex]}
                defaultValue={becomeAgentData?.area || currentUser?.area}
                startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                onPlaceSelected={handleAutocompleteChange("area")}
                label={TextTranslation.area[langIndex]}
                options={{
                  types: ["address"],
                  fields: ["name", "geometry"],
                }}
              />
            </Grid>
            <Grid item xs={12} sm={10} lg={8.4}>
              {/* <LoginAutocomplete
                placeholder={TextTranslation.address[langIndex]}
                defaultValue={becomeAgentData?.address || currentUser?.address}
                startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                onPlaceSelected={handleAutocompleteChange("address")}
                label={TextTranslation.address[langIndex]}
                options={{
                  types: ["address"],
                  fields: ["name"],
                }}
              /> */}
              <AgentInputField
                placeholder={TextTranslation.address[langIndex]}
                value={becomeAgentData?.address}
                onChange={handleChange("address")}
                startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                type="text"
                validating={becomeAgentData?.addressValidation}
              />
            </Grid>
            <Grid item xs={12} sm={10} lg={8.4}>
              <div
                className={classes.tosContainer}
                onClick={() => setIsCompany((prev) => !prev)}
              >
                <input
                  type="checkbox"
                  onChange={() => setIsCompany((prev) => !prev)}
                  onClick={() => setIsCompany((prev) => !prev)}
                  checked={isCompany}
                  className="login-checkbox"
                />
                <span className={classes.radioLabel}>
                  {TextTranslation.setUpAgencyOrganization[langIndex]}
                </span>
              </div>
            </Grid>
          </Grid>
          {isCompany && (
            <>
              <Grid container justifyContent={"center"} columnSpacing={2}>
                <Grid item xs={12} sm={10} lg={8.4}>
                  <div className={classes.expHeading}>
                    {TextTranslation.company[langIndex]}
                  </div>
                </Grid>
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
                    helperText={
                      TextTranslation.companyNameValidation[langIndex]
                    }
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
                    helperText={
                      TextTranslation.pleaseEnterValidPhoneNumber[langIndex]
                    }
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
                    helperText={
                      TextTranslation.pleaseEnterValidFaxNumber[langIndex]
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={10} lg={8.4}>
                  {/* <LoginAutocomplete
                    placeholder={TextTranslation.companyAddress[langIndex]}
                    startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                    onPlaceSelected={handleAutocompleteChange(
                      "company_address"
                    )}
                    label={TextTranslation.companyAddress[langIndex]}
                    options={{
                      types: ["address"],
                      fields: ["name"],
                    }}
                  /> */}
                  <AgentInputField
                    placeholder={TextTranslation.companyAddress[langIndex]}
                    value={becomeAgentData?.company_address}
                    onChange={handleChange("company_address")}
                    startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                    type="text"
                    validating={becomeAgentData?.company_addressValidation}
                    helperText={
                      TextTranslation.company_addressValidation[langIndex]
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={10} lg={8.4}>
                  <div
                    className={classes.descriptionContainer}
                    style={{
                      border:
                        typeof becomeAgentData?.descriptionValidation ===
                        "string"
                          ? "1px solid #D83F50"
                          : "1px solid #b2b2c9",
                    }}
                  >
                    <textarea
                      className="login-input"
                      rows="4"
                      placeholder={
                        TextTranslation.companyDescription[langIndex]
                      }
                      value={becomeAgentData?.company_description || ""}
                      onChange={handleChange("company_description")}
                    />
                  </div>
                  {becomeAgentData?.edited &&
                    becomeAgentData?.company_descriptionValidation ===
                      false && (
                      <span className={classes.helperText}>
                        {TextTranslation.descriptionValidation[langIndex]}
                      </span>
                    )}
                </Grid>
              </Grid>
            </>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              paddingBottom: 20,
            }}
          >
            <button
              className={classes.button}
              onClick={handleSubmit}
              style={{
                backgroundColor:
                  !isCompany && isAgentFormValid(becomeAgentData)
                    ? colors?.primary
                    : !isAgentFormValid(becomeAgentData) ||
                      !isAgencyFormValid(becomeAgentData)
                    ? "grey"
                    : colors?.primary,
              }}
              disabled={
                !isCompany
                  ? !isAgentFormValid(becomeAgentData)
                  : !isAgentFormValid(becomeAgentData) ||
                    !isAgencyFormValid(becomeAgentData)
              }
            >
              {TextTranslation.submit[langIndex]}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentForm;
