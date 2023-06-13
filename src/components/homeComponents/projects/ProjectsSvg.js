import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import LinesSvg from '../../globalComponents/misc/LinesSvg';
import { useWindowDims } from '../../../utils/useWindowDims';
import { TextTranslation } from '../../../utils/translation';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  labelsContainer: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  land: {
    fontSize: 26,
    fontFamily: 'light',
    color: '#134696',
    textTransform: 'uppercase',
    position: 'absolute',
    top: 0,
  },
  label1: {
    fontSize: 45,
    fontFamily: 'heavy',
    color: '#0ED864',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: 0,
  },
  label2: {
    fontSize: 100,
    fontFamily: 'heavy',
    color: '#134696',
    textTransform: 'uppercase',
    opacity: 0.07,
    marginLeft: '10%',
  },
  '@media (max-width: 1024px)': {
    container: {
      // flexDirection: "column-reverse",
      // alignItems: "flex-start",
      // margin: "20px 0px",
    },
  },
}));

const ProjectsSvg = () => {
  const classes = useStyles();
  const { width } = useWindowDims();

  const { darkMode, langIndex } = useSelector((state) => state.global);
  return (
    <div className={classes.container}>
      <LinesSvg
        style={{
          maxWidth: '100%',
          marginLeft: width < 1024 ? -75 : 0,
          position: 'absolute',
          // left:
          //   width < 360
          //     ? -150
          //     : width < 450
          //     ? -200
          //     : width < 1200
          //     ? -250
          //     : width < 1300
          //     ? -220
          //     : width < 1500
          //     ? -230
          //     : width < 1700
          //     ? -200
          //     : width < 1800
          //     ? -150
          //     : width < 2000
          //     ? -100
          //     : width < 2100
          //     ? -50
          //     : 0,
          left: -210,
        }}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="900"
        height="120"
        viewBox="0 0 900 120"
        style={{
          maxWidth: '100%',
          position: 'relative',
          marginBottom: 40,
          textTransform: 'uppercase',
        }}
      >
        <g
          id="Group_7155"
          data-name="Group 7155"
          transform="translate(-292.275 -3111.444)"
        >
          <text
            id="Projects"
            transform="translate(402 3209.444)"
            fill={darkMode ? '#fff' : '#134696'}
            fontSize="100"
            opacity="0.07"
            fontFamily="heavy"
          >
            <tspan x="0" y="0">
              {TextTranslation.categories[langIndex]}
            </tspan>
          </text>
          <text
            id="Land_is"
            data-name="Land is"
            transform="translate(292.275 3161.255)"
            fill={darkMode ? '#fff' : '#134696'}
            fontSize="26"
            fontFamily="light"
          >
            <tspan x="0" y="0">
              {TextTranslation.landIs[langIndex]}
            </tspan>
          </text>
          <text
            id="Value"
            transform="translate(327 3205.163)"
            fill="#0ed864"
            fontSize="45"
            fontFamily="heavy"
          >
            <tspan x="0" y="0">
              {TextTranslation.value[langIndex]}
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default ProjectsSvg;
