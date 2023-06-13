import axios from "axios";
import { API_URL } from "../../utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  allNotifications: null,
  unreadNotifications: null,
  notificationsApiInfo: {},
};
export const getAllNotifications = createAsyncThunk(
  "notifications/getAllNotifications",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}notifications`, {
        headers: {
          Authorization: data?.token ? `token ${data?.token}` : "",
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
export const getUnreadNotifications = createAsyncThunk(
  "notifications/getUnreadNotifications",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}notifications/?unread=true`, {
        headers: {
          Authorization: data?.token ? `token ${data?.token}` : "",
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
export const updateNotification = createAsyncThunk(
  "notifications/updateNotification",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${API_URL}notifications/${data?.id}/`,
        data?.values,
        {
          headers: {
            Authorization: data?.token ? `token ${data?.token}` : "",
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
export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}notifications/`,
        data?.values,
        {
          headers: {
            Authorization: data?.token ? `token ${data?.token}` : "",
          },
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
export const readAllNotifications = createAsyncThunk(
  "notifications/readAllNotifications",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}notifications/read_multiple/`,
        { ids: data?.ids },
        {
          headers: {
            Authorization: data?.token ? `token ${data?.token}` : "",
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
export const clearAllNotifications = createAsyncThunk(
  "notifications/clearAllNotifications",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}notifications/delete_multiple/`,
        { ids: data?.ids },
        {
          headers: {
            Authorization: data?.token ? `token ${data?.token}` : "",
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
export const notificationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetNotificationsApi: (state) => {
      state.notificationsApiInfo = {};
    },
    setAllNotifications: (state, action) => {
      state.allNotifications = action.payload;
    },
    handleNewNotification: (state, action) => {
      state.allNotifications = state.allNotifications
        ? {
            ...state.allNotifications,
            count: state.allNotifications?.count + 1,
            results: [action.payload, ...state.allNotifications?.results],
          }
        : { count: 1, results: [action.payload], next: null, prev: null };
      state.unreadNotifications = state.unreadNotifications
        ? {
            ...state.unreadNotifications,
            count: state.unreadNotifications?.count + 1,
            results: [action.payload, ...state.unreadNotifications?.results],
          }
        : { count: 1, results: [action.payload], next: null, prev: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingAllNotifications: true,
        };
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingAllNotifications: false,
        };
        state.allNotifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingAllNotifications: false,
          error: action.payload,
        };
      })
      //Clear notification
      .addCase(updateNotification.pending, (state, { meta }) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingClear: meta?.arg?.id,
        };
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingClear: false,
        };
        state.allNotifications = {
          ...state.allNotifications,
          results: state?.allNotifications?.results?.map((elem) => {
            if (elem?.id === action.payload?.id) {
              return {
                ...elem,
                is_active: action?.payload?.is_active,
                is_read: action?.payload?.is_read,
              };
            } else return elem;
          }),
        };
        state.unreadNotifications = {
          ...state.unreadNotifications,
          results: state?.unreadNotifications?.results?.map((elem) => {
            if (elem?.id === action.payload?.id) {
              return {
                ...elem,
                is_active: action?.payload?.is_active,
                is_read: action?.payload?.is_read,
              };
            } else return elem;
          }),
        };
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingClear: false,
          error: action.payload,
        };
      })
      //Get all unread
      .addCase(getUnreadNotifications.pending, (state) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingUnread: true,
        };
      })
      .addCase(getUnreadNotifications.fulfilled, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingUnread: false,
        };
        state.unreadNotifications = action.payload;
      })
      .addCase(getUnreadNotifications.rejected, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingUnread: false,
          error: action.payload,
        };
      })
      //Read ALl
      .addCase(readAllNotifications.pending, (state) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingReadAll: true,
        };
      })
      .addCase(readAllNotifications.fulfilled, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingReadAll: false,
        };
        state.allNotifications = {
          ...state.allNotifications,
          results: state.allNotifications?.results?.map((elem) => {
            return { ...elem, is_read: true };
          }),
        };
        state.unreadNotifications = {
          ...state.unreadNotifications,
          results: state.unreadNotifications?.results?.map((elem) => {
            return { ...elem, is_read: true };
          }),
        };
      })
      .addCase(readAllNotifications.rejected, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingReadAll: false,
          error: action.payload,
        };
      })
      //Clear All
      .addCase(clearAllNotifications.pending, (state) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingClearAll: true,
        };
      })
      .addCase(clearAllNotifications.fulfilled, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingClearAll: false,
        };
        state.allNotifications = {
          ...state.allNotifications,
          results: state.allNotifications?.results?.map((elem) => {
            return { ...elem, is_active: false };
          }),
        };
        state.unreadNotifications = {
          ...state.unreadNotifications,
          results: state.unreadNotifications?.results?.map((elem) => {
            return { ...elem, is_active: false };
          }),
        };
      })
      .addCase(clearAllNotifications.rejected, (state, action) => {
        state.notificationsApiInfo = {
          ...state.notificationsApiInfo,
          loadingClearAll: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetNotificationsApi,
  setAllNotifications,
  handleNewNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
