import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, GROUP_PAGINATION_TARGETS } from "../../utils/constants";

const initialState = {
  groupsApi: {},
  allGroups: null,
  myGroups: null,
  joinedGroups: null,
  selectedGroup: null,
  groupMembers: null,
  groupModerators: null,
  groupAdmin: null,
  suggestedGroups: null,
  joinRequests: null,
  groupSearch: "",
};

export const getAllGroups = createAsyncThunk(
  "groups/getAllGroups",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/groups/?suggested=True`,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );

      //   console.log({ res: response?.data });
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
export const getSelectedGroup = createAsyncThunk(
  "groups/getSelectedGroup",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/groups/${data?.id}`, {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      });

      //   console.log({ res: response?.data });
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
export const getMyGroups = createAsyncThunk(
  "groups/getMyGroups",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/groups/admin`, {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
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
export const getJoinedGroups = createAsyncThunk(
  "groups/getJoinedGroups",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/groups/member`, {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
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
export const getGroupMembers = createAsyncThunk(
  "groups/getGroupMembers",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/groups/${data?.id}/members`,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
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
export const getGroupModerators = createAsyncThunk(
  "groups/getGroupModerators",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/groups/${data?.id}/moderators`,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
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
export const makeModerator = createAsyncThunk(
  "groups/makeModerator",
  async (data, thunkAPI) => {
    try {
      const values = new FormData();
      values.append("user", data?.user?.id);

      await axios.post(
        `${API_URL}zsphere/groups/${data?.id}/add_moderator/`,
        values,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );

      return data?.user;
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
export const removeModerator = createAsyncThunk(
  "groups/removeModerator",
  async (data, thunkAPI) => {
    try {
      const values = new FormData();
      values.append("user", data?.user?.id);

      await axios.post(
        `${API_URL}zsphere/groups/${data?.id}/remove_moderator/`,
        values,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );

      return data?.user;
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
export const removeFromGroup = createAsyncThunk(
  "groups/removeFromGroup",
  async (data, thunkAPI) => {
    try {
      const values = new FormData();
      values.append("user", data?.user?.id);

      await axios.post(`${API_URL}zsphere/groups/${data?.id}/remove/`, values, {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      });

      return data?.user;
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
export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}zsphere/groups/`,
        data?.values,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
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
export const editGroup = createAsyncThunk(
  "groups/editGroup",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}zsphere/groups/${data?.id}/`,
        data?.values,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
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

export const groupsSlice = createSlice({
  name: "groupsSlice",
  initialState,
  reducers: {
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    setAllGroups: (state, action) => {
      state.allGroups = action.payload;
    },
    setJoinedGroups: (state, action) => {
      state.joinedGroups = action.payload;
    },
    setGroupAdmin: (state, action) => {
      state.groupAdmin = action.payload;
    },
    resetEditGroup: (state) => {
      state.groupsApi = {
        ...state.groupsApi,
        loadingEdit: null,
        errorEdit: null,
        responseEdit: null,
        from: null,
      };
    },
    resetGroup: (state) => {
      state.groupsApi = {};
    },
    resetHandleJoinRequest: (state) => {
      state.groupsApi = {
        ...state.groupsApi,
        loadingHandleJoinRequests: null,
        errorHandleJoinRequests: null,
        responseHandleJoinRequests: null,
      };
    },
    resetSendJoinRequest: (state) => {
      state.groupsApi = {
        ...state.groupsApi,
        loadingSendJoinRequest: null,
        errorSendJoinRequest: null,
        responseSendJoinRequest: null,
      };
    },
    setGroupSearch: (state, action) => {
      state.groupSearch = action.payload;
    },
    resetGroupSearch: (state) => {
      state.groupSearch = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //get all groups
      .addCase(getAllGroups.pending, (state) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingAll: true,
        };
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingAll: false,
        };
        state.allGroups = action.payload;
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingAll: false,
          error: action.payload,
        };
      })
      //get all groups
      .addCase(getSelectedGroup.pending, (state) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingSelected: true,
        };
      })
      .addCase(getSelectedGroup.fulfilled, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingSelected: false,
        };
        state.selectedGroup = action.payload;
      })
      .addCase(getSelectedGroup.rejected, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingSelected: false,
          error: action.payload,
        };
      })
      //get My groups
      .addCase(getMyGroups.pending, (state) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingMine: true,
        };
      })
      .addCase(getMyGroups.fulfilled, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingMine: false,
        };
        state.myGroups = action.payload;
      })
      .addCase(getMyGroups.rejected, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingMine: false,
          error: action.payload,
        };
      })
      //Create Groups
      .addCase(createGroup.pending, (state) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingCreate: true,
        };
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingCreate: false,
        };
        state.myGroups = {
          ...state.myGroups,
          count: state.myGroups.count + 1,
          results: [...state.myGroups?.results, action.payload],
        };
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingCreate: false,
          error: action.payload,
        };
      })
      //Edit Group
      .addCase(editGroup.pending, (state, { meta }) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingEdit: true,
          from: meta?.arg?.from,
        };
      })
      .addCase(editGroup.fulfilled, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingEdit: false,
          responseEdit: action.payload,
        };
        state.allGroups = {
          ...state.allGroups,
          results: state.allGroups?.results?.map((elem) => {
            if (elem?.id === action.payload?.id) return action.payload;
            else return elem;
          }),
        };
        state.joinedGroups = {
          ...state.joinedGroups,
          results: state.joinedGroups?.results?.map((elem) => {
            if (elem?.id === action.payload?.id) return action.payload;
            else return elem;
          }),
        };
        state.myGroups = {
          ...state.myGroups,
          results: state.myGroups?.results?.map((elem) => {
            if (elem?.id === action.payload?.id) return action.payload;
            else return elem;
          }),
        };
        state.selectedGroup = action.payload;
      })
      .addCase(editGroup.rejected, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingEdit: false,
          errorEdit: action.payload,
        };
      })
      //get joined groups
      .addCase(getJoinedGroups.pending, (state) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingJoined: true,
        };
      })
      .addCase(getJoinedGroups.fulfilled, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingJoined: false,
        };
        state.joinedGroups = action.payload;
      })
      .addCase(getJoinedGroups.rejected, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingJoined: false,
          error: action.payload,
        };
      })
      //get group members
      .addCase(getGroupMembers.pending, (state) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingMembers: true,
        };
      })
      .addCase(getGroupMembers.fulfilled, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingMembers: false,
        };
        state.groupMembers = action.payload;
      })
      .addCase(getGroupMembers.rejected, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingMembers: false,
          error: action.payload,
        };
      })
      // join group
      .addCase(joinGroup.pending, (state) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingJoin: true,
        };
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingJoin: false,
          joinSuccess: true,
        };
        state.allGroups = {
          ...state.allGroups,
          count: state.allGroups?.count - 1,
          results: state.allGroups?.results?.filter(
            (elem) => elem?.id !== action.payload?.id
          ),
        };
        state.joinedGroups = state?.joinedGroups
          ? {
              ...state.joinedGroups,
              count: state.joinedGroups?.count + 1,
              results: [
                ...state.joinedGroups?.results,
                {
                  ...state.selectedGroup,
                  members: [
                    ...state.selectedGroup?.members,
                    action.payload?.user,
                  ],
                },
              ],
            }
          : {
              count: 1,
              results: [
                {
                  ...state.selectedGroup,
                  members: [
                    ...state.selectedGroup?.members,
                    action.payload?.user,
                  ],
                },
              ],
            };
        state.selectedGroup = {
          ...state.selectedGroup,
          members: [...state.selectedGroup?.members, action.payload?.user],
        };
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          loadingJoin: false,
          joinError: action.payload,
          joinSuccess: false,
        };
      })
      // make moderator
      .addCase(makeModerator.pending, (state, { meta }) => {
        state.groupsApi = {
          ...state.groupsApi,
          addingModerator: meta.arg?.user?.id,
        };
      })
      .addCase(makeModerator.fulfilled, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          addingModerator: false,
        };
        state.selectedGroup = {
          ...state.selectedGroup,
          moderators: [...state.selectedGroup?.moderators, action.payload?.id],
          members: state.selectedGroup?.members?.filter(
            (elem) => elem !== action.payload?.id
          ),
        };
        state.groupModerators = {
          ...state.groupModerators,
          results: [...state.groupModerators?.results, action.payload],
        };
      })
      .addCase(makeModerator.rejected, (state, action) => {
        state.groupsApi = {
          ...state.groupsApi,
          addingModerator: false,
          error: action.payload,
        };
      });
  },
});

export const {
  setSelectedGroup,
  setGroupAdmin,
  resetEditGroup,
  resetHandleJoinRequest,
  resetSendJoinRequest,
  resetGroup,
  setAllGroups,
  setGroupSearch,
  resetGroupSearch,
  setJoinedGroups,
} = groupsSlice.actions;
export default groupsSlice.reducer;
