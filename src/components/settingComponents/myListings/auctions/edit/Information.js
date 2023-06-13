import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import {
  CURRENCY_ENUM,
  LISTING_UNIT_FILTERS,
} from "../../../../../utils/constants";
import SelectInput from "../../../../propertyComponents/createPropertyPost/content/SelectInput";
import Counter from "../../../../propertyComponents/createPropertyPost/content/Counter";
import AutocompleteInput from "../../../../globalComponents/misc/AutocompleteInput";
import {
  setAuctionToEdit,
  setAuctionUpdateInfo,
} from "../../../../../redux/slices/auctionSlice";
import { validateAuctionInputs } from "../../../../../utils/helpers/propertyCreation";
import InputField from "../../../../propertyComponents/createPropertyPost/content/InputField";
import { TextTranslation } from "../../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
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

/* Information component is on last in edit auction component. It displays editable auction properties like society, area etc. Some fields are conditional for sub unit and bulk auctions. */
const Information = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [location, setLocation] = useState();
  const [validationHelpers, setValidationHelpers] = useState();

  const { auctionToEdit, auctionUpdateInfo } = useSelector(
    (state) => state.auction
  );
  const { darkMode, langIndex } = useSelector((state) => state.global);

  useEffect(() => {
    if (location) dispatch(setAuctionToEdit({ ...auctionToEdit, ...location }));
    // eslint-disable-next-line
  }, [location]);

  /* handleChange takes prop, data and event to set updated auction data and dispatch new information using the event target value. */
  const handleChange = (prop, data) => (event) => {
    dispatch(setAuctionToEdit({ ...data, [prop]: event.target.value }));
    dispatch(
      setAuctionUpdateInfo({ ...auctionUpdateInfo, [prop]: event.target.value })
    );

    setValidationHelpers((prev) => ({
      ...prev,
      [prop]: validateAuctionInputs(prop, event.target.value),
    }));
  };

  /* handleCounter takes prop and value to count total bids on the sub unit and bulk files. */
  const handleCounter = (prop) => (value) => {
    dispatch(setAuctionToEdit({ ...auctionToEdit, [prop]: parseInt(value) }));
    dispatch(
      setAuctionUpdateInfo({ ...auctionUpdateInfo, [prop]: parseInt(value) })
    );

    setValidationHelpers((prev) => ({
      ...prev,
      [prop]: validateAuctionInputs(prop, value),
    }));
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
        {TextTranslation.information[langIndex]}
      </span>

      <Grid container sx={{ mt: 2 }} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <AutocompleteInput
            placeholder={TextTranslation.area[langIndex]}
            defaultValue={auctionToEdit?.area}
            onPlaceSelected={(event) =>
              setLocation((prev) => ({
                ...prev,
                area: event?.name,
              }))
            }
            label={TextTranslation.societyArea[langIndex]}
            options={{
              types: ["address"],
              fields: ["name"],
            }}
            customStyle={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AutocompleteInput
            placeholder={TextTranslation.city[langIndex]}
            defaultValue={auctionToEdit?.city}
            onPlaceSelected={(event) =>
              setLocation((prev) => ({
                ...prev,
                city: event?.name,
              }))
            }
            label={TextTranslation.city[langIndex]}
            options={{
              types: ["(cities)"],
              fields: ["name"],
            }}
            customStyle={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AutocompleteInput
            placeholder={TextTranslation.country[langIndex]}
            defaultValue={auctionToEdit?.country}
            label={TextTranslation.country[langIndex]}
            onPlaceSelected={(event) =>
              setLocation((prev) => ({
                ...prev,
                country: event?.name,
              }))
            }
            options={{
              types: ["country"],
              fields: ["name"],
            }}
            customStyle={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectInput
            placeholder={TextTranslation.sizeNumber[langIndex]}
            value={auctionToEdit?.size}
            onChangeInput={handleChange("size", auctionToEdit)}
            onChangeSelect={handleChange("unit", auctionToEdit)}
            label={TextTranslation.propertySize[langIndex]}
            options={LISTING_UNIT_FILTERS}
            min={1}
            validating={validationHelpers?.size}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectInput
            placeholder={TextTranslation.propertyPrice[langIndex]}
            value={auctionToEdit?.price}
            onChangeInput={handleChange("price", auctionToEdit)}
            onChangeSelect={handleChange("currency", auctionToEdit)}
            label={TextTranslation.price[langIndex]}
            options={CURRENCY_ENUM}
            validating={validationHelpers?.price}
          />
        </Grid>
      </Grid>
      {/* sub unit auction editing options */}
      {auctionToEdit?.auction_type === "sub_unit" && (
        <>
          <InputField
            placeholder={TextTranslation.percentageOfShares[langIndex]}
            value={auctionToEdit?.sub_unit_share_percentage}
            onChange={handleChange("sub_unit_share_percentage", auctionToEdit)}
            type="number"
            label={TextTranslation.percentageOfSharesToSold[langIndex]}
            validating={validationHelpers?.sub_unit_share_percentage}
          />
          <Counter
            value={auctionToEdit?.totalBidders || 0}
            onChange={handleCounter("totalBidders")}
            label={TextTranslation.noOfBidders[langIndex]}
            validating={validationHelpers?.totalBidders}
          />
        </>
      )}
      {/* bulk auction editing options */}
      {auctionToEdit?.auction_type === "bulk" && (
        <Counter
          value={auctionToEdit?.total_files || 0}
          onChange={handleCounter("total_files")}
          label={TextTranslation.noOfFiles[langIndex]}
          validating={validationHelpers?.total_files}
        />
      )}
    </div>
  );
};

export default Information;
