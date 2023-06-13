import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import PasswordInput from "./PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import useColor from "../../../../../utils/hooks/useColor";
import eyeIcon from "../../../../../assets/settings/eye.png";
import eyeHideIcon from "../../../../../assets/settings/eyehide.png";
import lockIcon from "../../../../../assets/settings/lock.png";
import ButtonLoader from "../../../../globalComponents/ButtonLoader";
import {
  resetUpdatePassword,
  setSideMenuClick,
  updateAccountPassword,
} from "../../../../../redux/slices/settingsSlice";
import {
  validatePassword,
  getPasswordHelper,
} from "../../../../../utils/helperFunctions";
import { TextTranslation } from "../../../../../utils/translation";

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 24,
    fontFamily: "heavy",
    color: "#134696",
  },
  description: {
    fontSize: 14,
    fontFamily: "light",
    color: "#7d7d7d",
  },
  buttonContainer: {
    margin: "20px 0px",
    display: "flex",
    flex: 1,
    width: 300,
  },
  updateButton: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#ffffff",
    backgroundColor: "#134696",
    width: 150,
    height: 50,
    borderRadius: 5,
    cursor: "pointer",
    border: "1px solid #707070",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
  cancelButton: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#134696",
    backgroundColor: "#ffffff",
    width: 150,
    height: 50,
    borderRadius: 5,
    cursor: "pointer",
    border: "1px solid #707070",
    marginLeft: 20,
  },
  "@media (max-width: 420px)": {
    updateButton: {
      width: 120,
    },
    cancelButton: {
      width: 120,
    },
  },
}));

const ChangePassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState({
    value: "",
    isPasswordValid: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isPasswordValid: "",
  });
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { colors, langIndex } = useSelector((state) => state.global);
  useColor(colors);

  const { currentUser } = useSelector((state) => state.auth);
  const { updatePasswordApiInfo } = useSelector((state) => state.settings);

  useEffect(() => {
    if (updatePasswordApiInfo?.message?.status) {
      toast.success(updatePasswordApiInfo?.message?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetUpdatePassword());
      dispatch(setSideMenuClick("overview"));
    } else {
      toast.error(updatePasswordApiInfo?.message?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(resetUpdatePassword());
    }
    // eslint-disable-next-line
  }, [updatePasswordApiInfo?.message?.status]);

  const isFormValid = () => {
    return (
      newPassword?.value === confirmPassword?.value &&
      newPassword?.isPasswordValid &&
      confirmPassword?.isPasswordValid &&
      currentPassword !== ""
    );
  };

  return (
    <>
      <div style={{ margin: "10px 0 20px 0" }}>
        <div className={classes.heading} style={{ color: colors?.primary }}>
          {TextTranslation.profileInformation[langIndex]}
        </div>
        <div className={classes.description}>
          {TextTranslation.updateYourPassword[langIndex]}
        </div>
      </div>
      <div>
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            let formData = new FormData();
            formData.append("old_password", currentPassword);
            formData.append("new_password", newPassword?.value);
            dispatch(
              updateAccountPassword({
                formData,
                token: currentUser?.token,
              })
            );
          }}
        >
          <PasswordInput
            name="old_password"
            label={TextTranslation.currentPassword[langIndex]}
            placeholder={TextTranslation.currentPassword[langIndex]}
            type="Password"
            value={currentPassword}
            startIcon={
              <img alt="lock" src={lockIcon} style={{ marginRight: 10 }} />
            }
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
          <PasswordInput
            name="new_password"
            label={TextTranslation.newPassword[langIndex]}
            placeholder={TextTranslation.newPassword[langIndex]}
            type={!showNewPass ? "Password" : "text"}
            value={newPassword?.value}
            startIcon={
              <img alt="lock" src={lockIcon} style={{ marginRight: 10 }} />
            }
            endIcon={
              <img
                alt="eye"
                src={showNewPass ? eyeIcon : eyeHideIcon}
                style={{
                  cursor: "pointer",
                  width: 24,
                  height: 24,
                  objectFit: "cover",
                }}
                onClick={() => setShowNewPass(!showNewPass)}
              />
            }
            onChange={(e) => {
              setNewPassword({
                value: e.target.value,
                isPasswordValid: validatePassword(e.target.value),
              });
            }}
            validating={newPassword?.isPasswordValid}
            helperText={getPasswordHelper(newPassword?.value)}
          />
          <PasswordInput
            name="confirm_password"
            label={TextTranslation.confirmPassword[langIndex]}
            placeholder={TextTranslation.confirmPassword[langIndex]}
            type={!showConfirmPass ? "Password" : "text"}
            value={confirmPassword?.value}
            startIcon={
              <img alt="lock" src={lockIcon} style={{ marginRight: 10 }} />
            }
            endIcon={
              <img
                alt="eye"
                src={showConfirmPass ? eyeIcon : eyeHideIcon}
                style={{
                  cursor: "pointer",
                  width: 24,
                  height: 24,
                  objectFit: "cover",
                }}
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              />
            }
            onChange={(e) => {
              setConfirmPassword({
                value: e.target.value,
                isPasswordValid: validatePassword(e.target.value),
              });
            }}
            validating={confirmPassword?.isPasswordValid}
            helperText={getPasswordHelper(confirmPassword?.value)}
          />
          {newPassword?.value !== confirmPassword?.value && (
            <span className={classes.helperText}>
              {newPassword?.value !== confirmPassword?.value &&
                TextTranslation.passwordNotMatch[langIndex]}
            </span>
          )}

          <div className={classes.buttonContainer}>
            <button
              type="submit"
              className={classes.updateButton}
              style={{
                backgroundColor: isFormValid() ? colors?.primary : "grey",
              }}
              disabled={!isFormValid()}
            >
              {updatePasswordApiInfo?.loading ? (
                <ButtonLoader size={30} color="#ffffff" />
              ) : (
                TextTranslation.update[langIndex]
              )}
            </button>
            <button
              className={classes.cancelButton}
              onClick={() => dispatch(setSideMenuClick("overview"))}
            >
              {TextTranslation.cancel[langIndex]}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
