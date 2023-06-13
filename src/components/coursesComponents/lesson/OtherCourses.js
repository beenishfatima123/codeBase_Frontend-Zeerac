import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import zeeracLogo from '../../../assets/courses/zeerac.png';
//import headingPattern from "../../../assets/courses/headingPattern.png";
import courseThumbnail from '../../../assets/courses/courseThumbnail.jpg';
import { useSelector } from 'react-redux';
import { TextTranslation } from '../../../utils/translation';

const data = [
  {
    id: 1,
    name: 'COURSE 1',
    description: 'COMMUNICATION SKILL FOR RELATORS',
  },
  {
    id: 2,
    name: 'COURSE 2',
    description: 'COMMUNICATION SKILL FOR RELATORS',
  },
  {
    id: 3,
    name: 'COURSE 3',
    description: 'COMMUNICATION SKILL FOR RELATORS',
  },
];

const useStyles = makeStyles(() => ({
  // headingPattern: {
  //   position: "absolute",
  //   left: -60,
  //   marginTop: 20,
  // },
  heading: {
    fontSize: 32,
    fontFamily: 'heavy',
    color: '#134696',
    //marginLeft: 100,
    marginTop: 50,
    //marginBottom: -70,
  },
  thumbnail: {
    height: 228,
    width: '100%',
    objectFit: 'cover',
    filter: 'grayscale(80%)',
    '&:hover': {
      filter: 'grayscale(0%)',
    },
  },
  courseContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
    padding: 5,
    marginTop: -80,
  },
  courseName: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 10,
    zIndex: 1,
  },
  courseDescription: {
    color: '#ffffff',
    fontSize: 16,
    width: '80%',
    zIndex: 1,
  },
  courseNumberMain: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  courseNumberId: {
    fontSize: 36,
    color: '#0ed864', // green color
    zIndex: 1,
  },
  courseNumberName: {
    position: 'absolute',
    opacity: 0.6,
    fontSize: 12,
    color: '#134696', // blue color
    zIndex: 1,
  },
}));

const OtherCourses = () => {
  const classes = useStyles();
  const { langIndex } = useSelector((state) => state.global);

  return (
    <>
      {/* <div>
        
        <img className={classes.headingPattern} alt="" src={headingPattern} />
      </div> */}
      <Grid container justifyContent="center" spacing={2} sx={{ my: 2 }}>
        <Grid item xs={10} sm={11} md={11} lg={12}>
          <div className={classes.heading}>
            {TextTranslation.browseOtherCourses[langIndex]}
          </div>
        </Grid>
        {data.map((item, index) => (
          <Grid
            item
            key={index}
            xs={10}
            sm={5.5}
            md={5.5}
            lg={4}
            sx={{
              my: 1,
              height: 228,
              cursor: 'pointer',
            }}
          >
            <img
              alt="thumbnail"
              src={courseThumbnail}
              className={classes.thumbnail}
            />
            <div>
              <img
                alt=""
                src={zeeracLogo}
                style={{
                  position: 'absolute',
                  objectFit: 'cover',
                  width: 30,
                  marginTop: -140,
                  marginLeft: 10,
                }}
              />
              <div className={classes.courseContainer}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div className={classes.courseName}>{item.name}</div>
                  <div className={classes.courseDescription}>
                    {item.description}
                  </div>
                </div>
                <div className={classes.courseNumberMain}>
                  <div className={classes.courseNumberId}>{item.id}</div>
                  <div className={classes.courseNumberName}>course</div>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OtherCourses;
