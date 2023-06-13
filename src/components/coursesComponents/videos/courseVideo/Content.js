import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import playIcon from '../../../../assets/courses/play.png';

const data = [
  {
    name: 'Working with type in your wireframes',
    duration: '02:30',
    icon: playIcon,
  },
  {
    name: 'Basic Colors & buttons in wireframes',
    duration: '03:40',
    icon: playIcon,
  },
  {
    name: 'Free icons for your UX UI projects',
    duration: '10:26',
    icon: playIcon,
  },
  {
    name: 'Class Project 01 – Wireframe Homepage',
    duration: '07:19',
    icon: playIcon,
  },
];

const useStyles = makeStyles(() => ({
  chapterName: {
    marginLeft: 20,
    fontSize: 17,
    fontFamily: 'light',
    color: '##272727',
  },
  chapterDuration: {
    fontSize: 14,
    fontFamily: 'medium',
    color: '#777F8A',
  },
}));

const Content = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {data.map((i, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '20px 0px',
              width: '95%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 36,
                  height: 35,
                  backgroundColor: '#134696',
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img alt="icon" src={i.icon} />
              </div>
              <div className={classes.chapterName}>{i.name}</div>
            </div>
            <div className={classes.chapterDuration}>{i.duration}</div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default Content;
