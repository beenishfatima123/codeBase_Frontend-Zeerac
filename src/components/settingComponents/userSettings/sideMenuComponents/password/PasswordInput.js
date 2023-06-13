import React from 'react';
import './passwordStyles.css';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    maxWidth: 500,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '15px 10px',
    borderRadius: 10,
  },
  helperText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  label: {
    fontSize: 14,
    fontFamily: 'light',
    color: '#7d7d7d',
    margin: '10px 0',
  },
}));

const PasswordInput = ({
  placeholder,
  value,
  label,
  type,
  startIcon,
  endIcon,
  onChange,
  validating,
  helperText,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <label className={classes.label}>{label}</label>
      <div
        className={classes.container}
        style={{
          //   border:
          //     validating === false ? '1px solid #D83F50' : '1px solid #b2b2c9',
          border: '1px solid #b2b2c9',
        }}
      >
        {/* <startIcon style={{ marginRight: 10 }} /> */}
        {startIcon}

        <input
          type={type}
          className="password-input"
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
        />
        {endIcon}
      </div>
      {validating === false && (
        <span className={classes.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default PasswordInput;
