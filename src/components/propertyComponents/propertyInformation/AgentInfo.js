import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ReactComponent as VerificationBadge } from "../../../assets/properties/verificationBadge.svg";
// eslint-disable-next-line
//import { Button } from '@mui/material';
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#134696",
    maxWidth: 580,
  },
  middleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  postedBy: {
    color: "#6B7B88",
    fontSize: 16,
    textAlign: "right",
  },
  user: {
    color: "#134696",
    fontSize: 32,
    fontFamily: "heavy",
    cursor: "pointer",
  },
  location: {
    color: "#6B7B88",
    fontSize: 18,
  },
  logo: {
    height: 190,
    width: 190,
    borderRadius: 10,
    marginLeft: 10,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "@media (max-width: 1024px)": {
    container: {
      marginTop: 20,
      flexDirection: "column",
    },
    middleContainer: {
      alignItems: "flex-start",
      margin: "20px 0px",
    },
    logo: {
      width: "100%",
    },
  },
}));
const AgentInfo = ({ property }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.global);

  const [phoneNumber, setPhoneNumber] = useState(null);

  const handleViewNumber = () => {
    setPhoneNumber((prev) => {
      if (!prev) return property?.user?.phone_number;
      else return null;
    });
  };
  return (
    <div className={classes.container}>
      {property?.user?.verification_status_by_admin === "verified" && (
        <VerificationBadge fill={darkMode ? "#0ed864" : "#134696"} />
      )}
      <div className={classes.middleContainer}>
        <span
          className={classes.postedBy}
          style={{
            color: darkMode ? "#6B7B88" : "#fff",
          }}
        >
          Posted By:
        </span>
        <span
          className={classes.user}
          style={{
            color: darkMode ? "#0ed864" : "#fff",
          }}
          onClick={() => {
            property?.user?.user_type === 2 &&
              navigate(`/agents/${property?.user?.id}`);
          }}
        >
          {property?.user?.full_name || "Anonymous"}
        </span>
        <span
          className={classes.location}
          style={{
            color: darkMode ? "#6B7B88" : "#fff",
          }}
        >
          {`${property?.street}, ${property?.area}, ${property?.city}`}
        </span>
        <div className={classes.btnContainer} style={{ marginTop: 5 }}>
          <Button
            sx={{
              textTransform: "none",
              color: darkMode ? "#0ed864" : "#fff",
              fontSize: 16,
              fontFamily: "medium",
            }}
            onClick={handleViewNumber}
          >
            Contact this agent
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="25"
            viewBox="0 0 4 25"
          >
            <rect
              id="Rectangle_5780"
              data-name="Rectangle 5780"
              width="4"
              height="25"
              fill="#0ed864"
            />
          </svg>

          <Button
            sx={{
              textTransform: "none",
              color: darkMode ? "#0ed864" : "#fff",
              fontSize: 16,
              fontFamily: "medium",
            }}
            onClick={handleViewNumber}
          >
            {phoneNumber || "Request a tour"}
          </Button>
        </div>
      </div>

      <img src={`${property?.user?.photo}`} alt="" className={classes.logo} />
    </div>
  );
};

export default AgentInfo;
