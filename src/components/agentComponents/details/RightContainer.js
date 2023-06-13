import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useMemo } from "react";
import { currencyFormatInitials } from "../../../utils/helperFunctions";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import RightContainerLines from "./svgs/RightContainerLines";
import NotFound from "../../globalComponents/NotFound";
import AgentReport from "./ReportAgent";
import { toast } from "react-toastify";
import { useWindowDims } from "../../../utils/useWindowDims";
import MobileAgentListings from "./MobileAgentListings";
import ButtonsIconContainer from "../../propertyComponents/misc/ButtonsIconContainer";
import { TextTranslation } from "../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 5%",
    borderBottom: "1px solid #707070",
  },
  headings: {
    fontSize: 16,
    color: "#134696",
    fontFamily: "heavy",
  },
  description: {
    fontSize: 18,
    color: "#7D7D7D",
    maxWidth: "80%",
    maxHeight: 120,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: "#000000",
    margin: "20px 0px",
  },
  stepperSecondary: {
    fontSize: 11,
    color: "#134696",
    fontWeight: "light",
  },
  stepperPrimary: {
    fontSize: 16,
    color: "#134696",
    fontFamily: "heavy",
  },
  expContainer: {
    minHeight: 200,
  },
  horizontal: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    marginTop: 20,
  },
  listingContainer: {
    minHeight: 200,
  },
  listingsTable: {
    height: 200,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #e3e3e3",
    padding: "20px 0px",
    cursor: "pointer",
  },
  tablePrimary: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "heavy",
    width: 200,
    wordBreak: "break-all",
    wordWrap: "break-word",
    whiteSpace: "normal",
  },
  tableSecondary: {
    fontSize: 14,
    color: "#8B8B8B",
    width: 150,
    wordBreak: "break-all",
    wordWrap: "break-word",
    whiteSpace: "normal",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsIconStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  "@media (max-width:1000px)": {
    row: {
      overflowX: "scroll",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {
        WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius: "5px",
      },
      scrollBehavior: "smooth !important",
    },
  },
  "@media (max-width: 550px)": {
    horizontal: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    footer: {
      flexDirection: "column",
      //   alignItems: "flex-start",
    },
  },
}));
const buttonSx = {
  border: "1px solid lightgrey",
  borderRadius: 20,
  width: "215px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "none",
  marginTop: 5,
};

/* Right container is displayed on the right side of agent details page, it shows agent
experiece, listings, favourite button and other buttons. */
const RightContainer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { width } = useWindowDims();
  const [agentActions, setAgentActions] = useState();
  const [open, setOpen] = useState(false);

  const { selectedAgent } = useSelector((state) => state.agents);
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);

  //console.log({ selectedAgent });
  /* experienceArray stores the total experience of the agent in memory. */
  const experienceArray = useMemo(() => {
    if (selectedAgent?.experience?.length) return selectedAgent?.experience;
  }, [selectedAgent]);
  
  // eslint-disable-next-line
  /* getDuration displays the total time the agent has been working. */
  const getDuration = (start, end) => {
    return `${moment(start).year()} - ${moment(end).year() || "Present"}`;
  };

  return (
    <div className={classes.container}>
      <ButtonsIconContainer
        customStyle={classes.buttonsIconStyle}
        phoneNumber={selectedAgent?.phone_number}
        setPropertyActions={setAgentActions}
        propertyActions={agentActions}
        customColor={darkMode ? "#0ed864" : "#134696"}
        customSize={20}
        agent={selectedAgent}
      />
      <p
        className={classes.headings}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Personal Details
      </p>
      <div style={{ position: "absolute", right: 0, marginTop: 30 }}>
        <RightContainerLines />
      </div>
      <span
        className={classes.description}
        style={{
          color: darkMode ? "#fff" : "#7D7D7D",
        }}
      >
        {selectedAgent?.personal_description}
      </span>
      <div className={classes.divider} />
      <div className={classes.expContainer}>
        <p
          className={classes.headings}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
          }}
        >
          Experience
        </p>
        <div className={classes.horizontal}>
          {experienceArray?.length > 0 ? (
            <Stepper
              activeStep={experienceArray?.length || 0}
              alternativeLabel
              sx={{ width: "100%" }}
            >
              {experienceArray?.map((elem, index) => (
                <Step key={index}>
                  <StepLabel
                    sx={{
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: "#134696 !important",
                      },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className={classes.stepperSecondary}
                        style={{
                          color: darkMode ? "#0ed864" : "#134696",
                        }}
                      >
                        {getDuration(
                          elem?.start_date,
                          elem?.currently_working === true
                            ? "Present"
                            : elem?.end_date
                        )}
                      </span>
                      <span
                        className={classes.stepperPrimary}
                        style={{
                          color: darkMode ? "#0ed864" : "#134696",
                        }}
                      >
                        {elem?.company_name}
                      </span>
                      <span
                        className={classes.stepperSecondary}
                        style={{
                          color: darkMode ? "#0ed864" : "#134696",
                        }}
                      >
                        {`${elem?.city}, ${elem?.country}`}
                      </span>
                    </div>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            <NotFound label="No Experience" />
          )}
        </div>
      </div>
      <div className={classes.divider} />
      <div className={classes.listingContainer}>
        <p
          className={classes.headings}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
            margin: 0,
          }}
        >
          {TextTranslation.listings[langIndex]}
        </p>
        {selectedAgent?.listing?.length > 0 ? (
          <>
            {width > 800 ? (
              <div className={classes.listingsTable}>
                {selectedAgent?.listing?.map((elem, index) => (
                  <div
                    className={classes.row}
                    key={index}
                    onClick={() => navigate(`/listing/${elem?.id}`)}
                  >
                    <span
                      className={classes.tablePrimary}
                      style={{
                        color: darkMode ? "#fff" : "#000000",
                      }}
                    >
                      {`${elem?.size} ${elem?.unit} ${elem?.bedrooms} ${TextTranslation.bedrooms[langIndex]} ${elem?.bathrooms} ${TextTranslation.bathrooms[langIndex]}`}
                    </span>
                    <span
                      className={classes.tableSecondary}
                    >{`${elem?.area}`}</span>
                    <span className={classes.tableSecondary}>
                      {currencyFormatInitials(elem?.price, "PKR")}
                    </span>
                    <span className={classes.tableSecondary}>
                      {`${elem?.city}, ${elem?.country}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              selectedAgent?.listing?.map((item, index) => (
                <MobileAgentListings
                  key={index}
                  onClick={() => {
                    navigate(`/agents/${item?.id}`);
                  }}
                  size={item?.size}
                  unit={item?.unit}
                  bedrooms={item?.bedrooms}
                  bathrooms={item?.bathrooms}
                  currency={item?.currency}
                  price={item?.price}
                  area={item?.area || "area"}
                  city={item?.city || "city"}
                  country={item?.country || "country"}
                />
              ))
            )}
          </>
        ) : (
          <NotFound label={"No listings Found"} />
        )}
      </div>

      <div className={classes.divider} />
      {/* <div
        className={classes.headings}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Reviews
      </div>
      <NotFound label={"No Reviews Found"} /> 
      <div className={classes.divider} />*/}
      <div className={classes.footer}>
        <div className={classes.footer}>
          {/* <IconsContainer
            customStyle={classes.iconsStyle}
            phoneNumber={selectedAgent?.phone_number}
            setPropertyActions={setAgentActions}
            propertyActions={agentActions}
            customColor={darkMode ? "#0ed864" : "#134696"}
            customSize={35}
            agent={selectedAgent}
          /> */}
          {/* <Button
            sx={{
              ...buttonSx,
              borderRadius: 3,
              ml: width > 600 ? 3 : 0,
              mt: width > 600 ? 0 : 2,
              mb: width > 600 ? 0 : 2,
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            Request for Appointment
          </Button> */}
        </div>
        {currentUser?.id !== selectedAgent?.id && (
          <Button
            sx={{
              ...buttonSx,
              color: darkMode ? "#0ed864" : "#134696",
              borderRadius: 3,
            }}
            onClick={() => {
              if (currentUser) {
                setOpen(true);
              } else {
                toast.warning("Please login first to report an agent", {
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: true,
                });
              }
            }}
          >
            Looks fake? Report it.
          </Button>
        )}
      </div>
      {open && <AgentReport open={open} setOpen={setOpen} />}
    </div>
  );
};

export default RightContainer;
