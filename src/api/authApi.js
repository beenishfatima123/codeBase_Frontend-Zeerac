import axios from "axios";
import { setCurrentUser } from "../redux/slices/authSlice";
import { NOT_VERIFIED_ERROR } from "../utils/constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

export const registerUserWithDb = async (data) => {
  try {
    const response = await api.post(`users/user/`, data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const loginUserWithDb = async (data) => {
  try {
    const response = await api.post(`users/api/login`, data);
    return response?.data;
  } catch (error) {
    if (error?.response?.data?.message === NOT_VERIFIED_ERROR) {
      return NOT_VERIFIED_ERROR;
    }
    return false;
  }
};
export const linkAccountsWithDb = async (data) => {
  try {
    const response = await api.post(`users/api/login`, data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const updateCurrencyPreference = async (data, dispatch, currentUser) => {
  try {
    const response = await api.put(`users/user/${data?.id}/`, data?.values, {
      headers: {
        Authorization: `Token ${data.token}`,
      },
    });
    dispatch(setCurrentUser({ ...currentUser, ...response?.data?.result }));
    return true;
  } catch (error) {
    return false;
  }
};
