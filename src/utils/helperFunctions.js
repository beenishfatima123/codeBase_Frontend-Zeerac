import { TextTranslation } from "./translation";
import { setCurrentUser } from "../redux/slices/authSlice";
import { PROPERTY_FEATURES } from "./propertyConstants";

/**
  validateInputField: Validates an input field value.
  @param {string} input - Input field value to be validated.
  @returns {boolean} - Returns true if the input is valid, false otherwise.
  */
export const validateInputField = (input) => {
  if (input === "") return false;
  // eslint-disable-next-line
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (format.test(input)) return false;

  return true;
};

/**
  validateEmail: Validates an email address.
  @param {string} input - Email address to be validated.
  @returns {boolean} - Returns true if the email is valid, false otherwise.
  */
export const validateEmail = (input) => {
  const emailRegex =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!input.match(emailRegex)) return false;

  return true;
};

/**
  validatePassword: Validates a password.
  @param {string} input - Password to be validated.
  @returns {boolean} - Returns true if the password is valid, false otherwise.
  */
export const validatePassword = (input) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  if (!input.match(passwordRegex)) return false;
  else if (input?.length < 8) return false;
  return true;
};

/*
  populatePurposeData: Populates an array of purpose data based on the language and label.
  @param {object} lang - Language object containing language index.
  @param {string} label - Label to be included in the array.
  @returns {array} - Returns an array of purpose data.
  */
export const populatePurposeData = (lang, label) => {
  return [
    label,
    TextTranslation.forRent[lang.langIndex],
    TextTranslation.forSale[lang.langIndex],
    TextTranslation.forInstalment[lang.langIndex],
  ];
};

/*
  getCountryNameFromInitials: Retrieves the country name from its initials.
  @param {string} initials - Initials of the country.
  @returns {string} - Returns the country name corresponding to the initials.
  */
export const getCountryNameFromInitials = (initials) => {
  switch (initials) {
    case "pk":
      return "Pakistan";
    case "tr":
      return "Turkey";
    case "ae":
      return "UAE";
    default:
      return initials;
  }
};
export const customLog = (logValue) => {
  console.log(logValue);
};

/*
  handleLogout: Handles the logout process by resetting the current user, removing local storage data, and navigating to the login page.
  @param {function} dispatch - Redux dispatch function.
  @param {function} navigate - Navigation function to redirect to a specific page.
  */
export const handleLogout = (dispatch, navigate) => {
  dispatch(setCurrentUser(null));
  window.localStorage.removeItem("remember_me");
  window.localStorage.removeItem("currentUser");
  navigate("/login", { replace: true });
};

/*
  getAddedPercentValue: Calculates the value after adding a percentage to a number.
  @param {number} num - Original number.
  @param {number} percentage - Percentage to be added.
  @returns {number} - Returns the value after adding the percentage to the number.
  */
export const getAddedPercentValue = (num, percentage) => {
  parseInt(parseInt(num) + parseInt(num) * percentage);
};

/*
sortByLikes: Comparator function to sort objects by the number of likes in descending order.
@param {object} a - First object to compare.
@param {object} b - Second object to compare.
@returns {number} - Returns -1 if a > b, 1 if a < b, and 0 if a = b.
*/
export const sortByLikes = (a, b) => {
  let x = a?.likes_count;
  let y = b?.likes_count;
  if (x > y) {
    return -1;
  }
  if (x < y) {
    return 1;
  }
  return 0;
};
/*
  currencyFormatter: Formats the given number as a currency in USD.
  @param {number} number - The number to format.
  @returns {string} - The formatted currency string.
  */
export const currencyFormatter = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

/*
  currencyFormatInitials: Formats the given number as a currency based on the listing currency and user's preferred currency.
  @param {number} number - The number to format.
  @param {string} listingCurrency - The currency of the listing.
  @returns {string} - The formatted currency string.
  */
export const currencyFormatInitials = (number, listingCurrency) => {
  const _auth = JSON.parse(sessionStorage.getItem("persist:auth"));
  const _local = JSON.parse(localStorage.getItem("persist:root"));
  if (_local?.global) {
    const _global = JSON.parse(_local?.global);
    const currentUser = JSON.parse(_auth?.currentUser);

    const preferredCurrency = currentUser?.currency;
    const { currencyRates, currencyIndex } = _global;

    if (!preferredCurrency) {
      if (listingCurrency === "PKR") return getPkCurrencyValues(number);
      let currency =
        currencyIndex === 0 ? "PKR" : currencyIndex === 1 ? "USD" : "TRY";
      const currencyRate = currencyRates?.rates[`${listingCurrency}`];
      const preferredCurrencyRate = currencyRates?.rates[`${currency}`];
      const listingValueInPkr = number / currencyRate;
      const preferredCurrencyValue = listingValueInPkr * preferredCurrencyRate;

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency:
          currencyIndex === 0 ? "PKR" : currencyIndex === 1 ? "USD" : "TRY",
        maximumFractionDigits: 2,
      }).format(preferredCurrencyValue);
    }

    if (listingCurrency === preferredCurrency) {
      if (listingCurrency === "PKR") return getPkCurrencyValues(number);
      else {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: listingCurrency || "PKR",
          maximumFractionDigits: 2,
        }).format(number);
      }
    } else {
      if (preferredCurrency === "PKR") return getPkCurrencyValues(number);

      const currencyRate = currencyRates?.rates[`${listingCurrency}`];
      const preferredCurrencyRate =
        currencyRates?.rates[`${preferredCurrency}`];

      const listingValueInPkr = number / currencyRate;
      const preferredCurrencyValue = listingValueInPkr * preferredCurrencyRate;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: preferredCurrency || "PKR",
        maximumFractionDigits: 2,
      }).format(preferredCurrencyValue);
    }
  }
};

/*
  currencyConverter: Converts the given number from the listing currency to the user's preferred currency.
  @param {number} number - The number to convert.
  @param {string} listingCurrency - The currency of the listing.
  @returns {number} - The converted currency value.
  */
export const currencyConverter = (number, listingCurrency) => {
  const _auth = JSON.parse(sessionStorage.getItem("persist:auth"));
  const _local = JSON.parse(localStorage.getItem("persist:root"));
  if (_local?.global) {
    const _global = JSON.parse(_local?.global);
    const currentUser = JSON.parse(_auth?.currentUser);

    const preferredCurrency = currentUser?.currency;
    const { currencyRates, currencyIndex } = _global;

    if (!preferredCurrency) {
      if (listingCurrency === "PKR") return number;
      let currency =
        currencyIndex === 0 ? "PKR" : currencyIndex === 1 ? "USD" : "TRY";
      const currencyRate = currencyRates?.rates[`${listingCurrency}`];
      const preferredCurrencyRate = currencyRates?.rates[`${currency}`];
      const listingValueInPkr = number / currencyRate;
      const preferredCurrencyValue = listingValueInPkr * preferredCurrencyRate;

      return preferredCurrencyValue;
    }

    if (listingCurrency === preferredCurrency) {
      if (listingCurrency === "PKR") return number;
      else {
        return number;
      }
    } else {
      const currencyRate = currencyRates?.rates[`${listingCurrency}`];
      const preferredCurrencyRate =
        currencyRates?.rates[`${preferredCurrency}`];

      const listingValueInPkr = number / currencyRate;
      const preferredCurrencyValue = listingValueInPkr * preferredCurrencyRate;
      return preferredCurrencyValue;
    }
  }
};

/*
  exchangeCurrency: Converts the given number from the source currency to the destination currency.
  @param {number} number - The number to convert.
  @param {string} source - The source currency code.
  @param {string} destination - The destination currency code.
  @returns {number} - The converted currency value.
  */
export const exchangeCurrency = (number, source, destination) => {
  const _local = JSON.parse(localStorage.getItem("persist:root"));
  if (_local?.global) {
    const _global = JSON.parse(_local?.global);

    const { currencyRates } = _global;

    const currencyRate = currencyRates?.rates[`${source}`];
    const preferredCurrencyRate = currencyRates?.rates[`${destination}`];
    const listingValueInPkr = number / currencyRate;
    const preferredCurrencyValue = listingValueInPkr * preferredCurrencyRate;

    return preferredCurrencyValue;
  }
};

/*
  currencyFilterFormatInitials: Formats the given number as a currency based on the specified currency code.
  @param {number} number - The number to format.
  @param {string} currency - The currency code.
  @returns {string} - The formatted currency string.
  */
export const currencyFilterFormatInitials = (number, currency) => {
  const _local = JSON.parse(localStorage.getItem("persist:root"));

  if (_local?.global) {
    const _global = JSON.parse(_local?.global);
    const { currencyRates } = _global;
    const currencyRate = currencyRates?.rates[`${currency}`];
    const preferredCurrencyRate = currencyRates?.rates[`${currency}`];
    const listingValueInPkr = number / currencyRate;
    const preferredCurrencyValue = listingValueInPkr * preferredCurrencyRate;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(preferredCurrencyValue);
  }
};

/*
  getPasswordHelper: Generates a helper message for password requirements.
  @param {string} pass - The password string.
  @returns {JSX.Element} - The JSX element representing the password helper message.
  */
export const getPasswordHelper = (pass) => {
  return (
    <span>
      Password must have
      {pass?.length < 8 && (
        <span>
          <br />8 characters
        </span>
      )}
      {!/[A-Z]/.test(pass) && (
        <span>
          <br />1 uppercase
        </span>
      )}
      {!/[a-z]/.test(pass) && (
        <span>
          <br />1 lowercase
        </span>
      )}
      {!/\d/.test(pass) && (
        <span>
          <br /> 1 number or special character
        </span>
      )}
      <br />
      <br />
    </span>
  );
};

/*
  getPastYears: Returns an array of past years based on the specified time period.
  @param {number} timePeriod - The number of years to include.
  @returns {number[]} - Array containing the past years.
  */
export const getPastYears = (timePeriod) => {
  var max = new Date().getFullYear();
  var min = max - timePeriod;
  let years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

/*
  getConstructionHeading: Returns the headings for construction details based on the specified index.
  @param {number} index - The index value.
  @returns {string[]} - Array containing the headings.
  */
export const getConstructionHeading = (index) => {
  switch (index) {
    case 0:
      return ["Interior details", "Interior details"];
    case 1:
      return ["Exterior details", "Exterior details"];
    case 2:
      return ["Type & Style", "Type & Style"];
    case 3:
      return ["Material Information", "Material Information"];
    case 4:
      return ["Condition", "Condition"];

    default:
      return ["Interior details", "Interior details"];
  }
};

/*
  getTabTitle: Returns the modified title for a tab.
  @param {string} title - The original title.
  @returns {string} - The modified title.
  */
export const getTabTitle = (title) => {
  switch (title) {
    case "Images":
      return "Images/Video";
    case "Images_subunit":
      return "Images";
    case "Preview_auction":
      return "Preview";
    default:
      return title;
  }
};

/**
 * Adds features to the form data.
 *
 * @param {Array} features - The features to be added.
 * @param {FormData} formData - The form data object.
 */
const addFeatures = (features, formData) => {
  if (features?.includes(PROPERTY_FEATURES[0][0]))
    formData.append(
      "features.tv_lounge",
      features?.includes(PROPERTY_FEATURES[0][0])
    );
  if (features?.includes(PROPERTY_FEATURES[1][0]))
    formData.append(
      "features.store_room",
      features?.includes(PROPERTY_FEATURES[1][0])
    );
  if (features?.includes(PROPERTY_FEATURES[2][0]))
    formData.append(
      "features.laundry_room",
      features?.includes(PROPERTY_FEATURES[2][0])
    );
  if (features?.includes(PROPERTY_FEATURES[3][0]))
    formData.append(
      "features.kitchen",
      features?.includes(PROPERTY_FEATURES[3][0])
    );
  if (features?.includes(PROPERTY_FEATURES[4][0]))
    formData.append(
      "features.balcony",
      features?.includes(PROPERTY_FEATURES[4][0])
    );
  if (features?.includes(PROPERTY_FEATURES[5][0]))
    formData.append(
      "features.garden",
      features?.includes(PROPERTY_FEATURES[5][0])
    );
};
/*
    @params:
      - text: string (input text)
    @returns:
      - count: number (number of words in the text)
  */
export const getWordCount = (text) => {
  return text?.trim()?.split(/\s+/)?.length;
};
/*
    @params:
      - user_type: number (user type)
    @returns:
      - userType: string (user type as a string)
  */
export const getStringUserType = (user_type) => {
  switch (user_type) {
    case 0:
      return "Admin";
    case 1:
      return "User";
    case 2:
      return "Agent";
    case 3:
      return "CEO";
    case 4:
      return "Moderator";
    default:
      return "User";
  }
};
/*
    @params:
      - data: object (verification data)
      - type: string (type of verification)
      - itemID: string (ID of the item to be verified)
    @returns:
      - requestData: FormData (constructed FormData object with verification data)
  */
export const getVerificationData = (data, type, itemID) => {
  const requestData = new FormData();
  requestData.append("type", type);
  if (type === "user" || type === "agent" || type === "ceo") {
    requestData.append("user", itemID);
  } else {
    requestData.append(type, itemID);
  }
  data?.documents?.forEach((file) => {
    requestData.append("file", file);
  });
  return requestData;
};
/*
    @params:
      - data: object (search data)
    @returns:
      - query: string (constructed search query)
  */
export const buildAgentsSearchQuery = (data) => {
  let query = "search=";
  // console.log({ data });
  if (data?.searchText?.length > 3) query = query + `${data?.searchText}`;
  if (data?.city) query = query + `&city=${data?.city}`;
  if (data?.area) query = query + `&area=${data?.area}`;
  return query;
};
/*
    @params:
      - price: string (price value)
      - limit: number (character limit)
    @returns:
      - concatenatedPrice: string (concatenated price value with ellipsis if exceeding the limit)
  */
export const getConcatenatedPrice = (price, limit) => {
  let _temp = price;

  if (price?.length > limit) {
    _temp = price?.substring(0, limit) + "..";
  }
  return _temp;
};
/*
    @params:
      - number: number (input number)
    @returns:
      - formattedNumber: string (formatted currency value in PKR)
  */
const getPkCurrencyValues = (number) => {
  const crore = number / 10000000;
  const lakh = (number % 10000000) / 100000;
  const remainder = number % 100000;
  let formattedNumber = `PKR `;

  if (crore >= 1) {
    return (formattedNumber += crore?.toFixed(2) + " crore ");
  } else if (lakh >= 1) {
    return (formattedNumber += lakh?.toFixed(2) + " lac ");
  } else if (remainder > 0) {
    return (formattedNumber += remainder);
  } else return formattedNumber;
};
/*
    @params:
      - str: string (input string)
    @returns:
      - word: string (word before the first space in the string)
  */
export const getWordBeforeSpace = (str) => {
  const firstSpaceIndex = str?.indexOf(" ");
  if (firstSpaceIndex === -1) {
    // No space found, return the entire string
    return str;
  } else {
    // Extract the word before the first space
    return str?.substring(0, firstSpaceIndex);
  }
};
