import { Button, Grid, Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useMemo, useState } from "react";
import verifiedBadge from "../../assets/verifiedBadge.png";
import { getRandomNumber, getRandomRating } from "../../utils/helperFunctions";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapModal from "../globalComponents/misc/MapModal";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#134696",
  },
  "& .MuiRating-iconEmpty": {
    color: "white",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 20,
  },
  ratingsContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  name: {
    color: "white",
    fontSize: 19,
    margin: 0,
  },
  ratingText: {
    fontSize: 11,
    color: "#7D7D7D",
    margin: 0,
  },
  listingCount: {
    fontSize: 68,
    color: "white",
    margin: 0,
  },
  listingCountText: {
    fontSize: 22,
    color: "white",
    margin: 0,
  },
  email: {
    fontSize: 15,
    color: "white",
    margin: 0,
  },
}));
const AgentCardInfo = ({ agent }) => {
  const classes = useStyles();
  const [openMap, setOpenMap] = useState(false);

  const rating = useMemo(() => getRandomRating() || 2, []);
  const listingCount = useMemo(() => getRandomNumber(5, 100) || 2, []);
  const excellentRatings = useMemo(() => getRandomRating(5, 1000) || 2, []);

  return (
    <div className={classes.container}>
      <MapModal open={openMap} setOpen={setOpenMap} />
      <Grid container sx={{ pt: 3, pl: 2, pr: 2, pb: 3 }}>
        <Grid item xs={10} md={10}>
          <p className={classes.name}>{agent?.full_name}</p>
          <div className={classes.ratingsContainer}>
            <StyledRating
              name="agents-rating"
              value={rating}
              readOnly
              sx={{ mr: 1 }}
              size="small"
            />
            <p className={classes.ratingText}>{rating} stars</p>
          </div>
          <p className={classes.ratingText} style={{ marginTop: 10 }}>
            {`${agent?.address || "street"}, ${agent?.city || "city"}, ${
              agent?.country || "country"
            }`}
          </p>
          <Button
            startIcon={<LocationOnIcon />}
            sx={{ color: "white", fontSize: 9, p: 0, mt: 1 }}
            onClick={() => setOpenMap(true)}
          >
            View on map
          </Button>
          <p className={classes.listingCount}>
            {agent?.active_listing_count || listingCount}
          </p>
          <p className={classes.listingCountText}>Total Listings</p>
          {/* <p className={classes.ratingText}>
            Excellent 5.0 - {excellentRatings} reviews
          </p> */}
          <p className={classes.email}>Email Address</p>
          <p className={classes.email} style={{ fontWeight: "heavy" }}>
            {agent?.email}
          </p>
        </Grid>
        <Grid item xs={2} md={2}>
          <img src={verifiedBadge} alt="" className={classes.badge} />
        </Grid>
      </Grid>
    </div>
  );
};

export default AgentCardInfo;
