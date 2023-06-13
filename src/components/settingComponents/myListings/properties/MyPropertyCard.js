import React, { useMemo, useState } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import ListingVerifyModal from "./ListingVerifyModal";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import CardImageDetails from "../../../homeComponents/homepageListings/slider/CardImageDetails";
import { VERIFICATION_STATUS } from "../../../../utils/constants";
import defaultPost from "../../../../assets/defaultAssets/defaultPost.png";
import "../myListingStyles.css";
import { useWindowDims } from "../../../../utils/useWindowDims";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { currencyFormatInitials } from "../../../../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { deleteProperty } from "../../../../redux/slices/propertiesSlice";
import ConfirmModal from "../ConfirmModal";
import GetVerifiedModal from "../../../globalComponents/misc/GetVerifiedModal";
import { TextTranslation } from "../../../../utils/translation";
import OriginalPriceInfo from "../../../globalComponents/OriginalPriceInfo";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    display: "flex",
    background: `linear-gradient(to top, rgba(0,0,0,0) 20%, rgba(0,0,0,1))`,
    width: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 10,
    color: "#fff",
    marginRight: 5,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 130,
  },
  text: {
    color: "#1A2954",
    fontSize: 18,
    margin: "5px 0px",
  },
  currencyText: {
    color: "#134696",
    fontSize: 27,
    margin: 0,
  },
}));
const buttonSx = {
  display: "flex",
  alignItems: "center",
  textTransform: "none",
  borderRadius: 20,
  border: "2px solid #fff",
  padding: "5px 10px",
  margin: "10px 5px",
  height: "31px",
};

/* MyPropertyCard is simply a grid item which takes Property as parameter and displays it in the form of the card with image, title, price and action buttons. */
const MyPropertyCard = ({ property }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDims();
  const { pathname } = useLocation();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [verifyModel, setVerifyModal] = useState(false);

  const { darkMode, langIndex } = useSelector((state) => state.global);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* adjusting image width on the card. */
  const imageWidth = useMemo(() => {
    if (width) {
      if (width > 600) return 300;
      else return "100%";
    } else return 300;
  }, [width]);

  const getBackgroundImage = () => {
    let background = "";
    if (property?.image?.length)
      background = `linear-gradient(to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,1)),url(${property?.image[0]?.image})`;
    else if (property?.floor_image?.length)
      background = `linear-gradient(to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,1)),url(${property?.floor_image[0]?.floor_image})`;
    else
      background = `linear-gradient(to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,1)),url(${defaultPost})`;
    // // console.log({ background });
    return background;
  };

  /* deleteListing is called when agent clicks close button and it dispatches to deleteProperty reducer. */
  const deleteListing = () => {
    dispatch(deleteProperty({ id: property?.id, token: currentUser?.token }));
  };

  return (
    <div className={classes.container}>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title={TextTranslation.areYouSureToDeleteListing[langIndex]}
          handleConfirm={deleteListing}
        />
      )}
      {verifyModel && (
        <GetVerifiedModal
          verifyModel={verifyModel}
          setVerifyModal={setVerifyModal}
          type="property"
          id={property?.id}
        />
      )}
      <div
        className="my-listings-background-image"
        style={{
          backgroundImage: getBackgroundImage(),
          width: imageWidth,
          height: 200,
        }}
      >
        <div className={classes.btnContainer}>
          <IconButton
            sx={{
              border: "2px solid #fff",
              padding: 1,
              margin: "10px",
            }}
            onClick={() => navigate(`${pathname}/${property?.id}`)}
          >
            <BorderColorOutlinedIcon style={{ color: "#fff", fontSize: 14 }} />
          </IconButton>

          <IconButton
            sx={{
              border: "2px solid #fff",
              padding: 1,
              margin: "10px",
            }}
            onClick={handleClick}
          >
            <CancelOutlinedIcon style={{ color: "red", fontSize: 14 }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setOpenVerifyModal(true);
                handleClose();
              }}
              sx={{
                color: "#134696",
                fontFamily: "medium",
                fontSize: 16,
              }}
            >
              {TextTranslation.soldOnZeerac[langIndex]}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenConfirmModal(true);
                handleClose();
              }}
              sx={{
                color: "#134696",
                fontFamily: "medium",
                fontSize: 16,
              }}
            >
              {TextTranslation.soldOutsideZeerac[langIndex]}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenConfirmModal(true);
                handleClose();
              }}
              sx={{
                color: "#134696",
                fontFamily: "medium",
                fontSize: 16,
              }}
            >
              {TextTranslation.notSold[langIndex]}
            </MenuItem>
          </Menu>
          {openVerifyModal && (
            <ListingVerifyModal
              property={property}
              open={openVerifyModal}
              setOpen={setOpenVerifyModal}
            />
          )}
          {!property?.verification_status ||
          property?.verification_status === VERIFICATION_STATUS.NOT_APPLIED ? (
            <Button sx={buttonSx} onClick={() => setVerifyModal(true)}>
              <span className={classes.title}>
                {TextTranslation.getVerified[langIndex]}
              </span>
            </Button>
          ) : null}
          {property?.verification_status ===
            VERIFICATION_STATUS.IN_PROGRESS && (
            <Button
              style={{
                color: "white",
                backgroundColor: "#134696",
                cursor: "default",
              }}
              sx={buttonSx}
            >
              <span className={classes.title}>
                {TextTranslation.requestSubmitted[langIndex]}
              </span>
            </Button>
          )}
          {property?.verification_status === VERIFICATION_STATUS.VERIFIED && (
            <Button
              style={{
                color: "white",
                backgroundColor: "#0ED864",
                cursor: "default",
              }}
              sx={buttonSx}
            >
              <span className={classes.title}>
                {TextTranslation.verified[langIndex]}
              </span>
            </Button>
          )}
          {property?.verification_status === VERIFICATION_STATUS.DECLINED && (
            <Button
              style={{
                color: "white",
                backgroundColor: "red",
                cursor: "default",
              }}
              sx={buttonSx}
            >
              <span className={classes.title}>
                {TextTranslation.declined[langIndex]}
              </span>
            </Button>
          )}
        </div>
        <CardImageDetails property={property} />
      </div>
      <div
        onClick={() => navigate(`/listing/${property?.id}`, { replace: true })}
        className={classes.contentContainer}
        style={{
          width: imageWidth,
          alignSelf: "center",
          cursor: "pointer",
        }}
      >
        <p
          className={classes.text}
          style={{
            color: darkMode ? "#fff" : "#134696",
            fontFamily: "heavy",
            textTransform: "capitalize",
          }}
        >
          {`${property?.size} ${property?.unit}, For ${property?.purpose}`}
        </p>
        <p
          className={classes.text}
          style={{
            color: darkMode ? "#fff" : "#134696",
          }}
        >{`${property?.area}, ${property?.city}`}</p>
        <p
          className={classes.currencyText}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
            fontFamily: "heavy",
            display: "flex",
          }}
        >
          {`${currencyFormatInitials(property?.price, property?.currency)}`}{" "}
          <span style={{ marginLeft: 5 }}>
            <OriginalPriceInfo
              price={property?.price}
              currency={property?.currency}
            />
          </span>
        </p>
        <p
          className={classes.text}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
            fontSize: 14,
          }}
        ></p>
      </div>
    </div>
  );
};

export default MyPropertyCard;
