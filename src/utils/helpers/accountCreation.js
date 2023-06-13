import moment from "moment/moment";
import { checkUniqueIdValidity, checkUniqueValidity } from "../../api/dataApi";
import { validateEmail } from "../helperFunctions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getWordCount } from "../helperFunctions";

/* Creates a FormData object with the provided user data for the signup form. */
export const getSignupForm = (data) => {
  const formData = new FormData();
  formData.append("email", data?.email);
  formData.append("password", data?.password);
  formData.append("username", data?.email);
  formData.append("phone_number", data?.phoneNumber);
  formData.append("first_name", data?.fullName);
  formData.append("is_company", false);
  return formData;
};

/* Creates a FormData object with the provided agent data for registration. */
export const getAgentForm = (data) => {
  // // console.log("registering agent....", { data });
  const formData = new FormData();
  formData.append("email", data?.email);
  formData.append("password", data?.password);
  formData.append("username", data?.email);
  formData.append("photo", data?.profilePicture);
  formData.append("date_of_birth", data?.dob);
  formData.append("cnic", data?.cnic);
  formData.append("city", data?.city);
  formData.append("lat", data?.lat);
  formData.append("lng", data?.lng);
  formData.append("area", data?.area);
  formData.append("address", data?.address);
  formData.append("personal_description", data?.description);
  formData.append("phone_number", data?.phoneNumber);
  formData.append("first_name", data?.fullName);
  formData.append("is_company", false);
  formData.append("user_type", 2);

  return formData;
};

/* Creates a FormData object with the provided company data for registration. */
export const getCompanyForm = (data) => {
  // // console.log("registering Company....", { data });
  const formData = new FormData();
  formData.append("email", data?.email);
  formData.append("password", data?.password);
  formData.append("username", data?.email);
  formData.append("photo", data?.profilePicture);
  formData.append("date_of_birth", data?.dob);
  formData.append("cnic", data?.cnic);
  formData.append("city", data?.city);
  formData.append("area", data?.area);
  formData.append("lat", data?.lat);
  formData.append("lng", data?.lng);
  formData.append("address", data?.address);
  formData.append("company_name", data?.companyName);
  formData.append("company_logo", data?.company_logo);
  formData.append("company_description", data?.companyDescription);
  formData.append("company_email", data?.companyEmail);
  formData.append("company_phone", data?.companyPhone);
  formData.append("company_fax", data?.companyFax);
  formData.append("company_address", data?.companyAddress);
  formData.append("personal_description", data?.description);
  formData.append("phone_number", data?.phoneNumber);
  formData.append("first_name", data?.fullName);
  formData.append("is_company", true);
  formData.append("user_type", 2);

  return formData;
};

/* Performs validation on the signup form data. It checks for valid email, password, name, phone number, and terms acceptance. It also checks if the email is unique and not already in use. */
export const getSignupValidation = async (data, setLoading) => {
  if (!data?.isEmailValid) return "enter a valid email";
  else if (!data?.isPasswordValid) return "enter a valid password";
  else if (!data?.isNameValid) return "enter a valid name";
  else if (!data?.isPhoneValid) return "enter a valid phone number";
  else if (!data?.acceptTos)
    return "Please accept the terms of service before proceeding";
  else {
    setLoading(true);
    const uniqueResponse = await checkUniqueValidity(data?.email);
    setLoading(false);

    if (!uniqueResponse?.status) return "the provided email is already in use";
    try {
      const docRef = doc(db, "users", data?.email);
      setLoading(true);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      if (docSnap.exists()) {
        return "the provided email is already in use";
      }
    } catch (error) {
      return "the provided email is already in use";
    }
    return false;
  }
};

/* Performs validation on the data for joining a company. It checks for valid password, name, phone number, CNIC, area, address, description, and terms acceptance. It also checks if the email is unique and not already in use.*/
export const getJoinCompanyValidation = async (data) => {
  if (!data?.isPasswordValid) return "enter a valid password";
  else if (!data?.isNameValid) return "enter a valid name";
  else if (!data?.isPhoneValid) return "enter a valid phone number";
  else if (!data?.isCNICValid) return "enter a valid cnic";
  // else if (!data?.isdobValid) return 'DoB is required';
  // else if (!data?.isCityValid) return 'city is required';
  else if (!data?.area) return "area is required";
  else if (!data?.isAddressValid) return "address is required";
  else if (!data?.isDescriptionValid)
    return "enter brief description about your self.";
  else if (!data?.acceptTos)
    return "Please accept the terms of service before proceeding";
  else {
    const uniqueResponse = await checkUniqueValidity(data?.email);
    if (!uniqueResponse?.status) return "the provided email is already in use";
    else return false;
  }
};

/* Performs validation on the user information. It checks for a valid description, date of birth (dob), city, area, and CNIC. It also checks if the CNIC is unique and not already in use. */
export const validateInformation = async (data) => {
  if (!data?.description || data?.descriptionValidation)
    return "A valid description is required";
  else if (!data?.dob) return "Dob is required";
  else if (!data?.city) return "city is required";
  else if (!data?.area) return "area is required";
  else if (data?.descriptionValidation)
    return "A valid description is required";
  else if (data?.areaValidation) return "valid area is required";
  // else if (!data?.address) return 'address is required';
  else if (!data?.cnic || data?.cnic?.includes("*"))
    return "A valid cnic is required";
  else {
    const uniqueResponse = await checkUniqueIdValidity(data?.cnic);
    if (uniqueResponse?.status) return false;
    else return "The provided CNIC is already in use";
  }
};

/*  Performs validation on company information. It checks for the presence of a company name, valid company email, valid company phone number, and valid company description. */
export const validateCompanyInformation = (data) => {
  if (!data?.companyName) return "company name is required";
  else if (!data?.isCompanyEmailValid) return "company email is invalid";
  else if (!data?.isCompanyPhoneValid) return "company phone number is invalid";
  else if (!data?.isDescriptionValid) return "company description is invalid";
};

/*  Performs validation for creating a user account. It checks for a valid description, date of birth (dob), city, area, profile picture, and CNIC. It also checks if the CNIC is unique and not already in use. */
export const validateAccountCreation = async (data) => {
  if (data?.descriptionValidation) return "A valid description is required";
  else if (!data?.dob) return "Dob is required";
  else if (!data?.city) return "city is required";
  else if (!data?.area) return "area is required";
  // else if (!data?.address) return 'address is required';
  else if (data?.descriptionValidation)
    return "A valid description is required";
  else if (data?.areaValidation) return "valid area is required";
  else if (!data?.profilePicture) return "A profile picture is required";
  else if (!data?.isPictureValid) return "Profile image file is too large.";
  else if (!data?.cnic || data?.cnic?.includes("*"))
    return "A valid cnic is required";
  else {
    const uniqueResponse = await checkUniqueIdValidity(data?.cnic);
    if (uniqueResponse?.status) return false;
    else return "The provided CNIC is already in use";
  }
};

/*  Performs validation for creating a company account. It checks for a valid description, date of birth (dob), company name, valid company email, valid company phone number, city, area, address, profile picture, and CNIC. It also checks if the CNIC is unique and not already in use. */
export const validateCompanyAccountCreation = async (data) => {
  if (data?.descriptionValidation) return "A valid description is required";
  else if (!data?.dob) return "Dob is required";
  else if (!data?.companyName) return "company name is required";
  else if (!data?.isCompanyNameValid) return "company name is invalid";
  else if (!data?.isCompanyEmailValid) return "company email is invalid";
  else if (!data?.isCompanyPhoneValid) return "company phone number is invalid";
  else if (!data?.isDescriptionValid) return "company description is invalid";
  else if (!data?.city) return "city is required";
  else if (!data?.area) return "area is required";
  else if (!data?.address) return "address is required";
  else if (!data?.profilePicture) return "A profile picture is required";
  else if (!data?.cnic || data?.cnic?.includes("*"))
    return "A valid cnic is required";
  else {
    const uniqueResponse = await checkUniqueIdValidity(data?.cnic);
    if (uniqueResponse?.status) return false;
    else return "The provided CNIC is already in use";
  }
};

/* Performs specific validation based on the provided property (prop) and value. It checks for valid inputs such as description length, name length, area length, address length, and more. */
export const validateInputs = (prop, value) => {
  switch (prop) {
    case "description":
      if (getWordCount(value) < 10 || getWordCount(value) > 100)
        return "Description must be min. 10 and max. 100 words.";
      else return null;
    case "name":
      if (value?.length < 3 || value?.length > 50)
        return "name must be between 3-50 characters";
      else return null;
    case "first_name":
      if (value?.length < 3 || value?.length > 50)
        return "First name must be between 3-50 characters";
      else return null;
    case "last_name":
      if (value?.length < 3 || value?.length > 50)
        return "Last name must be between 3-50 characters";
      else return null;
    case "area":
      if (value?.length < 3 || value?.length > 30)
        return "Area must be between 3-30 characters";
      else return null;
    case "address":
      if (value?.length < 3 || value?.length > 30)
        return "Address must be between 3-50 characters";
      else return null;
    case "companyName":
      if (value?.length < 3 || value?.length > 30)
        return "company name must be between 3-30 characters";
      else return null;
    case "companyEmail":
      if (!validateEmail(value)) return false;
      else return null;
    case "company_address":
      if (value?.length < 3 || value?.length > 50)
        return "Address must be between 3-50 characters";
      else return null;
    case "dob":
      if (!moment(value, "YYYY/MM/DD", true).isValid())
        return "please enter a valid date";
      else return null;
    default:
      return null;
  }
};

/* Performs specific validation for service inputs based on the provided property (prop) and value. It checks for valid inputs such as message length, name length, company name length, and size greater than 0. */
export const validateServicesInputs = (prop, value) => {
  switch (prop) {
    case "message":
      if (getWordCount(value) < 10 || getWordCount(value) > 100)
        return "Message must be min. 10 and max. 100 words.";
      else return null;
    case "name":
      if (value?.length < 3 || value?.length > 50)
        return "name must be between 3-50 characters";
      else return null;
    case "company_name":
      if (value?.length < 3 || value?.length > 30)
        return "company name must be between 3-30 characters";
      else return null;
    case "size":
      if (value < 1) return "size should be greater than 0";
      else return null;
    default:
      return null;
  }
};
