import React from 'react';
import { makeStyles } from '@mui/styles';
import './agentInputStyles.css';
import ReactInputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
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

/* AgentInputField takes input field parameters and shows the field with styling on the agent form. */
const AgentInputField = ({
  placeholder,
  value,
  onChange,
  startIcon,
  endIcon,
  type,
  validating,
  inputRef,
  onFocus,
  onBlur,
  mask,
  max,
  name,
  defaultValue,
  readOnly,
  onKeyPress
}) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.container}
        style={{
          border:
            typeof validating === 'string'
              ? '1px solid #D83F50'
              : '1px solid #b2b2c9',
        }}
      >
        {startIcon}
        {mask ? (
          <ReactInputMask
            mask={mask}
            maskChar="*"
            placeholder={placeholder}
            value={value || ''}
            className="login-input"
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        ) : (
          <input
            ref={inputRef}
            type={type}
            name={name}
            className="login-input"
            placeholder={placeholder}
            value={value || ''}
            defaultValue={defaultValue}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readOnly}
            max={max}
            style={{
              color: darkMode ? '#fff' : '#134696',
            }}
          />
        )}

        {endIcon}
      </div>
      {typeof validating === 'string' && (
        <span className={classes.helperText}>{validating}</span>
      )}
    </div>
  );
};

export default AgentInputField;
