import React from 'react';
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import useColor from '../../../../../utils/hooks/useColor';

const data = [
  {
    name: 'Messages & Call Request',
    enable: true,
  },
  {
    name: 'News & Updates',
    enable: true,
  },
  {
    name: 'Alert sound',
    enable: true,
  },
  {
    name: 'Email notification',
    enable: true,
  },
  {
    name: 'Receive SMS notification',
    enable: true,
  },
  {
    name: 'Push notification',
    enable: true,
  },
];

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 24,
    fontFamily: 'medium',
    color: '#134696',
  },
  text: {
    fontSize: 14,
    fontFamily: 'light',
    color: '#707070',
    margin: '10px 0',
    width: '85%',
  },
  notifications: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    border: '1px solid #EFEFEF',
    borderRadius: 5,
    padding: '0 20px',
    margin: '15px 0',
  },
  name: {
    fontSize: 16,
    fontFamily: 'light',
    color: '#000000',
  },
}));

const Notifications = () => {
  const classes = useStyles();
  const { colors, darkMode } = useSelector((state) => state.global);
  useColor(colors);

  const CustomSwitch = styled(Switch)(() => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: colors?.primary,
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: colors?.primary,
    },
  }));

  return (
    <div style={{ margin: 10 }}>
      <div className={classes.heading} style={{ color: colors?.primary }}>
        Notification
      </div>
      <div className={classes.text}>
        Zeerac may still send you important notifications about your account and
        content outside of your preferred notification settings.
      </div>
      {data.map((value, index) => (
        <div key={index} className={classes.notifications}>
          <div
            className={classes.name}
            style={{ color: darkMode ? colors?.white : '' }}
          >
            {value.name}
          </div>
          <CustomSwitch defaultChecked />
        </div>
      ))}
    </div>
  );
};

export default Notifications;
