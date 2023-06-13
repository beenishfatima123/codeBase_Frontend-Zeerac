import React from 'react';
import { makeStyles } from '@mui/styles';
import { useRef } from 'react';
import { useEffect } from 'react';
import useOnScreen from '../../../utils/hooks/useOnScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVideoVisible } from '../../../redux/slices/globalSlice';
import { INTRO_VIDEO_LINK } from '../../../utils/constants';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton } from '@mui/material';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
  fadeOut: {
    opacity: 0,
    width: 0,
    height: 0,
    transition: 'width 1s 1s, height 1s 1s, opacity 1s',
  },
  video: {
    height: '100vh',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    //left: 0,
    right: 0,
    bottom: 0,
    //top: 0,
    opacity: 1,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    zIndex: 20,
  },
  '@media (max-width: 1024px)': {
    container: {
      flexDirection: 'column',
    },
  },
}));

const IntroVideo = ({ handleVideoEnd }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const videoRef = useRef();
  const isVisible = useOnScreen(videoRef);
  const [isMuted, setIsMuted] = useState(true);

  const { hasSeenVideo } = useSelector((state) => state.global);

  useEffect(() => {
    if (!hasSeenVideo) {
      dispatch(setIsVideoVisible(isVisible));
      if (isVisible) {
        videoRef?.current?.play();
      } else videoRef?.current?.pause();
    }
    // eslint-disable-next-line
  }, [isVisible, videoRef, hasSeenVideo]);

  const handleEnd = () => {
    dispatch(setIsVideoVisible(false));
    handleVideoEnd();
  };

  return (
    <div
      className={hasSeenVideo ? classes.fadeOut : classes.container}
      id={'introVideo'}
    >
      {isMuted && (
        <div className={classes.overlay}>
          <IconButton onClick={() => setIsMuted(false)}>
            <VolumeUpIcon style={{ color: 'white', fontSize: 40 }} />
          </IconButton>
        </div>
      )}

      <video
        //id="videoLg"
        className={classes.video}
        autoPlay={!hasSeenVideo}
        ref={videoRef}
        onEnded={handleEnd}
        playsInline={true}
        muted={isMuted}
      >
        <source src={INTRO_VIDEO_LINK} type="video/mp4" />
        <source src={INTRO_VIDEO_LINK} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default IntroVideo;
