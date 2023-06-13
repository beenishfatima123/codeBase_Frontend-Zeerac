import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoginInput from "../../loginComponents/LoginInput";
import { ReactComponent as PersonIcon } from "../../../assets/icons/personIcon.svg";
import { setAccountCreationData } from "../../../redux/slices/createAccountSlice";
import "./steps.css";
import { validateEmail, getWordCount } from "../../../utils/helperFunctions";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { isValidPhoneNumber } from "react-phone-number-input";
import CustomPhoneInput from "../../loginComponents/CustomPhoneInput";
import { MAX_IMAGE_FILE_NAME, MAX_IMAGE_SIZE } from "../../../utils/constants";
import { toast } from "react-toastify";
// import LoginAutocomplete from "../../loginComponents/LoginAutocomplete";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: "60%",
  },
  topLabel: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#134696",
    margin: "20px 0px",
    textTransform: "uppercase",
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
  radioLabel: {
    fontSize: 18,
    color: "#7D7D7D",
  },
  logoContainer: {
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
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
  "@media (max-width: 1024px)": {
    container: {
      width: "90%",
    },
  },
}));
const Company = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const accountCreationData = useSelector(
    (state) => state.createAccount.accountCreationData
  );
  // const [location, setLocation] = useState();
  // useEffect(() => {
  //   if (location)
  //     dispatch(setAccountCreationData({ ...accountCreationData, ...location }));
  //   // eslint-disable-next-line
  // }, [location]);

  const handleChange = (prop) => (event) => {
    if (prop === "companyEmail") {
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          isCompanyEmailValid: validateEmail(event.target.value),
          [prop]: event.target.value,
        })
      );
    } else if (prop === "companyDescription") {
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          isDescriptionValid:
            getWordCount(event.target.value) >= 10 &&
            getWordCount(event.target.value) <= 100
              ? true
              : false,
          [prop]: event.target.value,
        })
      );
    } else if (prop === "companyName") {
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          isCompanyNameValid:
            event.target.value?.length >= 3 && event.target.value?.length <= 30
              ? true
              : false,
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
  const handlePhoneInput = (phoneNumber) => {
    if (phoneNumber)
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          companyPhone: phoneNumber,
          isCompanyPhoneValid: isValidPhoneNumber(phoneNumber),
        })
      );
  };
  const handleImagePicker = (event) => {
    if (
      event?.target?.files[0]?.size / 1024 ** 2 < MAX_IMAGE_SIZE &&
      event?.target?.files[0]?.name?.length < MAX_IMAGE_FILE_NAME
    ) {
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          company_logo: event?.target?.files[0],
        })
      );
    } else {
      toast.error("file name/size is too large", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };
  // const handleAutocompleteChange = (prop) => (event) => {
  //   setLocation((prev) => ({
  //     ...prev,
  //     [prop]: event?.name,
  //   }));
  // };

  return (
    <div className={classes.container}>
      <span className={classes.topLabel}>Tell us about your company</span>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item xs={12} sm={12}>
          <div className={classes.logoContainer}>
            {accountCreationData?.company_logo ? (
              <img
                src={URL.createObjectURL(accountCreationData?.company_logo)}
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
              Upload
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
        <Grid item xs={12} sm={6}>
          <LoginInput
            placeholder="Company Name"
            value={accountCreationData?.companyName}
            onChange={handleChange("companyName")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            validating={accountCreationData?.isCompanyNameValid}
            helperText="company name must be between 3-30 characters"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoginInput
            placeholder="Email Address"
            value={accountCreationData?.companyEmail}
            onChange={handleChange("companyEmail")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            validating={accountCreationData?.isCompanyEmailValid}
            helperText="Please enter a valid email address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomPhoneInput
            placeholder="Phone Number"
            value={accountCreationData?.companyPhone}
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
            validating={accountCreationData?.isCompanyPhoneValid}
            helperText="Please enter a valid phone number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoginInput
            placeholder="Fax"
            value={accountCreationData?.companyFax}
            onChange={handleChange("companyFax")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <LoginInput
            placeholder="Address"
            value={accountCreationData?.companyAddress}
            onChange={handleChange("companyAddress")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
          />
          {/* <LoginAutocomplete
            placeholder="Address"
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            onPlaceSelected={handleAutocompleteChange("company_address")}
            label="Address"
            options={{
              types: ["address"],
              fields: ["name"],
            }}
          /> */}
        </Grid>
        <Grid item xs={12} sm={12}>
          <div
            className={classes.descriptionContainer}
            style={{
              border:
                accountCreationData?.isDescriptionValid === false
                  ? "1px solid #D83F50"
                  : "1px solid #b2b2c9",
            }}
          >
            <textarea
              className="login-input"
              rows="4"
              placeholder={"Company Description"}
              value={accountCreationData?.companyDescription || ""}
              onChange={handleChange("companyDescription")}
            />
          </div>
          {accountCreationData?.isDescriptionValid === false && (
            <span className={classes.helperText}>
              Description must be min. 10 and max. 100 word.
            </span>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Company;
