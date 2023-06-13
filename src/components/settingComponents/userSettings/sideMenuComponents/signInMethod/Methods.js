import React from 'react';
import Mobile from '../../svg/Mobile';
import { makeStyles } from '@mui/styles';
import Question from '../../svg/Question';
import Switch from '@mui/material/Switch';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Authentication from '../../svg/Authentication';
import useColor from '../../../../../utils/hooks/useColor';

const useStyles = makeStyles(() => ({
  container: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #F2F2F2',
  },
  leftMain: {
    display: 'flex',
    alignItems: 'center',
  },
  iconMain: {
    width: 40,
    height: 40,
    borderRadius: 5,
    border: '1px solid #707070',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftMainInner: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
  },
  name: {
    fontSize: 16,
    fontFamily: 'light',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    fontFamily: 'light',
    color: '#C9C9C9',
    marginTop: 5,
  },
}));

const Methods = () => {
  const classes = useStyles();
  const { colors, darkMode } = useSelector((state) => state.global);
  useColor(colors);

  const data = [
    {
      name: 'Mobile Pin Code',
      description: 'Text Message (SMS)',
      icon: <Mobile color={colors?.primary} />,
      check: true,
    },
    {
      name: 'Security Question',
      description: 'You will be asked to enter question for verification',
      icon: <Question color={colors?.primary} />,
      check: true,
    },
    {
      name: 'Authentication App',
      description: 'You will be asked to use Q Code to enter verification',
      icon: <Authentication color={colors?.primary} />,
      check: false,
    },
  ];

  const CustomSwitch = styled(Switch)(() => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: colors?.primary,
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: colors?.primary,
    },
  }));

  return (
    <>
      {data.map((value, index) => (
        <div key={index} className={classes.container}>
          <div className={classes.leftMain}>
            <div className={classes.iconMain}>{value.icon}</div>
            <div className={classes.leftMainInner}>
              <div
                className={classes.name}
                style={{ color: darkMode ? colors?.white : '' }}
              >
                {value.name}
              </div>
              <div className={classes.description}>{value.description}</div>
            </div>
          </div>
          <CustomSwitch defaultChecked />
        </div>
      ))}
    </>
  );
};

export default Methods;
