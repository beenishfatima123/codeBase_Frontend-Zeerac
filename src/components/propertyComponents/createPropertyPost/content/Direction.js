import React from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPropertyData } from '../../../../redux/slices/createPropertySlice';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
  },
  title: {
    fontSize: 22,
    color: '#134696',
    borderBottom: '1px solid #134696',
    fontWeight: 'bold',
    display: 'flex',
    flex: 1,
    padding: '20px 5%',
  },
}));
const Direction = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );

  const handleClick = (direction) => {
    dispatch(setPropertyData({ ...propertyData, direction }));
  };
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <span className={classes.title}>Choose the direction house facing</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="373"
        height="332"
        viewBox="0 0 373 332"
        style={{ marginTop: 40 }}
      >
        <g
          id="Group_6241"
          data-name="Group 6241"
          transform="translate(-560.538 -3089)"
        >
          <g
            id="Component_41_1"
            data-name="Component 41 – 1"
            transform="translate(726.538 3089)"
          >
            <text
              id="North"
              transform="translate(21 16)"
              fill={propertyData?.direction === 'North' ? '#134696' : '#E6ECF0'}
              fontSize="17"
              fontFamily={
                propertyData?.direction === 'North'
                  ? 'HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important'
                  : 'HelveticaNeueLTStd-Roman, Helvetica Neue LT Std !important'
              }
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick('North')}
            >
              <tspan x="-21.25" y="0">
                North
              </tspan>
            </text>
          </g>
          <g
            id="Component_43_1"
            data-name="Component 43 – 1"
            transform="translate(725.538 3403)"
          >
            <text
              id="South"
              transform="translate(21 15)"
              fill={propertyData?.direction === 'South' ? '#134696' : '#E6ECF0'}
              fontSize="16"
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick('South')}
              fontFamily={
                propertyData?.direction === 'South'
                  ? 'HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important'
                  : 'HelveticaNeueLTStd-Roman, Helvetica Neue LT Std !important'
              }
            >
              <tspan x="-21.192" y="0">
                South
              </tspan>
            </text>
          </g>
          <g
            id="Component_42_1"
            data-name="Component 42 – 1"
            transform="translate(899.538 3249)"
          >
            <text
              id="East"
              transform="translate(17 16)"
              fill={propertyData?.direction === 'East' ? '#134696' : '#E6ECF0'}
              fontSize="17"
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick('East')}
              fontFamily={
                propertyData?.direction === 'East'
                  ? 'HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important'
                  : 'HelveticaNeueLTStd-Roman, Helvetica Neue LT Std !important'
              }
            >
              <tspan x="-16.686" y="0">
                East
              </tspan>
            </text>
          </g>
          <g
            id="Component_44_1"
            data-name="Component 44 – 1"
            transform="translate(560.538 3249)"
          >
            <text
              id="West"
              transform="translate(19 16)"
              fill={propertyData?.direction === 'West' ? '#134696' : '#E6ECF0'}
              style={{ cursor: 'pointer' }}
              fontSize="17"
              onClick={() => handleClick('West')}
              fontFamily={
                propertyData?.direction === 'West'
                  ? 'HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important'
                  : 'HelveticaNeueLTStd-Roman, Helvetica Neue LT Std !important'
              }
            >
              <tspan x="-18.878" y="0">
                West
              </tspan>
            </text>
          </g>
          <g
            id="Group_6045"
            data-name="Group 6045"
            transform="translate(738.921 3117.852)"
          >
            <path
              id="Polygon_45"
              data-name="Polygon 45"
              d="M12,0,24,141H0Z"
              transform="translate(-0.383 0.148)"
              fill="#e6ecf0"
            />
            <path
              id="Polygon_46"
              data-name="Polygon 46"
              d="M12,0,24,139H0Z"
              transform="translate(23.617 280.148) rotate(180)"
              fill="#e6ecf0"
            />
          </g>
          <g
            id="Group_6044"
            data-name="Group 6044"
            transform="translate(891.596 3247.686) rotate(90)"
          >
            <path
              id="Polygon_47"
              data-name="Polygon 47"
              d="M12,0,24,141H0Z"
              transform="translate(0.314 0.058)"
              fill="#e6ecf0"
            />
            <path
              id="Polygon_48"
              data-name="Polygon 48"
              d="M12,0,24,139H0Z"
              transform="translate(24.314 280.058) rotate(180)"
              fill="#e6ecf0"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Direction;
