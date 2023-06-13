import moment from "moment";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Button, Divider, Grid, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginInput from "../../../../loginComponents/LoginInput";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";

import {
  getAgentExperience,
  resetUpdatedAgentExperienceApi,
  setSideMenuClick,
  updatedAgentExperience,
} from "../../../../../redux/slices/settingsSlice";
import { ReactComponent as PersonIcon } from "../../../../../assets/icons/personIcon.svg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ExperienceDate from "./ExpDateInput";
import AddIcon from "@mui/icons-material/Add";
import { TextTranslation } from "../../../../../utils/translation";
const useStyles = makeStyles(() => ({
  expHeading: {
    fontSize: 24,
    fontFamily: "heavy",
    color: "#134696",
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: "light",
    color: "#7d7d7d",
  },
  tosContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: 13,
    color: "#7D7D7D",
    cursor: "pointer",
    marginTop: 20,
  },
  addMore: {
    color: "#134696",
    fontSize: 14,
    fontFamily: "medium",
    cursor: "pointer",
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px 0",
  },
  button: {
    backgroundColor: "#134696",
    fontFamily: "medium",
    fontSize: 16,
    cursor: "pointer",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    width: 100,
    height: 40,
  },
}));

const Experience = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [experience, setExperience] = useState([
    {
      company_name: "",
      designation: "",
      start_date: "",
      end_date: "",
      currently_working: false,
      city: "",
      country: "",
      inserted: true,
    },
  ]);
  const [isValid, setIsValid] = useState(true);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { langIndex } = useSelector((state) => state.global);
  const {
    agentExperience,
    agentExperienceApiInfo,
    updateAgentExperienceDetailApiInfo,
  } = useSelector((state) => state.settings);

  const addMoreExperience = () => {
    setExperience([
      ...experience,
      {
        company_name: "",
        designation: "",
        start_date: "",
        end_date: "",
        currently_working: false,
        city: "",
        country: "",
        inserted: true,
        isFromFocused: true,
        isToFocused: false,
      },
    ]);
  };

  const handleChange = (e, index) => {
    setExperience((prev) =>
      prev?.map((elem, pos) => {
        if (pos === index) {
          const updatedElem = {
            ...elem,
            [e.target.name]:
              e.target.name === "currently_working"
                ? !elem.currently_working
                : e.target.value,
            edited: true,
          };

          validateExperience(updatedElem); // Validate the updated experience element

          return updatedElem;
        } else {
          return elem;
        }
      })
    );
  };
  const validateExperience = (updatedElem) => {
    // Check for errors in the updated experience element
    if (
      updatedElem?.company_name === "" ||
      updatedElem?.company_name?.length < 3 ||
      updatedElem?.company_name?.length > 20 ||
      updatedElem?.designation === "" ||
      updatedElem?.designation?.length > 20 ||
      updatedElem?.city?.length < 3 ||
      updatedElem?.city?.length > 20 ||
      updatedElem?.country?.length < 3 ||
      updatedElem?.country?.length > 20 ||
      updatedElem?.start_date === ""
    ) {
      setIsValid(false); // Set isValid to false if there are errors
    } else {
      setIsValid(true); // Set isValid to true if there are no errors
    }
  };

  // const getMinDate = (currentDate) => {
  //   return moment(currentDate)?.add(1, "days").format("YYYY-MM-DD");
  // };

  useEffect(() => {
    dispatch(
      getAgentExperience({
        token: currentUser?.token,
        user_fk: currentUser?.id,
      })
    );

    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    if (agentExperience?.result?.count > 0)
      setExperience(agentExperience?.result?.results);
    // eslint-disable-next-line
  }, [agentExperience]);

  useEffect(() => {
    if (updateAgentExperienceDetailApiInfo?.response) {
      toast.success(TextTranslation.experienceUpdatedSuccessfully[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });

      dispatch(resetUpdatedAgentExperienceApi());
      dispatch(setSideMenuClick("overview"));
    }
    // eslint-disable-next-line
  }, [updateAgentExperienceDetailApiInfo?.response]);

  useEffect(() => {
    if (updateAgentExperienceDetailApiInfo?.error) {
      toast.error(TextTranslation.somethingWentWrong[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetUpdatedAgentExperienceApi());
    }
    // eslint-disable-next-line
  }, [updateAgentExperienceDetailApiInfo?.error]);

  const handleSubmit = () => {
    const _exp = experience?.map((elem) => {
      return {
        ...elem,
        start_date: moment(elem?.start_date).format("YYYY-MM-DD"),
        end_date: elem?.currently_working
          ? null
          : moment(elem?.end_date).format("YYYY-MM-DD"),
      };
    });
    let formData = new FormData();
    formData.append("experiences", JSON.stringify(_exp));
    let isValid = true;
    experience?.forEach((elem) => {
      if (
        elem?.company_name === "" ||
        elem?.company_name?.length < 3 ||
        elem?.company_name?.length > 20 ||
        elem?.designation === "" ||
        elem?.designation?.length > 20 ||
        elem?.city?.length < 3 ||
        elem?.city?.length > 20 ||
        elem?.country?.length < 3 ||
        elem?.country?.length > 20 ||
        elem?.start_date === ""
      )
        isValid = false;
    });
    if (isValid)
      dispatch(
        updatedAgentExperience({
          token: currentUser?.token,
          user_fk: currentUser?.id,
          formData,
        })
      );
    else
      toast.error("Invalid Information", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
  };

  return (
    <>
      <Grid
        container
        justifyContent={"flex-start"}
        columnSpacing={2}
        sx={{ marginLeft: "5px", maxWidth: "95%" }}
      >
        <Grid item xs={12} sm={10} lg={8.4}>
          <div className={classes.expHeading}>
            {TextTranslation.experience[langIndex]}
          </div>
        </Grid>
        <Grid item xs={12} sm={10} lg={8.4}>
          <div className={classes.description}>
            {TextTranslation.addYourExperience[langIndex]}
          </div>
        </Grid>
      </Grid>
      {agentExperienceApiInfo?.loading ||
      updateAgentExperienceDetailApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          {experience?.map((exp, index) => (
            <Grid
              container
              justifyContent={"flex-start"}
              columnSpacing={2}
              key={index}
              sx={{
                position: "relative",
                marginLeft: "5px",
                maxWidth: "95%",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: -12, left: -8 }}
                onClick={() =>
                  setExperience((prev) =>
                    prev?.filter((_elem, pos) => {
                      if (pos !== index) return _elem;
                      else return null;
                    })
                  )
                }
              >
                <HighlightOffIcon />
              </IconButton>
              <Grid item xs={12} sm={6} lg={4.2}>
                <LoginInput
                  name="company_name"
                  placeholder={TextTranslation.companyName[langIndex]}
                  value={exp?.company_name}
                  onChange={(e) => handleChange(e, index)}
                  startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                  type="text"
                />
                {exp?.company_name?.length > 0 &&
                (exp?.company_name?.length < 3 ||
                  exp?.company_name?.length > 50) ? (
                  <span
                    style={{
                      fontFamily: "light",
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    name must be between 3-50 characters
                  </span>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} lg={4.2}>
                <LoginInput
                  placeholder={TextTranslation.designation[langIndex]}
                  name="designation"
                  value={exp?.designation}
                  onChange={(e) => handleChange(e, index)}
                  startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                  type="text"
                />
                {exp?.designation?.length > 50 && (
                  <span
                    style={{
                      fontFamily: "light",
                      color: "red",
                      fontSize: 12,
                    }}
                  >
                    designation must be less than 50 characters
                  </span>
                )}
              </Grid>

              <Grid item xs={12} sm={6} lg={4.2}>
                <LoginInput
                  name="city"
                  placeholder={TextTranslation.city[langIndex]}
                  value={exp?.city}
                  onChange={(e) => handleChange(e, index)}
                  startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                  type="text"
                />
                {exp?.city?.length > 0 &&
                  (exp?.city?.length < 3 || exp?.city?.length > 30) && (
                    <span
                      style={{
                        fontFamily: "light",
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      city must be between 3 and 30 characters
                    </span>
                  )}
              </Grid>
              <Grid item xs={12} sm={6} lg={4.2}>
                <LoginInput
                  name="country"
                  placeholder={TextTranslation.country[langIndex]}
                  value={exp?.country}
                  onChange={(e) => handleChange(e, index)}
                  startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                  type="text"
                />
                {exp?.country?.length > 0 &&
                  (exp?.country?.length < 3 || exp?.country?.length > 30) && (
                    <span
                      style={{
                        fontFamily: "light",
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      country must be between 3 and 30 characters
                    </span>
                  )}
              </Grid>
              <Grid item xs={12} sm={4} lg={4.2}>
                <ExperienceDate
                  placeholder={TextTranslation.from[langIndex]}
                  name="start_date"
                  value={exp?.start_date || ""}
                  onChange={(e) => handleChange(e, index)}
                  startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                  max={new Date().toISOString().split("T")[0]}
                />
              </Grid>

              <Grid item xs={12} sm={4} lg={4.2}>
                {exp?.currently_working ? (
                  <LoginInput
                    placeholder={TextTranslation.to[langIndex]}
                    name="end_date"
                    defaultValue={null}
                    startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                    type="date"
                    readOnly
                  />
                ) : (
                  <ExperienceDate
                    placeholder={TextTranslation.to[langIndex]}
                    name="end_date"
                    value={exp?.end_date || ""}
                    onChange={(e) => handleChange(e, index)}
                    startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                    // min={getMinDate(exp?.start_date)}
                    min={moment(new Date(exp?.start_date)).format("YYYY-MM-DD")}
                    max={moment(new Date()).format("YYYY-MM-DD")}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={4} lg={4.2}>
                <div className={classes.tosContainer}>
                  <input
                    type="checkbox"
                    name="currently_working"
                    checked={exp?.currently_working}
                    onChange={(e) => handleChange(e, index)}
                    className="login-checkbox"
                  />
                  <span className={classes.radioLabel}>
                    {TextTranslation.currentlyWorking[langIndex]}
                  </span>
                </div>
              </Grid>

              {index !== experience.length - 1 ? (
                <Grid item xs={12} sm={12} lg={8.4} alignItems={"center"}>
                  <Divider
                    sx={{
                      color: "#7d7d7d",
                      mt: 1,
                    }}
                  />
                </Grid>
              ) : null}
            </Grid>
          ))}
          <Grid container justifyContent={"flex-start"} spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              lg={8.4}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Button
                className={classes.addMore}
                onClick={addMoreExperience}
                startIcon={<AddIcon />}
                disabled={experience?.length >= 5}
                sx={{
                  color: "#134696",
                  fontSize: 14,
                  fontFamily: "medium",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "10px 0px",
                  textTransform: "none",
                }}
              >
                {TextTranslation.addMore[langIndex]}
              </Button>
            </Grid>
          </Grid>
          {experience?.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginTop: 20,
              }}
            >
              <Button
                disabled={!isValid}
                className={classes.button}
                onClick={handleSubmit}
                sx={{
                  color: "#fff",
                  backgroundColor: "#134696",
                  fontSize: 14,
                  fontFamily: "medium",
                  cursor: "pointer",
                  textTransform: "none",
                  marginLeft: 5,
                  "&:hover": {
                    backgroundColor: "#134696",
                  },
                  "&:disabled": {
                    backgroundColor: "gray",
                    color: "#fff",
                  },
                }}
              >
                {TextTranslation.submit[langIndex]}
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Experience;
