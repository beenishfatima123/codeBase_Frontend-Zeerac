import React from 'react';
import { useSelector } from 'react-redux';
import useColor from '../../../../../utils/hooks/useColor';
import SearchBar from '../../../../globalComponents/misc/Searchbar';
import AccountSupportAccordian from './AccountSupportAccordian';

const AccountSupport = () => {
  const { colors, darkMode } = useSelector((state) => state.global);
  useColor(colors);
  return (
    <>
      <div
        style={{
          fontSize: 24,
          fontFamily: 'medium',
          color: colors?.primary,
          marginTop: 5,
        }}
      >
        Need some help?
      </div>
      <div
        style={{
          fontSize: 14,
          fontFamily: 'light',
          color: darkMode ? colors?.white : colors?.black,
          margin: '5px 0 10px 0',
        }}
      >
        What are you having trouble with?
      </div>
      <SearchBar />
      <AccountSupportAccordian />
    </>
  );
};

export default AccountSupport;
