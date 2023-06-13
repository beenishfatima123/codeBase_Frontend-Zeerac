import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const initialState = {
  allProperties: null,
  allPropertiesApiInfo: {},
  highlightedProperty: null,
  highlightedPropertyInfo: {},
  searchedProperty: null,
  searchedPropertyApiInfo: {},
  allRegionalProperties: null,
  allRegionalPropertiesApiInfo: {},
  allGlobalProperties: null,
  allGlobalPropertiesApiInfo: {},
  propertyToEdit: null,
  propertyUpdateInfo: null,
  updateApiInfo: {},
  reportPropertyData: null,
  reportPropertyDataApiInfo: {},
  verifySoldListingsData: null,
  verifySoldListingsDataApiInfo: {},
  activeMarker: null,
  isFilterVisible: true,
  myProperties: null,
  myPropertiesApiInfo: {},
  otherProperties: null,
  otherPropertiesApiInfo: {},
};

export const getAllProperties = createAsyncThunk(
  "properties/getAllProperties",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property?${data?.queryData}`
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
// all regional properties
export const getAllRegionalProperties = createAsyncThunk(
  "properties/getAllRegionalProperties",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property?search_place=${
          data?.country
            ? data?.country !== "undefined"
              ? data?.country
              : "pakistan"
            : `pakistan`
        }&${data?.queryData}`
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
// all global properties
export const getAllGlobalProperties = createAsyncThunk(
  "properties/getAllGlobalProperties",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property?country_exclude=${
          data?.country
            ? data?.country !== "undefined"
              ? data?.country
              : ""
            : ``
        }&${data?.queryData}`
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
//my properties
export const getMyProperties = createAsyncThunk(
  "properties/getMyProperties",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property?${data?.queryData}`
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
// other properties
export const getOtherProperties = createAsyncThunk(
  "properties/getOtherProperties",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property/${data?.id}/related/`
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
export const getSpecificProperties = createAsyncThunk(
  "properties/getSpecificProperties",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/property/${data?.id}`);
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
export const queryProperties = createAsyncThunk(
  "properties/queryProperties",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property?search=${data?.query}`
      );
      return { data: response?.data, destination: data?.destination };
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
  "properties/paginate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data.url);
      return {
        data: response?.data,
        destination: data?.destination,
        isSearch: data?.isSearch,
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
export const updateProperty = createAsyncThunk(
  "properties/updateProperty",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}users/property/${data?.id}/`,
        data?.form,
        {
          headers: {
            Authorization: `Token ${data?.token}`,
          },
        }
      );
      // console.log({ res: response?.data.result });
      return response?.data.result;
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
export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (data, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}users/property/${data?.id}`, {
        headers: {
          Authorization: `Token ${data?.token}`,
        },
      });
      return data.id;
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
export const deletePropertyImage = createAsyncThunk(
  "properties/deletePropertyImage",
  async (data, thunkAPI) => {
    try {
      // eslint-disable-next-line
      const res = await axios.delete(`${API_URL}users/images/${data?.id}`, {
        headers: {
          Authorization: `Token ${data?.token}`,
        },
      });
      // console.log({ res });
      return data;
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
// return properties wihting a specified range of co-ordinates
export const getPropertiesInRadius = createAsyncThunk(
  "properties/getPropertiesInRadius",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property-in-radius/?lat=${data?.lat}&lng=${data?.lng}&radius=${data.radius}`
      );
      console.log({ response });
      return response;
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
export const favoriteProperty = createAsyncThunk(
  "properties/favoriteProperty",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/property-favorite/`,
        { property_id: data?.id },
        {
          headers: {
            Authorization: `Token ${data?.token}`,
          },
        }
      );
      return {
        propertyId: data?.id,
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
// report a listing
export const reportProperty = createAsyncThunk(
  "agents/reportProperty",
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
// verify sold listings
export const verifySoldListings = createAsyncThunk(
  "properties/verifySoldListings",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/verification/`,
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
export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    resetProperties: (state) => {
      state.allPropertiesApiInfo = {};
    },
    resetUpdate: (state) => {
      state.updateApiInfo = {};
    },
    setGlobalProperties: (state, action) => {
      state.allGlobalProperties = action.payload;
    },
    setHighlightedProperty: (state, action) => {
      state.highlightedProperty = action.payload;
    },
    setPropertyToEdit: (state, action) => {
      state.propertyToEdit = action.payload;
    },
    setPropertyUpdateInfo: (state, action) => {
      state.propertyUpdateInfo = action.payload;
    },
    resetReportProperty: (state) => {
      state.reportPropertyDataApiInfo = {};
    },
    setVerifySoldListings: (state, action) => {
      state.verifySoldListingsData = action.payload;
    },
    resetVerifySoldListingsApi: (state, action) => {
      state.verifySoldListingsDataApiInfo = {};
    },
    setActiveMarker: (state, action) => {
      state.activeMarker = action?.payload;
    },
    setFilterVisibility: (state, action) => {
      state.isFilterVisible = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProperties.pending, (state) => {
        state.allPropertiesApiInfo = {
          ...state.allPropertiesApiInfo,
          loading: true,
        };
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.allPropertiesApiInfo = {
          ...state.allPropertiesApiInfo,
          loading: false,
        };
        state.allProperties = action.payload;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.allPropertiesApiInfo = {
          ...state.allPropertiesApiInfo,
          loading: false,
        };
        state.allPropertiesApiInfo = {
          ...state.allPropertiesApiInfo,
          error: action.payload,
        };
      })
      .addCase(getSpecificProperties.pending, (state) => {
        state.highlightedPropertyInfo = {
          ...state.highlightedPropertyInfo,
          loading: true,
        };
      })
      .addCase(getSpecificProperties.fulfilled, (state, action) => {
        state.highlightedPropertyInfo = {
          ...state.highlightedPropertyInfo,
          loading: false,
        };
        state.highlightedProperty = action.payload;
      })
      .addCase(getSpecificProperties.rejected, (state, action) => {
        state.highlightedPropertyInfo = {
          ...state.highlightedPropertyInfo,
          loading: false,
        };
        state.highlightedPropertyInfo = {
          ...state.highlightedPropertyInfo,
          error: action.payload,
        };
      })
      //query
      .addCase(queryProperties.pending, (state) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          loading: true,
        };
        state.allRegionalPropertiesApiInfo = {
          ...state.allRegionalPropertiesApiInfo,
          loading: true,
        };
        state.searchedPropertyApiInfo = {
          ...state.searchedPropertyApiInfo,
          loading: true,
        };
      })
      .addCase(queryProperties.fulfilled, (state, action) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          loading: false,
        };
        state.allRegionalPropertiesApiInfo = {
          ...state.allRegionalPropertiesApiInfo,
          loading: false,
        };

        state.searchedPropertyApiInfo = {
          ...state.searchedPropertyApiInfo,
          loading: false,
        };

        if (action?.payload?.destination === "global")
          state.allGlobalProperties = action.payload.data;
        else {
          // state.allRegionalProperties = action.payload.data;
          state.searchedProperty = action.payload.data;
        }
      })
      .addCase(queryProperties.rejected, (state, action) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          loading: false,
          error: action.payload,
        };
        state.allRegionalPropertiesApiInfo = {
          ...state.allRegionalPropertiesApiInfo,
          loading: false,
          error: action.payload,
        };
        state.searchedPropertyApiInfo = {
          ...state.searchedPropertyApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // all regional properties
      .addCase(getAllRegionalProperties.pending, (state) => {
        state.allRegionalPropertiesApiInfo = {
          ...state.allRegionalPropertiesApiInfo,
          loading: true,
        };
      })
      .addCase(getAllRegionalProperties.fulfilled, (state, action) => {
        state.allRegionalPropertiesApiInfo = {
          ...state.allRegionalPropertiesApiInfo,
          loading: false,
        };
        state.searchedProperty = null;
        state.allRegionalProperties = action.payload;
      })
      .addCase(getAllRegionalProperties.rejected, (state, action) => {
        state.allRegionalPropertiesApiInfo = {
          ...state.allRegionalPropertiesApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // all global properties
      .addCase(getAllGlobalProperties.pending, (state) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          loading: true,
        };
      })
      .addCase(getAllGlobalProperties.fulfilled, (state, action) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          loading: false,
        };
        state.allGlobalProperties = action.payload;
      })
      .addCase(getAllGlobalProperties.rejected, (state, action) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // my properties
      .addCase(getMyProperties.pending, (state) => {
        state.myPropertiesApiInfo = {
          ...state.myPropertiesApiInfo,
          loading: true,
        };
      })
      .addCase(getMyProperties.fulfilled, (state, action) => {
        state.myPropertiesApiInfo = {
          ...state.myPropertiesApiInfo,
          loading: false,
        };
        state.myProperties = action.payload;
      })
      .addCase(getMyProperties.rejected, (state, action) => {
        state.myPropertiesApiInfo = {
          ...state.myPropertiesApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // other properties
      .addCase(getOtherProperties.pending, (state) => {
        state.otherPropertiesApiInfo = {
          ...state.otherPropertiesApiInfo,
          loading: true,
        };
      })
      .addCase(getOtherProperties.fulfilled, (state, action) => {
        state.otherPropertiesApiInfo = {
          ...state.otherPropertiesApiInfo,
          loading: false,
        };
        state.otherProperties = action.payload;
      })
      .addCase(getOtherProperties.rejected, (state, action) => {
        state.otherPropertiesApiInfo = {
          ...state.otherPropertiesApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // update properties
      .addCase(updateProperty.pending, (state) => {
        state.updateApiInfo = {
          ...state.updateApiInfo,
          updating: true,
        };
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.updateApiInfo = {
          ...state.updateApiInfo,
          updating: false,
          success: true,
        };
        state.myProperties = {
          ...state.myProperties,
          result: {
            ...state.myProperties?.result,
            results: state.myProperties?.result?.results?.map((elem) => {
              if (elem?.id === action.payload?.id) return action.payload;
              else return elem;
            }),
          },
        };
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.updateApiInfo = {
          ...state.updateApiInfo,
          updating: false,
          error: action.payload,
        };
      })
      // delete properties
      .addCase(deleteProperty.pending, (state) => {
        state.myPropertiesApiInfo = {
          ...state.myPropertiesApiInfo,
          loading: true,
        };
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.myPropertiesApiInfo = {
          ...state.myPropertiesApiInfo,
          loading: false,
        };
        state.myProperties = {
          ...state.myProperties,
          result: {
            ...state.myProperties?.result,
            count: state.myProperties?.result?.count - 1,
            results: state.myProperties?.result?.results?.filter(
              (elem) => elem?.id !== action.payload
            ),
          },
        };
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.myPropertiesApiInfo = {
          ...state.myPropertiesApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(favoriteProperty.pending, (state, { meta }) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          loadingFavorite: meta?.arg?.id,
        };
        state.allRegionalPropertiesApiInfo = {
          ...state.allRegionalPropertiesApiInfo,
          loadingFavorite: meta?.arg?.id,
        };
      })
      .addCase(favoriteProperty.fulfilled, (state, action) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          loadingFavorite: false,
        };
        state.allRegionalPropertiesApiInfo = {
          ...state.allRegionalPropertiesApiInfo,
          loadingFavorite: false,
        };
        //global
        state.allGlobalProperties = {
          ...state.allGlobalProperties,
          result: {
            ...state.allGlobalProperties?.result,
            results: state.allGlobalProperties?.result?.results?.map((elem) => {
              if (action?.payload?.propertyId === elem?.id) {
                if (action?.payload?.result === "Property favorited")
                  return {
                    ...elem,
                    favorites_count: elem?.favorites_count?.length
                      ? [...elem?.favorites_count, action.payload?.user]
                      : [action?.payload?.user],
                  };
                else if (action?.payload?.result === "Property un-favorite")
                  return {
                    ...elem,
                    favorites_count: elem?.favorites_count?.length
                      ? elem?.favorites_count?.filter(
                          (filterElem) => filterElem !== action.payload?.user
                        )
                      : [],
                  };
                else return elem;
              } else return elem;
            }),
          },
        };
        // Regional
        state.allRegionalProperties = {
          ...state.allRegionalProperties,
          result: {
            ...state.allRegionalProperties?.result,
            results: state.allRegionalProperties?.result?.results?.map(
              (elem) => {
                if (action?.payload?.propertyId === elem?.id) {
                  if (action?.payload?.result === "Property favorited")
                    return {
                      ...elem,
                      favorites_count: elem?.favorites_count?.length
                        ? [...elem?.favorites_count, action.payload?.user]
                        : [action?.payload?.user],
                    };
                  else if (action?.payload?.result === "Property un-favorite")
                    return {
                      ...elem,
                      favorites_count: elem?.favorites_count?.length
                        ? elem?.favorites_count?.filter(
                            (filterElem) => filterElem !== action.payload?.user
                          )
                        : [],
                    };
                  else return elem;
                } else return elem;
              }
            ),
          },
        };
        //Selected
        state.highlightedProperty =
          action?.payload?.propertyId === state.highlightedProperty?.id
            ? {
                ...state.highlightedProperty,
                favorites_count:
                  action?.payload?.result === "Property favorited"
                    ? state.highlightedProperty?.favorites_count?.length
                      ? [
                          ...state.highlightedProperty?.favorites_count,
                          action.payload?.user,
                        ]
                      : [action?.payload?.user]
                    : action?.payload?.result === "Property un-favorite"
                    ? state.highlightedProperty?.favorites_count?.length
                      ? state.highlightedProperty?.favorites_count?.filter(
                          (filterElem) => filterElem !== action.payload?.user
                        )
                      : []
                    : state.highlightedProperty?.favorites_count,
              }
            : state.highlightedProperty;
      })
      .addCase(favoriteProperty.rejected, (state, action) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          loadingFavorite: false,
          error: action.payload,
        };
        state.allRegionalPropertiesApiInfo = {
          ...state.allRegionalPropertiesApiInfo,
          loadingFavorite: false,
        };
      })
      // delete property Image
      .addCase(deletePropertyImage.pending, (state) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          deletingImage: true,
        };
      })
      .addCase(deletePropertyImage.fulfilled, (state, action) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          deletingImage: false,
        };
        state.allGlobalProperties = {
          ...state.allGlobalProperties,
          result: {
            ...state.allGlobalProperties?.result,
            results: state.allGlobalProperties?.result?.results?.map((elem) => {
              if (elem?.id === action.payload.property) {
                return {
                  ...elem,
                  [action.payload.attribute]: elem?.[
                    action.payload.attribute
                  ]?.filter((imageElem) => imageElem?.id !== action.payload.id),
                };
              } else return elem;
            }),
          },
        };
        state.propertyToEdit = {
          ...state.propertyToEdit,
          [action.payload.attribute]: state.propertyToEdit?.[
            action.payload.attribute
          ]?.filter((imageElem) => imageElem?.id !== action.payload.id),
        };
      })
      .addCase(deletePropertyImage.rejected, (state, action) => {
        state.allGlobalPropertiesApiInfo = {
          ...state.allGlobalPropertiesApiInfo,
          deletingImage: false,
          error: action.payload,
        };
      })
      //paginate
      .addCase(paginate.pending, (state, { meta }) => {
        if (meta?.arg?.destination === "global") {
          state.allGlobalPropertiesApiInfo = {
            ...state.allGlobalPropertiesApiInfo,
            loading: true,
          };
        } else {
          state.allRegionalPropertiesApiInfo = {
            ...state.allRegionalPropertiesApiInfo,
            loading: true,
          };
        }
        if (meta?.arg?.isSearch) {
          state.searchedPropertyApiInfo = {
            ...state.searchedPropertyApiInfo,
            loading: true,
          };
        }
      })
      .addCase(paginate.fulfilled, (state, action) => {
        if (action?.payload?.destination === "global") {
          state.allGlobalPropertiesApiInfo = {
            ...state.allGlobalPropertiesApiInfo,
            loading: false,
          };
          state.allGlobalProperties = action.payload.data;
        } else {
          state.allRegionalPropertiesApiInfo = {
            ...state.allRegionalPropertiesApiInfo,
            loading: false,
          };
          state.allRegionalProperties = action.payload.data;
        }
        if (action?.payload?.isSearch) {
          state.searchedPropertyApiInfo = {
            ...state.searchedPropertyApiInfo,
            loading: false,
          };
          state.searchedProperty = action.payload.data;
        }
      })
      .addCase(paginate.rejected, (state, action) => {
        if (action?.payload?.destination === "global") {
          state.allGlobalPropertiesApiInfo = {
            ...state.allGlobalPropertiesApiInfo,
            loading: false,
            error: action.payload,
          };
        } else {
          state.allRegionalPropertiesApiInfo = {
            ...state.allRegionalPropertiesApiInfo,
            loading: false,
            error: action.payload,
          };
        }
      })
      // report listing
      .addCase(reportProperty.pending, (state) => {
        state.reportPropertyDataApiInfo = {
          ...state.reportPropertyDataApiInfo,
          loading: true,
        };
      })
      .addCase(reportProperty.fulfilled, (state, action) => {
        state.reportPropertyDataApiInfo = {
          ...state.reportPropertyDataApiInfo,
          loading: false,
          response: action.payload,
        };
        state.reportPropertyData = action.payload;
      })
      .addCase(reportProperty.rejected, (state, action) => {
        state.reportPropertyDataApiInfo = {
          ...state.reportPropertyDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // verify sold listings
      .addCase(verifySoldListings.pending, (state) => {
        state.verifySoldListingsDataApiInfo = {
          ...state.verifySoldListingsDataApiInfo,
          loading: true,
        };
      })
      .addCase(verifySoldListings.fulfilled, (state, action) => {
        state.verifySoldListingsDataApiInfo = {
          ...state.verifySoldListingsDataApiInfo,
          loading: false,
          response: action.payload,
        };
        state.verifySoldListingsData = action.payload;
        state.myProperties = {
          ...state.myProperties,
          result: {
            ...state.myProperties?.result,
            count: state.myProperties?.result?.count - 1,
            results: state.myProperties?.result?.results?.filter(
              (elem) => elem?.id !== action.payload?.property?.id
            ),
          },
        };
      })
      .addCase(verifySoldListings.rejected, (state, action) => {
        state.verifySoldListingsDataApiInfo = {
          ...state.verifySoldListingsDataApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetProperties,
  setHighlightedProperty,
  setPropertyToEdit,
  setPropertyUpdateInfo,
  resetUpdate,
  resetReportProperty,
  setVerifySoldListings,
  resetVerifySoldListingsApi,
  setGlobalProperties,
  setActiveMarker,
  setFilterVisibility,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
