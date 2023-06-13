import axios from "axios";
import { API_URL } from "../../utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPreferenceData: null,
  userPreferenceDataApiInfo: {},
  getPreferenceData: null,
  getPreferenceDataApiInfo: {},
  updateUserPreferenceDataApiInfo: {},
};
// create user preferences
export const userPreferences = createAsyncThunk(
  "preference/listingPreferences",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/user-preference/`,
        data.formData,
        {
          headers: {
            Authorization: `token ${data?.token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// update user preferences
export const updateUserPreferences = createAsyncThunk(
  "preference/updateUserPreferences",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}users/user-preference/${data?.id}`,
        data.formData,
        {
          headers: {
            Authorization: `token ${data?.token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get user preferences
export const getUserPreferences = createAsyncThunk(
  "preference/getUserPreferences",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/user-preference/`, {
        headers: {
          Authorization: `token ${data?.token}`,
        },
      });
      return response?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    resetPreferenceCreation: (state) => {
      state.userPreferenceData = null;
    },
    resetPreferenceCreationApiInfo: (state) => {
      state.userPreferenceDataApiInfo = {};
    },
    setPreferenceCreationData: (state, action) => {
      state.userPreferenceData = action.payload;
      //state.getPreferenceData = action.payload;
    },
    setGetPreferenceData: (state, action) => {
      state.getPreferenceData = action.payload;
    },
    resetUpdatePreferenceApiInfo: (state) => {
      state.updateUserPreferenceDataApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // create user preferences
      .addCase(userPreferences.pending, (state) => {
        state.userPreferenceDataApiInfo = {
          ...state.userPreferenceDataApiInfo,
          loading: true,
        };
      })
      .addCase(userPreferences.fulfilled, (state, action) => {
        state.userPreferenceDataApiInfo = {
          ...state.userPreferenceDataApiInfo,
          loading: false,
          response: action.payload,
        };
        state.userPreferenceData = action.payload;
        state.getPreferenceData = action.payload;
      })
      .addCase(userPreferences.rejected, (state, action) => {
        state.userPreferenceDataApiInfo = {
          ...state.userPreferenceDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // get user preferences
      .addCase(getUserPreferences.pending, (state) => {
        state.getPreferenceDataApiInfo = {
          ...state.getPreferenceDataApiInfo,
          loading: true,
        };
      })
      .addCase(getUserPreferences.fulfilled, (state, action) => {
        state.getPreferenceDataApiInfo = {
          ...state.getPreferenceDataApiInfo,
          loading: false,
        };
        state.getPreferenceData = action.payload;
      })
      .addCase(getUserPreferences.rejected, (state, action) => {
        state.getPreferenceDataApiInfo = {
          ...state.getPreferenceDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // update user preferences
      .addCase(updateUserPreferences.pending, (state) => {
        state.updateUserPreferenceDataApiInfo = {
          ...state.updateUserPreferenceDataApiInfo,
          loading: true,
        };
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.updateUserPreferenceDataApiInfo = {
          ...state.updateUserPreferenceDataApiInfo,
          loading: false,
          response: action.payload,
        };
        state.getPreferenceData = action.payload;
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.updateUserPreferenceDataApiInfo = {
          ...state.updateUserPreferenceDataApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetPreferenceCreation,
  setPreferenceCreationData,
  resetPreferenceCreationApiInfo,
  setGetPreferenceData,
  resetUpdatePreferenceApiInfo,
} = preferenceSlice.actions;
export default preferenceSlice.reducer;
