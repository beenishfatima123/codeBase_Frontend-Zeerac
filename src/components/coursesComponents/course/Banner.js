import React from 'react';
import Dot from '../svg/Dot';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import courseBanner from '../../../assets/courses/courseBanner.png';
import { TextTranslation } from '../../../utils/translation';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 60,
    fontFamily: 'heavy',
    color: '#0ED864',
    textTransform: 'uppercase',
    // position: 'absolute',
    // marginTop: 60,
    // marginLeft: 30,
  },
  description: {
    fontSize: 22,
    fontFamily: 'medium',
    color: '#134696',
    // position: 'absolute',
    // marginTop: 230,
    // marginLeft: 30,
    // width: '35%',
  },
  dots: {
    width: '90%',
    position: 'static',
    marginTop: '15%',
  },
}));

const Banner = () => {
  const classes = useStyles();
  const { langIndex } = useSelector((state) => state.global);
  return (
    <Grid container justifyContent="center" sx={{ overflow: 'hidden', mt: 4 }}>
      <Grid item xs={10} sm={10} md={5} lg={5} xl={4}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 481,
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex' }}>
            <Dot color="#134696" style={{ margin: '10px 25px 50px 25px' }} />
            <div className={classes.title}>
              {TextTranslation.courses[langIndex]}
            </div>
            <Dot color="#134696" style={{ margin: '10px 25px 50px 25px' }} />
            <Dot color="#134696" style={{ margin: '10px 25px 50px 25px' }} />
          </div>

          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              justifyContent="space-evenly"
            >
              <Dot color="#134696" style={{ margin: '50px 30px 50px 25px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px 50px 40px' }} />
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Dot color="#134696" style={{ margin: '50px 25px' }} />
            </Grid>
            <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
              <div className={classes.description}>
                {TextTranslation.ourElearningForum[langIndex]}
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              justifyContent="space-evenly"
            >
              <Dot color="#134696" style={{ margin: '50px 30px 50px 25px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px' }} />
              <Dot color="#134696" style={{ margin: '50px 30px 50px 40px' }} />
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={6} sx={{ height: 481 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            position: 'absolute',
            margin: '40px 0 0 20px',
          }}
        >
          <div>
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
          </div>
          <div>
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot
              color="transparent"
              style={{ margin: '10px 40px 70px 40px' }}
            />
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
          </div>
          <div>
            <Dot color="#ffffff" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot color="#ffffff" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot
              color="transparent"
              style={{ margin: '10px 40px 70px 40px' }}
            />
            <Dot color="#134696" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot
              color="transparent"
              style={{ margin: '10px 40px 70px 40px' }}
            />
          </div>
          <div>
            <Dot color="#ffffff" style={{ margin: '10px 40px 70px 40px' }} />
            <Dot color="#ffffff" style={{ margin: '10px 40px 70px 40px' }} />
          </div>
        </div>
        <img alt="banner" src={courseBanner} />
      </Grid>
    </Grid>
  );
};

export default Banner;
