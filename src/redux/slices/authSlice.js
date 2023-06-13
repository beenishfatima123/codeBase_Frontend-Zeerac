import axios from "axios";
import { API_URL } from "../../utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginApi: {},
  preferencesApi: {},
  currentUser: null,
  currentLocation: null,
  zsphereData: {},
  zsphereApi: {},
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}users/api/login`, data);

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
export const updateUserPreference = createAsyncThunk(
  "auth/updateUserPreference",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}users/user/${data?.id}/`,
        data?.values,
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
      );

      console.log({ res: response?.data });
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
export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}users/user/${data?.id}/`,
        data?.values,
        {
          headers: {
            Authorization: `token ${data?.token}`,
          },
        }
      );
      console.log({ res: response?.data });
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
export const getFollowers = createAsyncThunk(
  "auth/getFollowers",
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
  "auth/getFollowing",
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
  "auth/paginateFollowers",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data?.url);

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
export const paginateFollowing = createAsyncThunk(
  "auth/paginateFollowing",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data?.url);

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
export const removeFollower = createAsyncThunk(
  "auth/removeFollower",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${API_URL}zsphere/remove-follower/`, data?.values, {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      });

      return data?.values?.get("user_id");
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
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoginApi: (state) => {
      state.loginApi = {};
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setZsphereData: (state, action) => {
      state.zsphereData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loginApi = { ...state.loginApi, loading: true };
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginApi = { ...state.loginApi, loading: false };
        state.loginApi = { ...state.loginApi, response: action.payload.result };
      })
      .addCase(login.rejected, (state, action) => {
        state.loginApi = { ...state.loginApi, loading: false };
        state.loginApi = { ...state.loginApi, error: action.payload };
      })
      // add preferences
      .addCase(updateUserPreference.pending, (state) => {
        state.preferencesApi = { ...state.preferencesApi, loadingUpdate: true };
      })
      .addCase(updateUserPreference.fulfilled, (state, action) => {
        state.preferencesApi = {
          ...state.preferencesApi,
          loadingUpdate: false,
        };
        state.currentUser = { ...state.currentUser, ...action.payload };
      })
      .addCase(updateUserPreference.rejected, (state, action) => {
        state.preferencesApi = {
          ...state.preferencesApi,
          loadingUpdate: false,
          error: action.payload,
        };
      })
      // update info
      .addCase(updateUserInfo.pending, (state) => {
        state.preferencesApi = {
          ...state.preferencesApi,
          updatingProfile: true,
        };
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.preferencesApi = {
          ...state.preferencesApi,
          updatingProfile: false,
        };
        state.currentUser = { ...state.currentUser, ...action.payload };
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.preferencesApi = {
          ...state.preferencesApi,
          updatingProfile: false,
          error: action.payload,
        };
      })
      //followers
      .addCase(getFollowers.pending, (state) => {
        state.zsphereApi = { ...state.zsphereApi, loadingFollowers: true };
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowers: false,
        };
        state.zsphereData = { ...state.zsphereData, followers: action.payload };
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowers: false,
          error: action.payload,
        };
      })
      //PAGINATE FOLLOWERS
      .addCase(paginateFollowers.pending, (state) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowerPagination: true,
        };
      })
      .addCase(paginateFollowers.fulfilled, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowerPagination: false,
        };

        state.zsphereData = {
          ...state?.zsphereData,
          followers: {
            next: action.payload?.data?.next,
            previous: action.payload?.data?.previous,
            results: [
              ...state?.zsphereData?.followers?.results,
              ...action.payload?.results,
            ],
          },
        };
      })
      .addCase(paginateFollowers.rejected, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowerPagination: false,
          error: action.payload,
        };
      })
      //following
      .addCase(getFollowing.pending, (state) => {
        state.zsphereApi = { ...state.zsphereApi, loadingFollowers: true };
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowers: false,
        };
        state.zsphereData = { ...state.zsphereData, following: action.payload };
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowers: false,
          error: action.payload,
        };
      })
      //PAGINATE FOLLOWERS
      .addCase(paginateFollowing.pending, (state) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowingPagination: true,
        };
      })
      .addCase(paginateFollowing.fulfilled, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowingPagination: false,
        };
        state.zsphereData = {
          ...state?.zsphereData,
          following: {
            ...state.zsphereData?.following,
            next: action.payload?.data?.next,
            previous: action.payload?.data?.previous,
            results:
              state?.zsphereData?.following?.results?.length > 0
                ? [
                    ...state?.zsphereData?.following?.results,
                    ...action.payload?.result?.results,
                  ]
                : action.payload?.result?.results,
          },
        };
      })
      .addCase(paginateFollowing.rejected, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingFollowingPagination: false,
          error: action.payload,
        };
      })
      //remove followers
      .addCase(removeFollower.pending, (state, { meta }) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingRemove: meta?.arg?.values?.get("user_id"),
        };
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingRemove: false,
        };

        state.zsphereData = {
          ...state.zsphereData,
          followingIds: state.zsphereData?.followingIds?.filter(
            (elem) => elem + "" !== action.payload + ""
          ),
          followers: {
            ...state.zsphereData?.followers,
            count: state.zsphereData?.followers?.count - 1,
            results: state.zsphereData?.followers?.results?.filter(
              (elem) => elem?.id + "" !== action.payload + ""
            ),
          },
        };
      })
      .addCase(removeFollower.rejected, (state, action) => {
        state.zsphereApi = {
          ...state.zsphereApi,
          loadingRemove: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetLoginApi,
  setCurrentUser,
  setCurrentLocation,
  setZsphereData,
} = authSlice.actions;
export default authSlice.reducer;
