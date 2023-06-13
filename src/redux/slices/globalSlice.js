import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../utils/constants";

const initialState = {
  showHeaderSearchBar: false,
  filterOverlay: false,
  projectsOverlay: false,
  isVideoVisible: false,
  isFooterVisible: false,
  propertiesToCompare: [],
  openSearchOverlay: false,
  recentSearches: [],
  darkMode: false,
  colors: {
    primary: "#134696",
    secondary: "#0ed864",
    white: "#ffffff",
    black: "#000000",
  },
  hasSeenVideo: false,
  selectedRegion: null,
  selectedCategoryFilter: null,
  propertyFilter: null,
  selectedFilterType: null,
  currencyRates: null,
  currencyApi: {},
  langIndex: 0,
  currencyIndex: null,
  countryBorders: null,
  listingsCount: {},
};
export const getCurrencyRate = createAsyncThunk(
  "posts/getCurrencyRate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/exchange-rate`);
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
export const globalSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setShowHeaderSearchBar: (state, action) => {
      state.showHeaderSearchBar = action.payload;
    },
    setPropertyFilter: (state, action) => {
      state.propertyFilter = action.payload;
    },
    setRecentSearches: (state, action) => {
      state.recentSearches = action.payload;
    },
    setSearchOverlay: (state, action) => {
      state.openSearchOverlay = action.payload;
    },
    setPropertiesToCompare: (state, action) => {
      state.propertiesToCompare = action.payload;
    },
    setFilterOverlay: (state, action) => {
      state.filterOverlay = action.payload;
    },
    setProjectsOverlay: (state, action) => {
      state.projectsOverlay = action.payload;
    },
    setIsVideoVisible: (state, action) => {
      state.isVideoVisible = action.payload;
    },
    setIsFooterVisible: (state, action) => {
      state.isFooterVisible = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setHasSeenVideo: (state, action) => {
      state.hasSeenVideo = action.payload;
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
    setSelectedCategoryFilter: (state, action) => {
      state.selectedCategoryFilter = action.payload;
    },
    setSelectedFilterType: (state, action) => {
      state.selectedFilterType = action.payload;
    },
    setCurrencyRates: (state, action) => {
      state.currencyRates = action.payload;
    },
    setLanguage: (state, action) => {
      state.langIndex = action.payload;
    },
    setCurrencyIndex: (state, action) => {
      state.currencyIndex = action.payload;
    },

    setListingsCount: (state, action) => {
      console.log({ action });
      state.listingsCount = {
        ...state.listingsCount,
        [action.payload?.prop]: action.payload?.data,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencyRate.pending, (state) => {
        state.currencyApi = {
          ...state.currencyApi,
          loading: true,
        };
      })
      .addCase(getCurrencyRate.fulfilled, (state, action) => {
        state.currencyApi = {
          ...state.currencyApi,
          loading: false,
        };
        state.currencyRates = {
          base: action.payload?.base,
          date: action.payload?.created_at,
          rates: {
            AED: action.payload?.AED,
            USD: action.payload?.USD,
            PKR: action.payload?.PKR,
            TRY: action.payload?.TRY,
          },
        };
      })
      .addCase(getCurrencyRate.rejected, (state, action) => {
        state.currencyApi = {
          ...state.currencyApi,
          error: action.payload,
          loading: false,
        };
      });
  },
});

export const {
  setShowHeaderSearchBar,
  setFilterOverlay,
  setProjectsOverlay,
  setIsVideoVisible,
  setIsFooterVisible,
  setPropertiesToCompare,
  setSearchOverlay,
  setRecentSearches,
  setDarkMode,
  setColors,
  setHasSeenVideo,
  setSelectedRegion,
  setSelectedCategoryFilter,
  setPropertyFilter,
  setSelectedFilterType,
  setCurrencyRates,
  setLanguage,
  setCurrencyIndex,
  setListingsCount,
} = globalSlice.actions;
export default globalSlice.reducer;
