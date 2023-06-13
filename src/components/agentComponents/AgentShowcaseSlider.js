import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import { PROPERTY_SLIDER_SETTINGS } from '../../utils/constants';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AgentCard from './AgentCard';
import Carousel from 'nuka-carousel';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
}));

const AgentShowcaseSlider = ({ agents }) => {
  const classes = useStyles();
  const sliderRef = useRef();
  const handleNextSlide = () => {
    // // console.log({ sliderRef });
    if (sliderRef?.current) sliderRef?.current?.slickNext();
  };
  return (
    <div className={classes.container}>
      <Carousel
        slidesToShow={1}
        cellSpacing={0}
        cellAlign="center"
        wrapAround={true}
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
      >
        {agents?.map((elem, index) => (
          <AgentCard key={index} agent={elem} />
        ))}
      </Carousel>
      {/* <Slider {...PROPERTY_SLIDER_SETTINGS} ref={sliderRef}>
        {agents?.map((elem, index) => (
          <AgentCard key={index} agent={elem} />
        ))}
      </Slider> */}
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          zIndex: 120000,
          right: 1,
          backgroundColor: '#134696',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'black',
          },
        }}
        onClick={handleNextSlide}
      >
        <ArrowForwardIosIcon style={{ color: 'white' }} />
      </IconButton>
    </div>
  );
};

export default AgentShowcaseSlider;
