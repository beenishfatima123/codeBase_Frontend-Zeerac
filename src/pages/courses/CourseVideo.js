import React from "react";
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";
import CourseInfo from "../../components/coursesComponents/videos/CourseInfo";
import CourseVideoChapters from "../../components/coursesComponents/videos/CourseVideoChapters";

const CourseVideo = () => {
  return (
    <div
      style={{ width: HEADER_CONTENT_WIDTH, maxWidth: "90%", margin: "auto" }}
    >
      <CourseInfo />
      <CourseVideoChapters />
    </div>
  );
};

export default CourseVideo;
