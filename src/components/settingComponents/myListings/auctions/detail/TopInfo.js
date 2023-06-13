import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { TextTranslation } from '../../../../../utils/translation';
import { currencyFormatInitials } from '../../../../../utils/helperFunctions';

const useStyles = makeStyles(() => ({
  innerContainer: {
    lineHeight: 1.5,
  },
  label: {
    color: '#134696',
    fontFamily: 'medium',
    fontSize: 20,
  },
  value: {
    color: '#134696',
    fontFamily: 'heavy',
    fontSize: 24,
    textTransform: 'uppercase',
  },
}));

/* TopInfo displays all the auction details given by current agent. */
const TopInfo = () => {
  const classes = useStyles();

  const { langIndex } = useSelector((state) => state.global);
  const { showAuctionDetail } = useSelector((state) => state.auction);

  return (
    <>
      <Grid
        container
        justifyContent={'center'}
        sx={{ maxWidth: '90%', margin: 'auto', my: 1 }}
      >
        <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>
              {TextTranslation.listedBy[langIndex]}:
            </div>
            <div className={classes.value}>
              {showAuctionDetail?.user_fk?.full_name}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>
              {TextTranslation.area[langIndex]}{' '}
              {TextTranslation.size[langIndex]}:
            </div>
            <div className={classes.value}>
              {' '}
              {parseInt(showAuctionDetail?.size)}{' '}
              {showAuctionDetail?.unit === 'Square Feet'
                ? 'Sq Ft'
                : showAuctionDetail?.unit}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>
              {TextTranslation.amount[langIndex]}:
            </div>
            <div className={classes.value}>
              {` ${currencyFormatInitials(
                showAuctionDetail?.price,
                showAuctionDetail?.currency
              )}`}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={'center'}
        sx={{ maxWidth: '90%', margin: 'auto', my: 1 }}
      >
        <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>
              {TextTranslation.latestBid[langIndex]}:
            </div>
            {showAuctionDetail?.bids[0]?.price ? (
              <div className={classes.value}>
                {currencyFormatInitials(
                  showAuctionDetail?.bids[0]?.price,
                  showAuctionDetail?.currency
                )}
              </div>
            ) : (
              <div className={classes.value}>NA</div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>
              {TextTranslation.totalBids[langIndex]}:
            </div>
            <div className={classes.value}>
              {showAuctionDetail?.bids.length}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>
              {TextTranslation.currentHighestBid[langIndex]}:
            </div>
            {showAuctionDetail?.highest_bid?.price ? (
              <div className={classes.value}>
                {currencyFormatInitials(
                  showAuctionDetail?.highest_bid?.price,
                  showAuctionDetail?.currency
                )}
              </div>
            ) : (
              <div className={classes.value}>NA</div>
            )}
          </div>
        </Grid>
      </Grid>
      {showAuctionDetail?.auction_type === 'bulk' && (
        <Grid
          container
          justifyContent={'flex-start'}
          sx={{ maxWidth: '90%', margin: 'auto', my: 1 }}
        >
          <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
            <div className={classes.innerContainer}>
              <div className={classes.label}>
                {TextTranslation.noOfFiles[langIndex]}:
              </div>
              {showAuctionDetail?.total_files ? (
                <div className={classes.value}>
                  {showAuctionDetail?.total_files} Files
                </div>
              ) : (
                <div className={classes.value}>NA</div>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default TopInfo;
