import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Modal, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import useColor from "../../../utils/hooks/useColor";
import { useSelector, useDispatch } from "react-redux";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { validateInputs } from "../../../utils/helpers/accountCreation";
import AgentInputField from "../../settingComponents/becomeAnAgent/AgentInputField";
import {
  reportAgent,
  resetReportAgent,
} from "../../../redux/slices/agentsSlice";
import { TextTranslation } from "../../../utils/translation";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ImagePicker from "../../globalComponents/ImagePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  maxHeight: "80vh",
  overflow: "scroll",
  backgroundColor: "background.paper",
  border: "none",
  boxShadow: 24,
  "@media (max-width: 800px)": {
    width: "90%",
  },
};
const buttonSx = {
  border: "1px solid lightGray",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textTransform: "none",
  fontSize: 14,
};

const useStyles = makeStyles(() => ({
  container: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: "heavy",
    color: "#fff",
    width: "100%",
    height: 60,
    backgroundColor: "#0ed846",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
    fontFamily: "heavy",
    color: "#134696",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 10px",
    border: "1px solid #b2b2c9",
    borderRadius: 10,
    minWidth: "80%",
    marginTop: 10,
  },
  sendButton: {
    fontSize: 14,
    fontFamily: "heavy",
    color: "#ffffff",
    backgroundColor: "#134696",
    width: "49%",
    height: 40,
    borderRadius: 5,
    cursor: "pointer",
    border: "1px solid #707070",
    marginTop: 10,
    marginRight: "1%",
  },
  cancelButton: {
    fontSize: 14,
    fontFamily: "heavy",
    color: "#134696",
    backgroundColor: "#ffffff",
    width: "49%",
    height: 40,
    borderRadius: 5,
    cursor: "pointer",
    border: "1px solid #134696",
    marginTop: 10,
    marginLeft: "1%",
  },
}));
/* AgentReport is a Modal which appears when "Looks fake? Report it." button
on the agentDetail page is clicked, it takes open bool, setOpen method and
reportAgent bool. open is used to display Modal, setOpen will change open's value
and reportAgent will check whether to report an agent or selected agent. */
const AgentReport = ({ open, setOpen, reportedAgent }) => {
  //console.log({ reportedAgent });
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);

  const { currentUser } = useSelector((state) => state.auth);
  const { selectedAgent, reportAgentDataApiInfo } = useSelector(
    (state) => state.agents
  );

  const { colors, darkMode, langIndex } = useSelector((state) => state.global);
  useColor(colors);

  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
    type: "agent-report",
    agent: reportedAgent ? reportedAgent?.id : selectedAgent?.id,
    images: [],
  });
  const [showImagePicker, setShowImagePicker] = useState(false);

  /* handleInputChange takes prop and event and sets prop value equal to 
  target value */
  const handleInputChange = (prop) => (e) => {
    const validationError = validateInputs(prop, e.target.value);
    setUser((prev) => ({
      ...prev,
      [prop]:
        prop === "images"
          ? prev?.[prop]?.length > 0
            ? [...prev?.[prop], ...e?.target?.value]
            : e?.target?.value
          : e?.target?.value,
      [`${prop}Validation`]: validationError,
      // [e.target.name]: e.target.value,
    }));
  };

  /* Check form validity from name, email, message. */
  const isAgentFormValid = async (data) => {
    if (!data?.name) return TextTranslation.nameRequired[langIndex];
    else if (!data?.email) return TextTranslation.emailRequired[langIndex];
    else if (!data?.message) return TextTranslation.messageRequired[langIndex];
  };

  /* Make formData from entered information and dispatch to reportAgent in slice. */
  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("name", user?.name);
    formData.append("email", user?.email);
    formData.append("message", user?.message);
    formData.append("type", user?.type);
    formData.append("agent", user?.agent);
    user?.images?.forEach((element) => {
      formData?.append("file", element);
    });

    dispatch(
      reportAgent({
        token: currentUser?.token,
        formData,
      })
    );
  };

  /* if report agent API returns a response then show success message in toast
  and set report agent data to emppty. */
  useEffect(() => {
    if (reportAgentDataApiInfo?.response) {
      toast.success(reportAgentDataApiInfo?.response?.message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetReportAgent());
      setUser({
        name: "",
        email: "",
        message: "",
        type: "",
        agent: null,
        images: [],
      });
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [reportAgentDataApiInfo?.response]);

  /* if report agent API returns an error then show error message in toast
  and dispatch reset report agent. */
  useEffect(() => {
    if (reportAgentDataApiInfo?.error) {
      toast.error(reportAgentDataApiInfo?.response?.message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetReportAgent());
    }
    // eslint-disable-next-line
  }, [reportAgentDataApiInfo?.error]);

  return (
    <Modal open={Boolean(open)}>
      <Box sx={style}>
        <div className={classes.text}>{TextTranslation.report[langIndex]}</div>
        <div className={classes.container}>
          {reportAgentDataApiInfo?.loading ? (
            <ComponentLoader />
          ) : (
            <Grid container justifyContent="space-around" spacing={2}>
              <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                <label
                  className={classes.label}
                  style={{ color: darkMode ? colors?.primary : "" }}
                >
                  {TextTranslation.name[langIndex]}
                </label>
                <AgentInputField
                  required={true}
                  name="name"
                  value={user?.name}
                  onChange={handleInputChange("name")}
                  placeholder={TextTranslation.yourName[langIndex]}
                  type="text"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                <label
                  className={classes.label}
                  style={{ color: darkMode ? colors?.primary : "" }}
                >
                  {TextTranslation.contactEmail[langIndex]}
                </label>
                <AgentInputField
                  required={true}
                  name="email"
                  value={user?.email}
                  onChange={handleInputChange("email")}
                  placeholder={TextTranslation.enterEmailAddress[langIndex]}
                  type="email"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
                <label
                  className={classes.label}
                  style={{ color: darkMode ? colors?.primary : "" }}
                >
                  {TextTranslation.message[langIndex]}
                </label>
                <div
                  className={classes.descriptionContainer}
                  style={{
                    border: "1px solid #b2b2c9",
                  }}
                >
                  <textarea
                    name="message"
                    className="login-input"
                    rows="4"
                    placeholder={TextTranslation.typeYourMessage[langIndex]}
                    value={user?.message || ""}
                    onChange={handleInputChange("message")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
                {showImagePicker && (
                  <ImagePicker
                    images={user?.images}
                    onChange={handleInputChange}
                    handleClose={() => setShowImagePicker(false)}
                    setPostData={setUser}
                  />
                )}

                <Button
                  sx={{ ...buttonSx, color: darkMode ? "#fff" : "#000" }}
                  fullWidth
                  onClick={() => setShowImagePicker(true)}
                >
                  <span>Add to your post</span>
                  <InsertPhotoIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
                <button
                  type="submit"
                  className={classes.sendButton}
                  onClick={async () => {
                    const isValid = await isAgentFormValid(user);
                    if (!isValid) handleSubmit();
                    else
                      toast.error(isValid, {
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: true,
                      });
                  }}
                >
                  {TextTranslation.send[langIndex]}
                </button>
                <button className={classes.cancelButton} onClick={handleClose}>
                  {TextTranslation.cancel[langIndex]}
                </button>
              </Grid>
            </Grid>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default AgentReport;
