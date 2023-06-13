import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import {
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import { getRandomAvatar, getRandomNumber } from "../../utils/helperFunctions";
import AddIcon from "@mui/icons-material/Add";
import "./agents.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid #8B8B8B`,
  p: 0,
  "&:not(:last-child)": {
    borderBottom: `1px solid #8B8B8B`,
  },
  "&:before": {
    display: "none",
  },
}));
const useStyles = makeStyles(() => ({
  primaryText: {
    fontSize: 11,
    color: "#000000",
    marginLeft: 20,
  },
  secondaryText: {
    fontSize: 11,
    color: "#8B8B8B",
    marginLeft: 0,
  },
  detailsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
  listingCount: {
    fontSize: 33,
    color: "black",
    margin: 0,
  },
  listingCountText: {
    fontSize: 17,
    color: "#134696",
    margin: 0,
  },
  email: {
    fontSize: 10,
    color: '#000000',
    margin: 0,
  },
}));

/* TableRow is the row component in agent list, it displays individual
details, buttons and picture. It is mapped in the agent list. */
const TableRow = ({ agent, expanded, setExpanded }) => {
  const classes = useStyles();
  const randomAvatar = useMemo(() => getRandomAvatar(), []);
  const listingCount = useMemo(() => getRandomNumber(5, 100) || 2, []);
  const sales = useMemo(() => getRandomNumber(10, 1000) || 2, []);

  const handleExpand = () => {
    if (expanded === agent?.id) setExpanded(false);
    else setExpanded(agent?.id);
  };
  return (
    <Accordion
      expanded={expanded === agent?.id}
      onChange={handleExpand}
      sx={{ p: 0, boxShadow: "none" }}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<AddIcon style={{ color: "#134696" }} />}
        sx={{ p: 0, boxShadow: "none" }}
      >
        <Grid
          container
          sx={{
            pt: 1,
            pb: 1,
          }}
        >
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={agent?.full_name}
              src={agent?.photo ? `${agent?.photo}` : randomAvatar}
            />
            <p className={classes.primaryText}>{agent?.full_name}</p>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            <p className={classes.secondaryText}>
              {`${agent?.city || "city"}, ${agent?.country || "country"}`}
            </p>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className={classes.secondaryText}>{agent?.company}</p>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ boxShadow: "none", backgroundColor: "#E5E5E5" }}>
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                color: "#134696",
                border: "1px solid #707070",
                fontSize: 12,
                textTransform: "none",
                borderRadius: 50,
                width: "75%",
                mb: 0.5,
                mt: 0.5,
              }}
            >
              Add to list
            </Button>
            <Button
              sx={{
                color: "#134696",
                border: "1px solid #707070",
                fontSize: 12,
                textTransform: "none",
                borderRadius: 50,
                width: "75%",
                mb: 0.5,
                mt: 0.5,
              }}
            >
              Call Now
            </Button>
            <Button
              sx={{
                color: "#134696",
                border: "1px solid #707070",
                fontSize: 12,
                textTransform: "none",
                borderRadius: 50,
                width: "75%",
                mb: 0.5,
                mt: 0.5,
              }}
            >
              View Profile
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p className={classes.listingCount}>
              {agent?.active_listing_count || listingCount}
            </p>
            <p className={classes.listingCountText}>Total Listings</p>
            <p className={classes.email} style={{ marginTop: 15 }}>
              Email Address
            </p>
            <p className={classes.email} style={{ fontWeight: "heavy" }}>
              {agent?.email}
            </p>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p className={classes.listingCount}>
              {agent?.active_listing_count || sales}
            </p>
            <p className={classes.listingCountText}>Total Sales</p>
            <p className={classes.email} style={{ marginTop: 15 }}>
              Cell Phone
            </p>
            <p className={classes.email} style={{ fontWeight: "heavy" }}>
              {agent?.phone_number || "Not Provided"}
            </p>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default TableRow;
