import moment from "moment";
import Location from "./Location";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import onlineSvg from "../../../../../assets/zSpehere/online.svg";
import personSvg from "../../../../../assets/zSpehere/person.svg";
import { Grid } from "@mui/material";
import ButtonLoader from "../../../../globalComponents/ButtonLoader";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { validateInputs } from "../../../../../utils/helpers/accountCreation";
import {
  createEvent,
  eventData,
  resetEventData,
} from "../../../../../redux/slices/zSphereEventSlice";

const closeIcon = {
  cursor: "pointer",
  backgroundColor: "#134696",
  color: "#fff",
  borderRadius: 1,
};
const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontFamily: "heavy",
    color: "#134696",
  },
  typeButton: {
    padding: 20,
    border: "1px solid #cccccc",
    borderRadius: 10,
    margin: "30px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  type: {
    color: "#134696",
    fontSize: 16,
    fontFamily: "heavy",
  },
  typeDetail: {
    color: "#707070",
    fontSize: 14,
    fontFamily: "medium",
    width: "90%",
    margin: "10px 0",
  },
  label: {
    fontFamily: "light",
    fontSize: 16,
    color: "#707070",
    margin: "20px 0",
  },
  addEndDate: {
    fontFamily: "light",
    fontSize: 16,
    color: "#707070",
    margin: "20px 0 0 0",
    cursor: "pointer",
  },
  input: {
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: "light",
    color: "#000",
    border: "1px solid #cccccc",
    outline: "none",
    borderRadius: 5,
  },
  inputArea: {
    padding: 10,
    fontSize: 16,
    fontFamily: "light",
    color: "#000",
    border: "1px solid #cccccc",
    outline: "none",
    borderRadius: 5,
  },
  uploadContainer: {
    height: 150,
    fontSize: 16,
    fontFamily: "light",
    border: "1px solid #cccccc",
    outline: "none",
    borderRadius: 5,
    cursor: "pointer",
    zIndex: 10,
    color: "transparent",
  },
  upload: {
    position: "absolute",
    left: "50%",
    marginTop: "13%",
    transform: "translate(-50%,-50%)",
    cursor: "pointer",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  confirm: {
    height: 50,
    borderRadius: 5,
    border: "none",
    backgroundColor: "#134696",
    color: "#fff",
    fontSize: 16,
    fontFamily: "medium",
    width: "100%",
    cursor: "pointer",
    margin: "30px 0 0 0",
  },
  cancel: {
    height: 50,
    borderRadius: 5,
    border: "1px solid #134696",
    backgroundColor: "#fff",
    color: "#134696",
    fontSize: 16,
    fontFamily: "medium",
    width: "100%",
    cursor: "pointer",
    margin: "30px 0 0 0",
  },
  "@media (max-width: 1024px)": {},
}));

/* modal content for creating an event. */
const CreateEvent = ({ setCreateEventModal, CEO }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showEndTime, setShowEndTime] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup } = useSelector((state) => state.groups);
  const { localEventData, createEventDataApiInfo } = useSelector(
    (state) => state.zSphereEvents
  );

  /* return time difference form now to event, display error if time is negative. */
  const getTimeDiff = () => {
    const currentTime = moment.now();
    const startTime = moment(localEventData?.start);
    const endTime = moment(localEventData?.end);

    const startTimeDiff = startTime.diff(currentTime, "hours");
    const endTimeDiff = endTime.diff(startTime, "hours");

    if (startTimeDiff < 0) {
      dispatch(
        eventData({ ...localEventData, startValidation: "Invalid start time" })
      );
      toast.error("Invalid Start Time", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    } else {
      dispatch(eventData({ ...localEventData, startValidation: null }));
    }
    if (showEndTime && endTimeDiff < 0) {
      dispatch(
        eventData({ ...localEventData, endValidation: "Invalid end time" })
      );
      toast.error("Invalid End Time", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    } else {
      dispatch(eventData({ ...localEventData, endValidation: null }));
    }
  };

  /* calling get time difference on every change. */
  useEffect(() => {
    if (localEventData?.start || localEventData?.end) getTimeDiff();

    // eslint-disable-next-line
  }, [localEventData?.start, localEventData?.end]);

  /* take prop and event as parameters and send event data to store along with validation status. */
  const handleChange = (prop) => (e) => {
    const validationError = validateInputs(prop, e.target.value);

    if (prop === "name") {
      dispatch(
        eventData({
          ...localEventData,
          [prop]: e.target.value,
          [`${prop}Validation`]: validationError,
        })
      );
    } else if (prop === "description") {
      dispatch(
        eventData({
          ...localEventData,
          [prop]: e.target.value,
          [`${prop}Validation`]: validationError,
        })
      );
    } else
      dispatch(
        eventData({ ...localEventData, [e.target.name]: e.target.value })
      );
  };

  /* call image picker and set data along with new picture. */
  const handleImagePicker = (e) => {
    dispatch(
      eventData({ ...localEventData, [e.target.name]: e.target.files[0] })
    );
  };

  /* get data and check form validity for each entry and return specific message on invalid entry. */
  const isFormValid = async (data) => {
    if (!data?.name || data?.nameValidation) return "Name is required";
    else if (!data?.type || data?.typeValidation) return "Type is required";
    else if (!data?.description || data?.descriptionValidation)
      return "Detail is required";
    else if (
      data?.type === "InPerson" &&
      (!data?.address || data?.addressValidation)
    )
      return "Location is required";
    else if (!data?.start || data?.startValidation) return "Invalid Start Time";
    else if (showEndTime && (!data?.end || data?.endValidation))
      return "Invalid End Time";
    else if (!data?.photo || data?.photoValidation) return "Photo is required";
  };

  /*create form data from entered information and dispatch it to create event in slice. */
  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("name", localEventData?.name);
    formData.append("type", localEventData?.type);
    formData.append("group", selectedGroup?.id);
    formData.append("organized_by", currentUser?.id);
    localEventData?.type === "InPerson" &&
      formData.append("location", localEventData?.address);
    localEventData?.type === "InPerson" &&
      formData.append("lat", localEventData?.lat);
    localEventData?.type === "InPerson" &&
      formData.append("lng", localEventData?.lng);
    formData.append("description", localEventData?.description);
    formData.append("photo", localEventData?.photo);
    formData.append("start", localEventData?.start);

    if (CEO) formData.append("ceo_club", true);

    if (localEventData?.end) formData.append("end", localEventData?.end);
    else formData.append("end", localEventData?.start);

    dispatch(
      createEvent({
        token: currentUser?.token,
        formData,
      })
    );
  };

  /* display success message on toast for api success response */
  useEffect(() => {
    if (createEventDataApiInfo?.response) {
      toast.success("Event Created Successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });

      dispatch(resetEventData());
      setCreateEventModal(false);
    }
    // eslint-disable-next-line
  }, [createEventDataApiInfo?.response]);

  /* display error message on toast for api error */
  useEffect(() => {
    if (createEventDataApiInfo?.error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetEventData());
    }
    // eslint-disable-next-line
  }, [createEventDataApiInfo?.error]);

  // console.log({ localEventData });

  return (
    <div
      style={{
        position: "fixed",
        top: "12vh",
        left: "15vw",
        width: "70vw",
        height: "80vh",
        backgroundColor: "white",
        border: "none",
        boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.4)",
        padding: "1rem",
        overflowY: "scroll",
        zIndex: 100,
      }}
    >
      <div className={classes.header}>
        <div className={classes.heading}>Create Event</div>
        <CloseIcon
          onClick={() => {
            setCreateEventModal(false);
            dispatch(resetEventData());
          }}
          sx={closeIcon}
        />
      </div>
      {/* selecting what type of event is to be created. */}
      <Grid container columnSpacing={2} justifyContent={"center"}>
        <Grid item xs={11} sm={8} lg={6} xl={5}>
          <div
            className={classes.typeButton}
            style={{
              border:
                localEventData?.type === "Online" ? "2px solid #134696" : null,
            }}
          >
            <img alt="" src={onlineSvg} />
            <div
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={() => {
                dispatch(eventData({ ...localEventData, type: "Online" }));
              }}
            >
              <div className={classes.type}>Online</div>
              <div className={classes.typeDetail}>
                If you want to create an online event, click here and add your
                information to the form.
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={11} sm={8} lg={6} xl={5}>
          <div
            className={classes.typeButton}
            style={{
              border:
                localEventData?.type === "InPerson"
                  ? "2px solid #134696"
                  : null,
            }}
          >
            <img alt="" src={personSvg} />
            <div
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={() => {
                dispatch(eventData({ ...localEventData, type: "InPerson" }));
              }}
            >
              <div className={classes.type}>In-Person</div>
              <div className={classes.typeDetail}>
                If you prefer an in-person event, click here and fill out the
                necessary details in the form.
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <hr style={{ marginBottom: 30 }} />
      <div className={classes.heading}>Event Details</div>
      <Grid container columnSpacing={4}>
        <Grid item xs={12} sm={5} md={4.2} lg={4.2}>
          <div className={classes.col}>
            <label className={classes.label}>Event Name</label>
            <input
              className={classes.input}
              type="text"
              name="name"
              onChange={handleChange("name")}
            />
            {localEventData?.nameValidation ? (
              <span
                style={{
                  fontFamily: "light",
                  color: "red",
                  fontSize: 12,
                }}
              >
                name must be between 3-50 characters
              </span>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12} sm={5} md={4.2} lg={4.2}>
          <div className={classes.col}>
            <label className={classes.label}>Organized by</label>
            <input
              readOnly
              className={classes.input}
              type="text"
              name="organized_by"
              defaultValue={
                currentUser?.first_name + " " + currentUser?.last_name
              }
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={5} md={4.2} lg={4.2}>
          <div className={classes.col}>
            <label className={classes.label}>Start Time</label>
            <input
              className={classes.input}
              type="datetime-local"
              name="start"
              onChange={handleChange("start")}
              min={moment(new Date()).format("YYYY-MM-DDThh:mm")}
            />
          </div>
        </Grid>
        {!showEndTime && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div
              className={classes.addEndDate}
              onClick={() => {
                setShowEndTime(true);
              }}
            >
              + End Time
            </div>
          </Grid>
        )}

        {showEndTime && (
          <Grid
            item
            xs={12}
            sm={5}
            md={4.2}
            lg={4.2}
            sx={{ position: "relative" }}
          >
            <div className={classes.col}>
              <label className={classes.label}>End Time</label>
              <input
                className={classes.input}
                type="datetime-local"
                name="end"
                onChange={handleChange("end")}
                min={moment(new Date(localEventData?.start)).format(
                  "YYYY-MM-DDThh:mm"
                )}
              />
            </div>
            <span style={{ position: "absolute", right: -50, marginTop: -35 }}>
              <CloseIcon
                sx={{
                  backgroundColor: "#134696",
                  cursor: "pointer",
                  color: "#fff",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  setShowEndTime(false);
                }}
              />
            </span>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className={classes.col}>
            <label className={classes.label}>Details</label>
            <textarea
              rows={6}
              className={classes.inputArea}
              type="text"
              name="description"
              onChange={handleChange("description")}
            />
            {localEventData?.descriptionValidation ? (
              <span
                style={{
                  fontFamily: "light",
                  color: "red",
                  fontSize: 12,
                }}
              >
                description must be between 10-100 words
              </span>
            ) : null}
          </div>
        </Grid>
        {localEventData?.type === "InPerson" && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className={classes.col}>
              <label className={classes.label}>Location</label>
              <Location />
            </div>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className={classes.col} style={{ position: "relative" }}>
            <label className={classes.label}>Cover Photo</label>
            {localEventData?.photo?.name ? (
              <img
                alt=""
                src={window.URL.createObjectURL(localEventData?.photo)}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                }}
              />
            ) : (
              <>
                <input
                  className={classes.uploadContainer}
                  type="file"
                  name="photo"
                  onChange={handleImagePicker}
                />
                <div className={classes.upload}>
                  <FileUploadOutlinedIcon
                    sx={{
                      fontSize: 70,
                      ml: 4.5,
                    }}
                  />
                  <div style={{ fonFamily: "light", fontSize: 16 }}>
                    Upload cover photo
                  </div>
                </div>
              </>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <button
            className={classes.confirm}
            onClick={async () => {
              const isValid = await isFormValid(localEventData);
              if (!isValid) handleSubmit();
              else
                toast.error(isValid, {
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: true,
                });
            }}
            //onClick={handleSubmit}
          >
            {createEventDataApiInfo?.loading ? (
              <ButtonLoader color="#fff" size={20} />
            ) : (
              "Confirm"
            )}
          </button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <button
            className={classes.cancel}
            onClick={() => {
              setCreateEventModal(false);
            }}
          >
            Cancel
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateEvent;
