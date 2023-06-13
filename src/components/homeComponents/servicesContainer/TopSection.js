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

  // style={{ backgroundColor: darkMode ? "#303134" : "#134696" }}
  return (
    <div className={classes.container}>
      <img src={servicesLine} alt="" className={classes.image} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="648"
        height="120"
        viewBox="0 0 648 120"
        style={{
          marginLeft: width > 1024 ? -40 : 0,
          maxWidth: '100%',
          alignSelf: 'center',
        }}
      >
        <g
          id="Group_7052"
          data-name="Group 7052"
          transform="translate(-312 -9732)"
        >
          <text
            id="services"
            transform="translate(461 9830)"
            fill={darkMode ? 'white' : '#134696'}
            fontSize="100"
            fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
            fontWeight={'bold'}
            opacity="0.07"
          >
            <tspan x="0" y="0">
              SERVICES
            </tspan>
          </text>
          <text
            id="Land_is"
            data-name="Land is"
            transform="translate(312 9770.757)"
            fill={darkMode ? 'white' : '#134696'}
            fontSize="26"
            fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
          >
            <tspan x="0" y="0">
              LAND IS
            </tspan>
          </text>
          <text
            id="people"
            transform="translate(353.069 9810.757)"
            fill="#0ed864"
            fontSize="45"
            fontFamily="HelveticaNeueLTStd-Hv, Helvetica Neue LT Std !important"
            fontWeight={'bold'}
          >
            <tspan x="0" y="0">
              PEOPLE
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default TopSection;
