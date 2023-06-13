import React from 'react';
import { makeStyles } from '@mui/styles';
import servicesLine from '../../../assets/home/servicesLine.png';
import { useWindowDims } from '../../../utils/useWindowDims';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '200px',
  },
  image: {
    height: 115,
  },
  '@media (max-width: 1024px)': {
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
}));
const TopSection = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <img src={servicesLine} alt="" className={classes.image} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="852"
        height="120"
        viewBox="0 0 852 120"
        style={{
          marginLeft: width > 1024 ? -40 : 0,
          maxWidth: '100%',
          alignSelf: 'center',
        }}
      >
        <g
          id="Group_7054"
          data-name="Group 7054"
          transform="translate(-214 -10416)"
        >
          <text
            id="Land_is"
            data-name="Land is"
            transform="translate(214 10450)"
            fill={darkMode ? 'white' : '#134696'}
            fontSize="26"
            fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
          >
            <tspan x="0" y="0">
              LAND IS
            </tspan>
          </text>
          <g id="Group_7053" data-name="Group 7053">
            <text
              id="community"
              transform="translate(426 10514)"
              fill={darkMode ? 'white' : '#134696'}
              fontSize="100"
              fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
              opacity="0.07"
              fontWeight={'bold'}
            >
              <tspan x="0" y="0">
                COMMUNITY
              </tspan>
            </text>
            <text
              id="connected"
              transform="translate(232 10491.816)"
              fill="#0ed864"
              fontSize="45"
              fontFamily="HelveticaNeueLTStd-Hv, Helvetica Neue LT Std !important"
              fontWeight={'bold'}
            >
              <tspan x="0" y="0">
                CONNECTED
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default TopSection;
