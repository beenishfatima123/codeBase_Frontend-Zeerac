import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import courseShowcaseThumbnails from '../../../assets/home/courses/courseShowcaseThumbnails.png';
import courseShowcaseThumbnailsSm from '../../../assets/home/courses/courseShowcaseThumbnailsSm.png';

import { useWindowDims } from '../../../utils/useWindowDims';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: '20px 5%',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
  },
  line: {
    position: 'absolute',
    left: '4%',
    top: -200,
  },
  tagline: {
    color: '#6B7B88',
    fontSize: 22,
    fontFamily: 'light',
    maxWidth: 435,
  },
  showcase: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  showcaseImage: {
    height: 390,
    width: 390,
    alignSelf: 'flex-end',
    marginRight: -100,
    zIndex: 10,
  },
  showcaseVideo: {
    // height: 520,
    // width: 890,
  },
  '@media (max-width: 1024px)': {
    container: {
      flexDirection: 'column',
    },
    showcaseImage: {
      width: '30%',
    },
  },
  '@media (max-width: 1400px)': {
    grid: {
      flexDirection: 'column',
    },
    showcase: {
      justifyContent: 'center',
    },
    imagesContainer: {
      maxWidth: '95%',
    },
  },
}));
const CoursesShowcaseContainer = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="781.001"
        height="120"
        viewBox="0 0 781.001 120"
        style={{ maxWidth: '100%' }}
      >
        <g
          id="Group_7053"
          data-name="Group 7053"
          transform="translate(-90.999 -11373)"
        >
          <text
            id="courses"
            transform="translate(379 11471)"
            fill={darkMode ? 'white' : '#134696'}
            fontSize="100"
            fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
            opacity="0.07"
            fontWeight={'bold'}
          >
            <tspan x="0" y="0">
              COURSES
            </tspan>
          </text>
          <text
            id="Land_is"
            data-name="Land is"
            transform="translate(90.999 11413)"
            fill={darkMode ? 'white' : '#134696'}
            fontSize="26"
            fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
          >
            <tspan x="0" y="0">
              LAND IS
            </tspan>
          </text>
          <text
            id="opportunity"
            transform="translate(113.999 11451.648)"
            fill="#0ed864"
            fontSize="45"
            fontFamily="HelveticaNeueLTStd-Hv, Helvetica Neue LT Std !important"
            fontWeight={'bold'}
          >
            <tspan x="0" y="0">
              OPPORTUNITY
            </tspan>
          </text>
        </g>
      </svg>

      <div className={classes.grid}>
        <div style={{ minWidth: 390 }}>
          <p
            className={classes.tagline}
            style={{
              color: darkMode ? 'white' : '#6B7B88',
            }}
          >
            You would never want to miss out on a great job opportunity.
            Similarly, never miss out on your dream home, land or business.{' '}
          </p>
          <Button
            endIcon={<ArrowForwardIcon />}
            sx={{
              background:
                'linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)',
              textTransform: 'none',
              color: '#134696',
              width: 180,
              height: 40,
              mt: 3,
            }}
          >
            Get Started
          </Button>
        </div>
        <div className={classes.showcase}>
          {width > 1024 ? (
            <img
              src={courseShowcaseThumbnails}
              alt=""
              className={classes.showcaseVideo}
            />
          ) : (
            <img
              src={courseShowcaseThumbnailsSm}
              alt=""
              style={{ width: '95%' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesShowcaseContainer;
