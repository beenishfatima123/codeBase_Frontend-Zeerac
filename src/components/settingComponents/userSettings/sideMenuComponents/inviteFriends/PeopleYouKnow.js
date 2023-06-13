import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import useColor from '../../../../../utils/hooks/useColor';
import defaultImage from '../../../../../assets/defaultAgent1.png';
import twitterIcon from '../../../../../assets/settings/twitter.png';
import facebookIcon from '../../../../../assets/settings/facebook.png';
import linkedInIcon from '../../../../../assets/settings/linkedIn.png';
import whatsAppIcon from '../../../../../assets/settings/whatsApp.png';
import instagramIcon from '../../../../../assets/settings/instagram.png';

const data = [
  {
    profilePic: defaultImage,
    name: 'Ahmed Tariq',
    city: 'Lahore',
    country: 'Pakistan',
    sentRequest: true,
  },
  {
    profilePic: defaultImage,
    name: 'Ahmed Tariq',
    city: 'Lahore',
    country: 'Pakistan',
    sentRequest: true,
  },
  {
    profilePic: defaultImage,
    name: 'Ahmed Tariq',
    city: 'Lahore',
    country: 'Pakistan',
    sentRequest: true,
  },
  {
    profilePic: defaultImage,
    name: 'Ahmed Tariq',
    city: 'Lahore',
    country: 'Pakistan',
    sentRequest: true,
  },
];

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 20,
    fontFamily: 'light',
    color: '#134696',
  },
  totalFriends: {
    fontSize: 14,
    fontFamily: 'light',
    color: '#707070',
    display: 'flex',
    alignItems: 'center',
  },
  friendContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #F1F1F5',
    borderRadius: 5,
    margin: '10px 0',
    padding: '20px 0',
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    fontSize: 18,
    fontFamily: 'medium',
    color: '#171725',
  },
  location: {
    fontSize: 12,
    fontFamily: 'light',
    color: '#707070',
  },
  sentRequest: {
    fontSize: 12,
    fontFamily: 'light',
    color: '#134696',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    border: '1px solid #e3e3e3',
    borderRadius: 5,
    cursor: 'pointer',
    marginTop: 10,
    padding: '0 10px',
  },
  socialIcons: {
    cursor: 'pointer',
    marginLeft: 10,
  },
}));

const PeopleYouKnow = () => {
  const classes = useStyles();
  const { colors, darkMode } = useSelector((state) => state.global);
  useColor(colors);
  return (
    <Grid container justifyContent="center" sx={{ my: 3 }} columnSpacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div className={classes.label} style={{ color: colors?.primary }}>
          People you may know
        </div>
        <div
          className={classes.totalFriends}
          style={{ color: darkMode ? colors?.white : '' }}
        >
          Import contact using any social media
          <span>
            <div
              style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}
            >
              <img className={classes.socialIcons} alt="" src={facebookIcon} />
              <img className={classes.socialIcons} alt="" src={instagramIcon} />
              <img className={classes.socialIcons} alt="" src={twitterIcon} />
              <img className={classes.socialIcons} alt="" src={linkedInIcon} />
              <img className={classes.socialIcons} alt="" src={whatsAppIcon} />
            </div>
          </span>
        </div>
      </Grid>
      {data.map((value, index) => (
        <Grid item key={index} xs={10} sm={5} md={2.8} lg={2.8} xl={2.7}>
          <div className={classes.friendContainer}>
            <div>
              <img
                className={classes.profilePic}
                alt=""
                src={value.profilePic}
              />
            </div>
            <div
              className={classes.name}
              style={{ color: darkMode ? colors?.white : '' }}
            >
              {value.name}
            </div>
            <div className={classes.location}>
              {value.city}, {value.country}
            </div>
            <div
              className={classes.sentRequest}
              style={{ color: colors?.primary }}
            >
              {value.sentRequest && 'Send Request'}
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default PeopleYouKnow;
