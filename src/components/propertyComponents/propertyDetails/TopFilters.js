import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import LeftFilter from '../../globalComponents/filters/LeftFilter';
import MiddleFilter from '../../globalComponents/filters/MiddleFilter';
import RightFilter from '../../globalComponents/filters/RightFilter';
import { REGIONAL_LISTINGS_FILTERS_RIGHT } from '../../../utils/constants';
import { getAllProperties } from '../../../redux/slices/propertiesSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 5%',
  },
  '@media (max-width: 1024px)': {
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
}));
const TopFilters = ({ selectedFilter, setSelectedFilter }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //const allProperties = useSelector((state) => state.properties.allProperties);

  const handleExpand = (isCenter) => {
    if (isCenter) setSelectedFilter((prev) => ({ ...prev, right: null }));
    else
      setSelectedFilter((prev) => ({
        ...prev,
        right: REGIONAL_LISTINGS_FILTERS_RIGHT[0],
      }));
  };

  useEffect(() => {
    let queryData = '';
    if (selectedFilter?.left) {
      queryData = queryData + 'purpose=' + selectedFilter?.left.toLowerCase();
    }
    if (selectedFilter?.right) {
      queryData =
        queryData + `&order_by=` + selectedFilter?.right.toLowerCase();
    }

    dispatch(
      getAllProperties({
        queryData,
      })
    );
    // // console.log({ queryData });
    // eslint-disable-next-line
  }, [selectedFilter]);
  //// console.log({ left: selectedFilter?.left, right: selectedFilter?.right });
  //// console.log('HEY', allProperties);

  return (
    <div className={classes.container}>
      <LeftFilter
        filter={selectedFilter?.left}
        setFilter={(value) =>
          setSelectedFilter((prev) => ({ ...prev, left: value }))
        }
      />
      <MiddleFilter
        filter={selectedFilter?.center}
        setFilter={(value) =>
          setSelectedFilter((prev) => ({ ...prev, center: value }))
        }
        showAll={!Boolean(selectedFilter?.right)}
        handleExpand={handleExpand}
      />
      <RightFilter
        filter={selectedFilter?.right}
        setFilter={(value) =>
          setSelectedFilter((prev) => ({ ...prev, right: value }))
        }
        showAll={Boolean(selectedFilter?.right)}
        handleExpand={handleExpand}
      />
    </div>
  );
};

export default TopFilters;
