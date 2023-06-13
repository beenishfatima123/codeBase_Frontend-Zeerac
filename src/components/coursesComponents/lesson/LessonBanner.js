import Dot from "../svg/Dot";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import backArrow from "../../../assets/icons/backArrow.png";
import { getCourseDetail } from "../../../redux/slices/courseSlice";
// import lessonBanner from "../../../assets/courses/lessonBanner.png";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { TextTranslation } from "../../../utils/translation";

const useStyles = makeStyles(() => ({
  backButton: {
    position: "absolute",
    right: "90%",
    marginTop: "1%",
    background:
      "linear-gradient(90deg, rgba(14,216,100,1) 20%, rgba(255,255,255,1) 100%)",
    color: "#134696",
    padding: 5,
    fontSize: 14,
    width: 110,
    height: 30,
    cursor: "pointer",
    fontFamily: "medium",
    display: "flex",
    alignItems: "center",
  },
  main: {
    margin: 0,
    position: "relative",
    top: "50%",
    transform: "translate(2%,-60%)",
    zIndex: 2,
  },
  courseNumber: {
    fontSize: 25,
    fontFamily: "heavy",
    margin: "20px 0 5px 0",
    color: "#0ed864", // green color
  },
  communicationText: {
    fontSize: 45,
    fontFamily: "medium",
    color: "#134696", // blue color
    textTransform: "capitalize",
  },
  skillsText: {
    color: "#ffffff",
    backgroundColor: "#134696",
  },
  forReText: {
    color: "#0ed864",
    fontSize: 45,
    fontFamily: "medium",
    marginLeft: 200,
    marginTop: 3,
  },
  altorsText: {
    color: "#ffffff",
    backgroundColor: "#0ed864",
  },
  "@media (max-width: 900px)": {
    backButton: {
      position: "absolute",
      right: 20,
    },
  },
}));

const LessonBanner = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { currentUser } = useSelector((state) => state.auth);
  const { langIndex } = useSelector((state) => state.global);
  const { courseDetail, courseDetailApiInfo } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    dispatch(
      getCourseDetail({ token: currentUser?.token, id: params?.courseId })
    );
    // eslint-disable-next-line
  }, [params?.courseId]);

  return (
    <>
      {courseDetailApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12} md={4} lg={3.5} xl={3.5}>
            <div className={classes.backButton} onClick={() => navigate(-1)}>
              <img alt="back" src={backArrow} style={{ padding: "0 10px" }} />
              {TextTranslation.back[langIndex]}
            </div>
            <div className={classes.main}>
              <div className={classes.courseNumber}>
                COURSE {courseDetail?.result?.id}
              </div>
              <div className={classes.communicationText}>
                {courseDetail?.result?.title}
                {/* <span className={classes.skillsText}>&nbsp;SKILLS&nbsp;</span> */}
              </div>
              {/* <div className={classes.forReText}>
            FOR RE<span className={classes.altorsText}>ALTORS</span>
          </div> */}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8.5}
            xl={8.5}
            sx={{ overflow: "hidden", height: 500 }}
          >
            <div style={{ display: "flex", position: "absolute" }}>
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
            </div>
            <div
              style={{ display: "flex", position: "absolute", marginTop: 100 }}
            >
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
            </div>
            <div
              style={{ display: "flex", position: "absolute", marginTop: 200 }}
            >
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
            </div>
            <div
              style={{ display: "flex", position: "absolute", marginTop: 300 }}
            >
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
            </div>

            <img
              alt="lesson-banner"
              src={courseDetail?.result?.thumbnail}
              style={{ width: "100%", height: 500, objectFit: "cover" }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LessonBanner;
