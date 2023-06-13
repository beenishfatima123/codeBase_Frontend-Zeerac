import React, { Suspense, lazy, useEffect } from "react";

import { makeStyles } from "@mui/styles";
import TopSection from "../../components/comparisonComponents/TopSection";
import LeftLine from "../../components/comparisonComponents/svgs/LeftLine";
import RightLine from "../../components/comparisonComponents/svgs/RightLine";
import SelectedItems from "../../components/comparisonComponents/SelectedItems";
import { useDispatch, useSelector } from "react-redux";
import { setPropertiesToCompare } from "../../redux/slices/globalSlice";
import { useWindowDims } from "../../utils/useWindowDims";
import TableContainer from "../../components/comparisonComponents/table/TableContainer";
import PropertiesSelector from "../../components/comparisonComponents/PropertiesSelector";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import SliderContainer from "../../components/homeComponents/homepageListings/slider/SliderContainer";
import { TextTranslation } from "../../utils/translation";
const ComparisonSlider = lazy(() =>
  import("../../components/comparisonComponents/ComparisonSlider")
);
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    margin: "0px 10px",
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    display: "flex",
    flex: 1,
  },
  sliderContainer: {
    padding: 10,
  },
  heading: {
    color: "#134696",
    fontSize: 32,
    fontFamily: "heavy",
  },
  slider: {
    margin: "20px 5%",
  },
}));

const Comparison = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { width } = useWindowDims();

  const { propertiesToCompare, langIndex, darkMode } = useSelector(
    (state) => state.global
  );
  const { allGlobalProperties } = useSelector((state) => state.properties);
  useEffect(() => {
    if (width < 1600 && width > 1300 && propertiesToCompare?.length > 3) {
      dispatch(setPropertiesToCompare(propertiesToCompare?.slice(0, 3)));
    } else if (width < 1300 && propertiesToCompare?.length > 2) {
      dispatch(setPropertiesToCompare(propertiesToCompare?.slice(0, 2)));
    }
    // eslint-disable-next-line
  }, [width, propertiesToCompare]);
  const handleAddProperty = (property) => {
    if (width > 1300) {
      if (
        !propertiesToCompare?.includes(property) &&
        propertiesToCompare?.length < 4
      )
        dispatch(setPropertiesToCompare([...propertiesToCompare, property]));
    } else {
      if (
        !propertiesToCompare?.includes(property) &&
        propertiesToCompare?.length < 2
      )
        dispatch(setPropertiesToCompare([...propertiesToCompare, property]));
    }
  };
  const handleRemoveProperty = (property) => {
    dispatch(
      setPropertiesToCompare(
        propertiesToCompare?.filter((elem) => elem?.id !== property?.id)
      )
    );
  };
  return (
    <div className={classes.container}>
      <TopSection />
      <div className={classes.horizontal}>
        <LeftLine />
        <SelectedItems
          properties={propertiesToCompare}
          remove={handleRemoveProperty}
        />
        <RightLine />
      </div>

      <div className={classes.contentContainer}>
        <TableContainer handleRemoveProperty={handleRemoveProperty} />

        <PropertiesSelector
          add={handleAddProperty}
          remove={handleRemoveProperty}
        />
      </div>
      {width < 1100 && (
        <div className={classes.sliderContainer}>
          <Suspense fallback={<ComponentLoader />}>
            <ComparisonSlider
              properties={allGlobalProperties?.result?.results}
              add={handleAddProperty}
              remove={handleRemoveProperty}
            />
          </Suspense>
        </div>
      )}
      <div className={classes.slider}>
        <p
          className={classes.heading}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
          }}
        >
          {TextTranslation.bestPropertiesToCompare[langIndex]}
        </p>

        {allGlobalProperties?.result?.count > 0 ? (
          <SliderContainer properties={allGlobalProperties?.result?.results} />
        ) : null}
      </div>
    </div>
  );
};

export default Comparison;
