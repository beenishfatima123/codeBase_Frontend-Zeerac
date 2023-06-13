import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const btnSx = {
  border: 'none',
  borderRadius: 1,
  color: '#fff',
  backgroundColor: '#134696',
  fontFamily: 'medium',
  fontSize: 16,
  textTransform: 'capitalize',
  height: 40,
  padding: '0 20px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  '&:hover': {
    backgroundColor: '#134696',
  },
  '&:disabled': {
    backgroundColor: '#e3e3e3',
    color: '#fff',
    cursor: 'not-allowed',
  },
};

const useStyles = makeStyles(() => ({
  container: {
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    border: '2px solid #134696',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    width: '25%',
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    height: '70vh',
  },
  plan: {
    fontFamily: 'heavy',
    fontSize: 24,
    color: '#134696',
    margin: '10px 0',
    textAlign: 'center',
  },
  amount: {
    fontFamily: 'medium',
    fontSize: 20,
    color: '#0ed864',
    marginBottom: '10px',
    textAlign: 'center',
  },
  listHeading: {
    fontFamily: 'light',
    fontSize: 16,
    color: '#707070',
    margin: '20px 0 10px 0',
  },
  featureContainer: {
    margin: '20px 0',
  },
  features: {
    color: '#707070',
    fontSize: 14,
    padding: '10px 0',
  },
  '@media (max-width: 1024px)': {
    container: {
      width: '50%',
    },
  },
}));
const SubscriptionCard = ({
  plan,
  amount,
  listHeading,
  buttonText,
  disable,
  onBtnClick,
  feature1,
  feature2,
  feature3,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.plan}>{plan}</div>
      <div className={classes.amount}>{amount}</div>
      <div className={classes.listHeading}>{listHeading}</div>
      <div className={classes.featureContainer}>
        <li className={classes.features}>{feature1}</li>
        <li className={classes.features}> {feature2}</li>
        <li className={classes.features}>{feature3}</li>
      </div>

      <div>
        <Button sx={btnSx} disabled={disable} onClick={onBtnClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
