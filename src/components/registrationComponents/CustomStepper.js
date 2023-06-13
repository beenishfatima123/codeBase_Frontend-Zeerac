import React from "react";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";

const StepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#134696",
  }),
  "& .CustomStepIcon-completedIcon": {
    color: "#134696",
    zIndex: 1,
    fontSize: 8,
  },
  "& .CustomStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#fffff",
  },
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;
  return (
    <StepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div
          style={{
            padding: 2,
            border: "4px solid #134696",
            borderRadius: 16,
            height: 16,
            width: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check
            style={{ color: "#134696", fontSize: 16, fontWeight: "bold" }}
          />
        </div>
      ) : (
        <div
          style={{
            padding: 2,
            border: "4px solid #134696",
            borderRadius: 16,
            height: 16,
            width: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {active ? (
            <div
              style={{
                height: 8,
                width: 8,
                backgroundColor: "#134696",
                borderRadius: "50%",
              }}
            ></div>
          ) : (
            <div className="CustomStepIcon-circle"></div>
          )}
        </div>
      )}
    </StepIconRoot>
  );
}

CustomStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};
const useStyles = makeStyles(() => ({
  container: {
    width: "75%",
  },
  "@media (max-width: 1024px)": {
    container: {
      width: "100%",
    },
  },
}));
const CustomStepper = () => {
  const classes = useStyles();
  const activeStep = useSelector((state) => state.createAccount.activeStep);
  const allSteps = useSelector((state) => state.createAccount.allSteps);

  return (
    <div className={classes.container}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {allSteps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CustomStepper;
