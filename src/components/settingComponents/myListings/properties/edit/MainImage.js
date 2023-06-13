import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo } from "react";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
    minHeight: "250px",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "99%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
}));

/* Main Image container on the edit properties page to edit the main image displayed on the property main page. */
const MainImage = ({ scroll }) => {
  const classes = useStyles();
  const { propertyToEdit, propertyUpdateInfo } = useSelector(
    (state) => state.properties
  );

  const backgroundImage = useMemo(() => {
    if (propertyToEdit?.image?.length > 0)
      return `${
        propertyToEdit?.image[0]?.image || propertyUpdateInfo?.image[0]
      }`;
    else if (propertyUpdateInfo?.image?.length > 0)
      return URL.createObjectURL(propertyUpdateInfo?.image[0]);
  }, [propertyToEdit, propertyUpdateInfo]);

  return (
    <div className={classes.container}>
      <img src={backgroundImage} alt="" className={classes.background} />
      <Button
        sx={{
          backgroundColor: "#134696",
          fontFamily: "heavy",
          borderRadius: 25,
          fontSize: 12,
          m: 2,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#134696",
          },
          padding: "4px 20px",
          zIndex: 10,
        }}
        endIcon={<EditIcon />}
        onClick={scroll}
      >
        Edit
      </Button>
    </div>
  );
};

export default MainImage;
