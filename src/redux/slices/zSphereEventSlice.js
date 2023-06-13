import axios from "axios";
import { API_URL } from "../../utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  getEventsData: null,
  getEventsDataApiInfo: {},
  getEventData: null,
  getEventDataApiInfo: {},
  createEventData: null,
  localEventData: {},
  createEventDataApiInfo: {},
  pastEventsData: null,
  pastEventsDataApiInfo: {},
  interestedEventsApiInfo: {},
  notInterestedEventsApiInfo: {},
  maybeEventsApiInfo: {},
  deleteEventApiInfo: {},
  reportEventData: null,
  reportEventDataApiInfo: {},
  sendEventInvitationApiInfo: {},
};
// get upcoming event
export const getEvent = createAsyncThunk(
  "zSphereEvents/getEvent",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}zsphere/events/${data?.id}`, {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      });

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
// get all upcoming events
export const getAllEvents = createAsyncThunk(
  "zSphereEvents/getAllEvents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/events?past=false&${
          data?.id ? `group=${data?.id}` : data?.queryData
        }`,
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
// create event
export const createEvent = createAsyncThunk(
  "zSphereEvents/createEvent",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}zsphere/events/`,
        data?.formData,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
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
// get all past events
export const getAllPastEvents = createAsyncThunk(
  "zSphereEvents/getAllPastEvents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}zsphere/events?past=true&${
          data?.id ? `group=${data?.id}` : data?.queryData
        }`,
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
// interested event
export const interestedEvent = createAsyncThunk(
  "zSphereEvents/interestedEvent",
  async (data, thunkAPI) => {
    try {
      await axios.post(
        `${API_URL}zsphere/events/${data?.id}/interested/`,
        {},
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );
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
// not interested event
export const notInterestedEvent = createAsyncThunk(
  "zSphereEvents/notInterestedEvent",
  async (data, thunkAPI) => {
    try {
      await axios.post(
        `${API_URL}zsphere/events/${data?.id}/not_interested/`,
        {},
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );

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
// may be event
export const maybeEvent = createAsyncThunk(
  "zSphereEvents/maybeEvent",
  async (data, thunkAPI) => {
    try {
      await axios.post(
        `${API_URL}zsphere/events/${data?.id}/maybe/`,
        {},
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );
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
// Delete event
export const deleteEvent = createAsyncThunk(
  "zSphereEvents/deleteEvent",
  async (data, thunkAPI) => {
    try {
      await axios.delete(
        data?.ceo
          ? `${API_URL}zsphere/events/${data?.id}/?ceo_club=${true}`
          : `${API_URL}zsphere/events/${data?.id}/`,
        {
          headers: data?.token
            ? {
                Authorization: `Token ${data.token}`,
              }
            : {},
        }
      );
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
// report an event
export const reportEvent = createAsyncThunk(
  "agents/reportEvent",
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
// send event invitation
export const sendEventInvitation = createAsyncThunk(
  "agents/sendEventInvitation",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}zsphere/event-invites/`,
        data?.formData,
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
export const zSphereEventSlice = createSlice({
  name: "zSphereEvents",
  initialState,
  reducers: {
    resetEventDataApiInfo: (state, action) => {
      state.getEventsDataApiInfo = action.payload;
    },
    eventData: (state, action) => {
      state.localEventData = action.payload;
    },
    resetEventData: (state, action) => {
      state.localEventData = null;
      state.createEventDataApiInfo = {};
    },
    resetInterestedEventApiInfo: (state, action) => {
      state.interestedEventsApiInfo = {};
    },
    resetNotInterestedEventApiInfo: (state, action) => {
      state.notInterestedEventsApiInfo = {};
    },
    resetMaybeEventApiInfo: (state, action) => {
      state.maybeEventsApiInfo = {};
    },
    resetDeleteEventApiInfo: (state, action) => {
      state.deleteEventApiInfo = {};
    },
    resetSendEventInvitationApiInfo: (state, action) => {
      state.sendEventInvitationApiInfo = {};
    },
    resetReportEvent: (state, action) => {
      state.reportEventDataApiInfo = {};
    },
    setUpcomingEventData: (state, action) => {
      state.getEventsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get all upcoming events
      .addCase(getAllEvents.pending, (state) => {
        state.getEventsDataApiInfo = {
          ...state.getEventsDataApiInfo,
          loading: true,
        };
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.getEventsDataApiInfo = {
          ...state.getEventsDataApiInfo,
          loading: false,
        };
        state.getEventsData = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.getEventsDataApiInfo = {
          ...state.getEventsDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //get upcoming event
      .addCase(getEvent.pending, (state) => {
        state.getEventDataApiInfo = {
          ...state.getEventDataApiInfo,
          loading: true,
        };
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.getEventDataApiInfo = {
          ...state.getEventDataApiInfo,
          loading: false,
        };
        state.getEventData = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.getEventDataApiInfo = {
          ...state.getEventDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //create event
      .addCase(createEvent.pending, (state) => {
        state.createEventDataApiInfo = {
          ...state.createEventDataApiInfo,
          loading: true,
        };
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.createEventDataApiInfo = {
          ...state.createEventDataApiInfo,
          loading: false,
          response: action.payload,
        };
        state.createEventData = action.payload;

        state.getEventsData = {
          ...state?.getEventsData,
          results: [...state?.getEventsData?.results, action.payload],
        };
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.createEventDataApiInfo = {
          ...state.createEventDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //get all past events
      .addCase(getAllPastEvents.pending, (state) => {
        state.pastEventsDataApiInfo = {
          ...state.pastEventsDataApiInfo,
          loading: true,
        };
      })
      .addCase(getAllPastEvents.fulfilled, (state, action) => {
        state.pastEventsDataApiInfo = {
          ...state.pastEventsDataApiInfo,
          loading: false,
          response: action.payload,
        };
        state.pastEventsData = action.payload;
      })
      .addCase(getAllPastEvents.rejected, (state, action) => {
        state.pastEventsDataApiInfo = {
          ...state.pastEventsDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //interested event
      .addCase(interestedEvent.pending, (state) => {
        state.interestedEventsApiInfo = {
          ...state.interestedEventsApiInfo,
          loading: true,
        };
      })
      .addCase(interestedEvent.fulfilled, (state, action) => {
        state.interestedEventsApiInfo = {
          ...state.interestedEventsApiInfo,
          loading: false,
          response: action.payload,
        };

        state.getEventsData = {
          ...state?.getEventsData,
          results: state.getEventsData.results?.map((elem) => {
            if (elem?.id === action?.payload?.id) {
              return {
                ...elem,
                interested: [...elem?.interested, action.payload?.user_id],
              };
            } else {
              return elem;
            }
          }),
        };
      })
      .addCase(interestedEvent.rejected, (state, action) => {
        state.interestedEventsApiInfo = {
          ...state.interestedEventsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //not interested event
      .addCase(notInterestedEvent.pending, (state) => {
        state.notInterestedEventsApiInfo = {
          ...state.notInterestedEventsApiInfo,
          loading: true,
        };
      })
      .addCase(notInterestedEvent.fulfilled, (state, action) => {
        state.notInterestedEventsApiInfo = {
          ...state.notInterestedEventsApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(notInterestedEvent.rejected, (state, action) => {
        state.notInterestedEventsApiInfo = {
          ...state.notInterestedEventsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //maybe event
      .addCase(maybeEvent.pending, (state) => {
        state.maybeEventsApiInfo = {
          ...state.maybeEventsApiInfo,
          loading: true,
        };
      })
      .addCase(maybeEvent.fulfilled, (state, action) => {
        state.maybeEventsApiInfo = {
          ...state.maybeEventsApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(maybeEvent.rejected, (state, action) => {
        state.maybeEventsApiInfo = {
          ...state.maybeEventsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //delete event
      .addCase(deleteEvent.pending, (state) => {
        state.deleteEventApiInfo = {
          ...state.deleteEventApiInfo,
          loading: true,
        };
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.deleteEventApiInfo = {
          ...state.deleteEventApiInfo,
          loading: false,
          response: action.payload,
        };
        state.getEventsData = {
          ...state?.getEventsData,
          results: state.getEventsData.results?.filter(
            (elem) => elem?.id !== action?.payload?.id
          ),
        };
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.deleteEventApiInfo = {
          ...state.deleteEventApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // report events
      .addCase(reportEvent.pending, (state) => {
        state.reportEventDataApiInfo = {
          ...state.reportEventDataApiInfo,
          loading: true,
        };
      })
      .addCase(reportEvent.fulfilled, (state, action) => {
        state.reportEventDataApiInfo = {
          ...state.reportEventDataApiInfo,
          loading: false,
          response: action.payload,
        };
        state.reportEventData = action.payload;
      })
      .addCase(reportEvent.rejected, (state, action) => {
        state.reportEventDataApiInfo = {
          ...state.reportEventDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // send event invitation
      .addCase(sendEventInvitation.pending, (state) => {
        state.sendEventInvitationApiInfo = {
          ...state.sendEventInvitationApiInfo,
          loading: true,
        };
      })
      .addCase(sendEventInvitation.fulfilled, (state, action) => {
        state.sendEventInvitationApiInfo = {
          ...state.sendEventInvitationApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(sendEventInvitation.rejected, (state, action) => {
        state.sendEventInvitationApiInfo = {
          ...state.sendEventInvitationApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetEventDataApiInfo,
  eventData,
  resetEventData,
  resetInterestedEventApiInfo,
  resetNotInterestedEventApiInfo,
  resetMaybeEventApiInfo,
  resetDeleteEventApiInfo,
  resetReportEvent,
  setUpcomingEventData,
  resetSendEventInvitationApiInfo,
} = zSphereEventSlice.actions;
export default zSphereEventSlice.reducer;
