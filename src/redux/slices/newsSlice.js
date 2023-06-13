import axios from "axios";
import { API_URL } from "../../utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  allNews: null,
  latestNews: null,
  selectedStory: null,
  selectedBlog: null,
  newsApiInfo: {},
  allBlogs: null,
  newsSearch: "",
  blogsSearch: "",
  blogsApiInfo: {},
};

export const getAllNews = createAsyncThunk(
  "news/getAllNews",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/news/`);
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
export const getAllBlogs = createAsyncThunk(
  "news/getAllBlogs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/blogs/`);
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
export const getLatestNews = createAsyncThunk(
  "news/getLatestNews",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/news/?order_by=latest`
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
export const likeNewsStory = createAsyncThunk(
  "news/likeNewsStory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}zsphere/news-like/`,
        data.values,
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
export const getNewsStory = createAsyncThunk(
  "news/getNewsStory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/news/${data?.id}`);
      // console.log({ response });
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
export const getBlog = createAsyncThunk(
  "news/getBlog",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/blogs/${data?.id}`);
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
export const likeBlogStory = createAsyncThunk(
  "news/likeBlogStory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}zsphere/blogs-like/`,
        data.values,
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
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetNewsApi: (state) => {
      state.newsApiInfo = {};
    },
    setSelectedStory: (state, action) => {
      state.selectedStory = action.payload;
    },
    setNewsSearch: (state, action) => {
      state.newsSearch = action.payload;
    },
    setBlogsSearch: (state, action) => {
      state.blogsSearch = action.payload;
    },
    resetSearch: (state) => {
      state.newsSearch = "";
      state.blogsSearch = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingAllNews: true,
        };
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingAllNews: false,
        };
        state.allNews = action.payload;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingAllNews: false,
          error: action.payload,
        };
      })
      //all blogs
      .addCase(getAllBlogs.pending, (state) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingAllBlogs: true,
        };
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingAllBlogs: false,
        };
        state.allBlogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingAllBlogs: false,
          error: action.payload,
        };
      })
      //latest-news
      .addCase(getLatestNews.pending, (state) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingLatestNews: true,
        };
      })
      .addCase(getLatestNews.fulfilled, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingLatestNews: false,
        };
        state.latestNews = action.payload;
      })
      .addCase(getLatestNews.rejected, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingLatestNews: false,
          error: action.payload,
        };
      })
      //like-news
      .addCase(likeNewsStory.pending, (state) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingLikeNews: true,
        };
      })
      .addCase(likeNewsStory.fulfilled, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingLikeNews: false,
          likeResponse: action.payload,
        };
      })
      .addCase(likeNewsStory.rejected, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingLikeNews: false,
          error: action.payload,
        };
      })
      //get story
      .addCase(getNewsStory.pending, (state) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingStory: true,
        };
      })
      .addCase(getNewsStory.fulfilled, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingStory: false,
        };
        state.selectedStory = action.payload;
      })
      .addCase(getNewsStory.rejected, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingStory: false,
          error: action.payload,
        };
      })
      //get Blog
      .addCase(getBlog.pending, (state) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingStory: true,
        };
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingStory: false,
        };
        state.selectedBlog = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.newsApiInfo = {
          ...state.newsApiInfo,
          loadingStory: false,
          error: action.payload,
        };
      })
      //like-blogs
      .addCase(likeBlogStory.pending, (state) => {
        state.blogsApiInfo = {
          ...state.blogsApiInfo,
          loadingLikeBlog: true,
        };
      })
      .addCase(likeBlogStory.fulfilled, (state, action) => {
        state.blogsApiInfo = {
          ...state.blogsApiInfo,
          loadingLikeBlog: false,
          bloglikeResponse: action.payload,
        };
      })
      .addCase(likeBlogStory.rejected, (state, action) => {
        state.blogsApiInfo = {
          ...state.blogsApiInfo,
          loadingLikeBlog: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetNewsApi,
  setSelectedStory,
  setNewsSearch,
  setBlogsSearch,
  resetSearch,
} = newsSlice.actions;
export default newsSlice.reducer;
