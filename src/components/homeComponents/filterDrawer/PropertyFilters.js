import { Box, Button, Grid, Slider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LuggageIcon from '@mui/icons-material/Luggage';
import { TYPE_FILTERS } from '../../../utils/constants';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatCurrency } from '../../../utils/helperFunctions';
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#1C1C1C',
    color: 'white',
    alignItems: 'center',
    position: 'relative',
  },
  locationInputContainer: {
    display: 'flex',
    width: '80%',
    padding: 10,
    borderBottom: '1px solid white',
  },
  sliderLabelsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
  },
  sliderLabels: {
    color: 'white',
    fontSize: 16,
    margin: 0,
  },
  input: {
    display: 'flex',
    flex: 1,
    border: 'none',
    background: 'none',
    color: 'white',
    fontSize: 16,
    '&:focus': {
      outline: 'none',
    },
  },
}));

function valueText(value) {
  return `${value}°C`;
}

const minDistance = 10;

const PropertyFilters = () => {
  const classes = useStyles();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [budgetSlider, setBudgetSlider] = useState([0, 100]);

  const renderIcon = (item) => {
    switch (item) {
      case 'Commercial':
        return <CorporateFareIcon />;
      case 'Plot':
        return <LuggageIcon />;
      case 'House':
        return <HouseIcon />;
      case 'Rent':
        return <BedroomParentIcon />;
      case 'Flat':
        return <ApartmentIcon />;
      case 'Plaza':
        return <LocationCityIcon />;

      default:
        break;
    }
  };
  const handleFilter = (item) => {
    if (selectedFilters?.includes(item))
      setSelectedFilters((prev) =>
        prev?.filter((filterItem) => filterItem !== item)
      );
    else setSelectedFilters((prev) => [...prev, item]);
  };

  const handleBudgetSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setBudgetSlider([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setBudgetSlider([clamped - minDistance, clamped]);
      }
    } else {
      setBudgetSlider(newValue);
    }
  };

  useEffect(() => {
    // // console.log({ budgetSlider });
  }, [budgetSlider]);
  return (
    <div className={classes.container}>
      <p>Find Property Type</p>

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ padding: '0px 20px' }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
      >
        {TYPE_FILTERS?.map((elem, index) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={6}
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{
                fontSize: 14,
                color: selectedFilters?.includes(index) ? '#337FF8' : 'white',
                textTransform: 'none',
                width: '50%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}
              startIcon={renderIcon(elem)}
              onClick={() => handleFilter(index)}
            >
              {elem}
            </Button>
          </Grid>
        ))}
      </Grid>

      <p>Location</p>

      <div className={classes.locationInputContainer}>
        <LocationOnIcon style={{ color: '#464646' }} />
        <input
          type="text"
          className={classes.input}
          placeholder={'Destination, City, Address'}
        />
      </div>

      <p>Budget</p>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={budgetSlider}
          onChange={handleBudgetSlider}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          min={0}
          max={1000000}
        />
      </Box>
      <div className={classes.sliderLabelsContainer}>
        <p className={classes.sliderLabels}>
          ${formatCurrency(budgetSlider[0])}
        </p>
        <p className={classes.sliderLabels}>
          ${formatCurrency(budgetSlider[1])}
        </p>
      </div>
    </div>
  );
};

export default PropertyFilters;
