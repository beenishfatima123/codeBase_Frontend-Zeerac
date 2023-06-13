import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
//import headingPattern from "../../../assets/courses/headingPattern.png";
import { TextTranslation } from "../../../utils/translation";

const useStyles = makeStyles(() => ({
  // heading: {
  //   color: '#134696',
  //   fontSize: 32,
  //   fontFamily: 'medium',
  // },
  // headingPattern: {
  //   position: "absolute",
  //   left: -60,
  //   marginTop: 20,
  // },
  heading: {
    fontSize: 32,
    fontFamily: "heavy",
    color: "#134696",
    //marginLeft: 160,
    marginTop: 50,
    //marginBottom: -70,
  },
  text1: {
    color: "#7d7d7d",
    fontSize: 18,
    margin: "15px 0px",
  },
  text2: {
    color: "#7d7d7d",
    fontSize: 18,
  },
}));

const AboutCourse = () => {
  const classes = useStyles();

  const { langIndex } = useSelector((state) => state.global);
  const { courseDetail } = useSelector((state) => state.course);

  return (
    <>
      {/* <div>
        <div className={classes.heading}>
          {TextTranslation.aboutTheCourse[langIndex]}
        </div>
        <img className={classes.headingPattern} alt="" src={headingPattern} />
      </div> */}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={10} sm={11} md={11} lg={12}>
          <div className={classes.heading}>
            {TextTranslation.aboutTheCourse[langIndex]}
          </div>
        </Grid>
        <Grid item xs={10} sm={11} md={11} lg={12}>
          <div className={classes.text1}>
            {courseDetail?.result?.description}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutCourse;
