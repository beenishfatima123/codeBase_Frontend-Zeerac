import Carousel from "nuka-carousel";
import { Button } from "@mui/material";
import SliderCard from "./SliderCard";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../globalComponents/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { useWindowDims } from "../../../utils/useWindowDims";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getOtherAuctions } from "../../../redux/slices/auctionSlice";
import React, { useMemo, useEffect } from "react";
import "./OtherAuctions.css";
import { TextTranslation } from "../../../utils/translation";
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../../utils/helperFunctions";
import { HEADER_CONTENT_WIDTH } from "../../../utils/constants";
import moment from "moment";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "90%",
    width: HEADER_CONTENT_WIDTH,
    margin: "auto",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // minHeight: 100,
    position: "relative",
    marginTop: 50,
  },
  heading: {
    marginLeft: "5%",
    fontFamily: "heavy",
    fontSize: 26,
    color: "#134696",
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "25px 5%",
  },
  image: {
    width: 300,
    height: 195,
    objectFit: "scale-down",
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
    },
  },
}));
const OtherAuctions = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDims();
  const params = useParams();

  const { langIndex } = useSelector((state) => state.global);
  const { otherAuctions } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(
      getOtherAuctions({
        id: params?.id,
      })
    );
    // eslint-disable-next-line
  }, [params?.id]);

  const getDifferenceFromNow = (endDate) => {
    const current_date = moment();
    const end_date = moment(endDate);
    const yearDif = end_date.diff(current_date, "years");
    const monthDif = end_date.diff(current_date, "months") % 12;
    const dayDiff = end_date.diff(current_date, "days") % 30;

    let diff = "";

    if (yearDif) diff = diff + yearDif + " years,";
    if (monthDif) diff = diff + monthDif + " months and,";

    diff = diff + dayDiff + " days";

    return diff;
  };

  const slidesToShow = useMemo(() => {
    if (otherAuctions?.results?.length > 0) {
      if (width > 1680)
        return otherAuctions?.results?.length > 5
          ? 5
          : otherAuctions?.results?.length - 1;
      else if (width < 1680 && width > 1200)
        return otherAuctions?.results?.length > 4
          ? 3
          : otherAuctions?.results?.length - 1;
      else if (width < 1200 && width > 950)
        return otherAuctions?.results?.length > 3
          ? 3
          : otherAuctions?.results?.length - 1;
      else if (width < 950 && width > 600)
        return otherAuctions?.results?.length > 2
          ? 2
          : otherAuctions?.results?.length - 1;
      else return 1;
    } else return 1;
  }, [otherAuctions?.results, width]);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <div className={classes.heading}>
          {TextTranslation.browseOtherAuctions[langIndex]}
        </div>
        <Button
          sx={{
            background:
              "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
            textTransform: "none",
            color: "#134696",
            width: 180,
            position: "absolute",
            right: "5%",
            borderRadius: 0,
          }}
          endIcon={<ArrowForwardIcon style={{ color: "#134696" }} />}
          onClick={() => navigate("/auctions")}
        >
          {TextTranslation.viewAll[langIndex]}
        </Button>
      </div>
      {otherAuctions?.results?.length > 0 ? (
        <div className={classes.sliderContainer}>
          <Carousel
            slidesToShow={slidesToShow}
            cellSpacing={0}
            cellAlign="center"
            wrapAround={true}
            renderCenterLeftControls={null}
            renderCenterRightControls={null}
          >
            {otherAuctions?.results?.map((elem, index) => (
              <div key={index}>
                <SliderCard
                  photo={elem?.photos[0]?.file_photo}
                  price={getConcatenatedPrice(
                    `${currencyFormatInitials(elem?.price, elem?.currency)}`,
                    14
                  )}
                  city={elem?.city}
                  // endDate={elem?.end_date}
                  endDate={getDifferenceFromNow(elem?.end_date)}
                  area={parseInt(elem?.size)}
                  size={elem?.unit === "Square Feet" ? "Sq ft" : elem?.unit}
                  listingBy={elem?.user_fk?.full_name}
                  detailButtonClick={() => {
                    navigate(`/auction/${elem?.id}`);
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <NotFound label={TextTranslation.noAuctionFound[langIndex]} />
      )}
    </div>
  );
};

export default OtherAuctions;
