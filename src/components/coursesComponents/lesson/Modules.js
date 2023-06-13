import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Divider, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import forwardArrow from "../../../assets/icons/forwardArrow.png";
import ComponentLoader from "../../globalComponents/ComponentLoader";
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
    //marginLeft: 100,
    marginTop: 50,
    //marginBottom: -70,
  },
  main: {
    height: 200,
    backgroundColor: "#134696",
    position: "relative",
  },
  module: {
    padding: 10,
    fontSize: 11,
    fontFamily: "medium",
    color: "#0ed864",
  },
  name: {
    fontSize: 19,
    fontFamily: "medium",
    color: "#ffffff",
    padding: 10,
    width: "80%",
  },
  bottomMain: {
    marginTop: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
    position: "absolute",
    bottom: 5,
    width: "95%",
  },
  getStarted: {
    fontSize: 12,
    color: "#ffffff",
    fontFamily: "medium",
    background:
      "linear-gradient(90deg, rgba(14,216,100,1) 50%, rgba(0,0,0,0) 100%)",
    width: 110,
    padding: 5,
    marginBottom: 5,
    cursor: "pointer",
  },
  people: {
    fontSize: 9,
    letterSpacing: 1,
    color: "#0ed864",
    fontFamily: "medium",
  },
  instructorLabel: {
    fontSize: 11,
    letterSpacing: 1,
    color: "#0ed864",
    fontFamily: "medium",
    textAlign: "right",
    marginBottom: 5,
  },
  instructor: {
    fontSize: 13,
    fontFamily: "medium",
    color: "#ffffff",
  },
}));

const Modules = () => {
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  const { langIndex } = useSelector((state) => state.global);
  const { courseDetail, courseDetailApiInfo } = useSelector(
    (state) => state.course
  );

  return (
    <>
      {courseDetailApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          {/* <div>
            <div className={classes.heading}>
              {TextTranslation.modules[langIndex]}
            </div>
            <img
              className={classes.headingPattern}
              alt=""
              src={headingPattern}
            />
          </div> */}
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={10} sm={11} md={11} lg={12}>
              <div className={classes.heading}>
                {TextTranslation.modules[langIndex]}
              </div>
            </Grid>
            {courseDetail?.result?.modules?.map((value, index) => (
              <Grid key={index} item xs={10} sm={5.5} md={5.5} lg={4}>
                <div className={classes.main}>
                  <div className={classes.module}>MODULE {index + 1}</div>
                  <Divider sx={{ mx: 1, backgroundColor: "#ffffff" }} />
                  <div className={classes.name}>{value?.title}</div>
                  <div className={classes.bottomMain}>
                    <div>
                      <div
                        className={classes.getStarted}
                        // onClick={() => navigate(`/courseVideo/${value?.id}`)}
                        onClick={() =>
                          navigate(`/course/${params?.courseId}/${value?.id}`)
                        }
                      >
                        {TextTranslation.getStarted[langIndex]}
                        <img
                          alt="forward"
                          src={forwardArrow}
                          style={{ padding: "0 10px" }}
                        />
                      </div>
                      {/* <div className={classes.people}>
                        {value.people}{" "}
                        {TextTranslation.peopleAlreadyStarted[langIndex]}
                      </div> */}
                    </div>
                    <div>
                      <div className={classes.instructorLabel}>
                        {TextTranslation.instructor[langIndex]}
                      </div>
                      <div className={classes.instructor}>
                        {value.instructor}
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Modules;
