import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../../redux/slices/projectSlice';
import { getCurrentUser } from '../../../utils/helperFunctions';
import Slider from 'react-slick';
import { makeStyles } from '@mui/styles';
import ProjectCard from './ProjectCard';
import './sliderStyles.css';
import CustomSliderDots from './CustomSliderDots';
const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: false,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  arrows: false,
  style: { height: '100%', width: '100%' },
  dots: false,
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 74,
    position: 'relative',
  },
  innerDiv: {
    height: '100%',
  },
}));
const ProjectsShowcase = ({ open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sliderRef = useRef();
  const allProjects = useSelector((state) => state.projects.allProjects);
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    // // console.log({ allProjects });
    if (open && !allProjects && currentUser) {
      // // console.log("sending request");
      dispatch(getAllProjects({ token: currentUser?.token }));
    }
    // eslint-disable-next-line
  }, [allProjects, currentUser, open]);

  const handleDotClick = (index) => {
    // // console.log({ index, sliderRef });
    if (sliderRef?.current) sliderRef?.current?.slickGoTo(index);
  };
  return (
    <div className={classes.container}>
      <Slider
        {...settings}
        className="slider-inner"
        ref={sliderRef}
        beforeChange={(current, next) => setCurrentIndex(next)}
      >
        {allProjects?.result?.results?.slice(0, 3)?.map((elem, index) => (
          <ProjectCard key={index} project={elem} />
        ))}
      </Slider>
      <CustomSliderDots
        total={allProjects?.result?.results?.slice(0, 3)?.length}
        handleDotClick={handleDotClick}
        currentDot={currentIndex}
      />
    </div>
  );
};

export default ProjectsShowcase;
