import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvalidCategory,
  setPropertyData,
} from "../../../../redux/slices/createPropertySlice";
import SelectInput from "./SelectInput";
import Counter from "./Counter";
import {
  CURRENCY_ENUM,
  LISTING_UNIT_FILTERS,
} from "../../../../utils/constants";
import { validateInputs } from "../../../../utils/helpers/propertyCreation";
import { TextTranslation } from "../../../../utils/translation";
import { PROPERTY_TYPES } from "../../../../utils/propertyConstants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "20px 5%",
  },
}));
const Details = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const inValidCategory = useSelector(
    (state) => state.createProperty.inValidCategory
  );
  const { langIndex } = useSelector((state) => state.global);

  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );

  const renderBedAndBath = useMemo(() => {
    if (
      propertyData?.type === PROPERTY_TYPES[1][0] ||
      propertyData?.type === PROPERTY_TYPES[2][0]
    )
      return false;
    else return true;
  }, [propertyData]);

  const renderParking = useMemo(() => {
    if (propertyData?.type === PROPERTY_TYPES[1][0]) return false;
    else return true;
  }, [propertyData]);
  // // console.log({ propertyData, inValidCategory });

  const handleChange = (prop) => (event) => {
    dispatch(setPropertyData({ ...propertyData, [prop]: event.target.value }));
    let _sizeValidation = null;
    if (prop === "size") {
      if (propertyData?.unit === "Square Feet") {
        if (
          parseInt(event.target.value) <= 0 ||
          parseInt(event.target.value) >= 1000000
        )
          _sizeValidation = "Size must be between 0 - 1000000";
      } else {
        if (
          parseInt(event.target.value) <= 0 ||
          parseInt(event.target.value) >= 10000
        )
          _sizeValidation = "Size must be between 0 - 10000";
      }
    }
    if (prop === "unit") {
      if (event.target.value === "Square Feet") {
        if (
          parseInt(propertyData?.size) <= 0 ||
          parseInt(propertyData?.size) >= 1000000
        )
          _sizeValidation = "Size must be between 0 - 1000000";
      } else {
        if (
          parseInt(propertyData?.size) <= 0 ||
          parseInt(propertyData?.size) >= 10000
        )
          _sizeValidation = "Size must be between 0 - 10000";
      }
    }
    const toDispatch =
      prop === "size" || prop === "unit"
        ? { size: _sizeValidation }
        : { [prop]: validateInputs(prop, event.target.value) };

    dispatch(
      setInvalidCategory({
        ...inValidCategory,
        details: {
          ...inValidCategory?.details,
          ...toDispatch,
        },
      })
    );
  };
  const handleCounter = (prop) => (value) => {
    dispatch(setPropertyData({ ...propertyData, [prop]: parseInt(value) }));
  };

  return (
    <div className={classes.container}>
      <InputField
        placeholder={TextTranslation.propertyTitle[langIndex]}
        value={propertyData?.title}
        onChange={handleChange("title")}
        type="text"
        label={TextTranslation.title[langIndex]}
        validating={inValidCategory?.details?.title}
      />
      <SelectInput
        type="number"
        step="0.01"
        placeholder={TextTranslation.sizeNumber[langIndex]}
        value={propertyData?.size}
        onChangeInput={handleChange("size")}
        onChangeSelect={handleChange("unit")}
        label={TextTranslation.propertySize[langIndex]}
        options={LISTING_UNIT_FILTERS}
        min={1}
        validating={inValidCategory?.details?.size}
        onKeyPress={(event) => {
          if (!/[0-9.]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />
      <SelectInput
        type="number"
        step="0.01"
        placeholder={TextTranslation.propertyPrice[langIndex]}
        value={propertyData?.price}
        onChangeInput={handleChange("price")}
        onChangeSelect={handleChange("currency")}
        label={TextTranslation.price[langIndex]}
        options={CURRENCY_ENUM}
        validating={inValidCategory?.details?.price}
        onKeyPress={(event) => {
          if (!/[0-9.]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />
      <InputField
        placeholder={TextTranslation.description[langIndex]}
        value={propertyData?.description}
        onChange={handleChange("description")}
        type="area"
        label={TextTranslation.description[langIndex]}
        validating={inValidCategory?.details?.description}
      />
      {renderBedAndBath && (
        <>
          <Counter
            value={propertyData?.bedrooms || 0}
            onChange={handleCounter("bedrooms")}
            label={TextTranslation.bedrooms[langIndex]}
          />
          <Counter
            value={propertyData?.bathrooms || 0}
            onChange={handleCounter("bathrooms")}
            label={TextTranslation.bathrooms[langIndex]}
          />
        </>
      )}
      {renderParking && (
        <Counter
          value={propertyData?.cars_parking || 0}
          onChange={handleCounter("cars_parking")}
          label={TextTranslation.carParkings[langIndex]}
        />
      )}
    </div>
  );
};

export default Details;
