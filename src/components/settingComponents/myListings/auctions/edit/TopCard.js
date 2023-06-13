import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  resetAuctionsApi,
  setAuctionToEdit,
  updateAuction,
} from "../../../../../redux/slices/auctionSlice";
import { getAuctionUpdateFormData } from "../../../../../utils/helperFunctions";
import useApi from "../../../../../utils/hooks/useApi";
import { TextTranslation } from "../../../../../utils/translation";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 35,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },
  btnContainer: {
    display: "flex",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

/* The top section on edit auctions page. Containing two buttons for save and cancel. */
const TopCard = () => {
  const classes = useStyles();
  const containerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { darkMode, langIndex } = useSelector((state) => state.global);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { auctionToEdit, auctionUpdateInfo, allAuctionsDataApiInfo } =
    useSelector((state) => state.auction);

  useApi(
    allAuctionsDataApiInfo?.error,
    allAuctionsDataApiInfo?.success,
    "Auction updated successfully",
    resetAuctionsApi
  );
  const [containerWidth, setContainerWidth] = useState();

  /* this useEffect sets container width using containerRef. */
  useEffect(() => {
    if (containerRef)
      setContainerWidth(containerRef?.current?.parentElement?.offsetWidth);
  }, [containerRef]);

  /* upon submit, the handleUpdate dispatches updated slice information to the slice. */
  const handleUpdate = () => {
    // // console.log({ auctionToEdit, auctionUpdateInfo });
    dispatch(
      updateAuction({
        id: auctionToEdit?.id,
        token: currentUser?.token,
        form: getAuctionUpdateFormData(auctionUpdateInfo),
      })
    );
  };
  const handleCancel = () => {
    navigate(-1);
    dispatch(setAuctionToEdit(null));
  };
  return (
    <div
      className={classes.container}
      ref={containerRef}
      style={{
        flexDirection: containerWidth > 650 ? "row" : "column",
        alignItems: containerWidth > 650 ? "center" : "flex-start",
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {TextTranslation.editAuctions[langIndex]}
      </span>
      <Grid
        container
        sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        spacing={2}
      >
        <Grid item xs={6} md={4} sm={6} lg={3}>
          <Button
            fullWidth
            sx={{
              backgroundColor: darkMode ? "#0ed864" : "#134696",
              color: "#fff",
              fontFamily: "heavy",
              borderRadius: 25,
              fontSize: containerWidth > 500 ? 15 : 10,
              mr: 1,
              "&:hover": {
                backgroundColor: darkMode ? "#0ed864" : "#134696",
              },
            }}
            onClick={handleUpdate}
          >
            {TextTranslation.saveChanges[langIndex]}
          </Button>
        </Grid>
        <Grid item xs={6} md={4} sm={6} lg={3}>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#fff",
              color: "#134696",
              fontFamily: "heavy",
              borderRadius: 25,
              fontSize: containerWidth > 500 ? 15 : 10,
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
            onClick={handleCancel}
            endIcon={
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            }
          >
            {TextTranslation.cancel[langIndex]}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopCard;
