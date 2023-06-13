import { Button } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../../utils/translation";
import { useWindowDims } from "../../../../utils/useWindowDims";

const ViewAllButton = () => {
  const { width } = useWindowDims();
  const { langIndex } = useSelector((state) => state.global);
  const sm = useMemo(() => Boolean(width < 900), [width]);

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#134696",
        zIndex: 2,
        position: "absolute",
        right: -25,
        top: sm ? "35%" : 0,
        bottom: sm ? "35%" : 0,
        borderTopRightRadius: sm ? 10 : 20,
        borderBottomRightRadius: sm ? 10 : 20,
        width: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: sm ? "3px" : "5px",
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="50"
        viewBox="0 0 19 50"
      >
        <text
          id="View_All"
          data-name="View All"
          transform="translate(15 50) rotate(-90)"
          fill="#fff"
          fontSize={width > 900 ? "13" : "12"}
          fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
        >
          <tspan x="0" y="0">
            {TextTranslation.viewAll[langIndex]}
          </tspan>
        </text>
      </svg>
    </Button>
  );
};

export default ViewAllButton;
