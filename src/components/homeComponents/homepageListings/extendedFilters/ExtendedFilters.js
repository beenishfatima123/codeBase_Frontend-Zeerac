import React from 'react';
import { makeStyles } from '@mui/styles';
import Budget from './Budget';
import { Grid } from '@mui/material';
import Range from './Range';
import Currency from './Currency';
import ViewAllButton from './ViewAllButton';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '20px 5%',
    position: 'relative',
    border: '1px solid #c9c9c9',
    borderRadius: 20,
    padding: 20,
  },
  overlay: {
    backgroundColor: 'white',
    zIndex: 3,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
}));
const ExtendedFilters = ({ filter, handleChange, regional }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? '#303134' : '',
      }}
    >
      <Grid container columnSpacing={6} sx={{ zIndex: 4 }}>
        <Grid item xs={12} md={4}>
          <Budget
            values={filter}
            handleChange={handleChange}
            regional={regional}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Range
            values={filter}
            handleChange={handleChange}
            regional={regional}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Currency
            values={filter}
            handleChange={handleChange}
            regional={regional}
          />
        </Grid>
      </Grid>

      <div
        className={classes.overlay}
        style={{
          backgroundColor: darkMode ? '#303134' : 'white',
        }}
      ></div>
      <ViewAllButton />
    </div>
  );
};

export default ExtendedFilters;
