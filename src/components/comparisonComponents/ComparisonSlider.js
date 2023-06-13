import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import PropertySliderCard from '../../components/homeComponents/homepageListings/slider/PropertySliderCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { queryProperties } from '../../redux/slices/propertiesSlice';
import SmallSearchbar from '../../components/globalComponents/misc/SmallSearchbar';
import Carousel from 'nuka-carousel';
import './comparisonStyles.css';
import NotFound from '../../components/globalComponents/NotFound';
import { useWindowDims } from '../../utils/useWindowDims';
import ComponentLoader from '../globalComponents/ComponentLoader';
import { TextTranslation } from '../../utils/translation';
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px 10px',
  },
}));
const ComparisonSlider = ({ properties, add }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { width } = useWindowDims();

  const { darkMode, langIndex } = useSelector((state) => state.global);
  const [searchQuery, setSearchQuery] = useState('');
  const { allGlobalPropertiesApiInfo } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    // // console.log({ searchQuery });
    if (searchQuery?.length >= 3) delayedSearch(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]);
  const delayedSearch = useMemo(
    () => debounce((query) => searchProperties(query), 500),
    // eslint-disable-next-line
    []
  );
  const searchProperties = async (query) => {
    dispatch(
      queryProperties({
        query,
        destination: 'global',
      })
    );
  };
  const slidesToShow = useMemo(() => {
    if (properties?.length > 0) {
      if (width > 1680)
        return properties?.length > 5 ? 5 : properties?.length - 1;
      else if (width < 1680 && width > 1200)
        return properties?.length > 4 ? 4 : properties?.length - 1;
      else if (width < 1200 && width > 950)
        return properties?.length > 3 ? 3 : properties?.length - 1;
      else if (width < 950 && width > 600)
        return properties?.length > 2 ? 2 : properties?.length - 1;
      else return 1;
    } else return 1;
  }, [properties, width]);

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? '#303134' : '',
      }}
    >
      <SmallSearchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div style={{ margin: '10px 0px' }} />
      {allGlobalPropertiesApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <Carousel
          slidesToShow={slidesToShow}
          cellSpacing={0}
          cellAlign="center"
          wrapAround={true}
          renderCenterLeftControls={null}
          renderCenterRightControls={null}
        >
          {properties?.map((elem, index) =>
            properties?.length > 0 ? (
              <PropertySliderCard
                key={index}
                property={elem}
                comparison={add}
              />
            ) : null
          )}
        </Carousel>
      )}

      {properties?.length === 0 ? (
        <NotFound label={TextTranslation.noPropertyFound[langIndex]} />
      ) : null}
    </div>
  );
};

export default ComparisonSlider;
