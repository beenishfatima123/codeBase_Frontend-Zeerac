import axios from "axios";
import { API_URL } from "../../utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCourses: null,
  courseDetail: null,
  courseModule: null,
  moduleQuiz: null,
  quizResult: null,
  getQuizResult: null,
  historyData: {},
  postCourseHistory: null,
  updateCourseHistory: null,
  activeVideo: null,
  videoStatus: {
    id: null,
    status: "",
  },
  allCoursesApiInfo: {},
  courseDetailApiInfo: {},
  courseModulesApiInfo: {},
  moduleQuizApiInfo: {},
  postCourseHistoryApiInfo: {},
  updateCourseHistoryApiInfo: {},
  quizResultApiInfo: {},
  getQuizResultApiInfo: {},
};
// get all course
export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}elearning/course/`, {
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
// get course detail
export const getCourseDetail = createAsyncThunk(
  "courses/getCourseDetail",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}elearning/course/${data?.id}`,
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
// get module detail
export const getCourseModules = createAsyncThunk(
  "courses/getCourseModules",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}elearning/module/${data?.id}`,
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
// post video progress
export const postCourseHistory = createAsyncThunk(
  "courses/postCourseHistory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}elearning/user-video-progress/`,
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
// update video progress
export const updateCourseHistory = createAsyncThunk(
  "courses/updateCourseHistory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}elearning/user-video-progress/${data?.id}/`,
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
// get Module Quiz
export const getModuleQuiz = createAsyncThunk(
  "courses/getModuleQuiz",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}elearning/module-question/?module=${data?.id}`,
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
// post quiz submission
export const postQuizSubmission = createAsyncThunk(
  "courses/postQuizSubmission",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}elearning/quiz-submissions/`,
        data?._data,
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
// get quiz submission
export const getQuizSubmission = createAsyncThunk(
  "courses/getQuizSubmission",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}elearning/quiz-submissions/?user=${data?.userId}&module=${data?.moduleId}`,
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

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setActiveVideo: (state, action) => {
      state.activeVideo = action.payload;
    },
    setVideoStatus: (state, action) => {
      state.videoStatus = action.payload;
    },
    setHistoryData: (state, action) => {
      state.historyData = action.payload;
    },
    resetQuizResult: (state, action) => {
      state.quizResultApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // all courses
      .addCase(getAllCourses.pending, (state) => {
        state.allCoursesApiInfo = {
          ...state.allCoursesApiInfo,
          loading: true,
        };
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.allCoursesApiInfo = {
          ...state.allCoursesApiInfo,
          loading: false,
        };
        state.allCourses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.allCoursesApiInfo = {
          ...state.allCoursesApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // course detail
      .addCase(getCourseDetail.pending, (state) => {
        state.courseDetailApiInfo = {
          ...state.courseDetailApiInfo,
          loading: true,
        };
      })
      .addCase(getCourseDetail.fulfilled, (state, action) => {
        state.courseDetailApiInfo = {
          ...state.courseDetailApiInfo,
          loading: false,
        };
        state.courseDetail = action.payload;
      })
      .addCase(getCourseDetail.rejected, (state, action) => {
        state.courseDetailApiInfo = {
          ...state.courseDetailApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // course modules
      .addCase(getCourseModules.pending, (state) => {
        state.courseModulesApiInfo = {
          ...state.courseModulesApiInfo,
          loading: true,
        };
      })
      .addCase(getCourseModules.fulfilled, (state, action) => {
        state.courseModulesApiInfo = {
          ...state.courseModulesApiInfo,
          loading: false,
        };
        state.courseModule = action.payload;
      })
      .addCase(getCourseModules.rejected, (state, action) => {
        state.courseModulesApiInfo = {
          ...state.courseModulesApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // post course history
      .addCase(postCourseHistory.pending, (state) => {
        state.postCourseHistoryApiInfo = {
          ...state.postCourseHistoryApiInfo,
          loading: true,
        };
      })
      .addCase(postCourseHistory.fulfilled, (state, action) => {
        state.postCourseHistoryApiInfo = {
          ...state.postCourseHistoryApiInfo,
          loading: false,
        };
        state.postCourseHistory = action.payload;
        state.courseModule = {
          ...state.courseModule,
          result: {
            ...state?.courseModule?.result,
            videos: state.courseModule?.result?.videos?.map((item) => {
              if (item?.id === action?.payload?.video) {
                return {
                  ...item,
                  user_progress: action?.payload,
                };
              } else {
                return item;
              }
            }),
          },
        };
        state.activeVideo = {
          ...state.activeVideo,
          user_progress: action?.payload,
        };
      })
      .addCase(postCourseHistory.rejected, (state, action) => {
        state.postCourseHistoryApiInfo = {
          ...state.postCourseHistoryApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // update course history
      .addCase(updateCourseHistory.pending, (state) => {
        state.updateCourseHistoryApiInfo = {
          ...state.updateCourseHistoryApiInfo,
          loading: true,
        };
      })
      .addCase(updateCourseHistory.fulfilled, (state, action) => {
        state.updateCourseHistoryApiInfo = {
          ...state.updateCourseHistoryApiInfo,
          loading: false,
        };
        state.updateCourseHistory = action.payload;

        state.courseModule = {
          ...state.courseModule,
          result: {
            ...state?.courseModule?.result,
            videos: state.courseModule?.result?.videos?.map((item) => {
              if (item?.id === action?.payload?.video) {
                return {
                  ...item,
                  user_progress: action?.payload,
                };
              } else {
                return item;
              }
            }),
          },
        };
        state.courseModule = {
          ...state.courseModule,
          result: {
            ...state?.courseModule?.result,
            user_module_progress: {
              ...state?.courseModule?.result?.user_module_progress,
              is_completed: state?.courseModule?.result?.videos?.every(
                (video) => video?.user_progress?.has_watched
              ),
            },
          },
        };

        state.activeVideo = {
          ...state.activeVideo,
          user_progress: action?.payload,
        };
      })
      .addCase(updateCourseHistory.rejected, (state, action) => {
        state.updateCourseHistoryApiInfo = {
          ...state.updateCourseHistoryApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // get module quiz
      .addCase(getModuleQuiz.pending, (state) => {
        state.moduleQuizApiInfo = {
          ...state.moduleQuizApiInfo,
          loading: true,
        };
      })
      .addCase(getModuleQuiz.fulfilled, (state, action) => {
        state.moduleQuizApiInfo = {
          ...state.moduleQuizApiInfo,
          loading: false,
        };
        state.moduleQuiz = action.payload;
      })
      .addCase(getModuleQuiz.rejected, (state, action) => {
        state.moduleQuizApiInfo = {
          ...state.moduleQuizApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // post quiz submission
      .addCase(postQuizSubmission.pending, (state) => {
        state.quizResultApiInfo = {
          ...state.quizResultApiInfo,
          loading: true,
        };
      })
      .addCase(postQuizSubmission.fulfilled, (state, action) => {
        state.quizResultApiInfo = {
          ...state.quizResultApiInfo,
          loading: false,
          response: action.payload,
        };
        state.quizResult = action.payload;
      })
      .addCase(postQuizSubmission.rejected, (state, action) => {
        state.quizResultApiInfo = {
          ...state.quizResultApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // get quiz submission
      .addCase(getQuizSubmission.pending, (state) => {
        state.getQuizResultApiInfo = {
          ...state.getQuizResultApiInfo,
          loading: true,
        };
      })
      .addCase(getQuizSubmission.fulfilled, (state, action) => {
        state.getQuizResultApiInfo = {
          ...state.getQuizResultApiInfo,
          loading: false,
        };
        state.getQuizResult = action.payload;
      })
      .addCase(getQuizSubmission.rejected, (state, action) => {
        state.getQuizResultApiInfo = {
          ...state.getQuizResultApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetQuizResult,
  setActiveVideo,
  setVideoStatus,
  setHistoryData,
} = courseSlice.actions;
export default courseSlice.reducer;
