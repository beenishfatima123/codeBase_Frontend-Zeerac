import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import HeadingSvg from "./HeadingSvg";
import { getPartnerListings } from "../../../redux/slices/partnersSlice";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import SliderContainer from "../../homeComponents/homepageListings/slider/SliderContainer";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import NotFound from "../../globalComponents/NotFound";
import { TextTranslation } from "../../../utils/translation";
import { HEADER_CONTENT_WIDTH } from "../../../utils/constants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "90%",
    alignSelf: "center",
    width: HEADER_CONTENT_WIDTH,
    margin: "20px 0px",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "20px 0px",
    minHeight: 100,
    position: "relative",
    width: "100%",
    left: -80,
  },
  horizontal: {
    display: "flex",
    alignSelf: "flex-end",
    minWidth: 250,
    flexDirection: "Column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  bottomBorder: {
    height: 1,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "lightGray",
    marginTop: 20,
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    height: 44,
    minWidth: "max-content",
    marginRight: 20,
  },
  btnText: {
    fontSize: 15,
    color: "white",
    fontFamily: "medium",
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

/* CompanyListings is the listings section on partner page where all listings
by an agency are mentioned. */
const CompanyListings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hovering, setHovering] = useState(false);

  const { partnerDetails, allPartnerListings, allPartnerListingsApiInfo } =
    useSelector((state) => state.partners);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { langIndex } = useSelector((state) => state.global);

  /* This useEffect gets partner listings using dispatch. */
  useEffect(() => {
    // console.log({ partnerDetails, allPartnerListings });
    if (partnerDetails) {
      // // console.log("sending request");
      dispatch(getPartnerListings({ id: partnerDetails?.id }));
    }
    // eslint-disable-next-line
  }, [partnerDetails]);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <HeadingSvg
          heading={`All Listings by ${partnerDetails?.company_name}`}
        />
        <div className={classes.horizontal}>
          <Button
            sx={{
              background:
                "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
              textTransform: "none",
              color: "#134696",
              width: 180,
              margin: "10px 5%",
              alignSelf: "flex-end",
              borderRadius: 0,
            }}
            endIcon={<ArrowForwardIcon style={{ color: "#134696" }} />}
            onClick={() => navigate("/listings")}
          >
            {TextTranslation.viewAll[langIndex]}
          </Button>
          {currentUser?.id === partnerDetails?.admin && (
            <div
              className={classes.addBtn}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onClick={() => navigate("/create-post")}
              style={{
                padding: hovering ? "0px 20px" : "0px 10px",
              }}
            >
              {hovering ? (
                <span className={classes.btnText}>
                  {TextTranslation.addListings[langIndex]}
                </span>
              ) : (
                <AddIcon style={{ color: "white" }} />
              )}
            </div>
          )}
        </div>
      </div>
      {allPartnerListings?.results?.length > 0 ? (
        <>
          {allPartnerListingsApiInfo?.loading ? (
            <ComponentLoader />
          ) : (
            <>
              <SliderContainer properties={allPartnerListings?.results} />
            </>
          )}
        </>
      ) : (
        <NotFound label="No listing have been posted by this agency" />
      )}

      <div className={classes.bottomBorder} />
    </div>
  );
};

export default CompanyListings;
