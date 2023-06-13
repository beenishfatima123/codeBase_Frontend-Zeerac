import React, { useEffect, useMemo, useRef } from "react";
import { makeStyles } from "@mui/styles";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setAuctionData } from "../../../../redux/slices/createPropertySlice";
import SelectInput from "./SelectInput";
import {
  CURRENCY_ENUM,
  LISTING_UNIT_FILTERS,
} from "../../../../utils/constants";
import { LISTING_TYPE } from "../../../../utils/propertyConstants";
import Counter from "./Counter";
import { validateAuctionInputs } from "../../../../utils/helpers/propertyCreation";
import AutocompleteInput from "../../../globalComponents/misc/AutocompleteInput";
import { TextTranslation } from "../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 22,
    color: "#134696",
    borderBottom: "1px solid #134696",
    padding: "10px 5%",
    marginRight: "5%",
    fontWeight: "bold",
  },
  inputContainer: {
    padding: "10px 5%",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

const Information = () => {
  const classes = useStyles();
  const inputRef = useRef();

  const dispatch = useDispatch();

  const [location, setLocation] = useState();

  const { auctionData, listingType } = useSelector(
    (state) => state.createProperty
  );
  const { langIndex } = useSelector((state) => state.global);
  const [validationHelpers, setValidationHelpers] = useState();

  useEffect(() => {
    if (location) dispatch(setAuctionData({ ...auctionData, ...location }));

    // eslint-disable-next-line
  }, [location]);

  const handleChange = (prop, data) => (event) => {
    let value = event.target.value;
    // if (prop === "size" && !Number.isInteger(Number(value))) {
    //   value = Number(value).toFixed(2);
    // }
    dispatch(
      setAuctionData({
        ...data,
        [prop]: value,
      })
    );
    setValidationHelpers((prev) => ({
      ...prev,
      [prop]: validateAuctionInputs(prop, value),
    }));
  };

  const handleCounter = (prop) => (value) => {
    dispatch(setAuctionData({ ...auctionData, [prop]: parseInt(value) }));
    setValidationHelpers((prev) => ({
      ...prev,
      [prop]: validateAuctionInputs(prop, value),
    }));
  };

  const maxDateString = useMemo(() => {
    const _date = new Date();
    _date.setDate(_date.getDate() + 90);
    return _date.toISOString().split("T")[0];
  }, []);
  const minDateString = useMemo(() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    return minDate.toISOString().split("T")[0];
  }, []);

  return (
    <div className={classes.container}>
      <span className={classes.title}>Information</span>
      <div className={classes.inputContainer}>
        <InputField
          placeholder={TextTranslation.description[langIndex]}
          value={auctionData?.description}
          onChange={handleChange("description", auctionData)}
          type="area"
          label={TextTranslation.description[langIndex]}
          validating={validationHelpers?.description}
        />
        <AutocompleteInput
          placeholder={TextTranslation.city[langIndex]}
          onPlaceSelected={(event) =>
            setLocation((prev) => ({
              ...prev,
              city: event?.name,
            }))
          }
          label={TextTranslation.city[langIndex]}
          validating={validationHelpers?.city}
          options={{
            types: ["(cities)"],
            fields: ["name"],
          }}
        />
        <InputField
          placeholder={TextTranslation.area[langIndex]}
          value={auctionData?.area}
          onChange={handleChange("area", auctionData)}
          type="text"
          label={TextTranslation.societyArea[langIndex]}
          validating={validationHelpers?.area}
        />
        {/* <AutocompleteInput
          placeholder="Area"
          onPlaceSelected={(event) =>
            setLocation((prev) => ({
              ...prev,
              area: event?.name,
            }))
          }
          label="Society/Area"
          validating={validationHelpers?.area}
          options={{
            types: ['address'],
            fields: ['name'],
          }}
        /> */}

        {/* <AutocompleteInput
          placeholder="Country"
          label="Country"
          onPlaceSelected={(event) =>
            setLocation((prev) => ({
              ...prev,
              country: event?.name,
            }))
          }
          validating={validationHelpers?.country}
          options={{
            types: ['country'],
            fields: ['name'],
          }}
        /> */}
        <SelectInput
          type="number"
          step="0.01"
          placeholder={TextTranslation.sizeNumber[langIndex]}
          value={auctionData?.size}
          onChangeInput={handleChange("size", auctionData)}
          onChangeSelect={handleChange("unit", auctionData)}
          label={TextTranslation.propertySize[langIndex]}
          options={LISTING_UNIT_FILTERS}
          // min={1}
          validating={validationHelpers?.size}
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
          value={auctionData?.price}
          onChangeInput={handleChange("price", auctionData)}
          onChangeSelect={handleChange("currency", auctionData)}
          label={TextTranslation.price[langIndex]}
          options={CURRENCY_ENUM}
          validating={validationHelpers?.price}
          onKeyPress={(event) => {
            if (!/[0-9.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        {listingType === LISTING_TYPE[1][0] && (
          <>
            <InputField
              placeholder={TextTranslation.percentageOfShares[langIndex]}
              value={auctionData?.sharePercentage}
              onChange={handleChange("sharePercentage", auctionData)}
              type="number"
              label={TextTranslation.percentageOfSharesToSold[langIndex]}
              validating={validationHelpers?.sharePercentage}
            />
            <Counter
              value={auctionData?.totalBidders || 0}
              onChange={handleCounter("totalBidders")}
              label={TextTranslation.noOfBidders[langIndex]}
              validating={validationHelpers?.totalBidders}
            />
          </>
        )}
        {listingType === LISTING_TYPE[3][0] && (
          <Counter
            value={auctionData?.totalFiles || 0}
            onChange={handleCounter("totalFiles")}
            label={TextTranslation.noOfFiles[langIndex]}
            validating={validationHelpers?.totalFiles}
          />
        )}

        <InputField
          inputRef={inputRef}
          label={TextTranslation.endDate[langIndex]}
          placeholder={TextTranslation.endDate[langIndex]}
          value={auctionData?.end_date}
          onChange={handleChange("end_date", auctionData)}
          type="date"
          // onFocus={() => (inputRef.current.type = 'date')}
          // onBlur={() => (inputRef.current.type = 'text')}
          min={minDateString}
          max={maxDateString}
        />
      </div>
    </div>
  );
};

export default Information;
