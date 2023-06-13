import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HEADER_CONTENT_WIDTH } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import zeeracLogo from "../../../assets/courses/zeerac.png";
import { getAllCourses } from "../../../redux/slices/courseSlice";
import ComponentLoader from "../../globalComponents/ComponentLoader";
//import headingPattern from "../../../assets/courses/headingPattern.png";
import courseThumbnail from "../../../assets/courses/courseThumbnail.jpg";
import { TextTranslation } from "../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    margin: "auto",
  },
  // headingPattern: {
  //   position: 'absolute',
  //   left: -60,
  //   marginTop: 20,
  // },
  heading: {
    fontSize: 32,
    fontFamily: "heavy",
    color: "#134696",
    //marginLeft: 170,
    marginTop: 50,
    //marginBottom: -70,
  },
  thumbnail: {
    height: 228,
    width: "100%",
    objectFit: "cover",
    filter: "grayscale(80%)",
    "&:hover": {
      filter: "grayscale(0%)",
    },
  },
  courseContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
    padding: "5px 10px",
    marginTop: -80,
  },
  courseName: {
    color: "#ffffff",
    fontSize: 12,
    marginBottom: 5,
    zIndex: 1,
    textTransform: "uppercase",
    fontFamily: "heavy",
  },
  courseDescription: {
    color: "#ffffff",
    fontSize: 16,
    zIndex: 1,
    width: "100%",
    fontFamily: "medium",
    textTransform: "capitalize",
  },
  courseNumberMain: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  courseNumberId: {
    fontSize: 36,
    color: "#0ed864", // green color
    zIndex: 1,
  },
  courseNumberName: {
    position: "absolute",
    opacity: 0.6,
    fontSize: 12,
    color: "#134696", // blue color
    zIndex: 1,
  },
}));

const CourseTitle = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { langIndex } = useSelector((state) => state.global);
  // allCoursesApiInfo is for loader
  const { allCourses, allCoursesApiInfo } = useSelector(
    (state) => state.course
  );

  // console.log({ allCourses });
  useEffect(() => {
    dispatch(getAllCourses({ token: currentUser?.token }));

    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <div className={classes.container}>
      {allCoursesApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          <Grid container justifyContent="center" spacing={2} sx={{ my: 2 }}>
            <Grid item xs={10} sm={11} md={11} lg={12}>
              <div className={classes.heading}>
                {TextTranslation.beginTheCourse[langIndex]}
              </div>
            </Grid>
            {allCourses?.results?.map((value, index) => (
              <Grid
                item
                key={index}
                xs={10}
                sm={5.5}
                md={5.5}
                lg={4}
                xl={4}
                sx={{
                  my: 1,
                  height: 228,
                  cursor: "pointer",
                }}
                // onClick={() => navigate(`/courseModule/${value?.id}`)}
                onClick={() => navigate(`/course/${value?.id}`)}
              >
                <img
                  alt="thumbnail"
                  src={value?.thumbnail ? value.thumbnail : courseThumbnail}
                  className={classes.thumbnail}
                />
                <div>
                  <img
                    alt=""
                    src={zeeracLogo}
                    style={{
                      position: "absolute",
                      objectFit: "cover",
                      width: 30,
                      marginTop: -140,
                      marginLeft: 10,
                    }}
                  />
                  <div className={classes.courseContainer}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div className={classes.courseName}>
                        {TextTranslation.course[langIndex]} {value?.id}
                      </div>
                      <div className={classes.courseDescription}>
                        {value?.title}
                      </div>
                    </div>
                    <div className={classes.courseNumberMain}>
                      <div className={classes.courseNumberId}>{value?.id}</div>
                      <div className={classes.courseNumberName}>
                        {TextTranslation.course[langIndex]}
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default CourseTitle;
