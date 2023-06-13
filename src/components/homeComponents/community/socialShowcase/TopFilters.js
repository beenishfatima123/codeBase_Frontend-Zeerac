import React from 'react';
import { makeStyles } from '@mui/styles';

import { Button } from '@mui/material';
import { useWindowDims } from '../../../../utils/useWindowDims';
import { SOCIAL_CONTENT_SELECTION } from '../../../../utils/constants';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginTop: -80,
  },
  '@media (max-width: 1024px)': {
    container: {
      marginTop: 0,
    },
  },
}));
const TopFilters = ({ selected, setSelected }) => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { darkMode } = useSelector((state) => state.global);

  const handleClick = (elem) => {
    setSelected(elem);
    // // console.log({ elem });
    // navigate(`/zSphere/${elem}`);
  };
  const getBtnColor = (elem) => {
    if (darkMode) return 'white';
    else return selected === elem ? '#134696' : '#9DAFBD';
  };
  return (
    <div className={classes.container}>
      {SOCIAL_CONTENT_SELECTION?.map((elem, index) => (
        <Button
          key={index}
          onClick={() => handleClick(elem)}
          disableRipple
          sx={{
            textTransform: 'none',
            fontSize: width > 550 ? 24 : 16,
            fontFamily: 'medium',
            color: getBtnColor(elem),
            borderBottom: selected === elem ? '6px solid #0ED864' : 'none',
            mr: 2,
            borderRadius: 0,
          }}
        >
          {elem}
        </Button>
      ))}
    </div>
  );
};

export default TopFilters;
