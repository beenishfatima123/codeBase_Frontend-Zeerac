import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const initialState = {
  zSphereMembersData: {},
  zSphereMembersApi: {},
  selectedMember: null,
};

export const getFollowers = createAsyncThunk(
  "zSphereMemberSlice/getFollowers",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/user/${data?.id}/followers`,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );

      // console.log({ res: response?.data });
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
export const getFollowing = createAsyncThunk(
  "zSphereMemberSlice/getFollowing",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/user/${data?.id}/following`,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );

      // console.log({ res: response?.data });
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
export const paginateFollowers = createAsyncThunk(
  "zsphereMembers/paginateFollowers",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data?.url);
      // console.log({ res: response?.data });

      return response?.data?.results;
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
export const paginateFollowing = createAsyncThunk(
  "zsphereMembers/paginateFollowing",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data?.url);
      // console.log({ res: response?.data });
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
export const getSelectedMember = createAsyncThunk(
  "zSphereMemberSlice/getSelectedMember",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/agents/${data?.id}`);
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
export const zSphereMemberSlice = createSlice({
  name: "zSphereMemberSlice",
  initialState,
  reducers: {
    setZsphereMembersData: (state, action) => {
      state.zSphereMembersData = action.payload;
    },
    setSelectedMember: (state, action) => {
      state.selectedMember = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get selected member
      .addCase(getSelectedMember.pending, (state) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingSelectedMember: true,
        };
      })
      .addCase(getSelectedMember.fulfilled, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingSelectedMember: false,
        };
        state.selectedMember = action.payload.agent;
      })
      .addCase(getSelectedMember.rejected, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingSelectedMember: false,
          error: action.payload,
        };
      })
      //followers
      .addCase(getFollowers.pending, (state) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowers: true,
        };
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowers: false,
        };

        state.zSphereMembersData = {
          ...state.zSphereMembersData,
          followers: action.payload,
        };
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowers: false,
          error: action.payload,
        };
      })
      //following
      .addCase(getFollowing.pending, (state) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowers: true,
        };
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowers: false,
        };

        state.zSphereMembersData = {
          ...state.zSphereMembersData,
          following: action.payload,
        };
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowers: false,
          error: action.payload,
        };
      })
      //PAGINATE FOLLOWERS
      .addCase(paginateFollowers.pending, (state) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowerPagination: true,
        };
      })
      .addCase(paginateFollowers.fulfilled, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowerPagination: false,
        };

        state.zSphereMembersData = {
          ...state?.zSphereMembersData,
          followers: {
            ...state?.zSphereMembersData?.followers,
            next: action.payload?.next,
            previous: action.payload?.previous,
            results: [
              ...state?.zSphereMembersData?.followers?.results,
              ...action.payload?.results,
            ],
          },
        };
      })
      .addCase(paginateFollowers.rejected, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowerPagination: false,
          error: action.payload,
        };
      })
      //PAGINATE FOLLOWERS
      .addCase(paginateFollowing.pending, (state) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowingPagination: true,
        };
      })
      .addCase(paginateFollowing.fulfilled, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowingPagination: false,
        };

        state.zSphereMembersData = {
          ...state?.zSphereMembersData,
          following: {
            ...state?.zSphereMembersData?.following,
            next: action.payload?.next,
            previous: action.payload?.previous,
            results: [
              ...state?.zSphereMembersData?.following?.results,
              ...action.payload?.results,
            ],
          },
        };
      })
      .addCase(paginateFollowing.rejected, (state, action) => {
        state.zSphereMembersApi = {
          ...state.zSphereMembersApi,
          loadingFollowingPagination: false,
          error: action.payload,
        };
      });
  },
});

export const { setZsphereMembersData, setSelectedMember } =
  zSphereMemberSlice.actions;
export default zSphereMemberSlice.reducer;
