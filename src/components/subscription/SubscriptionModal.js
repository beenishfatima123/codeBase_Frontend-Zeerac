import React from 'react';
import { Backdrop } from '@mui/material';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionModal = ({ open, setOpen }) => {
  return (
    <div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          '@media (max-width: 800px)': {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            paddingTop: 50,
          },
        }}
        open={open}
        //onClick={handleClose}
      >
        <SubscriptionCard
          plan="Basic"
          amount="Free"
          feature1="feature 1"
          feature2="feature 2"
          feature3="feature 3"
          buttonText="Choose Free"
          listHeading="Features Included are:"
          onBtnClick={() => setOpen(false)}
        />
        <SubscriptionCard
          plan="Standard"
          amount="$30/month"
          feature1="feature 1"
          feature2="feature 2"
          feature3="feature 3"
          buttonText="Choose Standard"
          listHeading="Features Included are:"
          disable
        />
        <SubscriptionCard
          plan="Premium"
          amount="$50/month"
          feature1="feature 1"
          feature2="feature 2"
          feature3="feature 3"
          buttonText="Choose Premium"
          listHeading="Features Included are:"
          disable
        />
      </Backdrop>
    </div>
  );
};
export default SubscriptionModal;
