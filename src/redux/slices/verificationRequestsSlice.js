import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const initialState = {
  //create user verification
  createUserVerificationData: null,
  createUserVerificationApiInfo: {},

  //create erfication data
  verificationData: null,
  verificationApiInfo: {},
};

//user verification
export const createUserVerificationRequest = createAsyncThunk(
  "settings/createUserVerificationRequest",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/verification/`,
        data.values,
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

export const createVerificationRequest = createAsyncThunk(
  "settings/createVerificationRequest",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/verification/`,
        data.values,
        {
          headers: {
            Authorization: `token ${data?.token}`,
          },
        }
      );
      return { data: response?.data };
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

export const verificationRequestsSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setCreateUserVerificationData: (state, action) => {
      state.createUserVerificationData = action.payload;
    },
    resetCreateUserVerificationData: (state, action) => {
      state.createUserVerificationData = null;
    },
    resetCreateUserVerificationApi: (state, action) => {
      state.createUserVerificationApiInfo = {};
    },
    setVerificationData: (state, action) => {
      state.verificationData = action.payload;
    },
    resetVerificationData: (state, action) => {
      state.verificationData = null;
    },
    resetVerificationApi: (state, action) => {
      state.verificationApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // user verification request
      .addCase(createUserVerificationRequest.pending, (state) => {
        state.createUserVerificationApiInfo = {
          ...state.createUserVerificationApiInfo,
          loading: true,
        };
      })
      .addCase(createUserVerificationRequest.fulfilled, (state, action) => {
        state.createUserVerificationApiInfo = {
          ...state.createUserVerificationApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(createUserVerificationRequest.rejected, (state, action) => {
        state.createUserVerificationApiInfo = {
          ...state.createUserVerificationApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // property verification request
      .addCase(createVerificationRequest.pending, (state, { meta }) => {
        state.verificationApiInfo = {
          ...state.verificationApiInfo,
          itemId: meta?.arg?.itemId,
          loading: true,
        };
      })
      .addCase(createVerificationRequest.fulfilled, (state, action) => {
        state.verificationApiInfo = {
          ...state.verificationApiInfo,
          loading: false,
          response: action.payload?.data,
        };
      })
      .addCase(createVerificationRequest.rejected, (state, action) => {
        state.verificationApiInfo = {
          ...state.verificationApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  setCreateUserVerificationData,
  resetCreateUserVerificationApi,
  resetCreateUserVerificationData,
  setVerificationData,
  resetVerificationData,
  resetVerificationApi,
} = verificationRequestsSlice.actions;
export default verificationRequestsSlice.reducer;
