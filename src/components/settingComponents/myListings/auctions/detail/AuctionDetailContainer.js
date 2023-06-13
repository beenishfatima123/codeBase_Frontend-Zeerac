import React from 'react';
import TopInfo from './TopInfo';
import TopLightbox from './TopLightbox';
import AuctionBids from './AuctionBids';

/* AuctionDetailContainer render all underlying components displayed on the auction details page. */
const AuctionDetailContainer = () => {
  return (
    <div
      style={{
        height: 'calc(100vh - 20vh)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        width: '100%',
      }}
    >
      <TopLightbox />
      <TopInfo />
      <AuctionBids />
    </div>
  );
};

export default AuctionDetailContainer;
