import axios from "axios";
import { API_URL } from "../../utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactUsData: null,
  contactUsApiInfo: {},
  bugReportData: null,
  bugReportDataApiInfo: {},
};

export const contactUs = createAsyncThunk(
  "contactUs/contactUs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/ticket/`,
        data?.formData
      );

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bugReport = createAsyncThunk(
  "contactUs/bugReport",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/ticket/`,
        data?.formData
      );

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const contactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {
    resetContactUsApi: (state) => {
      state.contactUsApiInfo = {};
    },
    resetBugReport: (state) => {
      state.bugReportDataApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // contact us
      .addCase(contactUs.pending, (state) => {
        state.contactUsApiInfo = { ...state.contactUsApiInfo, loading: true };
      })
      .addCase(contactUs.fulfilled, (state, action) => {
        state.contactUsApiInfo = {
          ...state.contactUsApiInfo,
          loading: false,
          response: action.payload.result,
        };
      })
      .addCase(contactUs.rejected, (state, action) => {
        state.contactUsApiInfo = {
          ...state.contactUsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // bug report
      .addCase(bugReport.pending, (state) => {
        state.bugReportDataApiInfo = {
          ...state.bugReportDataApiInfo,
          loading: true,
        };
      })
      .addCase(bugReport.fulfilled, (state, action) => {
        state.bugReportDataApiInfo = {
          ...state.bugReportDataApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(bugReport.rejected, (state, action) => {
        state.bugReportDataApiInfo = {
          ...state.bugReportDataApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const { resetContactUsApi, resetBugReport } = contactUsSlice.actions;
export default contactUsSlice.reducer;
