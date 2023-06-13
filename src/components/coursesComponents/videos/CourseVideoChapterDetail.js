import React from 'react';
import { Grid } from '@mui/material';
import Main from './courseVideo/Main';

const CourseVideoChapterDetail = () => {
  return (
    <Grid container justifyContent="center" sx={{ my: 2, height: 300 }}>
      <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
        <Main />
      </Grid>
    </Grid>
  );
};

export default CourseVideoChapterDetail;
