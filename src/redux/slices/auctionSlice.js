import axios from "axios";
import { API_URL } from "../../utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAuctionsData: null,
  allAuctionsDataApiInfo: {},
  userAuctionsData: null,
  userAuctionsDataApiInfo: {},
  queryAuctionData: null,
  auctionBids: {},
  auctionUpdateInfo: null,
  auctionBidsApiInfo: {},
  auctionDetail: null,
  userAuctionBids: {},
  userAuctionBidsApiInfo: {},
  auctionToEdit: null,
  auctionDetailApiInfo: {},
  showAuctionDetail: null,
  rejectBidApiInfo: {},
  otherAuctions: null,
  otherAuctionsApiInfo: {},
};
// get all auctions
export const getAllAuctions = createAsyncThunk(
  "auctions/getAllAuctions",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property-files/${data}&past=false`
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
// get user auctions
export const getUserAuctions = createAsyncThunk(
  "auctions/getUserAuctions",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property-files/?all=true&${data}`
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
// get auction bids
export const getAuctionBids = createAsyncThunk(
  "auctions/getAuctionBids",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property-files-bid/?auction_id=${data?.auctionId}&status=pending`,
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
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
// get a user auction bids
export const getUserAuctionBids = createAsyncThunk(
  "auctions/getUserAuctionBids",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property-files-bid/?auction_id=${data?.auctionId}&all=true`,
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
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
// create bid on auction
export const placeBid = createAsyncThunk(
  "auctions/placeBid",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/property-files-bid/?`,
        data.bidData,
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
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
// accept bid
export const acceptABid = createAsyncThunk(
  "auctions/acceptABid",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}users/property-files-trade/`,
        data.transactionData,
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
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
// reject bid
export const rejectABid = createAsyncThunk(
  "auctions/rejectABid",
  async (data, thunkAPI) => {
    try {
      await axios.post(
        `${API_URL}users/property-files-bid/${data?.id}/reject/`,
        {},
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
      );

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
// paginate through auctions returning data with destination
export const paginateAuctions = createAsyncThunk(
  "auctions/paginateAuctions",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data?.url);
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
// get searched agents
export const queryAuctions = createAsyncThunk(
  "properties/queryAuctions",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property-files/?search=${data?.query}&auction_type=${data?.auction_type}`
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
// delete auction method
export const deleteAuction = createAsyncThunk(
  "auctions/deleteAuction",
  async (data, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}users/property-files/${data?.id}`, {
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
// update auction with put method
export const updateAuction = createAsyncThunk(
  "auctions/updateAuction",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}users/property-files/${data?.id}/`,
        data?.form,
        {
          headers: {
            Authorization: `Token ${data?.token}`,
          },
        }
      );
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
// auction detail
export const getAuctionDetail = createAsyncThunk(
  "auctions/getAuctionDetail",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property-files/${data?.id}`
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
// other auction
export const getOtherAuctions = createAsyncThunk(
  "auctions/getOtherAuctions",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}users/property-files/${data?.id}/related/`
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
// Slice for auctions
export const auctionSlice = createSlice({
  name: "auctions",
  initialState,
  reducers: {
    resetBids: (state) => {
      state.auctionBids = null;
    },
    resetBidsApi: (state) => {
      state.auctionBidsApiInfo = {};
    },
    resetRejectedBidApi: (state) => {
      state.rejectBidApiInfo = {};
    },
    resetAuctionsApi: (state) => {
      state.allAuctionsDataApiInfo = {};
    },
    setAuctionToEdit: (state, action) => {
      state.auctionToEdit = action.payload;
    },
    setShowAuctionDetail: (state, action) => {
      state.showAuctionDetail = action.payload;
    },
    setAuctionUpdateInfo: (state, action) => {
      state.auctionUpdateInfo = action.payload;
    },
    setAllAuctions: (state, action) => {
      state.allAuctionsData = action.payload;
    },
    setAuctionBids: (state, action) => {
      state.auctionBids = action.payload;
    },
    setAuctionDetails: (state, action) => {
      state.auctionDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ALL AUCTIONS
      .addCase(getAllAuctions.pending, (state) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loading: true,
        };
      })
      .addCase(getAllAuctions.fulfilled, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loading: false,
        };
        state.allAuctionsData = action.payload;
      })
      .addCase(getAllAuctions.rejected, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // User AUCTIONS
      .addCase(getUserAuctions.pending, (state) => {
        state.userAuctionsDataApiInfo = {
          ...state.userAuctionsDataApiInfo,
          loading: true,
        };
      })
      .addCase(getUserAuctions.fulfilled, (state, action) => {
        state.userAuctionsDataApiInfo = {
          ...state.userAuctionsDataApiInfo,
          loading: false,
        };
        state.userAuctionsData = action.payload;
      })
      .addCase(getUserAuctions.rejected, (state, action) => {
        state.userAuctionsDataApiInfo = {
          ...state.userAuctionsDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //AUCTION BIDS
      .addCase(getAuctionBids.pending, (state) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          loading: true,
        };
      })
      .addCase(getAuctionBids.fulfilled, (state, action) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          loading: false,
        };
        state.auctionBids = action.payload;
      })
      .addCase(getAuctionBids.rejected, (state, action) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //User AUCTION BIDS
      .addCase(getUserAuctionBids.pending, (state) => {
        state.userAuctionBidsApiInfo = {
          ...state.userAuctionBidsApiInfo,
          loading: true,
        };
      })
      .addCase(getUserAuctionBids.fulfilled, (state, action) => {
        state.userAuctionBidsApiInfo = {
          ...state.userAuctionBidsApiInfo,
          loading: false,
        };
        state.userAuctionBids = action.payload;
      })
      .addCase(getUserAuctionBids.rejected, (state, action) => {
        state.userAuctionBidsApiInfo = {
          ...state.userAuctionBidsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //PLace BIDS
      .addCase(placeBid.pending, (state) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          createBidLoading: true,
        };
      })
      /* place bid extra reducer: 
      - when a bid place request if filled, iterate through all the bids on the auctiuon and update price and updated data for the auction. */
      .addCase(placeBid.fulfilled, (state, action) => {
        //console.log(action.payload);
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          createBidLoading: false,
          createBidResponse: action.payload,
        };
        let _exists = false;
        state?.auctionBids?.result?.results?.forEach((element) => {
          if (element?.id === action.payload?.result?.id) _exists = true;
        });
        state.auctionBids = _exists
          ? {
              ...state?.auctionBids,
              result: {
                ...state?.auctionBids?.result,
                results:
                  state?.auctionBids?.result?.results?.length > 0
                    ? state?.auctionBids?.result?.results?.map((elem) => {
                        if (elem?.id === action.payload?.result?.id) {
                          return {
                            ...elem,
                            price: action.payload?.result?.price,
                            updated_at: action.payload?.result?.updated_at,
                          };
                        } else {
                          return elem;
                        }
                      })
                    : [action.payload?.result],
              },
            }
          : {
              ...state?.auctionBids,
              result: {
                ...state?.auctionBids?.result,
                count: state?.auctionBids?.result?.count + 1,
                results:
                  state?.auctionBids?.result?.results?.length > 0
                    ? [
                        action.payload?.result,
                        ...state?.auctionBids?.result?.results,
                      ]
                    : [action.payload?.result],
              },
            };
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          createBidLoading: false,
          createBidError: action.payload,
        };
      })
      //accept bid
      .addCase(acceptABid.pending, (state) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          loading: true,
        };
      })
      .addCase(acceptABid.fulfilled, (state, action) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          loading: false,
          response: action?.payload,
        };
        state.auctionBids = {
          ...state.auctionBids,
          result: {
            ...state.auctionBids?.result,
            count: state.auctionBids?.result?.count - 1,
            results: state.auctionBids?.result?.results?.filter(
              (elem) => elem?.id !== action.payload?.property_biding_fk
            ),
          },
        };
      })
      .addCase(acceptABid.rejected, (state, action) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //reject bid
      .addCase(rejectABid.pending, (state) => {
        state.rejectBidApiInfo = {
          ...state.rejectBidApiInfo,
          loading: true,
        };
      })
      .addCase(rejectABid.fulfilled, (state, action) => {
        state.rejectBidApiInfo = {
          ...state.rejectBidApiInfo,
          loading: false,
          response: action?.payload,
        };
        state.auctionBids = {
          ...state.auctionBids,
          result: {
            ...state.auctionBids?.result,
            count: state.auctionBids?.result?.count - 1,
            results: state.auctionBids?.result?.results?.filter(
              (elem) => elem?.id !== action.payload
            ),
          },
        };
      })
      .addCase(rejectABid.rejected, (state, action) => {
        state.rejectBidApiInfo = {
          ...state.rejectBidApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //Delete
      .addCase(deleteAuction.pending, (state) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loadingTrending: true,
        };
      })
      .addCase(deleteAuction.fulfilled, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loadingTrending: false,
          deleteResponse: action.payload,
        };
        state.allAuctionsData = {
          ...state.allAuctionsData,
          result: {
            ...state.allAuctionsData?.result,
            count: state.allAuctionsData?.result?.count - 1,
            results: state.allAuctionsData?.result?.results?.filter(
              (elem) => elem?.id !== action.payload
            ),
          },
        };
      })
      .addCase(deleteAuction.rejected, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loadingTrending: false,
          error: action.payload,
          deleteError: action.payload,
        };
      })
      //update
      .addCase(updateAuction.pending, (state) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loadingUpdate: true,
        };
      })
      .addCase(updateAuction.fulfilled, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loadingUpdate: false,
          success: true,
        };
        state.allAuctionsData = {
          ...state.allAuctionsData,
          result: {
            ...state.allAuctionsData?.result,
            results: state.allAuctionsData?.result?.results?.map((elem) => {
              if (elem?.id === action.payload?.id) return action.payload;
              else return elem;
            }),
          },
        };
      })
      .addCase(updateAuction.rejected, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loadingUpdate: false,
          error: action.payload,
        };
      })
      //PAGINATEAuctions
      .addCase(paginateAuctions.pending, (state) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loading: true,
        };
      })
      .addCase(paginateAuctions.fulfilled, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loading: false,
        };
        state.allAuctionsData = action.payload.data;
        state.auctionBids = action.payload.data;
        state.userAuctionBids = action.payload.data;
      })
      .addCase(paginateAuctions.rejected, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //Query Auctions
      .addCase(queryAuctions.pending, (state) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loading: true,
        };
      })
      .addCase(queryAuctions.fulfilled, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loading: false,
        };

        state.queryAuctionData = action.payload;
      })
      .addCase(queryAuctions.rejected, (state, action) => {
        state.allAuctionsDataApiInfo = {
          ...state.allAuctionsDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //Auction Detail
      .addCase(getAuctionDetail.pending, (state) => {
        state.auctionDetailApiInfo = {
          ...state.auctionDetailApiInfo,
          loading: true,
        };
      })
      .addCase(getAuctionDetail.fulfilled, (state, action) => {
        state.auctionDetailApiInfo = {
          ...state.auctionDetailApiInfo,
          loading: false,
        };
        state.auctionDetail = action.payload;
      })
      .addCase(getAuctionDetail.rejected, (state, action) => {
        state.auctionDetailApiInfo = {
          ...state.auctionDetailApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // Other Auctions
      .addCase(getOtherAuctions.pending, (state) => {
        state.otherAuctionsApiInfo = {
          ...state.otherAuctionsApiInfo,
          loading: true,
        };
      })
      .addCase(getOtherAuctions.fulfilled, (state, action) => {
        state.otherAuctionsApiInfo = {
          ...state.otherAuctionsApiInfo,
          loading: false,
        };
        state.otherAuctions = action.payload;
      })
      .addCase(getOtherAuctions.rejected, (state, action) => {
        state.otherAuctionsApiInfo = {
          ...state.otherAuctionsApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetBids,
  resetBidsApi,
  setAuctionToEdit,
  setAuctionUpdateInfo,
  resetAuctionsApi,
  setAllAuctions,
  resetRejectedBidApi,
  setShowAuctionDetail,
  setAuctionBids,
  setAuctionDetails,
} = auctionSlice.actions;
export default auctionSlice.reducer;
