import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getAllProperties } from '../../redux/slices/propertiesSlice';
import { PROPERTY_SLIDER_SETTINGS } from '../../utils/constants';
import PropertyCard from './PropertyCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    position: 'relative',
    // marginTop: 10,
  },
}));
const PropertyShowcaseSlider = () => {
  const classes = useStyles();
  const sliderRef = useRef();
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.properties.allProperties);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    // // console.log({ allProperties });
    if (!allProperties && currentUser) {
      // // console.log("sending request");
      dispatch(getAllProperties({ token: currentUser?.token }));
    }
    // eslint-disable-next-line
  }, [allProperties, currentUser]);

  const handleNextSlide = () => {
    // // console.log({ sliderRef });
    if (sliderRef?.current) sliderRef?.current?.slickNext();
  };
  return (
    <div className={classes.container}>
      <Slider {...PROPERTY_SLIDER_SETTINGS} ref={sliderRef}>
        {allProperties?.result?.results?.map((elem, index) => (
          <PropertyCard key={index} property={elem} />
        ))}
      </Slider>
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          zIndex: 120000,
          right: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: '#FFFFFF',
          },
        }}
        onClick={handleNextSlide}
      >
        <ArrowForwardIosIcon style={{ color: 'black' }} />
      </IconButton>
    </div>
  );
};

export default PropertyShowcaseSlider;
