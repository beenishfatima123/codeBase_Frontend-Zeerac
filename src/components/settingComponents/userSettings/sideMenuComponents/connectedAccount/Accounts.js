import React from 'react';
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import useColor from '../../../../../utils/hooks/useColor';
import defaultImage from '../../../../../assets/settings/defaultImage.png';

const data = [
  {
    name: 'Google',
    description: 'Lorem ipsum dolor sit amet',
    icon: defaultImage,
    check: true,
  },
  {
    name: 'Facebook',
    description: 'Lorem ipsum dolor sit amet',
    icon: defaultImage,
    check: false,
  },
  {
    name: 'Instagram',
    description: 'Lorem ipsum dolor sit amet',
    icon: defaultImage,
    check: false,
  },
  {
    name: 'LinkedIn',
    description: 'Lorem ipsum dolor sit amet',
    icon: defaultImage,
    check: false,
  },
  {
    name: 'Dropbox',
    description: 'Lorem ipsum dolor sit amet',
    icon: defaultImage,
    check: false,
  },
  {
    name: 'Gmail',
    description: 'Lorem ipsum dolor sit amet',
    icon: defaultImage,
    check: true,
  },
];

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

const Accounts = () => {
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
    <>
      {data.map((value, index) => (
        <div key={index} className={classes.container}>
          <div key={index} className={classes.leftMain}>
            <img alt="defaultImage" src={value.icon} />
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

export default Accounts;
