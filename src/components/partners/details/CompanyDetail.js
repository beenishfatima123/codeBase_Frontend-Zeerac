import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import ButtonsIconContainer from "../../propertyComponents/misc/ButtonsIconContainer";
import {
  HEADER_CONTENT_WIDTH,
  INITIAL_PROPERTY_ACTIONS,
} from "../../../utils/constants";
import HeadingSvg from "./HeadingSvg";
import { Button } from "@mui/material";
import ReportAgency from "./ReportAgency";
import { toast } from "react-toastify";
import ButtonLoader from "../../globalComponents/ButtonLoader";
import {
  requestToJoinAgency,
  resetRequestToJoinAgency,
} from "../../../redux/slices/partnersSlice";
const buttonSx = {
  border: "1px solid lightgrey",
  borderRadius: 20,
  width: "200px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "none",
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid #707070",
    maxWidth: "90%",
    alignSelf: "center",
    width: HEADER_CONTENT_WIDTH,
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "20px 0px",
    minHeight: 100,
    position: "relative",
    //left: -80,
  },

  about: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "medium",
    color: "#134696",
    marginLeft: 120,
    alignSelf: "flex-start",
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: "5%",
  },
  buttonsIconStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  bottomBorder: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#707070",
  },
  description: {
    color: "#7D7D7D",
    fontSize: 18,
    margin: "20px 5%",
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
    },
    iconsStyle: {
      maxWidth: "90%",
      marginRight: 0,
      alignSelf: "flex-end",
      marginTop: 50,
    },
    about: {
      marginLeft: 100,
      fontSize: 28,
    },
  },
}));

/* CompanyDetails is the about section on partner page where all details
of an agency are described. */
const CompanyDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { partnerDetails } = useSelector((state) => state.partners);
  const { requestToJoinAgencyApiInfo } = useSelector((state) => state.partners);
  const { darkMode } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [propertyActions, setPropertyActions] = useState(
    INITIAL_PROPERTY_ACTIONS
  );

  /* This useEffect is executed when request to join agency API gives response.
  It displays the success message in toast.  */
  useEffect(() => {
    if (requestToJoinAgencyApiInfo?.response) {
      toast.success(requestToJoinAgencyApiInfo?.response?.message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetRequestToJoinAgency());
    }
    // eslint-disable-next-line
  }, [requestToJoinAgencyApiInfo?.response]);

  /* This useEffect is executed when request to join agency API gives error.
  It displays the error message in toast.  */
  useEffect(() => {
    if (requestToJoinAgencyApiInfo?.error) {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetRequestToJoinAgency());
    }
    // eslint-disable-next-line
  }, [requestToJoinAgencyApiInfo?.error]);

  //console.log({ requestToJoinAgencyApiInfo });

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <div
          style={{
            marginLeft: -80,
          }}
        >
          <HeadingSvg heading={"About the Agency"} />
        </div>
        <ButtonsIconContainer
          customStyle={classes.buttonsIconStyle}
          phoneNumber={partnerDetails?.company_phone}
          setPropertyActions={setPropertyActions}
          propertyActions={propertyActions}
          customColor={darkMode ? "#0ed864" : "#134696"}
          customSize={20}
          agency={partnerDetails}
        />
      </div>
      {partnerDetails?.admin !== currentUser?.id && (
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            margin: "-20px 20px 20px 0px",
            flexWrap: "wrap",
          }}
        >
          <Button
            sx={{
              ...buttonSx,
              color: darkMode ? "#0ed864" : "#134696",
              borderRadius: 3,
              margin: 1,
            }}
            onClick={() => {
              if (currentUser) {
                setOpen(true);
              } else {
                toast.warning("Please login first to report an agency", {
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: true,
                });
              }
            }}
          >
            Looks fake? Report it.
          </Button>
          {currentUser?.user_type === 2 && (
            <Button
              sx={{
                ...buttonSx,
                color: darkMode ? "#0ed864" : "#134696",
                borderRadius: 3,
                margin: 1,
              }}
              onClick={() => {
                if (currentUser) {
                  dispatch(
                    requestToJoinAgency({
                      token: currentUser?.token,
                      agency: partnerDetails?.id,
                      user: currentUser?.id,
                    })
                  );
                } else {
                  toast.warning(
                    "Please login first to request to join agency",
                    {
                      position: toast.POSITION.TOP_CENTER,
                      hideProgressBar: true,
                    }
                  );
                }
              }}
            >
              {requestToJoinAgencyApiInfo?.loading ? (
                <ButtonLoader
                  color={darkMode ? "#0ed864" : "#134696"}
                  size={20}
                />
              ) : (
                "Request to join agency"
              )}
            </Button>
          )}
          {open && <ReportAgency open={open} setOpen={setOpen} />}
        </div>
      )}

      <div className={classes.bottomBorder} />
      <span
        className={classes.description}
        style={{
          color: darkMode ? "#fff" : "#7D7D7D",
        }}
      >
        {partnerDetails?.company_description}
      </span>
    </div>
  );
};

export default CompanyDetail;
