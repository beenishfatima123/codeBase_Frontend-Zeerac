import React from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import HeaderContent from './HeaderContent';
import { useWindowDims } from '../../../utils/useWindowDims';
import { TextTranslation } from '../../../utils/translation';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderBottom: '2px solid lightGray',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 27,
    fontFamily: 'heavy',
    color: '#0ED864',
    margin: '10px 0px',
  },
  '@media (max-width: 500px)': {
    title: {
      fontSize: 18,
    },
  },
}));
const TableHeader = ({ remove }) => {
  const classes = useStyles();
  const { width } = useWindowDims();

  const { propertiesToCompare, langIndex } = useSelector(
    (state) => state.global
  );

  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          width: width > 800 ? 250 : width * 0.25 || 250,
        }}
      >
        {TextTranslation.overview[langIndex]}
      </span>
      {propertiesToCompare?.map((elem, index) => (
        <HeaderContent key={index} property={elem} remove={remove} />
      ))}
    </div>
  );
};

export default TableHeader;
