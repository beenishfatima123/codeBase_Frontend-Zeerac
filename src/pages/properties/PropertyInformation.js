import React, {
  Suspense,
  lazy,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOtherProperties,
  getSpecificProperties,
} from "../../redux/slices/propertiesSlice";
import { makeStyles } from "@mui/styles";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";
import { PROPERTY_TYPES } from "../../utils/propertyConstants";
import NotFound from "../../components/globalComponents/NotFound";
const PropertyDetailsMap = lazy(() =>
  import(
    "../../components/propertyComponents/propertyInformation/PropertyDetailsMap"
  )
);
const SliderContainer = lazy(() =>
  import(
    "../../components/homeComponents/homepageListings/slider/SliderContainer"
  )
);
const TopLightbox = lazy(() =>
  import("../../components/propertyComponents/propertyInformation/TopLightbox")
);
const TopInfo = lazy(() =>
  import("../../components/propertyComponents/propertyInformation/TopInfo")
);
const FeaturesContainer = lazy(() =>
  import(
    "../../components/propertyComponents/propertyInformation/FeaturesContainer"
  )
);
const FloorPlan = lazy(() =>
  import("../../components/propertyComponents/propertyInformation/FloorPlan")
);
const ItemsList = lazy(() =>
  import("../../components/propertyComponents/propertyInformation/ItemsList")
);
const ConstructionDetailsList = lazy(() =>
  import(
    "../../components/propertyComponents/propertyInformation/ConstructionDetailsList"
  )
);

/* useStyles is being used to create custom styling using makeStyles from material UI.
It sets styling properties for container, heading, slider. */
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    color: "#134696",
    fontSize: 32,
    fontFamily: "heavy",
  },
  slider: {
    margin: "20px auto",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
}));

/* PropertyInformation shows specific property page when clicked from listing page. */
const PropertyInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const sliderContainerRef = useRef(null);

  const [sliderContainerWidth, setSliderContainerWidth] = useState(0);

  const highlightedProperty = useSelector(
    (state) => state.properties.highlightedProperty
  );

  const { otherProperties } = useSelector((state) => state.properties);
  const { darkMode } = useSelector((state) => state.global);

  useLayoutEffect(() => {
    setSliderContainerWidth(sliderContainerRef?.current?.offsetWidth);
  }, []);
  useEffect(() => {
    if (!highlightedProperty) {
      dispatch(getSpecificProperties({ id: params?.id }));
      // eslint-disable-next-line
    } else if (highlightedProperty?.id != params?.id) {
      dispatch(getSpecificProperties({ id: params?.id }));
    }
    // eslint-disable-next-line
  }, [highlightedProperty]);

  useEffect(() => {
    dispatch(
      getOtherProperties({
        id: params?.id,
      })
    );
    // eslint-disable-next-line
  }, [params?.id]);

  return (
    <div className={classes.container}>
      <Suspense fallback={<ComponentLoader />}>
        <TopLightbox property={highlightedProperty} />

        <TopInfo property={highlightedProperty} />
        {highlightedProperty?.type !== PROPERTY_TYPES[1][0] && (
          <FeaturesContainer property={highlightedProperty} />
        )}
        {highlightedProperty?.type !== PROPERTY_TYPES[1][0] && (
          <ItemsList heading="Services" data={highlightedProperty?.services} />
        )}

        {highlightedProperty?.floor_image?.length > 0 && (
          <FloorPlan property={highlightedProperty} />
        )}

        {highlightedProperty?.type !== PROPERTY_TYPES[1][0] && (
          <ConstructionDetailsList
            data={highlightedProperty?.construction_details}
          />
        )}

        {highlightedProperty && (
          <PropertyDetailsMap property={highlightedProperty} />
        )}

        <div className={classes.slider} ref={sliderContainerRef}>
          <p
            className={classes.heading}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            Browse Other Listings
          </p>
          {otherProperties?.results?.length > 0 ? (
            <SliderContainer
              properties={otherProperties?.results}
              parentWidth={sliderContainerWidth}
            />
          ) : (
            <NotFound label="No Other Listings Found" />
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default PropertyInformation;
