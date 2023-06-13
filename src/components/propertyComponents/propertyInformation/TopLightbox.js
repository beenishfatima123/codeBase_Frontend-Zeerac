import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
// eslint-disable-next-line
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPropertiesToCompare } from "../../../redux/slices/globalSlice";
import CompareLogoSm from "../../globalComponents/misc/CompareLogoSm";
import { TextTranslation } from "../../../utils/translation";
import LightBox from "../../globalComponents/LightBox";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
  },
  thumbnail: {
    display: "flex",
    flexDirection: "column",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "100%",
    minHeight: 400,
    transition: "0.5s",
  },
  selectors: {
    width: "98%",
    height: 125,
    objectFit: "contain",
  },
  dots: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: "30px 10px",
    zIndex: 500,
  },

  "@media (max-width: 1024px)": {
    selectors: {
      height: 70,
    },
  },
}));
const TopLightbox = ({ property }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLightBox, setShowLightBox] = useState();

  const { propertiesToCompare, langIndex } = useSelector(
    (state) => state.global
  );

  const comparing = useMemo(() => {
    let _temp = false;
    propertiesToCompare?.forEach((element) => {
      if (element?.id === property?.id) _temp = true;
    });
    return _temp;
  }, [propertiesToCompare, property]);
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
  const lightBoxImages = useMemo(() => {
    return property?.image?.map((elem) => {
      return `${elem?.image}`;
    });
  }, [property]);

  return (
    <div className={classes.container}>
      <div
        className={classes.thumbnail}
        style={{
          background: `url(${property?.image[0]?.image})`,
          zIndex: 10,
        }}
      >
        <div className={classes.topContainer}>
          <Button
            sx={{
              background:
                "linear-gradient(90deg, rgba(14,216,100,0.9) 0%, rgba(0,0,0,0) 100%)",
              textTransform: "none",
              color: "#134696",
              width: 150,
              ml: 3,
              mt: 2,
              zIndex: 20,
            }}
            startIcon={
              <KeyboardBackspaceSharpIcon
                style={{ color: "#134696", marginLeft: -30 }}
              />
            }
            onClick={() => navigate(-1)}
          >
            {TextTranslation.back[langIndex]}
          </Button>
          <IconButton
            onClick={handleAddForComparison}
            sx={{
              borderRadius: 10,
              zIndex: 20,
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
        <div className={classes.overlay} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          flexWrap: "wrap",
        }}
      >
        {property?.image?.map((elem, index) => (
          <div
            key={index}
            style={{
              marginTop: 2,
              cursor: "pointer",
              transition: "0.5s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
            }}
            onClick={() => setShowLightBox(true)}
          >
            <img src={`${elem?.image}`} className={classes.selectors} alt="" />
          </div>
        ))}
      </div>
      {showLightBox && (
        <LightBox
          images={lightBoxImages}
          setOpen={setShowLightBox}
          open={showLightBox}
        />
      )}
    </div>
  );
};

export default TopLightbox;
