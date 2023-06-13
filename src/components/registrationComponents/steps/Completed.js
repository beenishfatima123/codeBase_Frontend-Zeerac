import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const buttonSx = {
  backgroundColor: "#134696",
  color: "white",
  fontSize: 18,
  textTransform: "none",
  width: 230,
  height: 48,
  borderRadius: "5px",
  p: 0,
  mt: 3,
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#134696",
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const Completed = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="88.525"
        height="108.197"
        viewBox="0 0 88.525 108.197"
      >
        <g id="noun-completed-2350913" transform="translate(-148.398 -33.6)">
          <path
            id="Path_34453"
            data-name="Path 34453"
            d="M150.627,33.6A2.547,2.547,0,0,0,148.4,36.06v86.066a2.555,2.555,0,0,0,2.459,2.459h31.737a28.287,28.287,0,1,0,32.2-38.653v-30.2a2.49,2.49,0,0,0-.73-1.768L194.389,34.291a2.492,2.492,0,0,0-1.729-.69H150.626Zm2.69,4.918H190.2V55.731a2.555,2.555,0,0,0,2.459,2.459h17.213V85.279c-.406-.017-.819-.038-1.229-.038a28.219,28.219,0,0,0-27.588,34.426H153.316Zm41.8,3.458,11.3,11.3h-11.3Zm13.525,48.182a23.361,23.361,0,1,1-23.361,23.361,23.324,23.324,0,0,1,23.361-23.361Z"
            transform="translate(0)"
            fill="#134696"
          />
          <path
            id="Path_34454"
            data-name="Path 34454"
            d="M385.661,346.976a2.49,2.49,0,0,0-1.652.883l-13.178,15.369-5.494-4.611a2.469,2.469,0,1,0-3.15,3.8l7.378,6.148a2.555,2.555,0,0,0,3.458-.307l14.754-17.213a2.46,2.46,0,0,0-2.116-4.073Z"
            transform="translate(-165.743 -244.855)"
            fill="#0ed864"
          />
        </g>
      </svg>
      <span className={classes.text}>Registration completed</span>
      <Button
        sx={buttonSx}
        onClick={() => navigate("/login", { replace: true })}
      >
        Continue to Dashboard
      </Button>
    </div>
  );
};

export default Completed;
