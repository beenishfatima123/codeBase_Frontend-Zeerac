import React, { useMemo } from "react";

import { makeStyles } from "@mui/styles";
import ListingsDrawer from "./listingsDrawer/ListingsDrawer";
import { useWindowDims } from "../../../utils/useWindowDims";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { TextTranslation } from "../../../utils/translation";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setPropertyToEdit } from "../../../redux/slices/propertiesSlice";

const backSx = {
  height: 30,
  width: 100,
  backgroundColor: "#134696",
  color: "#fff",
  textTransform: "none",
  borderRadius: 20,
  margin: "10px 0px",
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const useStyles = makeStyles(() => ({
  mainContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  drawerContainer: { width: "20%" },
  contentContainer: { width: "80%" },
}));
/* MyListingsContainer component is the right side of the listings displaying the contents personalInfo of current user, the accordion for listings selection and on most right it contains the selected listings type. */
const MyListingsContainer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { width } = useWindowDims();
  const { pathname } = useLocation();

  const { langIndex } = useSelector((state) => state.global);

  const path = useMemo(
    () => pathname?.split("/")?.filter((elem) => elem !== ""),
    [pathname]
  );
  const renderBackButton = useMemo(() => {
    if (width < 750)
      return (
        <Button
          startIcon={<ArrowBackIcon />}
          sx={backSx}
          onClick={() => {
            navigate("/settings/my_listings");
            dispatch(setPropertyToEdit(null));
          }}
        >
          {TextTranslation.back[langIndex]}
        </Button>
      );
    // eslint-disable-next-line
  }, [width]);

  return (
    <div className={classes.mainContainer}>
      {renderBackButton}
      {width > 750 ? (
        <div className={classes.container}>
          <div className={classes.drawerContainer}>
            <ListingsDrawer />
          </div>
          <div className={classes.contentContainer}>
            <Outlet />
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          {path?.length < 3 ? <ListingsDrawer /> : <Outlet />}
        </div>
      )}
    </div>
  );
};

export default MyListingsContainer;
