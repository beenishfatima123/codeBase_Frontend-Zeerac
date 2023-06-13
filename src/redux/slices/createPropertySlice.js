import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import {
  AUCTION_TABS,
  LISTING_TYPE,
  POST_TABS,
} from "../../utils/propertyConstants";

const initialState = {
  propertyData: {
    appliances: "no",
    cooling: "no",
    currency: "PKR",
    flooring: "Marble",
    furnished: "no",
    garage: "no",
    heating: "no",
    home_type: "Residential",
    lawn: "no",
    materials: "Brick",
    new_construction: "no",
    pool: "no",
    property_condition: "Good",
    property_subtype: "Home",
    unit: "Marla",
    year_built: 2022,
    purpose: "sell",
  },
  auctionData: {
    unit: "Marla",
    currency: "PKR",
    totalFiles: 1,
  },
  selectedTab: POST_TABS[0][0],
  allTabs: POST_TABS,
  allAuctionTabs: AUCTION_TABS,
  listingType: LISTING_TYPE[0][0],
  inValidCategory: {
    type: {
      isValid: true,
    },
    categories: {
      isValid: true,
    },
    details: {
      isValid: true,
    },
    location: {
      isValid: true,
    },
    images: {
      isValid: true,
    },
    features: {
      isValid: true,
    },
    services: {
      isValid: true,
    },
    construction: {
      isValid: true,
    },
    purpose: {
      isValid: true,
    },
    preview: {
      isValid: true,
    },
  },
  inValidAuctionCategory: {
    information: {
      isValid: true,
    },
    images: {
      isValid: true,
    },
    preview: {
      isValid: true,
    },
  },
  createPropertyApiInfo: {},
  createAuctionApiInfo: {},
};

export const createProperty = createAsyncThunk(
  "create/createProperty",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/property/`,
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
export const createAuction = createAsyncThunk(
  "create/createAuction",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/property-files/`,
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
export const createPropertySlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    resetCreateProperties: (state) => {
      state.createPropertyApiInfo = {};
      state.propertyData = {
        appliances: "no",
        cooling: "no",
        currency: "PKR",
        flooring: "Marble",
        furnished: "no",
        garage: "no",
        heating: "no",
        home_type: "Residential",
        lawn: "no",
        materials: "Brick",
        new_construction: "no",
        pool: "no",
        property_condition: "Good",
        property_subtype: "Home",
        unit: "Marla",
        year_built: 2022,
      };
      state.selectedTab = "Purpose";
      state.listingType = LISTING_TYPE[0][0];
      state.inValidCategory = {
        type: {
          isValid: true,
        },
        categories: {
          isValid: true,
        },
        details: {
          isValid: true,
        },
        location: {
          isValid: true,
        },
        images: {
          isValid: true,
        },
        features: {
          isValid: true,
        },
        services: {
          isValid: true,
        },
        construction: {
          isValid: true,
        },
        purpose: {
          isValid: true,
        },
        preview: {
          isValid: true,
        },
      };
    },
    resetCreateAuctions: (state) => {
      state.createAuctionApiInfo = {};
      state.auctionData = {
        unit: "Marla",
        currency: "PKR",
        totalFiles: 1,
      };
      state.inValidAuctionCategory = {
        information: {
          isValid: true,
        },
        images: {
          isValid: true,
        },
        preview: {
          isValid: true,
        },
      };
      state.selectedTab = "Purpose";
      state.listingType = LISTING_TYPE[1];
    },
    resetCreatePropertiesApi: (state) => {
      state.createPropertyApiInfo = {};
    },
    resetCreateAuctionsApi: (state) => {
      state.createAuctionApiInfo = {};
    },
    setPropertyData: (state, action) => {
      state.propertyData = action.payload;
    },
    setAuctionData: (state, action) => {
      state.auctionData = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setAllTabs: (state, action) => {
      state.allTabs = action.payload;
    },
    setListingType: (state, action) => {
      state.listingType = action.payload;
    },
    setInvalidCategory: (state, action) => {
      state.inValidCategory = action.payload;
    },
    setInvalidAuctionCategory: (state, action) => {
      state.inValidAuctionCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.pending, (state) => {
        state.createPropertyApiInfo = {
          ...state.createPropertyApiInfo,
          loading: true,
        };
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.createPropertyApiInfo = {
          ...state.createPropertyApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.createPropertyApiInfo = {
          ...state.createPropertyApiInfo,
          loading: false,
        };
        state.createPropertyApiInfo = {
          ...state.createPropertyApiInfo,
          error: action.payload,
        };
      })

      //AUCTION

      .addCase(createAuction.pending, (state) => {
        state.createAuctionApiInfo = {
          ...state.createAuctionApiInfo,
          loading: true,
        };
      })
      .addCase(createAuction.fulfilled, (state, action) => {
        state.createAuctionApiInfo = {
          ...state.createAuctionApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(createAuction.rejected, (state, action) => {
        state.createAuctionApiInfo = {
          ...state.createAuctionApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetCreateProperties,
  setPropertyData,
  setSelectedTab,
  setInvalidCategory,
  setInvalidAuctionCategory,
  setAllTabs,
  setAuctionData,
  setListingType,
  resetCreatePropertiesApi,
  resetCreateAuctions,
  resetCreateAuctionsApi,
} = createPropertySlice.actions;
export default createPropertySlice.reducer;
