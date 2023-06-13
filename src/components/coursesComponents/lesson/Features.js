import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import timeIcon from "../../../assets/courses/time.png";
import levelIcon from "../../../assets/courses/level.png";
//import onlineIcon from "../../../assets/courses/online.png";
import checkboxIcon from "../../../assets/courses/checkbox.png";
//import flexibleIcon from "../../../assets/courses/flexible.png";
import languageIcon from "../../../assets/courses/language.png";
//import headingPattern from "../../../assets/courses/headingPattern.png";
import { useSelector } from "react-redux";
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
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconMain: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    border: "1px solid #707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#134696",
    marginBottom: 5,
    // marginLeft: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#6B7B88",
    // marginLeft: 10,
  },
}));

const Features = () => {
  const classes = useStyles();
  const { langIndex } = useSelector((state) => state.global);
  const { courseDetail } = useSelector((state) => state.course);

  const data = [
    // {
    //   name: "100% Online Courses",
    //   description: "Start instantly, learn at your own schedule",
    //   icon: onlineIcon,
    // },
    {
      name: `${courseDetail?.result?.difficulty} Level`,
      description: "No prior experience required",
      icon: levelIcon,
    },
    {
      name: `${courseDetail?.result?.language} Language`,
      description: "No prior experience required",
      icon: languageIcon,
    },
    // {
    //   name: "Flexible Schedule",
    //   description: "Set and maintain flexible deadlines",
    //   icon: flexibleIcon,
    // },
    {
      name: `${courseDetail?.result?.time_to_complete} to complete`,
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
    <>
      {/* <div>
        <div className={classes.heading}>
          {TextTranslation.features[langIndex]}
        </div>
        <img className={classes.headingPattern} alt="" src={headingPattern} />
      </div> */}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={10} sm={11} md={11} lg={12}>
          <div className={classes.heading}>
            {TextTranslation.features[langIndex]}
          </div>
        </Grid>
        {data.map((i, index) => (
          <Grid key={index} item xs={10} sm={5.5} md={5.5} lg={3}>
            <div key={index} className={classes.main}>
              <div className={classes.iconMain}>
                <img
                  alt={i.name}
                  src={i.icon}
                  style={{ width: 40, height: 40, objectFit: "contain" }}
                />
              </div>
              <div>
                <div className={classes.name}>{i.name}</div>
                <div className={classes.description}>{i.description}</div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Features;
