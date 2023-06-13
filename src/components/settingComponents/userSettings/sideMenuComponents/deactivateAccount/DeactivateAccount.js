import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useColor from '../../../../../utils/hooks/useColor';
import smsIcon from '../../../../../assets/settings/sms.png';
import phoneIcon from '../../../../../assets/settings/phone.png';
import { handleLogout } from '../../../../../utils/helperFunctions';
import ButtonLoader from '../../../../globalComponents/ButtonLoader';
import calendarIcon from '../../../../../assets/settings/calendar.png';
import ComponentLoader from '../../../../globalComponents/ComponentLoader';
import {
  deactivateAccount,
  userInfo,
} from '../../../../../redux/slices/settingsSlice';

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
  nameContainer: {
    backgroundColor: '#134696',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: 'medium',
    color: '#ffffff',
  },
  profession: {
    fontSize: 12,
    fontFamily: 'light',
    color: '#0ED864',
  },
  detailContainer: {
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    border: '1px solid #707070',
    display: 'flex',
    flexDirection: 'column',
  },
  userInfo: {
    fontSize: 15,
    fontFamily: 'light',
    color: '#134696',
    padding: '5px 0',
    display: 'flex',
    alignItems: 'center',
  },
  icons: {
    marginRight: 10,
  },
  deactivateContainer: {
    position: 'absolute',
    right: 40,
    marginTop: 30,
  },
  button: {
    fontSize: 16,
    fontFamily: 'light',
    color: '#ffffff',
    backgroundColor: '#134696',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 120,
    borderRadius: 5,
    cursor: 'pointer',
  },
}));

const DeactivateAccount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { colors, darkMode } = useSelector((state) => state.global);
  useColor(colors);
  const {
    userDetail,
    userDetailApiInfo,
    deactivateAccountApiInfo,
  } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(userInfo({ id: currentUser?.id, token: currentUser?.token }));

    // eslint-disable-next-line
  }, []);
  return (
    <>
      {userDetailApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <div style={{ margin: 10 }}>
          <div className={classes.heading} style={{ color: colors?.primary }}>
            Deactivate Account
          </div>
          <div className={classes.text}>
            Deactivating your account means no one will see your profile or
            listings. You won't be linked to connected accounts (Gmail,
            Facebook, Instagram etc)
          </div>
          <div>
            <div
              className={classes.nameContainer}
              style={{ backgroundColor: colors?.primary }}
            >
              <div className={classes.name}>
                {userDetail?.result?.first_name}&nbsp;
                {userDetail?.result?.last_name}
              </div>
              <div
                className={classes.profession}
                style={{ color: darkMode ? colors?.white : '' }}
              >
                {userDetail?.result?.user_type === 0
                  ? 'Real Estate Admin'
                  : userDetail?.result?.user_type === 1
                  ? 'Real Estate User'
                  : userDetail?.result?.user_type === 2
                  ? 'Real Estate Agent'
                  : userDetail?.result?.user_type === 3
                  ? 'Real Estate CEO'
                  : 'Real Estate Moderator'}
              </div>
            </div>

            <div className={classes.detailContainer}>
              <div
                className={classes.userInfo}
                style={{ color: colors?.primary }}
              >
                <img
                  alt="calendar"
                  src={calendarIcon}
                  className={classes.icons}
                />
                {userDetail?.result?.date_of_birth}
              </div>
              <div
                className={classes.userInfo}
                style={{ color: colors?.primary }}
              >
                <img alt="sms" src={smsIcon} className={classes.icons} />
                {userDetail?.result?.email}
              </div>
              <div
                className={classes.userInfo}
                style={{ color: colors?.primary }}
              >
                <img alt="phone" src={phoneIcon} className={classes.icons} />
                {userDetail?.result?.phone_number}
              </div>

              <div className={classes.deactivateContainer}>
                <div
                  className={classes.button}
                  style={{ backgroundColor: colors?.primary }}
                  onClick={() => {
                    if (
                      window.confirm('Are you sure to deactivate your account?')
                    ) {
                      dispatch(
                        deactivateAccount({
                          token: currentUser?.token,
                        })
                      );
                      handleLogout(dispatch, navigate);
                    }
                  }}
                >
                  {deactivateAccountApiInfo?.loading ? (
                    <ButtonLoader color="#ffffff" size={20} />
                  ) : (
                    'Deactivate'
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.text}>
            You can reactivate your account anytime. If you want to use Zeerac
            again, you can log in with email address. It will be permanently
            deleted after 3 months of inactivity.
          </div>
        </div>
      )}
    </>
  );
};

export default DeactivateAccount;
