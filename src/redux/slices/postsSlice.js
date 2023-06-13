import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_RESPONSES, API_URL } from "../../utils/constants";

const initialState = {
  allPosts: null,
  allSponsoredPosts: null,
  searchedPosts: null,
  allPostsApiInfo: {},
  replyApiInfo: {},
  createPostApiInfo: {},
  selectedPost: null,
  searchQuery: "",
  userPosts: null,
};

// get all sponsored posts
export const getAllSponsoredPosts = createAsyncThunk(
  "posts/getAllSponsoredPosts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/posts/?ceo_club=${true}&is_sponsored=${true}`,
        {
          headers: data?.token
            ? {
                Authorization: `token ${data?.token}`,
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
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/posts/`, {
        headers: data?.token
          ? {
              Authorization: `token ${data?.token}`,
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
export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/posts/?search=${data?.searchQuery}`,
        {
          headers: data?.token
            ? {
                Authorization: `token ${data?.token}`,
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
export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/posts/${data?.id}`);
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
export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/posts/?user_id=${data?.id}`,
        {
          headers: data?.token
            ? {
                Authorization: `token ${data?.token}`,
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
export const replyToPost = createAsyncThunk(
  "posts/replyToPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}zsphere/comments/`,
        data.values,
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
export const reactToPost = createAsyncThunk(
  "posts/reactToPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}zsphere/reactions/`,
        data.values,
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
export const getAllPostComments = createAsyncThunk(
  "posts/getAllPostComments",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/comments/?post_id=${data?.id}`,
        {
          headers: {
            Authorization: `token ${data?.token}`,
          },
        }
      );
      return { result: response?.data?.result, id: data?.id };
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
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}zsphere/posts/`,
        data.values,
        {
          headers: {
            Authorization: `token ${data?.token}`,
            "Content-type": "multipart/form-data",
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
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}zsphere/posts/${data?.id}/`,
        data.values,
        {
          headers: {
            Authorization: `token ${data?.token}`,
            "Content-type": "multipart/form-data",
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
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (data, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}zsphere/posts/${data?.id}/`, {
        headers: {
          Authorization: `token ${data?.token}`,
        },
      });
      return data?.id;
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
export const paginate = createAsyncThunk(
  "posts/paginate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data.url);

      return { data: response?.data, isSearched: data?.isSearched };
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
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetCreateApi: (state) => {
      state.createPostApiInfo = {};
    },
    setAllApiInfo: (state) => {
      state.allPostsApiInfo = {};
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: false,
        };
        state.allPosts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // get sponsored posts
      .addCase(getAllSponsoredPosts.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingSponsored: true,
        };
      })
      .addCase(getAllSponsoredPosts.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingSponsored: false,
        };
        state.allSponsoredPosts = action.payload;
      })
      .addCase(getAllSponsoredPosts.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingSponsored: false,
          errorSponsored: action.payload,
        };
      })
      //get searched
      .addCase(searchPosts.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: true,
        };
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: false,
        };
        state.searchedPosts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //get selected
      .addCase(getSinglePost.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingSelected: true,
        };
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingSelected: false,
        };
        state.selectedPost = action.payload;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingSelected: false,
          error: action.payload,
        };
      })
      //get user posts
      .addCase(getUserPosts.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingUserPost: true,
        };
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingUserPost: false,
        };
        state.userPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingUserPost: false,
          error: action.payload,
        };
      })
      //PAGINATE
      .addCase(paginate.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingPagination: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingPagination: false,
        };
        if (action.payload?.isSearched) {
          state.searchedPosts = {
            ...state?.allPosts,
            next: action.payload?.data?.next,
            previous: action.payload?.data?.previous,
            results: [
              ...state?.allPosts?.results,
              ...action.payload?.data?.results,
            ],
          };
        } else
          state.allPosts = {
            ...state?.allPosts,
            next: action.payload?.data?.next,
            previous: action.payload?.data?.previous,
            results: [
              ...state?.allPosts?.results,
              ...action.payload?.data?.results,
            ],
          };
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingPagination: false,
          error: action.payload,
        };
      })
      //Get post comments
      .addCase(getAllPostComments.pending, (state, { meta }) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingComments: meta?.arg?.id,
        };
      })
      .addCase(getAllPostComments.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingComments: false,
        };
        state.allPosts = {
          ...state?.allPosts,
          results: state?.allPosts?.results?.map((elem) => {
            if (elem?.id === action?.payload?.id) {
              return { ...elem, fetchedComments: action?.payload?.result };
            } else return elem;
          }),
        };
        state.selectedPost = {
          ...state?.selectedPost,
          fetchedComments: action?.payload?.result,
        };
      })
      .addCase(getAllPostComments.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingComments: false,
          error: action.payload,
        };
      })
      //create-post
      .addCase(createPost.pending, (state) => {
        state.createPostApiInfo = {
          ...state.createPostApiInfo,
          loading: true,
        };
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createPostApiInfo = {
          ...state.createPostApiInfo,
          loading: false,
          response: action.payload,
        };
        state.allPosts =
          state.allPosts !== null
            ? {
                ...state.allPosts,
                results:
                  action.payload?.visibility === "Public"
                    ? [action.payload, ...state.allPosts.results]
                    : [...state.allPosts.results],
              }
            : null;
        state.allSponsoredPosts =
          state.allSponsoredPosts !== null
            ? {
                ...state.allSponsoredPosts,
                results:
                  action.payload?.visibility === "Public"
                    ? [action.payload, ...state.allSponsoredPosts.results]
                    : [...state.allSponsoredPosts.results],
              }
            : null;
        state.userPosts =
          state.userPosts !== null
            ? {
                ...state.userPosts,
                results:
                  action.payload?.visibility === "Public"
                    ? [action.payload, ...state.userPosts?.results]
                    : [...state.userPosts?.results],
              }
            : null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPostApiInfo = {
          ...state.createPostApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //edit-post
      .addCase(editPost.pending, (state, { meta }) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingEdit: meta?.arg?.id,
          editResponseStatus: API_RESPONSES.PENDING,
        };
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingEdit: false,
          editResponseStatus: API_RESPONSES.SUCCESS,
        };
        state.allPosts = {
          ...state.allPosts,
          results: state.allPosts.results?.map((elem) => {
            if (elem?.id === action?.payload?.id) return action?.payload;
            else return elem;
          }),
        };
        // state?.selectedPost = state?.selectedPost !== null ? {...state.selectedPost , ...action?.payload}:action?.payload
        state.selectedPost =
          state?.selectedPost !== null
            ? { ...state.selectedPost, ...action?.payload }
            : action?.payload;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingEdit: false,
          editResponseStatus: API_RESPONSES.ERROR,
          editError: action.payload,
        };
      })
      //post reaction
      .addCase(reactToPost.pending, (state, { meta }) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingReaction: meta?.arg?.id,
        };
      })
      .addCase(reactToPost.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingReaction: false,
        };
        state.allPosts =
          state.allPosts !== null
            ? {
                ...state.allPosts,
                results: state.allPosts.results?.map((elem) => {
                  if (elem?.id === action?.payload?.post_fk)
                    return {
                      ...elem,
                      user_reaction: action?.payload,
                      reactions_count: elem?.reactions_count + 1,
                      reactions: {
                        ...elem?.reactions,
                        [action.payload?.reaction]:
                          elem?.reactions?.[action.payload?.reaction] + 1,
                      },
                    };
                  else return elem;
                }),
              }
            : null;
        state.userPosts =
          state.userPosts !== null
            ? {
                ...state.userPosts,
                results: state.userPosts.results?.map((elem) => {
                  if (elem?.id === action?.payload?.post_fk)
                    return {
                      ...elem,
                      user_reaction: action?.payload,
                      reactions_count: elem?.reactions_count + 1,
                      reactions: {
                        ...elem?.reactions,
                        [action.payload?.reaction]:
                          elem?.reactions?.[action.payload?.reaction] + 1,
                      },
                    };
                  else return elem;
                }),
              }
            : null;
        state.selectedPost =
          state?.selectedPost !== null
            ? {
                ...state.selectedPost,
                user_reaction: action?.payload,
                reactions_count: state.selectedPost?.reactions_count + 1,
                reactions: {
                  ...state?.selectedPost?.reactions,
                  [action.payload?.reaction]:
                    state?.selectedPost?.reactions?.[action.payload?.reaction] +
                    1,
                },
              }
            : null;
      })
      .addCase(reactToPost.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingReaction: false,
          reactError: action.payload,
        };
      })
      //delete-post
      .addCase(deletePost.pending, (state, { meta }) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingDelete: meta?.arg?.id,
        };
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingDelete: false,
        };
        state.allPosts = {
          ...state.allPosts,
          results: state.allPosts.results?.filter(
            (elem) => elem?.id !== action.payload
          ),
        };
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingDelete: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetCreateApi,
  setSelectedPost,
  setAllApiInfo,
  setSearchQuery,
} = postsSlice.actions;
export default postsSlice.reducer;
