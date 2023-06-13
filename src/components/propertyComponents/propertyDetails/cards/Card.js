import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { INITIAL_PROPERTY_ACTIONS } from "../../../../utils/constants";
import CardMiddle from "./CardMiddle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveMarker,
  setHighlightedProperty,
} from "../../../../redux/slices/propertiesSlice";
import IconsContainer from "../../misc/IconsContainer";
import defaultImage from "../../../../assets/home/footer/post_1.png";
import { IconButton } from "@mui/material";
import { useMemo } from "react";
import { setPropertiesToCompare } from "../../../../redux/slices/globalSlice";
import CompareLogoSm from "../../../globalComponents/misc/CompareLogoSm";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 0px",
    borderBottom: "1px solid #707070",
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  thumbnail: {
    height: 100,
    width: 200,
    borderRadius: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    backgroundSize: "cover !important",
    padding: 10,
  },
  countContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    borderBottom: "1px solid #707070",
    paddingBottom: 10,
  },
  count: {
    color: "#134696",
    fontSize: 32,
    margin: 0,
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
    contentContainer: {
      width: "100%",
    },
    thumbnail: {
      width: "100%",
      marginBottom: 10,
    },
  },
}));

/* This card displays indiviidual property details i.e. image, title etc.*/
const Card = ({ property }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.global);

  const [propertyActions, setPropertyActions] = useState(
    INITIAL_PROPERTY_ACTIONS
  );
  const { propertiesToCompare } = useSelector((state) => state.global);

  /* If properties to compare or property changes and id of current element is equal to property id then return comparing as true. */
  const comparing = useMemo(() => {
    let _temp = false;
    propertiesToCompare?.forEach((element) => {
      if (element?.id === property?.id) _temp = true;
    });
    return _temp;
  }, [propertiesToCompare, property]);

  /* handleAddComparison deals with adding properties to comparison, if property is already in propertiesToCompare and their length is
  less than 4 then dispatch to setPropertiesToCompare by appending property. Otherwise set it equal to filtered item where item's id is
  not equal to property (currently being added) id. */
  const handleAddForComparison = () => {
    if (
      !propertiesToCompare?.includes(property) &&
      propertiesToCompare?.length < 4
    )
      dispatch(setPropertiesToCompare([...propertiesToCompare, property]));
    else
      dispatch(
        setPropertiesToCompare(
          propertiesToCompare?.filter((elem) => elem?.id !== property?.id)
        )
      );
  };

  /* handlePropertyNavigate helps in navigating through property when card is clicked. */
  const handlePropertyNavigation = () => {
    // // console.log({ property });
    dispatch(setHighlightedProperty(property));
    navigate(`/listing/${property?.id}`);
  };
  // eslint-disable-next-line
  const getImage = () => {
    if (property?.image?.length) return `${property?.image[0]?.image}`;
    else if (property?.floor_image?.length)
      return `${property?.floor_image[0]?.floor_image}`;
    else return defaultImage;
  };
  return (
    <div
      className={classes.container}
      onMouseOver={() => dispatch(setActiveMarker(property?.id))}
      onMouseOut={() => dispatch(setActiveMarker(null))}
    >
      <div
        className={classes.thumbnail}
        style={{
          background: `url(${getImage()})`,
        }}
      >
        <IconButton
          onClick={handleAddForComparison}
          sx={{
            borderRadius: 10,
            // '&:hover': {
            //   background: 'none',
            padding: "7px",
            backgroundColor: comparing ? "#FFF" : "#134696",
            border: "1px solid #134696",
            "&:hover": {
              backgroundColor: comparing ? "#FFF" : "#134696",
            },
          }}
        >
          <CompareLogoSm comparing={comparing} />
        </IconButton>
      </div>
      <div className={classes.contentContainer}>
        <CardMiddle property={property} onClick={handlePropertyNavigation} />
        <IconsContainer
          customStyle={classes.iconsStyle}
          phoneNumber={property?.user?.phone_number}
          setPropertyActions={setPropertyActions}
          propertyActions={propertyActions}
          property={property}
          customColor={darkMode ? "white" : "black"}
        />
      </div>
    </div>
  );
};

export default Card;
