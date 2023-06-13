import React from 'react';
import Verify from '../../svg/Verify';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import useColor from '../../../../../utils/hooks/useColor';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 24,
    fontFamily: 'light',
    color: '#134696',
    margin: '10px 0',
  },
  container: {
    border: '1px solid #EAEAEA',
    borderRadius: 5,
    padding: 20,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'light',
    color: '#019F37',
  },
  description: {
    fontSize: 14,
    fontFamily: 'light',
    color: '#000000',
    marginTop: 15,
  },
}));

const SecureAccount = () => {
  const classes = useStyles();
  const { colors, darkMode } = useSelector((state) => state.global);
  useColor(colors);
  return (
    <>
      <div className={classes.label} style={{ color: colors?.primary }}>
        Connected Accounts
      </div>
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <div style={{ marginRight: 10 }}>
            <Verify />
          </div>
          <div className={classes.title}>Secure Your Account</div>
        </div>
        <div
          className={classes.description}
          style={{ color: darkMode ? colors?.white : '' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus.{' '}
          <span style={{ color: '#8053FF' }}>Learn more</span>
        </div>
      </div>
    </>
  );
};

export default SecureAccount;
