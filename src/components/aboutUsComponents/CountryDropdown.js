import React from 'react';
import { makeStyles } from '@mui/styles';
import './countryStyles.css';
import { COUNTRY_ENUM } from '../../utils/constants';
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '15px 10px',
    borderRadius: 10,
    flex: 1,
    marginTop: 10,
    border: '1px solid #b2b2c9',
  },
}));
const CoutryDropdown = ({
  placeholder,
  onChange,
  startIcon,
  endIcon,
  value,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {startIcon}
      <select
        className="account-select"
        onChange={onChange}
        value={value || ''}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {COUNTRY_ENUM?.map((elem, index) => (
          <option value={elem} key={index}>
            {elem}
          </option>
        ))}
      </select>

      {endIcon}
    </div>
  );
};

export default CoutryDropdown;
