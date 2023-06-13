import React from "react";
import Edit from "../../svg/Edit";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import useColor from "../../../../../utils/hooks/useColor";
import { setShowEditInfo } from "../../../../../redux/slices/settingsSlice";
import { TextTranslation } from "../../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  labelContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: 24,
    fontFamily: "heavy",
    color: "#134696",
  },
  description: {
    fontSize: 14,
    fontFamily: "light",
    color: "#134696",
  },
  buttonContainer: {
    height: 33,
    border: "1px solid #0ED864",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    borderRadius: 5,
    cursor: "pointer",
  },
  editText: {
    fontSize: 14,
    fontFamily: "light",
    color: "#134696",
    marginLeft: 10,
  },
  "@media (max-width: 411px)": {
    label: {
      fontSize: 16,
    },
  },
}));

const OverViewHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showEditInfo } = useSelector((state) => state.settings);
  const { colors, langIndex } = useSelector((state) => state.global);
  useColor(colors);
  return (
    <div className={classes.container}>
      <div className={classes.labelContainer}>
        <div className={classes.label} style={{ color: colors?.primary }}>
          {TextTranslation.profileInformation[langIndex]}
        </div>
        <div className={classes.description} style={{ color: colors?.primary }}>
          {TextTranslation.updateAccountInformation[langIndex]}
        </div>
      </div>
      {!showEditInfo && (
        <div
          className={classes.buttonContainer}
          style={{ border: `1px solid ${colors?.primary}` }}
          onClick={() => dispatch(setShowEditInfo(true))}
        >
          <Edit color={colors?.primary} />
          <span className={classes.editText} style={{ color: colors?.primary }}>
            {TextTranslation.edit[langIndex]}
          </span>
        </div>
      )}
    </div>
  );
};

export default OverViewHeader;
