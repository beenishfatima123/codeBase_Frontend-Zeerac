import React from "react";
import { Grid } from "@mui/material";
import Modules from "../../components/coursesComponents/lesson/Modules";
//import Searchbar from "../../components/globalComponents/misc/Searchbar";
import Features from "../../components/coursesComponents/lesson/Features";
import AboutCourse from "../../components/coursesComponents/lesson/AboutCourse";
import LessonBanner from "../../components/coursesComponents/lesson/LessonBanner";
// import OtherCourses from '../../components/coursesComponents/lesson/OtherCourses';
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";
// import { TextTranslation } from "../../utils/translation";
// import { useSelector } from "react-redux";

const CourseDetail = () => {
  //const { langIndex } = useSelector((state) => state.global);
  return (
    <Grid container sx={{ overflowX: "hidden" }}>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Searchbar
          placeholder={TextTranslation.course[langIndex]}
          style={{ margin: "20px 0px" }}
        />
      </Grid> */}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <LessonBanner />
      </Grid>
      <div
        style={{ width: HEADER_CONTENT_WIDTH, maxWidth: "90%", margin: "auto" }}
      >
        <AboutCourse />
        <Modules />
        <Features />
        {/* <OtherCourses /> */}
      </div>
    </Grid>
  );
};

export default CourseDetail;
