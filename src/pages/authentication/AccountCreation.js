import React from "react";
import { makeStyles } from "@mui/styles";
import Information from "../../components/registrationComponents/steps/Information";
import { Button } from "@mui/material";
import { ReactComponent as Content } from "../../assets/registration/registrationTitle.svg";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RegistrationTop from "../../components/globalComponents/misc/RegistrationTop";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccount,
  resetAccountCreation,
  setAccountCreationData,
  setActiveStep,
} from "../../redux/slices/createAccountSlice";
import CustomStepper from "../../components/registrationComponents/CustomStepper";
import Picture from "../../components/registrationComponents/steps/Picture";
import Company from "../../components/registrationComponents/steps/Company";
import Completed from "../../components/registrationComponents/steps/Completed";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  getAgentForm,
  getCompanyForm,
  validateAccountCreation,
  validateCompanyAccountCreation,
  validateCompanyInformation,
  validateInformation,
} from "../../utils/helpers/accountCreation";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import { checkFirestoreDoc } from "../../utils/authHelpers";
import { TextTranslation } from "../../utils/translation";

/* useStyles is being used to create custom styling using makeStyles from material UI.
This makeStyles is defining style attributes for container, footer, contentContainer.*/
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #bebebe",
    zIndex: 5,
    width: "100%",
    marginBottom: 20,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    padding: "5% 0px",
    width: "100%",
  },
}));

/* AccountCreation is the main component for creatng a new user account */
const AccountCreation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableNext, setDisableNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const activeStep = useSelector((state) => state.createAccount.activeStep);
  const allSteps = useSelector((state) => state.createAccount.allSteps);
  const { langIndex } = useSelector((state) => state.global);
  const { accountCreationData, createAccountApiInfo } = useSelector(
    (state) => state.createAccount
  );

  /* This useEffect hook checks if the API has returned any errors, if found
  it displays the error in toast */
  useEffect(() => {
    if (createAccountApiInfo?.error) {
      toast.error(createAccountApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetAccountCreation());
    }
    // eslint-disable-next-line
  }, [createAccountApiInfo?.error]);

  /* This useEffect hook checks if the response from API status is true,
  so it passes the status to checkSignupResponse otherwise it displays error in
  toast. */
  useEffect(() => {
    if (createAccountApiInfo?.response?.status) {
      checkSignupResponse(createAccountApiInfo?.response);
    } else {
      toast.error(createAccountApiInfo?.response?.message, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    }
    // eslint-disable-next-line
  }, [createAccountApiInfo?.response]);

  /* This useEffect hook checks if the role is defined in accountCreationData
  or not, if not, it navigates to signup page.  */
  useEffect(() => {
    if (!accountCreationData?.role) navigate("/signup", { replace: true });
    // eslint-disable-next-line
  }, [accountCreationData]);

  /* content uses a useMemo hook to return different components for different values
  of activeStep. */
  const content = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <Information disable={setDisableNext} />;
      case 1:
        return <Picture disable={setDisableNext} />;
      case 2:
        return <Company disable={setDisableNext} />;
      case 100:
        return <Completed />;

      default:
        return <Information />;
    }
  }, [activeStep]);

  /* 
  - checkSignupResponse takes response from API as parameter and passes
  names, email, photoURL and uid (email) from response to checkFirestoreDoc and 
  waits for checked response.
  - It displays toast on successful account creation showing success message.
  - It sets active step to 100. 
  - Resets account creation and sets role in accountCreationData equal to new role.
  */
  const checkSignupResponse = async (response) => {
    await checkFirestoreDoc({
      displayName: `${response?.result?.first_name} ${response?.result?.last_name}`,
      email: response?.result?.email,
      photoURL: response?.result?.photo,
      uid: response?.result?.email,
    });
    toast.success(response?.message, {
      position: toast.POSITION.TOP_CENTER,
      progressStyle: { backgroundColor: "#014493" },
    });
    dispatch(setActiveStep(100));
    dispatch(resetAccountCreation());
    dispatch(setAccountCreationData({ role: accountCreationData?.role }));
  };

  /* agentAccountCreation checks for any validation error in account creation for the agent.
   If not found, it dispatches the data ot slice otherwise it displays error on the toast. */
  const agentAccountCreation = async () => {
    setLoading(true);
    const validationError = await validateAccountCreation(accountCreationData);
    setLoading(false);

    if (!validationError)
      dispatch(createAccount(getAgentForm(accountCreationData)));
    else
      toast.error(validationError, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
  };

  /* companyAccountCreation checks for any validation error in account creation for the company.
   If not found, it dispatches the data ot slice otherwise it displays error on the toast. */
  const companyAccountCreation = async () => {
    setLoading(true);
    const validationError = await validateCompanyAccountCreation(
      accountCreationData
    );
    setLoading(false);

    if (!validationError)
      dispatch(createAccount(getCompanyForm(accountCreationData)));
    else
      toast.error(validationError, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
  };

  /* checkValidity takes step number and data as parameters and validates information at
  that particular step. It calls validateInformation from utils as a helper function. */
  const checkStepValidity = async (step, data) => {
    switch (step) {
      case 0:
        return await validateInformation(data);
      case 1:
        if (!data?.isPictureValid) return "A profile picture is required";
        else return false;
      case 2:
        return validateCompanyInformation(data);
      default:
        return false;
    }
  };

  /* handleNextStep checks if all steps for account creation are completed or not, if not,
  it checks for validation error by sending activeStep and data to checkValidity method. 
  Error is displayed on the toast. If all steps are done, it conditionally calls either
  agentAccountCreation or companyAccountCreation. */
  const handleNextStep = async () => {
    if (activeStep < allSteps?.length - 1) {
      const validationError = await checkStepValidity(
        activeStep,
        accountCreationData
      );
      if (validationError)
        toast.error(validationError, {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        });
      else dispatch(setActiveStep(activeStep + 1));
    } else {
      switch (accountCreationData?.role) {
        case "Agent":
          agentAccountCreation();
          break;
        case "Agency":
          companyAccountCreation();
          break;
        default:
      }
    }
  };
  return (
    <div className={classes.container}>
      <RegistrationTop
        content={<Content />}
        customStyle={{ marginTop: "5%" }}
      />
      {createAccountApiInfo?.loading || loading ? (
        <ComponentLoader />
      ) : (
        <div className={classes.contentContainer}>
          <CustomStepper />
          {content}
        </div>
      )}

      <div className={classes.footer}>
        <Button
          startIcon={<ArrowLeftIcon />}
          sx={{ color: "#134696", fontSize: 15, fontFamily: "medium", ml: 3 }}
          onClick={() => dispatch(setActiveStep(activeStep - 1))}
          disabled={activeStep <= 0 || activeStep === 100}
        >
          {TextTranslation.back[langIndex]}
        </Button>
        <Button
          sx={{ color: "#134696", fontSize: 15, fontFamily: "medium", mr: 3 }}
          endIcon={<ArrowRightIcon />}
          onClick={handleNextStep}
          disabled={activeStep === 100 || disableNext}
        >
          {TextTranslation.next[langIndex]}
        </Button>
      </div>
    </div>
  );
};

export default AccountCreation;
