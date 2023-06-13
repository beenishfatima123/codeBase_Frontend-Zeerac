import moment from "moment";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import useColor from "../../../../../utils/hooks/useColor";
import { isValidPhoneNumber } from "react-phone-number-input";
import AgentInputField from "../../../becomeAnAgent/AgentInputField";
import { setCurrentUser } from "../../../../../redux/slices/authSlice";
import CustomPhoneInput from "../../../../loginComponents/CustomPhoneInput";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { ReactComponent as PersonIcon } from "../../../../../assets/icons/personIcon.svg";
import {
  resetUpdateApi,
  setShowEditInfo,
  updateUserInfo,
  setUserUpdateFormData,
} from "../../../../../redux/slices/settingsSlice";
import { validateInputs } from "../../../../../utils/helpers/accountCreation";
import { getWordCount } from "../../../../../utils/helperFunctions";
import { TextTranslation } from "../../../../../utils/translation";
import LoginAutocomplete from "../../../../loginComponents/LoginAutocomplete";

const useStyles = makeStyles(() => ({
  input: {
    border: "1px solid #707070",
    fontSize: 16,
    background: "none",
    color: "#000000",
    fontFamily: "medium",
    height: 52,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    padding: "0 10px",
  },
  label: {
    fontSize: 14,
    fontFamily: "light",
    color: "#707070",
  },
  updateButton: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#ffffff",
    backgroundColor: "#134696",
    width: 150,
    height: 50,
    borderRadius: 5,
    cursor: "pointer",
    border: "1px solid #707070",
  },
  cancelButton: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#134696",
    backgroundColor: "#ffffff",
    width: 150,
    height: 50,
    borderRadius: 5,
    cursor: "pointer",
    border: "1px solid #707070",
    marginLeft: 20,
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
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
}));

const EditInformation = () => {
  const classes = useStyles();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  //console.log({ currentUser });

  const { updateUserApiInfo, userUpdateFormData } = useSelector(
    (state) => state.settings
  );
  const { colors, darkMode, langIndex } = useSelector((state) => state.global);
  useColor(colors);

  const [user] = useState({
    edited: false,
    first_name: currentUser?.first_name ? currentUser?.first_name : "",
    last_name: currentUser?.last_name ? currentUser?.last_name : "",
    city: currentUser?.city ? currentUser?.city : "",
    area: currentUser?.area ? currentUser?.area : "",
    address: currentUser?.address ? currentUser?.address : "",
    date_of_birth: currentUser?.date_of_birth
      ? moment(currentUser?.date_of_birth).format("YYYY-MM-DD")
      : "",
    phone_number: currentUser?.phone_number ? currentUser?.phone_number : "",
    isPhoneValid: isValidPhoneNumber(currentUser?.phone_number || ""),
    personal_description: currentUser?.personal_description
      ? currentUser?.personal_description
      : "",
    personal_descriptionValidation:
      currentUser?.personal_description?.length >= 100 &&
      currentUser?.personal_description?.length <= 500,
  });
  const [location, setLocation] = useState();

  useEffect(() => {
    if (location)
      dispatch(setUserUpdateFormData({ ...userUpdateFormData, ...location }));

    // eslint-disable-next-line
  }, [location]);

  let designation =
    currentUser?.user_type === 0
      ? "Real Estate Admin"
      : currentUser?.user_type === 1
      ? "Real Estate User"
      : currentUser?.user_type === 2
      ? "Real Estate Agent"
      : currentUser?.user_type === 3
      ? "Real Estate CEO"
      : "Real Estate Moderator";

  const handleInputChange = (prop) => (e) => {
    const validationError = validateInputs(prop, e.target.value);
    dispatch(
      setUserUpdateFormData({
        ...userUpdateFormData,
        edited: true,
        [`${prop}Validation`]:
          e.target.name === "personal_description"
            ? getWordCount(e.target.value) >= 10 &&
              getWordCount(e.target.value) <= 100
              ? true
              : false
            : validationError,
        [e.target.name]:
          e.target.name === "date_of_birth"
            ? moment(e.target.value).format("YYYY-MM-DD")
            : e.target.value,
      })
    );
  };
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

  const handlePhoneInput = (phone_number) => {
    if (phone_number) {
      dispatch(
        setUserUpdateFormData({
          ...userUpdateFormData,
          phone_number,
          isPhoneValid: isValidPhoneNumber(phone_number),
        })
      );
    } else {
      dispatch(
        setUserUpdateFormData({
          ...userUpdateFormData,
          phone_number,
          isPhoneValid: false,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(setUserUpdateFormData(user));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (updateUserApiInfo?.response?.status) {
      toast.success(updateUserApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(
        setCurrentUser({
          ...currentUser,
          ...updateUserApiInfo?.response?.result,
        })
      );
      dispatch(setShowEditInfo(false));
      dispatch(resetUpdateApi());
    } else if (updateUserApiInfo?.response?.status === false) {
      toast.error(updateUserApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetUpdateApi());
    }
    // eslint-disable-next-line
  }, [updateUserApiInfo?.response]);

  useEffect(() => {
    if (updateUserApiInfo?.error) {
      toast.error(updateUserApiInfo?.error?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(setShowEditInfo(false));
      dispatch(resetUpdateApi());
    }
    // eslint-disable-next-line
  }, [updateUserApiInfo?.error]);

  const formValidation = (data) => {
    if (
      data?.first_nameValidation ||
      data?.last_nameValidation ||
      data?.date_of_birthValidation ||
      !data?.personal_descriptionValidation ||
      !data?.isPhoneValid
    ) {
      return false;
    }
    return true;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("first_name", userUpdateFormData?.first_name);
        formData.append("last_name", userUpdateFormData?.last_name);
        formData.append("city", userUpdateFormData?.city);
        formData.append("area", userUpdateFormData?.area);
        formData.append("address", userUpdateFormData?.address);
        formData.append(
          "date_of_birth",
          new Date(
            moment(userUpdateFormData?.date_of_birth).format("YYYY-MM-DD")
          )
        );
        formData.append("phone_number", userUpdateFormData?.phone_number);
        formData.append(
          "personal_description",
          userUpdateFormData?.personal_description
        );

        dispatch(
          updateUserInfo({
            user: userUpdateFormData,
            id: currentUser?.id,
            token: currentUser?.token,
          })
        );
      }}
    >
      <Grid container justifyContent="space-around" spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
          <label
            className={classes.label}
            style={{ color: darkMode ? colors?.primary : "" }}
          >
            First Name
          </label>
          <AgentInputField
            name="first_name"
            value={userUpdateFormData?.first_name || ""}
            onChange={handleInputChange("first_name")}
            validating={userUpdateFormData?.first_nameValidation}
            placeholder="First Name"
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
          <label
            className={classes.label}
            style={{ color: darkMode ? colors?.primary : "" }}
          >
            Last Name
          </label>
          <AgentInputField
            name="last_name"
            value={userUpdateFormData?.last_name || ""}
            onChange={handleInputChange("last_name")}
            validating={userUpdateFormData?.last_nameValidation}
            placeholder="Last Name"
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
          <label
            className={classes.label}
            style={{ color: darkMode ? colors?.primary : "" }}
          >
            Date of Birth
          </label>
          <AgentInputField
            inputRef={inputRef}
            name="date_of_birth"
            placeholder="DOB"
            value={userUpdateFormData?.date_of_birth}
            onChange={handleInputChange("date_of_birth")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            onFocus={() => (inputRef.current.type = "date")}
            onBlur={() => (inputRef.current.type = "text")}
            max={new Date().toISOString().split("T")[0]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
          <label
            className={classes.label}
            style={{ color: darkMode ? colors?.primary : "" }}
          >
            Phone Number
          </label>
          <CustomPhoneInput
            name="phone_number"
            placeholder="Phone Number"
            value={userUpdateFormData?.phone_number}
            onChange={handlePhoneInput}
            validating={userUpdateFormData?.isPhoneValid}
            helperText="Please enter a valid phone number"
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
          />
        </Grid>
        <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
          <label
            className={classes.label}
            style={{ color: darkMode ? colors?.primary : "" }}
          >
            Designation
          </label>
          <AgentInputField
            readOnly
            name="user_type"
            value={designation}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
          <label
            className={classes.label}
            style={{ color: darkMode ? colors?.primary : "" }}
          >
            Biography
          </label>
          <div
            className={classes.descriptionContainer}
            style={{
              border:
                typeof userUpdateFormData?.descriptionValidation === "string"
                  ? "1px solid #D83F50"
                  : "1px solid #b2b2c9",
            }}
          >
            <textarea
              name="personal_description"
              className="login-input"
              rows="4"
              placeholder={"Brief Description"}
              value={userUpdateFormData?.personal_description || ""}
              onChange={handleInputChange("personal_description")}
              // onPaste={(e) => handlePaste(e)}
            />
          </div>
          {userUpdateFormData?.edited &&
            userUpdateFormData?.personal_descriptionValidation === false && (
              <span className={classes.helperText}>
                {TextTranslation.biographyValidation[langIndex]}
              </span>
            )}
        </Grid>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
          <label
            className={classes.label}
            style={{ color: darkMode ? colors?.primary : "" }}
          >
            City
          </label>
          <LoginAutocomplete
            defaultValue={userUpdateFormData?.city}
            placeholder="City"
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            onPlaceSelected={handleAutocompleteChange("city")}
            label="City"
            options={{
              types: ["(cities)"],
              fields: ["name"],
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
          <label
            className={classes.label}
            style={{ color: darkMode ? colors?.primary : "" }}
          >
            Area
          </label>
          <LoginAutocomplete
            defaultValue={userUpdateFormData?.area}
            placeholder="Area"
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            onPlaceSelected={handleAutocompleteChange("area")}
            label="Area"
            options={{
              types: ["address"],
              fields: ["name", "geometry"],
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
          <label
            className={classes.label}
            style={{ color: darkMode ? colors?.primary : "" }}
          >
            Address
          </label>
          <AgentInputField
            name="address"
            placeholder="Address"
            value={userUpdateFormData?.address}
            onChange={handleInputChange("address")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
          <button
            type="submit"
            className={classes.updateButton}
            style={{
              backgroundColor: formValidation(userUpdateFormData)
                ? colors?.primary
                : "grey",
            }}
            disabled={!formValidation(userUpdateFormData)}
          >
            Update
          </button>
          <button
            className={classes.cancelButton}
            onClick={() => dispatch(setShowEditInfo(false))}
          >
            Cancel
          </button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditInformation;
