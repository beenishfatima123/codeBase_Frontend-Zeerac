import React from "react";
// import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Divider, Grid } from "@mui/material";
import { 
  // useDispatch, 
  useSelector } from "react-redux";
import { 
  useNavigate, 
  // useParams 
} from "react-router-dom";
import timeIcon from "../../../../assets/courses/time.png";
import levelIcon from "../../../../assets/courses/level.png";
import backArrow from "../../../../assets/icons/backArrow.png";
import { TextTranslation } from "../../../../utils/translation";
import languageIcon from "../../../../assets/courses/language.png";
import checkboxIcon from "../../../../assets/courses/checkbox.png";
// import { postQuizSubmission } from "../../../../redux/slices/courseSlice";
import courseInfoLines from "../../../../assets/courses/courseInfoLines.png";

const useStyles = makeStyles(() => ({
  backButton: {
    marginTop: "3%",
    background:
      "linear-gradient(90deg, rgba(14,216,100,1) 20%, rgba(255,255,255,1) 100%)",
    color: "#134696",
    padding: 5,
    fontSize: 14,
    fontFamily: "medium",
    width: 110,
    height: 30,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  courseLabel: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#0ED864",
    textTransform: "uppercase",
  },
  courseName: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#134696",
    textTransform: "uppercase",
  },
  courseTitle: {
    fontSize: 41,
    fontFamily: "medium",
    color: "#134696",
    textTransform: "uppercase",
    // width: '40%',
    marginTop: "1%",
  },
  instructorLabel: {
    fontSize: 17,
    fontFamily: "medium",
    color: "#0ED864",
  },
  instructorName: {
    fontSize: 21,
    fontFamily: "medium",
    color: "#134696",
    textTransform: "capitalize",
  },
  main: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconMain: {
    width: 61,
    height: 61,
    borderRadius: "50%",
    border: "1px solid #707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "medium",
    color: "#134696",
    marginBottom: 5,
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#6B7B88",
    marginLeft: 10,
  },
  "@media (max-width: 1024px)": {
    courseTitle: {
      width: "80%",
    },
  },
}));

const QuizInfo = ({ questions, answers, isFinished, isTimeUp }) => {
  const classes = useStyles();
  // const params = useParams();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { langIndex } = useSelector((state) => state.global);
  // const { currentUser } = useSelector((state) => state.auth);
  const { courseModule } = useSelector((state) => state.course);

  const data = [
    {
      name: `${courseModule?.result?.difficulty} Level`,
      description: "No prior experience required",
      icon: levelIcon,
    },
    {
      name: `${courseModule?.result?.course_language} Language`,
      description: "No prior experience required",
      icon: languageIcon,
    },
    {
      name: `${courseModule?.result?.time_to_complete} to complete`,
      description: "On the basis of 4hrs/day",
      icon: timeIcon,
    },
    {
      name: "Special Assignment",
      description: "Free checking by system",
      icon: checkboxIcon,
    },
  ];

  return (
    <Grid container justifyContent="center" sx={{ mb: 1 }}>
      <Grid item xs={11} sm={11} md={12} lg={12} xl={12}>
        <div
          className={classes.backButton}
          onClick={() => {
            navigate(-1)
            // if (isFinished || isTimeUp) {
            //   navigate(-1);
            // } else {
            //   const confirmQuit = window.confirm(
            //     "Are you sure you want to quit the quiz?"
            //   );
            //   if (confirmQuit) {
            //     const results = questions?.map((question, index) => {
            //       return {
            //         question: question?.id,
            //         selected_option: answers?.[index] || "Empty",
            //       };
            //     });
            //     let _data = {
            //       module: params?.moduleId,
            //       answers: results,
            //     };
            //     dispatch(
            //       postQuizSubmission({
            //         token: currentUser?.token,
            //         _data,
            //       })
            //     );
            //     navigate(-1);
            //     toast.success("Quiz Submitted Successfully", {
            //       position: toast.POSITION.TOP_CENTER,
            //       hideProgressBar: true,
            //     });
            //   }
            // }
          }}
        >
          <img alt="back" src={backArrow} style={{ padding: "0 10px" }} />
          {TextTranslation.back[langIndex]}
        </div>
      </Grid>
      <Grid item xs={11} sm={11} md={12} lg={12} xl={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0 10px 0",
          }}
        >
          <div className={classes.courseLabel}>
            {TextTranslation.course[langIndex]}
          </div>
          <div className={classes.courseName}>
            {courseModule?.result?.title}
          </div>
        </div>
      </Grid>
      <Grid item xs={11} sm={11} md={12} lg={12} xl={12}>
        <Divider sx={{ backgroundColor: "#0ED864" }} />
        <Grid container sx={{ my: 2 }}>
          <img
            alt="course-info-lines"
            src={courseInfoLines}
            style={{ position: "absolute", right: 0, zIndex: -1 }}
          />
          <Grid item xs={12} sm={12} md={7} lg={5} xl={5}>
            <div className={classes.courseTitle}>
              {courseModule?.result?.title}
            </div>
          </Grid>
          <Grid container sx={{ my: 3 }}>
            <Grid item xs={3} sm={4} md={3} lg={3} xl={3}>
              <div>
                <div className={classes.instructorLabel}>
                  {TextTranslation.instructor[langIndex]}
                </div>
                <div className={classes.instructorName}>
                  {courseModule?.result?.instructor}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={7} xl={7}>
              <Grid container justifyContent="space-between" spacing={2}>
                {data?.map((i, index) => (
                  <Grid
                    item
                    key={index}
                    xs={6}
                    sm={12}
                    md={12}
                    lg={5.7}
                    xl={5.7}
                  >
                    <div className={classes.main}>
                      <div className={classes.iconMain}>
                        <img alt={i.name} src={i.icon} />
                      </div>
                      <div>
                        <div className={classes.name}>{i.name}</div>
                        <div className={classes.description}>
                          {i.description}
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ backgroundColor: "#0ED864" }} />
      </Grid>
    </Grid>
  );
};

export default QuizInfo;
