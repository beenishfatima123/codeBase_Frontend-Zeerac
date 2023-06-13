import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  API_URL,
  LISTINGS_DRAWER_OPTIONS,
  SAVE_LIST_ITEMS,
} from "../../utils/constants";

const initialState = {
  showDrawer: true,
  sideBarToggle: false,
  sideMenuToggle: true,
  sideMenuClick: "overview",
  mainDrawerItem: "Settings",
  showEditInfo: false,
  userDetail: null,
  deactivate: null,
  userDetailApiInfo: {},
  updateUserDetailInfo: null,
  updateUserApiInfo: {},
  deactivateApiInfo: {},
  updatePassword: null,
  updatePasswordApiInfo: {},
  agentExperience: null,
  agentExperienceApiInfo: {},
  updateAgentExperienceDetail: null,
  updateAgentExperienceDetailApiInfo: {},
  becomeAgentData: { edited: false },
  becomeAgentDetail: null,
  becomeAgentDetailApiInfo: {},
  listingCategories: {
    ...LISTINGS_DRAWER_OPTIONS[1],
    subCategory: ["Rent", "Kirala"],
  },
  saveListSelectedTab: SAVE_LIST_ITEMS[0],
  userUpdateFormData: null,
};

// get user detail
export const userInfo = createAsyncThunk(
  "settings/userInfo",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/user/${data?.id}/`, {
        headers: {
          Authorization: `token ${data?.token}`,
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
// update user profile
export const updateUserInfo = createAsyncThunk(
  "settings/updateUserInfo",
  async (data, thunkAPI) => {
    // // console.log({ data });
    try {
      const response = await axios.put(
        `${API_URL}users/user/${data?.id}/`,
        data?.user,
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
// deactivate account
export const deactivateAccount = createAsyncThunk(
  "settings/deactivateAccount",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}users/api/deactivate`, "", {
        headers: {
          Authorization: `token ${data?.token}`,
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
// update password
export const updateAccountPassword = createAsyncThunk(
  "settings/updatePassword",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}users/update-password/`,
        data?.formData,
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
// get agent experience
export const getAgentExperience = createAsyncThunk(
  "settings/getAgentExperience",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/agent-experience/?user_fk=${data?.user_fk}`,
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
// update agent experience
export const updatedAgentExperience = createAsyncThunk(
  "settings/updatedAgentExperience",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}users/agents/${data?.user_fk}/`,
        data?.formData,
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
// become an agent
export const becomeAgent = createAsyncThunk(
  "settings/becomeAgent",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/become-agent/`,
        data?.formData,
        {
          headers: {
            Authorization: `token ${data?.token}`,
          },
        }
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

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowDrawer: (state, action) => {
      state.showDrawer = action.payload;
    },
    setSideBarToggle: (state, action) => {
      state.sideBarToggle = action.payload;
    },
    setListingCategories: (state, action) => {
      state.listingCategories = action.payload;
    },
    setSideMenuToggle: (state, action) => {
      state.sideMenuToggle = action.payload;
    },
    setSideMenuClick: (state, action) => {
      state.sideMenuClick = action.payload;
    },
    setMainDrawerItem: (state, action) => {
      state.mainDrawerItem = action.payload;
    },
    setShowEditInfo: (state, action) => {
      state.showEditInfo = action.payload;
    },
    setSaveListSelectedTab: (state, action) => {
      state.saveListSelectedTab = action.payload;
    },
    resetUpdatePassword: (state, action) => {
      state.updatePasswordApiInfo = {};
    },
    resetUpdateApi: (state, action) => {
      state.updateUserApiInfo = {};
    },
    setBecomeAgentData: (state, action) => {
      state.becomeAgentData = action.payload;
    },
    resetBecomeAnAgentApi: (state, action) => {
      state.becomeAgentDetailApiInfo = {};
    },
    resetUpdatedAgentExperienceApi: (state, action) => {
      state.updateAgentExperienceDetailApiInfo = {};
    },
    setUserUpdateFormData: (state, action) => {
      state.userUpdateFormData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // update user
      .addCase(updateUserInfo.pending, (state) => {
        state.updateUserApiInfo = { ...state.updateUserApiInfo, loading: true };
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.updateUserApiInfo = {
          ...state.updateUserApiInfo,
          loading: false,
          response: action.payload,
        };
        state.updateUserDetailInfo = action.payload;
        state.userDetail = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.updateUserApiInfo = {
          ...state.updateUserApiInfo,
          error: action.payload,
          loading: false,
        };
      })
      // user detail
      .addCase(userInfo.pending, (state) => {
        state.userDetailApiInfo = {
          ...state.userDetailApiInfo,
          loading: true,
        };
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.userDetailApiInfo = {
          ...state.userDetailApiInfo,
          loading: false,
        };
        state.userDetail = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.userDetailApiInfo = {
          ...state.userDetailApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // deactivate Account
      .addCase(deactivateAccount.pending, (state) => {
        state.deactivateApiInfo = {
          ...state.deactivateApiInfo,
          loading: true,
        };
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        state.deactivateApiInfo = {
          ...state.deactivateApiInfo,
          loading: false,
        };
        state.deactivate = action.payload;
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        state.deactivateApiInfo = {
          ...state.deactivateApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // update password
      .addCase(updateAccountPassword.pending, (state) => {
        state.updatePasswordApiInfo = {
          ...state.updatePasswordApiInfo,
          loading: true,
        };
      })
      .addCase(updateAccountPassword.fulfilled, (state, action) => {
        state.updatePasswordApiInfo = {
          ...state.updatePasswordApiInfo,
          loading: false,
          message: action.payload,
        };
        //state.updatePassword = action.payload;
      })
      .addCase(updateAccountPassword.rejected, (state, action) => {
        state.updatePasswordApiInfo = {
          ...state.updatePasswordApiInfo,
          loading: false,
          message: action.payload,
        };
        // state.updatePassword = action.payload;
      })
      // get agent experience
      .addCase(getAgentExperience.pending, (state) => {
        state.agentExperienceApiInfo = {
          ...state.agentExperienceApiInfo,
          loading: true,
        };
      })
      .addCase(getAgentExperience.fulfilled, (state, action) => {
        state.agentExperienceApiInfo = {
          ...state.agentExperienceApiInfo,
          loading: false,
          message: action.payload,
        };
        state.agentExperience = action.payload;
      })
      .addCase(getAgentExperience.rejected, (state, action) => {
        state.agentExperienceApiInfo = {
          ...state.agentExperienceApiInfo,
          loading: false,
          message: action.payload,
        };
      })
      // update agent experience
      .addCase(updatedAgentExperience.pending, (state) => {
        state.updateAgentExperienceDetailApiInfo = {
          ...state.updateAgentExperienceDetailApiInfo,
          loading: true,
        };
      })
      .addCase(updatedAgentExperience.fulfilled, (state, action) => {
        state.updateAgentExperienceDetailApiInfo = {
          ...state.updateAgentExperienceDetailApiInfo,
          loading: false,
          response: action.payload,
        };
        state.updateAgentExperienceDetail = action.payload;
      })
      .addCase(updatedAgentExperience.rejected, (state, action) => {
        state.updateAgentExperienceDetailApiInfo = {
          ...state.updateAgentExperienceDetailApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // become an agent
      .addCase(becomeAgent.pending, (state) => {
        state.becomeAgentDetailApiInfo = {
          ...state.becomeAgentDetailApiInfo,
          loading: true,
        };
      })
      .addCase(becomeAgent.fulfilled, (state, action) => {
        state.becomeAgentDetailApiInfo = {
          ...state.becomeAgentDetailApiInfo,
          loading: false,
          response: action.payload,
        };
        state.becomeAgentDetail = action.payload;
      })
      .addCase(becomeAgent.rejected, (state, action) => {
        state.becomeAgentDetailApiInfo = {
          ...state.becomeAgentDetailApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  setShowDrawer,
  setSideBarToggle,
  setSideMenuToggle,
  setSideMenuClick,
  setMainDrawerItem,
  setShowEditInfo,
  resetUpdatePassword,
  resetUpdateApi,
  setListingCategories,
  setBecomeAgentData,
  resetBecomeAnAgentApi,
  resetUpdatedAgentExperienceApi,
  setSaveListSelectedTab,
  setUserUpdateFormData,
} = settingsSlice.actions;
export default settingsSlice.reducer;
