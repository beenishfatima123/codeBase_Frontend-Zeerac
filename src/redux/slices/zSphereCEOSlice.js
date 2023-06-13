import axios from "axios";
import { API_URL } from "../../utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  getCEOClubData: null,
  getCEOClubApiInfo: {},
  getCEOClubMembersData: null,
  getCEOClubMembersApiInfo: {},
};
// get CEO club
export const getCEOClub = createAsyncThunk(
  "zSphereEvents/getCEOClub",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/ceo-club/`, {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      });
      return response?.data?.results?.[0];
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
// get club members
export const getCEOClubMembers = createAsyncThunk(
  "zSphereEvents/getCEOClubMembers",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/ceo-club/${data?.id}/members/`,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );

      // console.log({ res: response?.data });
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

export const zSphereCEOSlice = createSlice({
  name: "zSphereCEO",
  initialState,
  reducers: {
    resetEventDataApiInfo: (state, action) => {
      state.getEventsDataApiInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get CEO club
      .addCase(getCEOClub.pending, (state) => {
        state.getCEOClubApiInfo = {
          ...state.getCEOClubApiInfo,
          loading: true,
        };
      })
      .addCase(getCEOClub.fulfilled, (state, action) => {
        state.getCEOClubApiInfo = {
          ...state.getCEOClubApiInfo,
          loading: false,
        };
        state.getCEOClubData = action.payload;
      })
      .addCase(getCEOClub.rejected, (state, action) => {
        state.getCEOClubApiInfo = {
          ...state.getCEOClubApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //get CEO club Members
      .addCase(getCEOClubMembers.pending, (state) => {
        state.getCEOClubMembersApiInfo = {
          ...state.getCEOClubMembersApiInfo,
          loading: true,
        };
      })
      .addCase(getCEOClubMembers.fulfilled, (state, action) => {
        state.getCEOClubMembersApiInfo = {
          ...state.getCEOClubMembersApiInfo,
          loading: false,
        };
        state.getCEOClubMembersData = action.payload;
      })
      .addCase(getCEOClubMembers.rejected, (state, action) => {
        state.getCEOClubMembersApiInfo = {
          ...state.getCEOClubMembersApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const { resetEventDataApiInfo } = zSphereCEOSlice.actions;
export default zSphereCEOSlice.reducer;
