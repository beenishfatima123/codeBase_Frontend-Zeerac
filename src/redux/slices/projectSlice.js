import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const initialState = {
  allProjects: null,
  allProjectsApiInfo: {},
  projectDetails: null,
  projectDetailsApiInfo: {},
  otherProjects: null,
  otherProjectsApiInfo: {},
  projectLikeApiInfo: {},
};

export const getAllProjects = createAsyncThunk(
  "projects/getAllProjects",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/new-project/`);
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

export const getProjectDetails = createAsyncThunk(
  "projects/getProjectDetails",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        API_URL + `users/new-project/${data?.id}`
      );
      return response.data?.result;
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

export const getOtherProjects = createAsyncThunk(
  "projects/getOtherProjects",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        API_URL + `users/new-project/${data?.id}/related/`
      );
      return response.data;
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

export const favoriteProject = createAsyncThunk(
  "projects/favoriteProject",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/new-project-like/`,
        { project_id: data?.id },
        {
          headers: {
            Authorization: `Token ${data?.token}`,
          },
        }
      );
      return {
        projectId: data?.id,
        result: response?.data?.message,
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

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectDetails: (state, action) => {
      state.projectDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          loading: false,
        };
        state.allProjects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          loading: false,
        };
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          error: action.payload,
        };
      })
      .addCase(getProjectDetails.pending, (state) => {
        state.projectDetailsApiInfo = {
          ...state.projectDetailsApiInfo,
          loading: true,
        };
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.projectDetailsApiInfo = {
          ...state.projectDetailsApiInfo,
          loading: false,
        };
        state.projectDetails = action.payload;
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        state.projectDetailsApiInfo = {
          ...state.projectDetailsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // other projects
      .addCase(getOtherProjects.pending, (state) => {
        state.otherProjectsApiInfo = {
          ...state.otherProjectsApiInfo,
          loading: true,
        };
      })
      .addCase(getOtherProjects.fulfilled, (state, action) => {
        state.otherProjectsApiInfo = {
          ...state.otherProjectsApiInfo,
          loading: false,
        };
        state.otherProjects = action.payload;
      })
      .addCase(getOtherProjects.rejected, (state, action) => {
        state.otherProjectsApiInfo = {
          ...state.otherProjectsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //favorite project
      .addCase(favoriteProject.pending, (state) => {
        state.projectLikeApiInfo = {
          ...state.projectLikeApiInfo,
          loading: true,
        };
      })
      .addCase(favoriteProject.fulfilled, (state, action) => {
        state.projectLikeApiInfo = {
          ...state.projectLikeApiInfo,
          loading: false,
        };
        state.allProjects = {
          ...state.allProjects,
          result: {
            ...state.allProjects?.result,
            results: state.allProjects?.result?.results?.map((elem) => {
              if (elem?.id === action.payload?.projectId) {
                return {
                  ...elem,
                  liked_by: elem?.liked_by?.length
                    ? action?.payload?.result === "NewProject liked"
                      ? [...elem.liked_by, action.payload?.user]
                      : state?.projectDetails?.liked_by?.filter(
                          (filterElem) => filterElem !== action.payload?.user
                        )
                    : action?.payload?.result === "NewProject liked"
                    ? [action.payload?.user]
                    : [],
                };
              } else return elem;
            }),
          },
        };
        state.projectDetails = {
          ...state.projectDetails,
          liked_by: state.projectDetails?.liked_by?.length
            ? action?.payload?.result === "NewProject liked"
              ? [...state.projectDetails.liked_by, action.payload?.user]
              : state?.projectDetails?.liked_by?.filter(
                  (filterElem) => filterElem !== action.payload?.user
                )
            : action?.payload?.result === "NewProject liked"
            ? [action.payload?.user]
            : [],
        };
      })
      .addCase(favoriteProject.rejected, (state, action) => {
        state.projectLikeApiInfo = {
          ...state.projectLikeApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const { setProjectDetails } = projectSlice.actions;
export default projectSlice.reducer;
