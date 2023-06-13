import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import useColor from '../../../../../utils/hooks/useColor';
import defaultImage from '../../../../../assets/defaultAgent1.png';

const data = [
  {
    profilePic: defaultImage,
    name: 'Ahmed Tariq',
    city: 'Lahore',
    country: 'Pakistan',
    sentRequest: false,
  },
  {
    profilePic: defaultImage,
    name: 'Ahmed Tariq',
    city: 'Lahore',
    country: 'Pakistan',
    sentRequest: false,
  },
  {
    profilePic: defaultImage,
    name: 'Ahmed Tariq',
    city: 'Lahore',
    country: 'Pakistan',
    sentRequest: false,
  },
  {
    profilePic: defaultImage,
    name: 'Ahmed Tariq',
    city: 'Lahore',
    country: 'Pakistan',
    sentRequest: false,
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
}));

const FriendList = () => {
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
          My friend list
        </div>
        <div
          className={classes.totalFriends}
          style={{ color: darkMode ? colors?.white : '' }}
        >
          125 Friends
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
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default FriendList;
