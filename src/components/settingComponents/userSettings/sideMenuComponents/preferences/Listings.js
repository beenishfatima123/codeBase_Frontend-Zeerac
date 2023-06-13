import TopHeader from "./TopHeader";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import Dropdown from "./listingFilters/Dropdown";
import InputField from "./listingFilters/InputField";
import RangeInput from "./listingFilters/RangeInput";
import { useDispatch, useSelector } from "react-redux";
import RoomButtons from "./listingFilters/RoomButtons";
import useColor from "../../../../../utils/hooks/useColor";
import ButtonLoader from "../../../../globalComponents/ButtonLoader";
import { TextTranslation } from "../../../../../utils/translation";
import { createPreferenceData } from "../../../../../utils/helperFunctions";
import LoginAutocomplete from "../../../../loginComponents/LoginAutocomplete";
//import ComponentLoader from "../../../../globalComponents/ComponentLoader";
import {
  resetPreferenceCreation,
  resetPreferenceCreationApiInfo,
  resetUpdatePreferenceApiInfo,
  setGetPreferenceData,
  setPreferenceCreationData,
  updateUserPreferences,
  userPreferences,
} from "../../../../../redux/slices/preferenceSlice";
import {
  LISTING_UNIT_FILTERS,
  ROOM_BUTTONS,
} from "../../../../../utils/constants";
import {
  PROPERTY_FEATURES,
  PROPERTY_SERVICES,
} from "../../../../../utils/propertyConstants";

const useStyles = makeStyles(() => ({
  container: {
    //padding: "20px 0px",
    border: "1px solid #c9c9c9",
    maxWidth: "98%",
  },
  label: {
    color: "#134696",
    fontSize: 14,
    fontFamily: "light",
  },
  saveButton: {
    backgroundColor: "#134696",
    color: "#fff",
    fontFamily: "medium",
    fontSize: 16,
    width: "100%",
    borderRadius: 10,
    cursor: "pointer",
    border: "none",
    height: 40,
    marginRight: "1%",
  },
  cancelButton: {
    backgroundColor: "#fff",
    color: "#134696",
    fontFamily: "medium",
    fontSize: 16,
    width: "100%",
    borderRadius: 10,
    cursor: "pointer",
    border: "1px solid #c4c4c4",
    height: 40,
    marginLeft: "1%",
  },
}));

const Listings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { langIndex, darkMode, colors } = useSelector((state) => state.global);
  useColor(colors);
  const {
    userPreferenceData,
    userPreferenceDataApiInfo,
    getPreferenceData,
    updateUserPreferenceDataApiInfo,
  } = useSelector((state) => state.preference);

  const [location, setLocation] = useState();

  //console.log({ getPreferenceData });

  useEffect(() => {
    if (location)
      dispatch(
        setPreferenceCreationData({ ...userPreferenceData, ...location })
      );

    // eslint-disable-next-line
  }, [location]);

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
  const handleChange = (prop) => (event) => {
    dispatch(
      setGetPreferenceData({
        ...getPreferenceData,
        [prop]: event?.target?.value,
      })
    );
  };
  const getColor = (elem) => {
    let _elem = `${elem}`?.toLowerCase()?.replace(" ", "_");
    // console.log({ x, elem, localProp });
    if (darkMode) {
      return {
        color: getPreferenceData?.[_elem] ? "#fff" : "#fff",
        backgroundColor: getPreferenceData?.[_elem] ? "#0ed864" : "#212124",
      };
    } else {
      return {
        color: getPreferenceData?.[_elem] ? "#fff" : "#134696",
        border: "1px solid #707070",
        backgroundColor: getPreferenceData?.[_elem] ? "#134696" : "#fff",
      };
    }
  };
  const handleSubmit = () => {
    if (getPreferenceData?.user === null) {
      dispatch(
        userPreferences({
          token: currentUser?.token,
          formData: createPreferenceData(location, getPreferenceData),
        })
      );
    } else {
      dispatch(
        updateUserPreferences({
          token: currentUser?.token,
          id: getPreferenceData?.id,
          formData: createPreferenceData(location, getPreferenceData),
        })
      );
    }
  };
  useEffect(() => {
    if (userPreferenceDataApiInfo?.response) {
      toast.success("Preference added successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetPreferenceCreationApiInfo());
    }
    // eslint-disable-next-line
  }, [userPreferenceDataApiInfo?.response]);
  useEffect(() => {
    if (userPreferenceDataApiInfo?.error) {
      toast.success("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetPreferenceCreationApiInfo());
    }
    // eslint-disable-next-line
  }, [userPreferenceDataApiInfo?.error]);
  useEffect(() => {
    if (updateUserPreferenceDataApiInfo?.response) {
      toast.success("Preference updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetUpdatePreferenceApiInfo());
    }
    // eslint-disable-next-line
  }, [updateUserPreferenceDataApiInfo?.response]);

  return (
    <>
      <TopHeader
        heading={TextTranslation.listingPreferences[langIndex]}
        resetFilters={TextTranslation.resetAllFilters[langIndex]}
        subHeading={TextTranslation.chooseListingPreference[langIndex]}
        showReset
        onResetFilter={() => {
          dispatch(resetPreferenceCreation());
        }}
      />

      <div className={classes.container}>
        <Grid container columnSpacing={4} rowSpacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} sm={6}>
            <label className={classes.label} style={{ color: colors?.primary }}>
              {TextTranslation.city[langIndex]}
            </label>
            <LoginAutocomplete
              defaultValue={getPreferenceData?.city}
              placeholder={TextTranslation.city[langIndex]}
              //startIcon={<PersonIcon style={{ marginRight: 10 }} />}
              onPlaceSelected={handleAutocompleteChange("city")}
              label={TextTranslation.city[langIndex]}
              options={{
                types: ["(cities)"],
                fields: ["name"],
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className={classes.label} style={{ color: colors?.primary }}>
              {TextTranslation.area[langIndex]}
            </label>
            <LoginAutocomplete
              defaultValue={getPreferenceData?.area}
              placeholder={TextTranslation.area[langIndex]}
              //startIcon={<PersonIcon style={{ marginRight: 10 }} />}
              onPlaceSelected={handleAutocompleteChange("area")}
              label={TextTranslation.area[langIndex]}
              options={{
                types: ["address"],
                fields: ["name", "geometry"],
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputField
              values={getPreferenceData}
              handleChange={handleChange}
              label="Size"
              prop1="size_min"
              prop2="size_max"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <RangeInput
              values={getPreferenceData}
              handleChange={(e, newValue) => {
                dispatch(
                  setGetPreferenceData({
                    ...getPreferenceData,
                    size_min: newValue[0],
                    size_max: newValue[1],
                  })
                );
              }}
              prop1="size_min"
              prop2="size_max"
              price
              min={0}
              max={100000}
              step={10000}
              search
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Dropdown
              values={getPreferenceData}
              handleChange={handleChange}
              label="Measurement"
              options={LISTING_UNIT_FILTERS}
              prop="size_unit"
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item lg={6} sm={6} sx={{ margin: "10px 0px" }}>
            <RoomButtons
              label={TextTranslation?.bedrooms[langIndex]}
              options={ROOM_BUTTONS}
              filter={getPreferenceData}
              handleChange={handleChange}
              prop="bedrooms"
            />
          </Grid>
          <Grid item lg={6} sm={6} sx={{ margin: "10px 0px" }}>
            <RoomButtons
              label={TextTranslation?.bathrooms[langIndex]}
              options={ROOM_BUTTONS}
              filter={getPreferenceData}
              handleChange={handleChange}
              prop="bathrooms"
            />
          </Grid>
          <Grid item lg={6} sm={6} sx={{ margin: "10px 0px" }}>
            <RoomButtons
              label={TextTranslation?.stores[langIndex]}
              options={ROOM_BUTTONS}
              filter={getPreferenceData}
              handleChange={handleChange}
              prop="stores"
            />
          </Grid>
        </Grid>

        <label
          className={classes.label}
          style={{ marginLeft: 10, color: colors?.primary }}
        >
          {TextTranslation.amenitiesFeatures[langIndex]}
        </label>
        <Grid container sx={{ p: 2 }}>
          {[...PROPERTY_FEATURES, ...PROPERTY_SERVICES]?.map((elem, index) => (
            <Grid key={index} large={4} small={12} sx={{ margin: "10px 0px" }}>
              <Button
                key={index}
                sx={{
                  padding: "5px 20px",
                  fontSize: 14,
                  textTransform: "none",
                  borderRadius: "25px",
                  margin: "0px 5px",
                  border: "1px solid #707070",
                  ...getColor(elem[0]),
                  "&:hover": {
                    backgroundColor: "#134696",
                    ...getColor(elem[0]),
                  },
                }}
                onClick={() =>
                  handleChange(`${elem[0]}`?.toLowerCase()?.replace(" ", "_"))({
                    target: {
                      value:
                        !getPreferenceData?.[
                          `${elem[0]}`?.toLowerCase()?.replace(" ", "_")
                        ],
                    },
                  })
                }
              >
                {elem[langIndex]}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={5} sm={6} md={6} lg={6}>
            <button
              className={classes.saveButton}
              style={{ backgroundColor: colors?.primary }}
              onClick={handleSubmit}
            >
              {userPreferenceDataApiInfo?.loading ? (
                <ButtonLoader size={16} color={"#fff"} />
              ) : (
                TextTranslation.save[langIndex]
              )}
            </button>
          </Grid>
          <Grid item xs={5} sm={6} md={6} lg={6}>
            <button className={classes.cancelButton}>
              {TextTranslation.cancel[langIndex]}
            </button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Listings;
