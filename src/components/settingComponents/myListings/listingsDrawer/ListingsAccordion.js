import React, { useMemo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useSelector } from "react-redux";
import { LISTINGS_DRAWER_OPTIONS } from "../../../../utils/constants";
import Overview from "./svgs/Overview";
import Customer from "./svgs/Customer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ReceiptIcon from "@mui/icons-material/Receipt";
const ListingsAccordion = ({ elem }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { colors, darkMode, langIndex } = useSelector((state) => state.global);
  const { listingCategories } = useSelector((state) => state.settings);
  //console.log({ listingCategories, elem });

  const path = useMemo(
    () => pathname?.split("/")?.filter((elem) => elem !== ""),
    [pathname]
  );
  const accordionTitleColor = useMemo(() => {
    if (path[2] === elem?.label[langIndex]?.replaceAll(" ", "_")?.toLowerCase())
      return darkMode ? "#0ed864" : "#134696";
    else return darkMode ? colors?.white : colors?.black;
    // eslint-disable-next-line
  }, [darkMode, colors, path, elem, langIndex]);

  const renderIcon = useMemo(() => {
    switch (elem?.label[0]) {
      case LISTINGS_DRAWER_OPTIONS[0]?.label[0]:
        return <Overview fill={accordionTitleColor} />;
      case LISTINGS_DRAWER_OPTIONS[1]?.label[0]:
        return <ApartmentIcon fill={accordionTitleColor} />;
      case LISTINGS_DRAWER_OPTIONS[2]?.label[0]:
        return <ReceiptIcon fill={accordionTitleColor} />;
      case LISTINGS_DRAWER_OPTIONS[3]?.label[0]:
        return <Customer fill={accordionTitleColor} />;

      default:
        return <ApartmentIcon fill={accordionTitleColor} />;
    }
    // eslint-disable-next-line
  }, [path, elem, darkMode, accordionTitleColor]);

  const handleClick = (subCategory) => {
    // console.log({ subCategory });
    if (!subCategory) {
      navigate(
        `/settings/my_listings/${elem?.label[0]
          ?.toLowerCase()
          ?.replaceAll(" ", "_")}/${elem?.subCategories[0][0]
          ?.toLowerCase()
          ?.replaceAll(" ", "_")}`
      );
    } else {
      navigate(
        `/settings/my_listings/${elem?.label[0]
          ?.toLowerCase()
          ?.replaceAll(" ", "_")}/${subCategory[0]
          ?.toLowerCase()
          ?.replaceAll(" ", "_")}`
      );
    }
  };

  return (
    <Accordion
      sx={{
        width: "100%",
        padding: 0,
        margin: 0,
        boxShadow: "none",
        borderBottom: "none",
        backgroundColor: darkMode ? colors?.jetBlack : colors?.white,
      }}
      defaultExpanded
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          borderBottom: "1px solid lightGray",
          color: accordionTitleColor,
          fontFamily: "medium",
          fontWeight:
            listingCategories?.label[langIndex] === elem?.label[langIndex]
              ? "bold"
              : 400,
          fontSize: 16,
        }}
        onClick={() => handleClick(false)}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          {renderIcon}
          <span
            style={{
              marginLeft: 8,
              marginTop: 2,
              textTransform: "capitalize",
            }}
          >
            {elem?.label[langIndex]}
          </span>
        </div>
      </AccordionSummary>
      {elem?.subCategories && (
        <AccordionDetails>
          {elem?.subCategories?.map((subElem, subIndex) => (
            <p
              onClick={() => handleClick(subElem)}
              style={{
                margin: "5px 20px",
                color:
                  path[3] ===
                  subElem[langIndex]?.replaceAll(" ", "_")?.toLowerCase()
                    ? darkMode
                      ? "#0ed864"
                      : "#134696"
                    : "lightGray",
                fontFamily:
                  path[3] ===
                  subElem[langIndex]?.replaceAll(" ", "_")?.toLowerCase()
                    ? "heavy"
                    : "light",
                cursor: "pointer",
                textTransform: "capitalize",
                fontSize: 16,
              }}
              key={subIndex}
            >
              {subElem[langIndex]}
            </p>
          ))}
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default ListingsAccordion;
