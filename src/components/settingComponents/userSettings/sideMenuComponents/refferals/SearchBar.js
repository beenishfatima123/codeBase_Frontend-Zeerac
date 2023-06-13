import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px 0',
  },
  input: {
    display: 'flex',
    flex: 1,
    border: 'none',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'light',
    '&:focus': {
      outline: 'none',
    },
    color: '#9DAFBD',
    background: 'none',
  },
  searchContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    borderRadius: 10,
    border: '1px solid #9DAFBD',
    position: 'relative',
    height: 50,
  },
}));

const SearchBar = ({ style, startIcon, endIcon, placeholder }) => {
  const classes = useStyles();
  return (
    <div className={classes.container} style={style}>
      <div className={classes.searchContainer}>
        {startIcon}
        <input
          type="text"
          className={classes.input}
          placeholder={placeholder}
        />

        {endIcon}
      </div>
    </div>
  );
};

export default SearchBar;
