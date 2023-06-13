import axios from "axios";
import { auth } from "../../utils/firebase";
import { API_URL } from "../../utils/constants";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountCreationData: null,
  activeStep: 0,
  createAccountApiInfo: {},
  addAgentToCompanyData: null,
  addAgentToCompanyApiInfo: {},
  allSteps: ["Information", "Picture"],
};

export const createAccount = createAsyncThunk(
  "createAccount/createAccount",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}users/user/`, data);
      if (response) {
        try {
          await createUserWithEmailAndPassword(
            auth,
            data?.get("email"),
            data?.get("password")
          );
          return response?.data;
        } catch (error) {
          console.log({ error });
          return response?.data;
        }
      }
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
export const addAgentToExistingCompany = createAsyncThunk(
  "createAccount/AddAgentToExistingCompany",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/add-agent/`,
        data?.formData
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

export const createAccountSlice = createSlice({
  name: "createAccount",
  initialState,
  reducers: {
    resetAccountCreation: (state) => {
      state.createAccountApiInfo = {};
    },
    setAccountCreationData: (state, action) => {
      state.accountCreationData = action.payload;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setSteps: (state, action) => {
      state.allSteps = action.payload;
    },
    setAddAgentToCompanyData: (state, action) => {
      state.addAgentToCompanyData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.createAccountApiInfo = {
          ...state.createAccountApiInfo,
          loading: true,
        };
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.createAccountApiInfo = {
          ...state.createAccountApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.createAccountApiInfo = {
          ...state.createAccountApiInfo,
          loading: false,
        };
        state.createAccountApiInfo = {
          ...state.createAccountApiInfo,
          error: action.payload,
        };
      })
      // add agent to existing company
      .addCase(addAgentToExistingCompany.pending, (state) => {
        state.addAgentToCompanyApiInfo = {
          ...state.addAgentToCompanyApiInfo,
          loading: true,
        };
      })
      .addCase(addAgentToExistingCompany.fulfilled, (state, action) => {
        state.addAgentToCompanyApiInfo = {
          ...state.addAgentToCompanyApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(addAgentToExistingCompany.rejected, (state, action) => {
        state.addAgentToCompanyApiInfo = {
          ...state.addAgentToCompanyApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetAccountCreation,
  setAccountCreationData,
  setActiveStep,
  setSteps,
  setAddAgentToCompanyData,
} = createAccountSlice.actions;
export default createAccountSlice.reducer;
