import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoginInput from "../../loginComponents/LoginInput";
import { ReactComponent as PersonIcon } from "../../../assets/icons/personIcon.svg";
import { setAccountCreationData } from "../../../redux/slices/createAccountSlice";
import "./steps.css";
import { validateInputs } from "../../../utils/helpers/accountCreation";
import LoginAutocomplete from "../../loginComponents/LoginAutocomplete";
import { useState } from "react";
import { useEffect } from "react";
import { TextTranslation } from "../../../utils/translation";
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
const Information = ({ disable }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { langIndex } = useSelector((state) => state.global);
  const accountCreationData = useSelector(
    (state) => state.createAccount.accountCreationData
  );
  const [location, setLocation] = useState();

  useEffect(() => {
    if (location)
      dispatch(setAccountCreationData({ ...accountCreationData, ...location }));

    // eslint-disable-next-line
  }, [location]);
  const handleChange = (prop) => (event) => {
    const validationError = validateInputs(prop, event.target.value);
    if (prop === "cnic") {
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          [prop]: event.target.value,
          [`${prop}Validation`]:
            event?.target?.value?.indexOf("*") > 0
              ? TextTranslation.pleaseEnterValidCnic[langIndex]
              : null,
        })
      );
    } else {
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          [prop]: event.target.value,
          [`${prop}Validation`]: validationError,
        })
      );
    }
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
  return (
    <div className={classes.container}>
      <span className={classes.topLabel}>Provide additional information</span>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item xs={12} sm={12}>
          <div
            className={classes.descriptionContainer}
            style={{
              border:
                typeof accountCreationData?.descriptionValidation === "string"
                  ? "1px solid #D83F50"
                  : "1px solid #b2b2c9",
            }}
          >
            <textarea
              className="login-input"
              rows="4"
              placeholder={"Brief Description"}
              value={accountCreationData?.description || ""}
              onChange={handleChange("description")}
            />
          </div>
          {typeof accountCreationData?.descriptionValidation === "string" && (
            <span className={classes.helperText}>
              {accountCreationData?.descriptionValidation}
            </span>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoginAutocomplete
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
        <Grid item xs={12} sm={6}>
          {/* <LoginInput
            placeholder="Area"
            value={accountCreationData?.area}
            onChange={handleChange("area")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            validating={accountCreationData?.areaValidation}
            helperText="Area must be between 3-30 characters"

          /> */}
          <LoginAutocomplete
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

        <Grid item xs={12} sm={12}>
          <LoginInput
            placeholder="Address"
            value={accountCreationData?.address}
            onChange={handleChange("address")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
          />
          {/* <LoginAutocomplete
            placeholder="Address"
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            onPlaceSelected={handleAutocompleteChange("address")}
            label="Address"
            options={{
              types: ["address"],
              fields: ["name"],
            }}
          /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoginInput
            placeholder="CNIC"
            value={accountCreationData?.cnic}
            onChange={handleChange("cnic")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            mask="*****-*******-*"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            validating={accountCreationData?.cnicValidation}
            helperText={TextTranslation.pleaseEnterValidCnic[langIndex]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoginInput
            inputRef={inputRef}
            placeholder="DOB"
            value={accountCreationData?.dob}
            onChange={handleChange("dob")}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
            onFocus={() => (inputRef.current.type = "date")}
            onBlur={() => (inputRef.current.type = "text")}
            max={new Date().toISOString().split("T")[0]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Information;
