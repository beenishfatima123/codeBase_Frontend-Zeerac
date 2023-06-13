import React from 'react';
import { makeStyles } from '@mui/styles';
import './loginStyles.css';
import Input from 'react-phone-number-input/input';

/* useStyles is being used to create custom styling using makeStyles from material UI.
It sets styling properties for mainContainer, helperText and container. */
const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '80%',
    marginTop: 10,
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
}));

/* CustomPhoneInput is the component that lets user enter phone number
and validates the phone number as well. It takes placeholder, value of input field,
onChange method, validation bool, startIcon, helperText and name of input field 
as parameters and uses them in Input component imported from react-phone-number-input */
const CustomPhoneInput = ({
  placeholder,
  value,
  onChange,
  validating,
  startIcon,
  helperText,
  name,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.container}
        style={{
          border:
            validating === false ? '1px solid #D83F50' : '1px solid #b2b2c9',
        }}
      >
        {startIcon}

        <Input
          className="login-input"
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          name={name}
        />
      </div>
      {validating === false && (
        <span className={classes.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default CustomPhoneInput;
