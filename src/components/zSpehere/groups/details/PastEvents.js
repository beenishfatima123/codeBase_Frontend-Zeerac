import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_DETAIL_CONTENT } from "../../../../utils/constants";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { getAllPastEvents } from "../../../../redux/slices/zSphereEventSlice";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../../globalComponents/NotFound";
import useDebounceSearch from "../../../../utils/hooks/useDebounceSearch";
import { searchPastEvents } from "../../../../api/socialApi";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "5px",
    minHeight: 150,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 14,
    color: "#134696",
    fontFamily: "medium",
    marginLeft: 10,
  },
  eventContainer: {
    display: "flex",
    margin: "0 5px",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: "5px 10px",
  },
  eventInner: {
    display: "flex",
    alignItems: "center",
  },
  eventPhoto: {
    height: 75,
    width: 75,
    objectFit: "cover",
    borderRadius: "50%",
  },
  detailContainer: {
    marginLeft: 20,
    cursor: "pointer",
  },
  date: {
    color: "#0ed864",
    fontFamily: "medium",
    fontSize: 16,
  },
  name: {
    color: "#134696",
    fontFamily: "medium",
    fontSize: 16,
    textTransform: "capitalize",
  },
  location: {
    color: "#92929D",
    fontFamily: "light",
    fontSize: 14,
    maxWidth: "80%",
  },
  admin: {
    color: "#92929D",
    fontFamily: "light",
    fontSize: 16,
    marginTop: 10,
    textTransform: "capitalize",
  },

  search: {
    outline: "1px solid #D1DBE3",
    border: "1px solid #D1DBE3",
    height: 30,
    borderRadius: 20,
    paddingLeft: 10,
    width: 300,
    color: "#9DAFBD",
    fontSize: 12,
    fontFamily: "light",
  },
  "@media (max-width: 500px)": {
    eventContainer: {
      flexDirection: "column",
    },
    eventInner: {
      flexDirection: "column",
    },
    detailContainer: {
      margin: "10px 0",
    },
    eventPhoto: {
      height: 60,
      width: 60,
    },
    // btnContainer: {
    //   alignSelf: "flex-start",
    // },
    search: {
      width: 200,
    },
  },
}));

/* Past events section */
const PastEvents = ({ setSelectedContent }) => {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searched, setSearched] = useState();

  const { currentUser } = useSelector((state) => state.auth);
  const { pastEventsData } = useSelector((state) => state.zSphereEvents);
  const { selectedGroup } = useSelector((state) => state.groups);

  const { loading, searchResult } = useDebounceSearch(
    searched,
    searchPastEvents,
    { groupId: selectedGroup?.id }
  );

  // useEffect(() => {
  //   console.log({ searchPastEvents, loading, searchResult });
  // }, [searchPastEvents, loading, searchResult]);

  /* Get past events from store. */
  useEffect(() => {
    
    dispatch(
      getAllPastEvents({
        token: currentUser?.token,
        id: selectedGroup?.id,
      })
    );
    // eslint-disable-next-line
  }, [selectedGroup?.id]);

  /* Get searched events */
  const dataToShow = useMemo(() => {
    if (searched?.length > 2) {
      return searchResult?.results;
    } else {
      return pastEventsData?.results;
    }
  }, [searchResult?.results, pastEventsData?.results, searched]);

  // console.log({ dataToShow });

  return (
    <>
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className={classes.top}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <KeyboardBackspaceIcon
                  onClick={() => setSelectedContent(GROUP_DETAIL_CONTENT.POSTS)}
                  style={{ color: "#134696", cursor: "pointer" }}
                />
                <div className={classes.heading}>Past Events</div>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  className={classes.search}
                  type="text"
                  placeholder="Find Relevant Events"
                  value={searched || ""}
                  onChange={(e) => {
                    setSearched(e.target.value);
                  }}
                />
                <SearchSharpIcon
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 5,
                    color: "#9DAFBD",
                  }}
                />
              </div>
            </div>
          </Grid>
          <>
            {loading ? (
              <ComponentLoader />
            ) : dataToShow?.length > 0 ? (
              dataToShow?.map((elem, index) => (
                <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
                  <div className={classes.eventContainer}>
                    <div className={classes.eventInner}>
                      <img
                        className={classes.eventPhoto}
                        alt=""
                        src={elem?.photo}
                      />
                      <div
                        className={classes.detailContainer}
                        onClick={() =>
                          // navigate(`/zSphere/Groups/${params?.id}/${elem?.id}`)
                          navigate(
                            `/zSphere/Groups/${params?.id}/past/${elem?.id}`
                          )
                        }
                      >
                        <div className={classes.date}>
                          {moment(elem?.start).format("dddd") + ""},{" "}
                          {moment(elem?.start).format("LL") + ""}
                        </div>
                        <div className={classes.name}>{elem?.name}</div>
                        <div className={classes.location}>{elem?.location}</div>
                        <div className={classes.admin}>
                          Created By:{" "}
                          <span style={{ color: "#134696" }}>
                            {elem?.organized_by?.first_name}{" "}
                            {elem?.organized_by?.last_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))
            ) : (
              <NotFound label="No Past Events Found" />
            )}
          </>
        </Grid>
      </div>
    </>
  );
};

export default PastEvents;
