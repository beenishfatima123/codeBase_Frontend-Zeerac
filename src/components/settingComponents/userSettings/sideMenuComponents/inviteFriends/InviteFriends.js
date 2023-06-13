import React from 'react';
import FriendList from './FriendList';
import { Divider } from '@mui/material';
import PeopleYouKnow from './PeopleYouKnow';

const InviteFriends = () => {
  return (
    <div>
      <FriendList />
      <Divider />
      <PeopleYouKnow />
    </div>
  );
};

export default InviteFriends;
