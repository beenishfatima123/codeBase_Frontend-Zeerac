import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import EditCard from "./EditCard";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_FEATURES,
  PROPERTY_PURPOSE,
  PROPERTY_SERVICES,
  PROPERTY_TYPES,
} from "../../../../../utils/propertyConstants";
import { useMemo } from "react";
import MainImage from "./MainImage";
import Details from "./Details";
import ConstructionDetails from "./ConstructionDetails";
import Location from "./Location";
import ImageEdit from "./ImageEdit";
import { useRef } from "react";
import TopCard from "./TopCard";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#134696",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    height: "78vh",
  },
}));

/* Edit property container renders all the components for editing the property information. */
const EditPropertyContainer = () => {
  const classes = useStyles();
  const editImageRef = useRef();

  const [validation, setValidation] = useState({});
  const { propertyToEdit, updateApiInfo } = useSelector(
    (state) => state.properties
  );

  // // console.log({ propertyToEdit, propertyUpdateInfo });

  /*based on selected property to edit, specific options are given for the property to be displayed.  */
  const categoriesToShow = useMemo(() => {
    switch (propertyToEdit?.type) {
      case PROPERTY_TYPES[0]:
        return PROPERTY_CATEGORIES?.slice(0, 6);
      case PROPERTY_TYPES[2]:
        return PROPERTY_CATEGORIES?.slice(6, 14);
      case PROPERTY_TYPES[1]:
        return PROPERTY_CATEGORIES?.slice(14, 20);

      default:
        return PROPERTY_CATEGORIES?.slice(0, 6);
    }
  }, [propertyToEdit]);

  /* upon clicking edit image, page scrolls down to edit images tab. */
  const scrollToEditImage = () => {
    // // console.log({ regionalRef });
    editImageRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className={classes.container}>
      {updateApiInfo?.updating ? (
        <ComponentLoader />
      ) : (
        <>
          <TopCard validation={validation} />
          <MainImage scroll={scrollToEditImage} />
          <EditCard
            label={"Purpose"}
            prop={"purpose"}
            options={PROPERTY_PURPOSE}
          />
          <EditCard label={"type"} prop={"type"} options={PROPERTY_TYPES} />
          <EditCard
            label={"category"}
            prop={"categories"}
            options={categoriesToShow}
          />
          <Details validation={validation} setValidation={setValidation} />
          <ConstructionDetails />
          <Location />
          <ImageEdit
            attribute={"image"}
            label={"edit images"}
            refProp={editImageRef}
          />
          <ImageEdit attribute={"floor_image"} label={"edit floor plan"} />

          <EditCard
            label={"features"}
            prop={"features"}
            options={PROPERTY_FEATURES}
            multiSelect
          />
          <EditCard
            label={"services"}
            prop={"services"}
            options={PROPERTY_SERVICES}
            multiSelect
          />
        </>
      )}
    </div>
  );
};

export default EditPropertyContainer;
