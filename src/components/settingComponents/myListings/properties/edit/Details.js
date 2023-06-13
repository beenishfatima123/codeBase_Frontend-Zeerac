import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setPropertyToEdit,
  setPropertyUpdateInfo,
} from "../../../../../redux/slices/propertiesSlice";
import { Grid } from "@mui/material";
import InputField from "../../../../propertyComponents/createPropertyPost/content/InputField";
import {
  CURRENCY_ENUM,
  LISTING_UNIT_FILTERS,
} from "../../../../../utils/constants";
import SelectInput from "../../../../propertyComponents/createPropertyPost/content/SelectInput";
import Counter from "../../../../propertyComponents/createPropertyPost/content/Counter";
import { validateInputs } from "../../../../../utils/helpers/propertyCreation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

/* Details section in edit property page allows editing title, price, size, description, bedrooms, bathrooms, car parkings. */
const Details = ({ validation, setValidation }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { propertyToEdit, propertyUpdateInfo } = useSelector(
    (state) => state.properties
  );
  const { darkMode } = useSelector((state) => state.global);
  const { showDrawer } = useSelector((state) => state.settings);

  const handleChange = (prop) => (event) => {
    dispatch(
      setPropertyToEdit({ ...propertyToEdit, [prop]: event.target.value })
    );
    setValidation((prev) => ({
      ...prev,
      [`${prop}Validation`]: validateInputs(prop, event.target.value),
    }));
    dispatch(
      setPropertyUpdateInfo({
        ...propertyUpdateInfo,
        [prop]: event.target.value,
      })
    );
  };
  const handleCounter = (prop) => (value) => {
    dispatch(setPropertyToEdit({ ...propertyToEdit, [prop]: parseInt(value) }));
    dispatch(
      setPropertyUpdateInfo({ ...propertyUpdateInfo, [prop]: parseInt(value) })
    );
  };
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Details
      </span>

      <Grid container sx={{ mt: 2 }} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={showDrawer ? 6 : 5} lg={4}>
          <InputField
            placeholder="Property Title"
            value={propertyToEdit?.title}
            onChange={handleChange("title")}
            type="text"
            label="Title"
            validating={validation.titleValidation}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={showDrawer ? 6 : 5} lg={4}>
          <SelectInput
            placeholder="Property Price"
            value={propertyToEdit?.price}
            onChangeInput={handleChange("price")}
            onChangeSelect={handleChange("currency")}
            label="Price"
            options={CURRENCY_ENUM}
            validating={validation.priceValidation}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={showDrawer ? 6 : 5} lg={4}>
          <SelectInput
            placeholder="Size Number"
            value={propertyToEdit?.size}
            onChangeInput={handleChange("size")}
            onChangeSelect={handleChange("unit")}
            label="Property Size"
            options={LISTING_UNIT_FILTERS}
            min={1}
            validating={validation.sizeValidation}
          />
        </Grid>
      </Grid>
      <InputField
        placeholder="Description"
        value={propertyToEdit?.description}
        onChange={handleChange("description")}
        type="area"
        label="Description"
        validating={validation.descriptionValidation}
      />
      <Grid container sx={{ mt: 1 }} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={showDrawer ? 6 : 5} lg={4}>
          <Counter
            value={propertyToEdit?.bedrooms || 0}
            onChange={handleCounter("bedrooms")}
            label="Bedrooms"
            customStyle={{ justifyContent: "flex-start" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={showDrawer ? 6 : 5} lg={4}>
          <Counter
            value={propertyToEdit?.bathrooms || 0}
            onChange={handleCounter("bathrooms")}
            label="Bathrooms"
            customStyle={{ justifyContent: "flex-start" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={showDrawer ? 6 : 5} lg={4}>
          <Counter
            value={propertyToEdit?.cars_parking || 0}
            onChange={handleCounter("cars_parking")}
            label="Car Parkings"
            customStyle={{ justifyContent: "flex-start" }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
