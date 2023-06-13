import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextTranslation } from "../../../../../utils/translation";
import { setShowAuctionDetail } from "../../../../../redux/slices/auctionSlice";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";

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
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: "30px 10px",
  },
}));
const TopLightbox = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { langIndex } = useSelector((state) => state.global);

  const { showAuctionDetail } = useSelector((state) => state.auction);

  return (
    <>
      <div className={classes.container}>
        <div
          className={classes.thumbnail}
          style={{
            background: `url(${showAuctionDetail?.photos[0]?.file_photo})`,
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
                borderRadius: 0,
              }}
              startIcon={
                <KeyboardBackspaceSharpIcon
                  style={{ color: "#134696", marginLeft: -30 }}
                />
              }
              onClick={() => {
                dispatch(setShowAuctionDetail(null));
                navigate("/settings/my_listings");
              }}
            >
              {TextTranslation.back[langIndex]}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopLightbox;
