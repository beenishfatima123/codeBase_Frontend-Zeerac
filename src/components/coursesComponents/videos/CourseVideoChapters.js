import moment from "moment/moment";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import playIcon from "../../../assets/courses/play.png";
import pauseIcon from "../../../assets/courses/pause.png";
import { useNavigate, useParams } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import completeIcon from "../../../assets/courses/complete.png";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import {
  postCourseHistory, 
  resetQuizResult,
  setActiveVideo,
  updateCourseHistory,
} from "../../../redux/slices/courseSlice";

const quizSx = {
  backgroundColor: "#0ed864",
  fontFamily: "medium",
  fontSize: 18,
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#0ed864",
  },
};

const useStyles = makeStyles(() => ({
  privacyLabel: {
    fontSize: 30,
    fontFamily: "medium",
    color: "#3D3E41",
    marginBottom: 10,
  },
  privacyDescription: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#1B1B29",
  },
  chapterName: {
    marginLeft: 20,
    fontSize: 15,
    width: "70%",
    fontFamily: "medium",
    color: "#777F8A",
    textTransform: "capitalize",
  },
  chapterDuration: {
    fontSize: 13,
    fontFamily: "medium",
    color: "#777F8A",
    position: "absolute",
    right: 10,
    top: 10,
  },
  completeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0ED864",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#dbe3ef",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  download: {
    backgroundColor: "#0ed864",
    border: "none",
    fontSize: 16,
    fontFamily: "medium",
    cursor: "pointer",
    margin: "10px 0",
    color: "#fff",
    height: 40,
    borderRadius: 5,
  },
}));

const CourseVideoChapters = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const videoEl = useRef(null);
  const VIDEO_WATCH_TIME_KEY = "videoWatchTime";

  const [videoWatchTime, setVideoWatchTime] = useState();
  const [flag, setFlag] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);
  const { courseModule, courseModuleApiInfo, activeVideo } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    if (courseModule?.result?.user_module_progress?.is_completed && startQuiz) {
      navigate(`/course/${params?.courseId}/${params?.moduleId}/quiz`);
    }
    // eslint-disable-next-line
  }, [
    courseModule?.result?.user_module_progress?.is_completed,
    startQuiz,
    params?.courseId,
    params?.moduleId,
  ]);

  useEffect(() => {
    setVideoWatchTime(
      moment.duration(activeVideo?.user_progress?.watch_time).asSeconds()
    );
  }, [activeVideo?.user_progress]);

  const handleVideoEnded = (e) => {
    let x = document.getElementById("videoPlayer");

    let formData = new FormData();

    formData.append("user", currentUser?.id);
    formData.append("video", activeVideo?.id);
    formData.append("watch_time", x?.currentTime);

    dispatch(
      updateCourseHistory({
        token: currentUser?.token,
        id: activeVideo?.user_progress?.id,
        formData,
      })
    );
  };

  // convert time into seconds
  const toSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString?.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // video on time update
  const handleVideoProgress = (e) => {
    const videoPlayer = e.target;
    const currentTime = videoPlayer?.currentTime;

    // Update the stored watch time in localStorage
    localStorage.setItem(VIDEO_WATCH_TIME_KEY, currentTime.toString());

    const _watchTime = moment
      .duration(activeVideo?.user_progress?.watch_time)
      .asSeconds();
    const diffInSeconds = currentTime - _watchTime; // Calculate the difference in seconds
    setVideoWatchTime(videoWatchTime);

    // Check if 1 minute has elapsed
    if (currentTime >= 60) {
      let x = document.getElementById("videoPlayer");

      let formData = new FormData();

      formData.append("user", currentUser?.id);
      formData.append("video", activeVideo?.id);
      if (!activeVideo?.user_progress)
        formData.append("video_duration", activeVideo?.duration);
      formData.append("watch_time", x?.currentTime);

      // if diff is greater than equal to 1 minute
      if (activeVideo?.user_progress && diffInSeconds >= 60) {
        dispatch(
          updateCourseHistory({
            token: currentUser?.token,
            id: activeVideo?.user_progress?.id,
            formData,
          })
        );
      } else if (!activeVideo?.user_progress && flag) {
        setFlag(false);
        dispatch(
          postCourseHistory({
            token: currentUser?.token,
            formData,
          })
        );
      }
    }
  };

  // when user close tab
  useEffect(() => {
    const handleTabClose = (event) => {
      // Remove the stored watch time from localStorage
      localStorage.removeItem(VIDEO_WATCH_TIME_KEY);

      let x = document.getElementById("videoPlayer");
      let formData = new FormData();

      formData.append("user", currentUser?.id);
      formData.append("video", activeVideo?.id);
      if (!activeVideo?.user_progress)
        formData.append("video_duration", activeVideo?.duration);
      formData.append("watch_time", x?.currentTime);

      // if diff is greater than equal to 1 minute
      if (activeVideo?.user_progress) {
        dispatch(
          updateCourseHistory({
            token: currentUser?.token,
            id: activeVideo?.user_progress?.id,
            formData,
          })
        );
      } else if (!activeVideo?.user_progress && flag) {
        setFlag(false);
        dispatch(
          postCourseHistory({
            token: currentUser?.token,
            formData,
          })
        );
      }
      event.preventDefault();
      event.returnValue = "Are you sure you want to exit?";
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
    // eslint-disable-next-line
  }, [activeVideo]);

  // Retrieve the stored watch time from localStorage on component mount
  useEffect(() => {
    const storedWatchTime = localStorage.getItem(VIDEO_WATCH_TIME_KEY);
    if (storedWatchTime) {
      // Set the stored watch time to resume the video
      videoEl.currentTime = parseFloat(storedWatchTime);
    }
  }, []);


  return (
    <>
      <Grid container justifyContent="center">
        {courseModuleApiInfo?.loading ? (
          <ComponentLoader />
        ) : (
          <>
            <Grid
              item
              sm={12}
              md={12}
              sx={{ display: "flex", justifyContent: "center", my: 2 }}
            >
              {courseModule?.result?.user_module_progress?.is_completed && (
                <Button
                  sx={quizSx}
                  onClick={() => {
                    dispatch(resetQuizResult());
                    setStartQuiz(true);
                  }}
                >
                  Start Quiz
                </Button>
              )}
            </Grid>

            <Grid
              item
              xs={10}
              sm={10}
              md={4}
              lg={4}
              xl={4}
              sx={{ overflow: "hidden", mt: 2 }}
            >
              {courseModule?.result?.videos?.map((i, index) => {
                let lastItem = courseModule?.result?.videos[index - 1];

                return (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      padding: 5,
                      margin: "20px 10px",
                      cursor:
                        index === 0
                          ? "pointer"
                          : index !== 1 && i?.user_progress?.has_watched
                          ? "pointer"
                          : lastItem?.user_progress?.has_watched
                          ? "pointer"
                          : "not-allowed",
                      borderRadius: 5,
                      backgroundColor:
                        index === 0
                          ? "#E9EFFD"
                          : index !== 1 && i?.user_progress?.has_watched
                          ? "#E9EFFD"
                          : lastItem?.user_progress?.has_watched
                          ? "#E9EFFD"
                          : "#cdcdcd",
                    }}
                    onClick={() => {
                      setFlag(true);
                      index !== 1 && i?.user_progress?.has_watched
                        ? dispatch(setActiveVideo(i))
                        : lastItem?.user_progress?.has_watched
                        ? dispatch(setActiveVideo(i))
                        : dispatch(
                            setActiveVideo(courseModule?.result?.videos[0])
                          );
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        className={
                          i?.user_progress?.has_watched
                            ? classes.completeIcon
                            : classes.playIcon
                        }
                      >
                        <img
                          alt="icon"
                          src={
                            i?.user_progress?.has_watched
                              ? completeIcon
                              : i?.user_progress?.has_watched === false &&
                                toSeconds(i?.duration) > 2
                              ? pauseIcon
                              : playIcon
                          }
                        />
                      </div>
                      <div className={classes.chapterName}>{i?.title}</div>
                    </div>
                    <div className={classes.chapterDuration}>{i?.duration}</div>
                  </div>
                );
              })}
            </Grid>

            <Grid item xs={10} sm={10} md={7} lg={8} xl={8}>
              <Grid container justifyContent="center">
                {courseModule?.result?.videos?.length > 0 && (
                  <Grid item lg={11.5} sx={{ height: 450 }}>
                    <video
                      controls
                      id="videoPlayer"
                      name="videoPlayer"
                      src={activeVideo?.link}
                      width="100%"
                      height="100%"
                      ref={videoEl}
                      onTimeUpdate={handleVideoProgress}
                      onEnded={handleVideoEnded}
                      onLoadedMetadata={() => {
                        // const storedWatchTime =
                        //   localStorage.getItem(VIDEO_WATCH_TIME_KEY);
                        // if (storedWatchTime) {
                        //   // Set the stored watch time to resume the video
                        //   videoEl.current.currentTime =
                        //     parseFloat(storedWatchTime);
                        // const storedWatchTime =

                        if (videoWatchTime) {
                          // Set the stored watch time to resume the video
                          videoEl.current.currentTime =
                            parseFloat(videoWatchTime);
                        }
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default CourseVideoChapters;
