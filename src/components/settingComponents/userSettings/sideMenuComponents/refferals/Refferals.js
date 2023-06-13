import React from 'react';
import Sent from '../../svg/Sent';
import SearchBar from './SearchBar';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import useColor from '../../../../../utils/hooks/useColor';
import emailIcon from '../../../../../assets/settings/sms.png';
import personIcon from '../../../../../assets/settings/person.png';
import twitterIcon from '../../../../../assets/settings/twitter.png';
import facebookIcon from '../../../../../assets/settings/facebook.png';
import linkedInIcon from '../../../../../assets/settings/linkedIn.png';
import whatsAppIcon from '../../../../../assets/settings/whatsApp.png';
import instagramIcon from '../../../../../assets/settings/instagram.png';

const data = [
  {
    email: 'alexaandriana@gmail.com',
    invited: true,
    joined: false,
  },
  {
    email: 'alexaandriana@gmail.com',
    invited: false,
    joined: true,
  },
];

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 24,
    fontFamily: 'medium',
    color: '#134696',
  },
  text: {
    fontSize: 14,
    fontFamily: 'light',
    color: '#707070',
    margin: '10px 0',
    width: '85%',
  },
  notifications: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    border: '1px solid #EFEFEF',
    borderRadius: 5,
    padding: '0 20px',
    margin: '15px 0',
  },
  name: {
    fontSize: 16,
    fontFamily: 'light',
    color: '#000000',
  },
  searchResultContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #e3e3e3',
  },
  email: {
    fontSize: 18,
    fontFamily: 'light',
    color: '#134696',
    marginLeft: 10,
  },
  button: {
    fontSize: 16,
    fontFamily: 'light',
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10px',
    borderRadius: 10,
    border: '1px solid #e3e3e3',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    color: '#134696',
  },
  socialIcons: {
    cursor: 'pointer',
    marginLeft: 10,
  },
}));

const Refferals = () => {
  const classes = useStyles();
  const { colors } = useSelector((state) => state.global);
  useColor(colors);
  return (
    <div>
      <div className={classes.heading} style={{ color: colors?.primary }}>
        Refferals
      </div>
      <div className={classes.text}>
        Invite your friend email address and send them invitations to join
        Zeerac! Earn points by inviting them!
      </div>
      <SearchBar
        placeholder="Enter email address"
        startIcon={<img alt="" src={personIcon} />}
        endIcon={
          <Sent
            style={{ marginRight: 10, cursor: 'pointer' }}
            color={colors?.primary}
          />
        }
      />
      {data.map((item, index) => (
        <div key={index} className={classes.searchResultContainer}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img alt="" src={emailIcon} />
            <div className={classes.email} style={{ color: colors?.primary }}>
              {item.email}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className={classes.button}
              style={{
                backgroundColor: item.joined ? colors?.primary : '',
                color: item.joined ? '#ffffff' : '',
                marginRight: 10,
              }}
            >
              {item.invited ? 'Invited' : item.joined ? 'Joined!' : null}
            </div>
            <div className={classes.button}>Cancel</div>
          </div>
        </div>
      ))}
      <div
        className={classes.heading}
        style={{ marginTop: 10, color: colors?.primary }}
      >
        Share the refferal link
      </div>
      <div className={classes.text}>
        You can also share your referral link by copying and sending or sharing
        on your social media/messages
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <SearchBar
          placeholder="zeerac.com/ahmed-tariq-referrals"
          endIcon={
            <div
              style={{
                fontSize: 16,
                fontFamily: 'light',
                marginRight: 10,
                cursor: 'pointer',
                color: colors?.primary,
              }}
            >
              Copy Link
            </div>
          }
          style={{ width: '50%' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>
          <img className={classes.socialIcons} alt="" src={facebookIcon} />
          <img className={classes.socialIcons} alt="" src={instagramIcon} />
          <img className={classes.socialIcons} alt="" src={twitterIcon} />
          <img className={classes.socialIcons} alt="" src={linkedInIcon} />
          <img className={classes.socialIcons} alt="" src={whatsAppIcon} />
        </div>
      </div>
    </div>
  );
};

export default Refferals;
