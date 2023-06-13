import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  MAX_IMAGE_FILE_NAME,
  MAX_IMAGE_SIZE,
} from "../../../../../utils/constants";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { setAuctionUpdateInfo } from "../../../../../redux/slices/auctionSlice";
import { TextTranslation } from "../../../../../utils/translation";
import { toast } from "react-toastify";
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

/* MainImage is displayed under the topcard on the edit auctions page. It contains image and edit image button. */
const MainImage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { auctionToEdit, auctionUpdateInfo } = useSelector(
    (state) => state.auction
  );
  const { langIndex } = useSelector((state) => state.global);
  // // console.log({ auctionToEdit });
  const backgroundImage = useMemo(() => {
    if (auctionUpdateInfo?.photos)
      return URL.createObjectURL(auctionUpdateInfo?.photos);
    else if (auctionToEdit?.photos?.length > 0)
      return `${auctionToEdit?.photos[0]?.file_photo}`;
  }, [auctionToEdit, auctionUpdateInfo]);

  /* handleImagePicker takes prop event and sets file equal to the image uploaded on the event target. It also validated image sizes and idspatches to update auction info. */
  const handleImagePicker = (prop) => (event) => {
    if (
      event?.target?.files[0]?.name?.length < MAX_IMAGE_FILE_NAME &&
      event?.target?.files[0]?.size / 1024 ** 2 < MAX_IMAGE_SIZE
    ) {
      dispatch(
        setAuctionUpdateInfo({
          ...auctionUpdateInfo,
          [prop]: event?.target?.files[0],
        })
      );
    } else {
      toast.error("File name/size too large", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

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
          zIndex: 10,
          padding: "4px 20px",
        }}
        endIcon={<EditIcon />}
        component="label"
      >
        {TextTranslation.edit[langIndex]}
        <input
          hidden
          accept="image/png, image/jpeg"
          type="file"
          onInput={handleImagePicker(`photos`)}
        />
      </Button>
    </div>
  );
};

export default MainImage;
