import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const initialState = {
  allPartners: null,
  savedPartners: null,
  searchedPartners: null,
  partnerDetails: null,
  allPartnerListings: null,
  allPartnersApiInfo: {},
  allPartnerProjects: null,
  partnerDetailsApiInfo: {},
  allPartnerProjectsApiInfo: {},
  allPartnerListingsApiInfo: {},
  searchPartnersApiInfo: {},
  paginationApi: {},
  reportAgencyData: null,
  reportAgencyDataApiInfo: {},
  requestToJoinAgencyApiInfo: {},
  allRequestsData: null,
  handleRequestsData: null,
  otherAgencies: null,
  otherAgenciesApiInfo: {},
};

export const getAllPartners = createAsyncThunk(
  "partners/getAllPartners",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/company/`);
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
export const getPartnerListings = createAsyncThunk(
  "partners/getPartnerListings",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/agency-listings/?company=${data?.id}`
      );
      return response?.data?.result;
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
export const getPartnerAgents = createAsyncThunk(
  "partners/getPartnerAgents",
  async (data, thunkAPI) => {
    try {
      // eslint-disable-next-line
      const response = await axios.get(`${API_URL}users/company/${data?.id}`);
      // return response?.data?.result;
      // console.log({ response });
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
export const getPartnerProjects = createAsyncThunk(
  "partners/getPartnerProjects",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/company-project/${data?.id}`
      );
      return response?.data?.result;
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
export const getPartner = createAsyncThunk(
  "partners/getPartner",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/company/${data?.id}`);
      // // console.log({ response });
      return response?.data?.result;
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
// get other agencies
export const getOtherAgencies = createAsyncThunk(
  "partners/getOtherAgencies",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/company/${data?.id}/related/`
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
export const getSavedPartners = createAsyncThunk(
  "agents/getSavedPartners",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/company/?favourited_by=${data?.id}`
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
export const queryPartners = createAsyncThunk(
  "agents/queryPartners",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/company?search=${data?.query}`
      );
      // // console.log({ response });
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
export const paginate = createAsyncThunk(
  "social/paginate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data.url);
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

// report an agency
export const reportAgency = createAsyncThunk(
  "agents/reportAgency",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/ticket/`,
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

export const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    reset: (state) => {
      state.allPartnersApiInfo = {};
    },
    resetAgency: (state) => {
      state.reportAgencyDataApiInfo = {};
    },
    resetRequestToJoinAgency: (state) => {
      state.requestToJoinAgencyApiInfo = {};
    },
    resetHandleRequestData: (state) => {
      state.handleRequestsData = {};
    },
    setAllPartnerListings: (state, action) => {
      state.allPartnerListings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPartners.pending, (state) => {
        state.allPartnersApiInfo = {
          ...state.allPartnersApiInfo,
          loading: true,
        };
      })
      .addCase(getAllPartners.fulfilled, (state, action) => {
        state.allPartnersApiInfo = {
          ...state.allPartnersApiInfo,
          loading: false,
        };
        state.allPartners = action.payload;
      })
      .addCase(getAllPartners.rejected, (state, action) => {
        state.allPartnersApiInfo = {
          ...state.allPartnersApiInfo,
          loading: false,
        };
        state.allPartnersApiInfo = {
          ...state.allPartnersApiInfo,
          error: action.payload,
        };
      })

      //partner listings
      .addCase(getPartnerListings.pending, (state) => {
        state.allPartnerListingsApiInfo = {
          ...state.allPartnerListingsApiInfo,
          loading: true,
        };
      })
      .addCase(getPartnerListings.fulfilled, (state, action) => {
        state.allPartnerListingsApiInfo = {
          ...state.allPartnerListingsApiInfo,
          loading: false,
        };
        state.allPartnerListings = action.payload;
      })
      .addCase(getPartnerListings.rejected, (state, action) => {
        state.allPartnerListingsApiInfo = {
          ...state.allPartnerListingsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //partner projects
      .addCase(getPartnerProjects.pending, (state) => {
        state.allPartnerProjectsApiInfo = {
          ...state.allPartnerProjectsApiInfo,
          loading: true,
        };
      })
      .addCase(getPartnerProjects.fulfilled, (state, action) => {
        state.allPartnerProjectsApiInfo = {
          ...state.allPartnerProjectsApiInfo,
          loading: false,
        };
        state.allPartnerProjects = action.payload;
      })
      .addCase(getPartnerProjects.rejected, (state, action) => {
        state.allPartnerProjectsApiInfo = {
          ...state.allPartnerProjectsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //Single Partner
      .addCase(getPartner.pending, (state) => {
        state.partnerDetailsApiInfo = {
          ...state.partnerDetailsApiInfo,
          loading: true,
        };
      })
      .addCase(getPartner.fulfilled, (state, action) => {
        state.partnerDetailsApiInfo = {
          ...state.partnerDetailsApiInfo,
          loading: false,
        };
        state.partnerDetails = action.payload;
      })
      .addCase(getPartner.rejected, (state, action) => {
        state.partnerDetailsApiInfo = {
          ...state.partnerDetailsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //query
      .addCase(queryPartners.pending, (state) => {
        state.searchPartnersApiInfo = {
          ...state.searchPartnersApiInfo,
          loading: true,
        };
      })
      .addCase(queryPartners.fulfilled, (state, action) => {
        state.searchPartnersApiInfo = {
          ...state.searchPartnersApiInfo,
          loading: false,
        };
        state.searchedPartners = action.payload;
      })
      .addCase(queryPartners.rejected, (state, action) => {
        state.searchPartnersApiInfo = {
          ...state.searchPartnersApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //paginate
      .addCase(paginate.pending, (state) => {
        state.allPartnersApiInfo = {
          ...state.allPartnersApiInfo,
          loading: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allPartnersApiInfo = {
          ...state.allPartnersApiInfo,
          loading: false,
        };
        state.allPartners = action.payload;
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allPartnersApiInfo = {
          ...state.allPartnersApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // report agency
      .addCase(reportAgency.pending, (state) => {
        state.reportAgencyDataApiInfo = {
          ...state.reportAgencyDataApiInfo,
          loading: true,
        };
      })
      .addCase(reportAgency.fulfilled, (state, action) => {
        state.reportAgencyDataApiInfo = {
          ...state.reportAgencyDataApiInfo,
          loading: false,
          response: action.payload,
        };
        state.reportAgencyData = action.payload;
      })
      .addCase(reportAgency.rejected, (state, action) => {
        state.reportAgencyDataApiInfo = {
          ...state.reportAgencyDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //GET SAVED
      .addCase(getSavedPartners.pending, (state) => {
        state.allPartnerProjectsApiInfo = {
          ...state.allPartnerProjectsApiInfo,
          loadingSaved: true,
        };
      })
      .addCase(getSavedPartners.fulfilled, (state, action) => {
        state.allPartnerProjectsApiInfo = {
          ...state.allPartnerProjectsApiInfo,
          loadingSaved: false,
        };
        state.savedPartners = action.payload;
      })
      .addCase(getSavedPartners.rejected, (state, action) => {
        state.allPartnerProjectsApiInfo = {
          ...state.allPartnerProjectsApiInfo,
          error: action.payload,
          loadingSaved: false,
        };
      })
      //GET Other Agencies
      .addCase(getOtherAgencies.pending, (state) => {
        state.otherAgenciesApiInfo = {
          ...state.otherAgenciesApiInfo,
          loading: true,
        };
      })
      .addCase(getOtherAgencies.fulfilled, (state, action) => {
        state.otherAgenciesApiInfo = {
          ...state.otherAgenciesApiInfo,
          loading: false,
          response: action.payload,
        };
        state.otherAgencies = action.payload;
      })
      .addCase(getOtherAgencies.rejected, (state, action) => {
        state.otherAgenciesApiInfo = {
          ...state.otherAgenciesApiInfo,
          error: action.payload,
          loading: false,
        };
      });
  },
});

export const {
  reset,
  resetAgency,
  resetRequestToJoinAgency,
  resetHandleRequestData,
  setAllPartnerListings,
} = partnersSlice.actions;
export default partnersSlice.reducer;
