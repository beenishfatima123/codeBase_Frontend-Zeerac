import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AGENT_PAGINATION, API_URL } from "../../utils/constants";

const initialState = {
  allAgents: null,
  savedAgents: null,
  searchedAgents: null,
  selectedAgent: null,
  allAgentsApiInfo: {},
  searchAgentsApiInfo: {},
  selectedAgentApiInfo: {},
  paginationApi: {},
  suggestedApiInfo: {},
  suggestedAgents: null,
  companyAgents: null,
  companyAgentsApiInfo: {},
  addAgentRequest: null,
  addAgentRequestApiInfo: {},
  allPrivateAgents: null,
  allPrivateAgentsApiInfo: {},
  reportAgentData: null,
  reportAgentDataApiInfo: {},
  featuredAgentsApiInfo: {},
  featuredAgents: null,
};
// Gets all agents
export const getAllAgents = createAsyncThunk(
  "agents/getAllAgents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/new_agents/`);
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
// get all private agents
export const getAllPrivateAgents = createAsyncThunk(
  "agents/getAllPrivateAgents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/new_agents/?private_agent=${true}`
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
// get all company agents
export const getCompanyAgents = createAsyncThunk(
  "agents/getCompanyAgents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/new_agents/?company_id=${data?.id}`
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
// Creates a new favorites agent and returns the response. This is an async thunk
export const favoriteAgent = createAsyncThunk(
  "agents/favoriteAgent",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/new_agents/${data?.id}/toggle_favourite/`,
        {},
        {
          headers: {
            Authorization: `Token ${data?.token}`,
          },
        }
      );
      return {
        agentId: data?.id,
        results: response?.data?.result?.message,
        user: data?.user,
      };
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
// Gets suggestions for user agents. This is a thunk that uses the service to do the work
export const getSuggestedAgents = createAsyncThunk(
  "agents/getSuggestedAgents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/user-suggestions/?page_size=${data?.pageSize}`,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data?.token}`,
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
// Gets all agents for the query generated
export const queryAgents = createAsyncThunk(
  "agents/queryAgents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/new_agents?${data?.query}`
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
// paginate social pages
export const paginate = createAsyncThunk(
  "social/paginate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data.url);
      return { data: response?.data, destination: data.destination };
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
// report an agent
export const reportAgent = createAsyncThunk(
  "agents/reportAgent",
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
// get featured Agents
export const getFeaturedAgents = createAsyncThunk(
  "agents/getFeaturedAgents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/new_agents/?is_featured=True`
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

// Slice for the agent operations
export const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setSelectedAgent: (state, action) => {
      state.selectedAgent = action.payload;
    },
    resetAddAgentRequest: (state, action) => {
      state.addAgentRequestApiInfo = {};
    },
    resetAllCompanyAgentsRequest: (state, action) => {
      state.companyAgentsApiInfo = {};
    },
    resetReportAgent: (state, action) => {
      state.reportAgentDataApiInfo = {};
    },
    resetSearchAgent: (state) => {
      state.searchedAgents = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get agents reducers
      .addCase(getAllAgents.pending, (state) => {
        state.allAgentsApiInfo = {
          ...state.allAgentsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllAgents.fulfilled, (state, action) => {
        state.allAgentsApiInfo = {
          ...state.allAgentsApiInfo,
          loading: false,
        };
        state.allAgents = action.payload;
      })
      .addCase(getAllAgents.rejected, (state, action) => {
        state.allAgentsApiInfo = {
          ...state.allAgentsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // Get favorite agent reducers
      .addCase(favoriteAgent.pending, (state, { meta }) => {
        state.allAgentsApiInfo = {
          ...state.allAgentsApiInfo,
          loadingFavorite: meta?.arg?.id,
        };
      })
      .addCase(favoriteAgent.fulfilled, (state, action) => {
        state.allAgentsApiInfo = {
          ...state.allAgentsApiInfo,
          loadingFavorite: false,
        };
        state.allAgents = {
          ...state.allAgents,
          results: state.allAgents?.results?.map((elem) => {
            if (action?.payload?.agentId === elem?.id) {
              if (action?.payload?.results === "Agent favourited successfully")
                return {
                  ...elem,
                  favourited_by: elem?.favourited_by?.length
                    ? [...elem?.favourited_by, action.payload?.user]
                    : [action?.payload?.user],
                };
              else if (
                action?.payload?.results === "Agent unfavourited successfully"
              )
                return {
                  ...elem,
                  favourited_by: elem?.favourited_by?.length
                    ? elem?.favourited_by?.filter(
                        (filterElem) => filterElem !== action.payload?.user
                      )
                    : [],
                };
              else return elem;
            } else return elem;
          }),
        };
        state.featuredAgents = {
          ...state.featuredAgents,
          results: state.featuredAgents?.results?.map((elem) => {
            if (action?.payload?.agentId === elem?.id) {
              if (action?.payload?.results === "Agent favourited successfully")
                return {
                  ...elem,
                  favourited_by: elem?.favourited_by?.length
                    ? [...elem?.favourited_by, action.payload?.user]
                    : [action?.payload?.user],
                };
              else if (
                action?.payload?.results === "Agent unfavourited successfully"
              )
                return {
                  ...elem,
                  favourited_by: elem?.favourited_by?.length
                    ? elem?.favourited_by?.filter(
                        (filterElem) => filterElem !== action.payload?.user
                      )
                    : [],
                };
              else return elem;
            } else return elem;
          }),
        };
        // company agents
        state.companyAgents = {
          ...state.companyAgents,
          results: state.companyAgents?.results?.map((elem) => {
            if (action?.payload?.agentId === elem?.id) {
              if (action?.payload?.results === "Agent favourited successfully")
                return {
                  ...elem,
                  favourited_by: elem?.favourited_by?.length
                    ? [...elem?.favourited_by, action.payload?.user]
                    : [action?.payload?.user],
                };
              else if (
                action?.payload?.results === "Agent unfavourited successfully"
              )
                return {
                  ...elem,
                  favourited_by: elem?.favourited_by?.length
                    ? elem?.favourited_by?.filter(
                        (filterElem) => filterElem !== action.payload?.user
                      )
                    : [],
                };
              else return elem;
            } else return elem;
          }),
        };
        state.savedAgents = {
          ...state.savedAgents,
          results:
            action?.payload?.results === "Agent unfavourited successfully"
              ? state.savedAgents?.results?.filter(
                  (elem) => elem?.id !== action?.payload?.agentId
                )
              : state.savedAgents?.results,
        };
        //Selected
        state.selectedAgent =
          action?.payload?.agentId === state.selectedAgent?.id
            ? {
                ...state.selectedAgent,
                favourited_by:
                  action?.payload?.results === "Agent favourited successfully"
                    ? state.selectedAgent?.favourited_by?.length
                      ? [
                          ...state.selectedAgent?.favourited_by,
                          action.payload?.user,
                        ]
                      : [action?.payload?.user]
                    : action?.payload?.results ===
                      "Agent unfavourited successfully"
                    ? state.selectedAgent?.favourited_by?.length
                      ? state.selectedAgent?.favourited_by?.filter(
                          (filterElem) => filterElem !== action.payload?.user
                        )
                      : []
                    : state.selectedAgent?.favourited_by,
              }
            : state.selectedAgent;
      })
      .addCase(favoriteAgent.rejected, (state, action) => {
        state.allAgentsApiInfo = {
          ...state.allAgentsApiInfo,
          error: action.payload,
          loadingFavorite: false,
        };
      })
      //get suggested users
      .addCase(getSuggestedAgents.pending, (state) => {
        state.suggestedApiInfo = {
          ...state.suggestedApiInfo,
          loading: true,
        };
      })
      .addCase(getSuggestedAgents.fulfilled, (state, action) => {
        state.suggestedApiInfo = {
          ...state.suggestedApiInfo,
          loading: false,
        };
        state.suggestedAgents = action.payload;
      })
      .addCase(getSuggestedAgents.rejected, (state, action) => {
        state.suggestedApiInfo = {
          ...state.suggestedApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // Get searched agents reducers
      .addCase(queryAgents.pending, (state) => {
        state.searchAgentsApiInfo = {
          ...state.searchAgentsApiInfo,
          loading: true,
        };
      })
      .addCase(queryAgents.fulfilled, (state, action) => {
        state.searchAgentsApiInfo = {
          ...state.searchAgentsApiInfo,
          loading: false,
        };
        state.searchedAgents = action.payload;
      })
      .addCase(queryAgents.rejected, (state, action) => {
        state.searchAgentsApiInfo = {
          ...state.searchAgentsApiInfo,
          loading: false,
        };
        state.searchAgentsApiInfo = {
          ...state.searchAgentsApiInfo,
          error: action.payload,
        };
      })
      //paginated agents reducers
      .addCase(paginate.pending, (state) => {
        state.paginationApi = {
          ...state.paginationApi,
          loading: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.paginationApi = {
          ...state.paginationApi,
          loading: false,
        };
        if (action.payload.destination === AGENT_PAGINATION.SEARCHED)
          state.searchedAgents = action.payload.data;
        else state.allAgents = action.payload.data;
      })
      .addCase(paginate.rejected, (state, action) => {
        state.paginationApi = {
          ...state.paginationApi,
          loading: false,
        };
        state.paginationApi = {
          ...state.paginationApi,
          error: action.payload,
        };
      })
      // get company agents
      .addCase(getCompanyAgents.pending, (state) => {
        state.companyAgentsApiInfo = {
          ...state.companyAgentsApiInfo,
          loading: true,
        };
      })
      .addCase(getCompanyAgents.fulfilled, (state, action) => {
        state.companyAgentsApiInfo = {
          ...state.companyAgentsApiInfo,
          loading: false,
        };
        state.companyAgents = action.payload;
      })
      .addCase(getCompanyAgents.rejected, (state, action) => {
        state.companyAgentsApiInfo = {
          ...state.companyAgentsApiInfo,
          loading: false,
        };
        state.companyAgentsApiInfo = {
          ...state.companyAgentsApiInfo,
          error: action.payload,
        };
      })
      // get all private agents
      .addCase(getAllPrivateAgents.pending, (state) => {
        state.allPrivateAgentsApiInfo = {
          ...state.allPrivateAgentsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllPrivateAgents.fulfilled, (state, action) => {
        state.allPrivateAgentsApiInfo = {
          ...state.allPrivateAgentsApiInfo,
          loading: false,
        };
        state.allPrivateAgents = action.payload;
      })
      .addCase(getAllPrivateAgents.rejected, (state, action) => {
        state.allPrivateAgentsApiInfo = {
          ...state.allPrivateAgentsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // report agents
      .addCase(reportAgent.pending, (state) => {
        state.reportAgentDataApiInfo = {
          ...state.reportAgentDataApiInfo,
          loading: true,
        };
      })
      .addCase(reportAgent.fulfilled, (state, action) => {
        state.reportAgentDataApiInfo = {
          ...state.reportAgentDataApiInfo,
          loading: false,
          response: action.payload,
        };
        state.reportAgentData = action.payload;
      })
      .addCase(reportAgent.rejected, (state, action) => {
        state.reportAgentDataApiInfo = {
          ...state.reportAgentDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //get featured agents
      .addCase(getFeaturedAgents.pending, (state) => {
        state.featuredAgentsApiInfo = {
          ...state.featuredAgentsApiInfo,
          loading: true,
        };
      })
      .addCase(getFeaturedAgents.fulfilled, (state, action) => {
        state.featuredAgentsApiInfo = {
          ...state.featuredAgentsApiInfo,
          loading: false,
        };
        state.featuredAgents = action.payload;
      })
      .addCase(getFeaturedAgents.rejected, (state, action) => {
        state.featuredAgentsApiInfo = {
          ...state.featuredAgentsApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  setSelectedAgent,
  resetAddAgentRequest,
  resetAllCompanyAgentsRequest,
  resetReportAgent,
  resetSearchAgent,
} = agentSlice.actions;

export default agentSlice.reducer;
