import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GlobalLoader from "../../globalComponents/GlobalLoader";
import { getAuctionDetail } from "../../../redux/slices/auctionSlice";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { TextTranslation } from "../../../utils/translation";

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
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { langIndex } = useSelector((state) => state.global);

  const { auctionDetail, auctionDetailApiInfo } = useSelector(
    (state) => state.auction
  );

  useEffect(() => {
    dispatch(getAuctionDetail({ id: params?.id }));
    // eslint-disable-next-line
  }, [params?.id]);

  return (
    <>
      {auctionDetailApiInfo?.loading ? (
        <GlobalLoader />
      ) : (
        <div className={classes.container}>
          <div
            className={classes.thumbnail}
            style={{
              background: `url(${auctionDetail?.result?.photos[0]?.file_photo})`,
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
                onClick={() => navigate(-1)}
              >
                {TextTranslation.back[langIndex]}
              </Button>
              {/* <h1>ICONS</h1> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopLightbox;
