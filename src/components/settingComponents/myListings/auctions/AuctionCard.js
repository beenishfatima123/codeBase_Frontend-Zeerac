import React, { useEffect, useRef, useState } from "react";

import { makeStyles } from "@mui/styles";
import moment from "moment/moment";
import SubunitCardDetails from "../../../auctionComponents/SubunitCardDetails";
import { useWindowDims } from "../../../../utils/useWindowDims";
import { VERIFICATION_STATUS } from "../../../../utils/constants";
import defaultPost from "../../../../assets/defaultAssets/defaultPost.png";
import { Button, IconButton } from "@mui/material";
import {
  deleteAuction,
  setShowAuctionDetail,
} from "../../../../redux/slices/auctionSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../ConfirmModal";
import GetVerifiedModal from "../../../globalComponents/misc/GetVerifiedModal";
import { TextTranslation } from "../../../../utils/translation";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomTooltip from "../../../globalComponents/CustomTooltip";
import { currencyFormatInitials } from "../../../../utils/helperFunctions";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 5%",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: 10,
    backgroundColor: "white",
  },
  backgroundContainer: {
    height: 280,
    width: "100%",
    backgroundColor: "#DBDBDB",
    alignSelf: "center",
    objectFit: "fill",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userContainer: {
    display: "flex",
    width: "95%",
    marginBottom: 10,
  },
  priceTitle: {
    margin: 0,
    fontSize: 14,
    color: "#1A2954",
    fontFamily: "medium",
  },
  title: {
    fontSize: 14,
    color: "#7D7D7D",
    fontFamily: "light",
    margin: "5px 0px",
    textTransform: "capitalize",
  },
  price: {
    margin: 0,
    fontSize: 26,
    color: "#134696",
    fontFamily: "heavy",
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: "10px 0px",
    cursor: "pointer",
  },
  valueContainer: {
    display: "flex",
    margin: "5px 0px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 18,
    color: "#1A2954",
    marginTop: 0,
    fontFamily: "medium",
  },
  auctionEnd: {
    fontSize: 18,
    color: "#D0021B ",
    marginTop: 0,
    fontFamily: "medium",
  },
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 10px",
    width: 200,
  },
  location: {
    fontSize: 18,
    color: "#1A2954",
    marginTop: 0,
    fontFamily: "medium",
    height: 45,
    overflow: "hidden",
  },
  listedBy: {
    fontSize: 18,
    color: "#1A2954",
    marginTop: 0,
    fontFamily: "medium",
    height: 25,
    overflow: "hidden",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
  "@media (max-width: 950px)": {
    price: {
      fontSize: 20,
    },
  },
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  btnTitle: {
    fontSize: 12,
    color: "#fff",
    marginRight: 5,
  },
}));
const buttonSx = {
  display: "flex",
  alignItems: "center",
  textTransform: "none",
  borderRadius: 20,
  border: "2px solid #fff",
  padding: "5px 5px",
  margin: "10px 10px",
  height: "31px",
};

/* AuctionCard is simply a grid item which takes auction as parameter and displays it in the form of the card with iamage, title, price, shares, agent name, and action buttons. */
const AuctionCard = ({ auction }) => {
  const classes = useStyles();
  const containerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  //console.log({ auction });

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [verifyModel, setVerifyModal] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { langIndex } = useSelector((state) => state.global);

  const { width } = useWindowDims();

  const [parentWidth, setParentWidth] = useState();

  const getBackgroundImage = () => {
    if (auction?.photos?.length)
      return `linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,1)),url(${auction?.photos[0]?.file_photo})`;
    else
      return `linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,1)),url(${defaultPost})`;
  };

  /* getDifference from calculates auction end time difference from current time. */
  const getDifferenceFromNow = () => {
    const current_date = moment();
    const end_date = moment(auction?.end_date);
    const yearDif = end_date.diff(current_date, "years");
    const monthDif = end_date.diff(current_date, "months") % 12;
    const dayDiff = end_date.diff(current_date, "days") % 30;

    let diff = "";

    if (yearDif) diff = diff + yearDif + " years,";
    if (monthDif) diff = diff + monthDif + " months and,";

    diff = diff + dayDiff + " days";

    if (parseInt(dayDiff) > 0) {
      return diff;
    } else {
      return "Auction Ended";
    }
  };

  /* this useEffect sets parent width which is further used to determine the flex direction. */
  useEffect(() => {
    if (containerRef)
      setParentWidth(containerRef.current.parentElement.offsetWidth);
  }, [containerRef, width]);

  /* deleteListing is called when agent clicks on the cross button on auction card. It dispatches deleteListing reducer. */
  const deleteListing = () => {
    dispatch(deleteAuction({ id: auction?.id, token: currentUser?.token }));
  };
  return (
    <div className={classes.container}>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title={TextTranslation.areYouSureToDeleteAuction[langIndex]}
          handleConfirm={deleteListing}
        />
      )}
      {verifyModel && (
        <GetVerifiedModal
          verifyModel={verifyModel}
          setVerifyModal={setVerifyModal}
          type="property_file"
          id={auction?.id}
        />
      )}
      <div
        className={classes.backgroundContainer}
        style={{
          backgroundImage: getBackgroundImage(),
          borderBottom:
            auction?.auction_type === "sub_unit" ? "none" : "1px solid #0ED864",
        }}
      >
        <div
          className={classes.btnContainer}
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7))`,
          }}
        >
          {!auction?.verification_status ||
          auction?.verification_status === VERIFICATION_STATUS.NOT_APPLIED ? (
            <Button sx={buttonSx} onClick={() => setVerifyModal(true)}>
              <span className={classes.btnTitle}>
                {TextTranslation.getVerified[langIndex]}
              </span>
            </Button>
          ) : null}
          <IconButton
            //disabled={auction?.bids?.length > 0}
            // sx={buttonSx}
            sx={{
              border: "2px solid #fff",
              padding: 1,
              margin: "10px",
            }}
            onClick={() => {
              if (auction?.bids?.length === 0) {
                navigate(`${pathname}/${auction?.id}`);
              } else {
                toast.warning(
                  "Bids have been placed on this Auction. So, this Auction is not editable",
                  {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                  }
                );
              }
            }}
          >
            {/* <span className={classes.btnTitle}>
              {TextTranslation.edit[langIndex]}
            </span> */}
            <BorderColorOutlinedIcon style={{ color: "#fff", fontSize: 14 }} />
          </IconButton>
          <IconButton
            sx={{
              border: "2px solid #fff",
              padding: 1,
              margin: "10px",
            }}
            onClick={() => setOpenConfirmModal(true)}
          >
            {/* <span className={classes.btnTitle}>
              {TextTranslation.delete[langIndex]}
            </span> */}
            <CancelOutlinedIcon style={{ color: "red", fontSize: 14 }} />
          </IconButton>

          {/* auction.verification_status checks verification of the agent after they click on get verified and modal form is submitted.  */}
          {auction?.verification_status === VERIFICATION_STATUS.IN_PROGRESS && (
            <Button
              style={{
                color: "white",
                backgroundColor: "#134696",
                cursor: "default",
              }}
              sx={buttonSx}
            >
              <span className={classes.btnTitle}>
                {TextTranslation.requestSubmitted[langIndex]}
              </span>
            </Button>
          )}
          {auction?.verification_status === VERIFICATION_STATUS.VERIFIED && (
            <Button
              sx={buttonSx}
              style={{
                color: "white",
                backgroundColor: "#0ED864",
                cursor: "default",
              }}
            >
              <span className={classes.btnTitle}>
                {TextTranslation.verified[langIndex]}
              </span>
            </Button>
          )}
          {auction?.verification_status === VERIFICATION_STATUS.DECLINED && (
            <Button
              style={{
                color: "white",
                backgroundColor: "red",
                cursor: "default",
              }}
              sx={buttonSx}
            >
              <span className={classes.btnTitle}>
                {TextTranslation.declined[langIndex]}
              </span>
            </Button>
          )}
        </div>
        <div
          className={classes.userContainer}
          style={{
            justifyContent: "space-between",
            flexDirection: parentWidth > 365 ? "row" : "column",
            alignItems: parentWidth > 365 ? "center" : "flex-start",
          }}
          ref={containerRef}
        >
          <div style={{ marginLeft: 10 }}>
            {auction?.auction_type !== "sub_unit" && (
              <>
                <p className={classes.priceTitle}>Price</p>
                <span className={classes.price}>
                  {` ${currencyFormatInitials(
                    auction?.price,
                    auction?.currency
                  )}`}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={classes.bottomContainer}
        onClick={() => {
          dispatch(setShowAuctionDetail(auction));
          navigate(`/settings/my_listings/${auction?.id}`);
        }}
      >
        {auction?.auction_type === "sub_unit" ? (
          <SubunitCardDetails auction={auction} />
        ) : (
          <div className={classes.valueContainer}>
            {/* If the auction type is not sub_unit then display these */}
            <div className={classes.verticalContainer}>
              <p className={classes.title}>
                {auction?.auction_type === "bulk"
                  ? "No. of FIles"
                  : "Auction End"}
              </p>
              <span
                className={
                  auction?.auction_type === "bulk"
                    ? classes.value
                    : classes.auctionEnd
                }
              >
                {auction?.auction_type === "bulk"
                  ? auction?.total_files
                  : `${getDifferenceFromNow()}`}
              </span>
            </div>
            <div className={classes.verticalContainer}>
              <p className={classes.title}>Society/Location</p>
              <CustomTooltip
                title={`${auction?.area || TextTranslation.area[langIndex]}, ${
                  auction?.city || TextTranslation.city[langIndex]
                },  ${auction?.country || TextTranslation.country[langIndex]}`}
              >
                <span className={classes.location}>{`${
                  auction?.area || TextTranslation.area[langIndex]
                }, ${
                  auction?.city || TextTranslation.city[langIndex]
                }  `}</span>
              </CustomTooltip>
            </div>
          </div>
        )}
        {/* bottom part of card containing only area size and listed by: */}
        <div className={classes.valueContainer}>
          <div className={classes.verticalContainer}>
            <p className={classes.title}>Area Size</p>
            <span className={classes.value}>{`${auction?.size || "0"} ${
              auction?.unit === "Square Feet" ? "Sqft" : auction?.unit || "Sqft"
            }`}</span>
          </div>
          <div className={classes.verticalContainer}>
            <p className={classes.title}>Listed by:</p>
            <CustomTooltip title={auction?.user_fk?.full_name}>
              <span className={classes.listedBy}>{`${
                auction?.user_fk?.full_name || "user"
              }`}</span>
            </CustomTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
