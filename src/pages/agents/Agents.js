import { makeStyles } from "@mui/styles";
import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";

import { useWindowDims } from "../../utils/useWindowDims";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAgents,
  getFeaturedAgents,
  paginate,
  queryAgents,
} from "../../redux/slices/agentsSlice";
import { debounce } from "lodash";
import {
  AGENTS_TABLE_COLUMNS,
  HEADER_CONTENT_WIDTH,
} from "../../utils/constants";
import AgentsTop from "../../components/agentComponents/AgentsTop";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AgentsSearchbar from "../../components/agentComponents/AgentsSearchbar";

import { Avatar } from "@mui/material";
import "./agentsStyles.css";

import AgentFilter from "../../components/agentComponents/AgentFilter";
import { buildAgentsSearchQuery } from "../../utils/helperFunctions";

import FeaturedSlider from "../../components/agentComponents/FeaturedSlider";
import AgentsTableSkeleton from "../../components/loadingSkeletons/AgentsTableSkeleton";
import { TextTranslation } from "../../utils/translation";
import Pagination from "../../components/globalComponents/Pagination";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";

const MapModal = lazy(() =>
  import("../../components/globalComponents/misc/MapModal")
);
const CustomTableContainer = lazy(() =>
  import("../../components/globalComponents/Table/CustomTableContainer")
);
const AgentTableRows = lazy(() =>
  import("../../components/agentComponents/AgentTableRows")
);
const NotFound = lazy(() =>
  import("../../components/globalComponents/NotFound")
);
const AgentMobileTable = lazy(() =>
  import("../../components/globalComponents/Table/AgentMobileTable")
);

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  showcaseContainer: {
    display: "flex",
    width: "45%",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "30px auto",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
  },
  title: {
    color: "#134696",
    fontSize: 25,
    fontFamily: "heavy",
  },
  divider: {
    display: "flex",
    flex: 1,
    height: 2,
    backgroundColor: "#0ED864",
    margin: "0px 5px",
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    color: "white",
  },
}));

/* Agents is the main component on agents page, it displays
featured agents, search bar, filters, agents table and agents pagination. */
const Agents = () => {
  const classes = useStyles();
  const { height, width } = useWindowDims();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const [hovering, setHovering] = useState(false);
  const [iconActions, setIconActions] = useState();

  const {
    allAgents,
    searchedAgents,
    allAgentsApiInfo,
    searchAgentsApiInfo,
    featuredAgents,
    featuredAgentsApiInfo,
  } = useSelector((state) => state.agents);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const [openMap, setOpenMap] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  /* delayedAgentSearch uses debounce to allow agents to load easily while we
  typing in the search bar. */
  const delayedAgentSearch = useMemo(
    () => debounce((query) => searchAgents(query), 500),
    // eslint-disable-next-line
    []
  );

  /* agentsToShow stores which agents are to be diplayed on the agents
  page based on search query. */
  const agentsToShow = useMemo(() => {
    if (searchQuery?.searchText?.length >= 3 && searchedAgents) {
      return searchedAgents;
    } else if (searchQuery?.area && searchedAgents) {
      return searchedAgents;
    } else if (searchQuery?.city && searchedAgents) {
      return searchedAgents;
    } else {
      return allAgents;
    }
    // eslint-disable-next-line
  }, [searchQuery, searchedAgents, allAgents]);

  /* when searchQuery text changes, delayedAgentSearch is called on
  new query. */
  useEffect(() => {
    if (searchQuery?.searchText?.length >= 3)
      delayedAgentSearch(buildAgentsSearchQuery(searchQuery));

    // eslint-disable-next-line
  }, [searchQuery?.searchText]);

  /* if agents are not get, call getAllAgents again. */
  useEffect(() => {
    if (!allAgents) {
      dispatch(getAllAgents());
    }
    // eslint-disable-next-line
  }, [allAgents]);

  /* if featured agents are not get, dispatch getFeaturedAgents again. */
  useEffect(() => {
    if (!featuredAgents) {
      dispatch(getFeaturedAgents());
    }
    // eslint-disable-next-line
  }, [featuredAgents]);

  /* searchAgents will dispatch agents query by taking query in parameters. */
  const searchAgents = async (query) => {
    dispatch(
      queryAgents({
        query,
        token: currentUser?.token,
      })
    );
  };

  /* handleRowClick takes rowData and it navigates to that agents page if
  that agent's row is clicked from the list. */
  const handleRowClick = (rowData) => {
    navigate(`/agents/${rowData?.id}`);
  };

  /* paginateAgents takes url and dispatches to move around pages.  */
  const paginateAgents = (url) => {
    dispatch(
      paginate({
        url,
      })
    );
  };

  /* handlePageSelect takes pageNumber as parameter,  and generates new
  link from this number to navigagte these.  */
  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (agentsToShow?.next) pageSplit = agentsToShow?.next?.split("page=");
    else pageSplit = agentsToShow?.previous?.split("page=");
    if (pageSplit?.length > 2) {
      newLink = `${pageSplit[0]}page=${pageNumber}${pageSplit[1]?.substring(
        pageSplit[1]?.indexOf("&"),
        pageSplit[1]?.length
      )}`;
    } else if (pageSplit[0].includes("?")) {
      newLink = `${pageSplit[0]}page=${pageNumber}`;
    } else {
      newLink = `${pageSplit[0]}?page=${pageNumber}`;
    }
    paginateAgents(newLink.replace("http", "https"));
  };

  return (
    <div
      className={classes.container}
      style={{
        minHeight: height - 64 || 500,
      }}
    >
      {openMap && (
        <MapModal
          open={openMap}
          setOpen={setOpenMap}
          position={{
            lat: selectedAgent?.lat || 31.5204,
            lng: selectedAgent?.lng || 74.3587,
          }}
        />
      )}

      <AgentsTop />
      <div className={classes.titleContainer}>
        <span
          className={classes.title}
          style={{
            color: darkMode ? "#0ED864" : "#134696",
          }}
        >
          {TextTranslation.featuredAgents[langIndex]}
        </span>
        <div
          className={classes.divider}
          style={{
            backgroundColor: darkMode ? "#fff" : "#0ED864",
          }}
        />
        {currentUser?.user_type !== 2 && (
          <div
            className={classes.addBtn}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
              padding: hovering ? "15px 20px" : 10,
            }}
            onClick={() => navigate("/signup")}
          >
            {hovering ? (
              <span
                style={{
                  fontFamily: "medium",
                  fontSize: 14,
                }}
              >
                BE AN AGENT
              </span>
            ) : (
              <AddIcon style={{ color: "white" }} />
            )}
          </div>
        )}
      </div>

      <div
        style={{
          width: HEADER_CONTENT_WIDTH,
          maxWidth: "90%",
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {featuredAgents?.results?.length > 0 &&
          (featuredAgentsApiInfo?.loading ? (
            <ComponentLoader />
          ) : (
            <FeaturedSlider
              featuredAgents={featuredAgents?.results}
              setOpenMap={setOpenMap}
              setSelectedAgent={setSelectedAgent}
            />
          ))}
        <div
          style={{
            width: HEADER_CONTENT_WIDTH,
            maxWidth: "90%",
            display: "flex",
            alignSelf: "center",
          }}
        >
          <AgentsSearchbar
            searchQuery={searchQuery?.searchText || ""}
            setSearchQuery={(val) =>
              setSearchQuery((prev) => ({ ...prev, searchText: val }))
            }
          />
        </div>
        <AgentFilter
          searchAgents={searchAgents}
          location={searchQuery}
          setLocation={setSearchQuery}
        />
        <Suspense fallback={<AgentsTableSkeleton />}>
          {agentsToShow?.results?.length === 0 ? (
            <NotFound label={"No Agents found"} />
          ) : (
            <>
              {allAgentsApiInfo?.loading ? (
                <AgentsTableSkeleton />
              ) : (
                <>
                  <div style={{ marginTop: 20 }}></div>
                  {width < 600 ? (
                    <div
                      style={{
                        height: 700,
                        overflowY: "scroll",
                        overflowX: "hidden",
                      }}
                    >
                      {agentsToShow?.results?.map((item, index) => (
                        <AgentMobileTable
                          key={index}
                          onClick={() => {
                            navigate(`/agents/${item?.id}`);
                          }}
                          profilePic={
                            <Avatar
                              alt={item?.full_name}
                              src={` ${item?.photo}`}
                              style={{
                                height: 70,
                                width: 70,
                                backgroundColor: "gray",
                              }}
                            />
                          }
                          full_name={item?.full_name}
                          city={item?.city || "city"}
                          country={item?.country || "country"}
                          company={item?.company || "Private Agent"}
                          total_listings={item?.total_listings}
                          value={item?.total_listings > 1 ? "Files" : "File"}
                          phone_number={item?.phone_number}
                          item={item}
                          iconActions={iconActions}
                          setIconActions={setIconActions}
                        />
                      ))}
                    </div>
                  ) : searchAgentsApiInfo?.loading ? (
                    <AgentsTableSkeleton />
                  ) : (
                    <CustomTableContainer
                      columns={AGENTS_TABLE_COLUMNS}
                      rows={
                        <>
                          {agentsToShow?.results?.map((elem, index) => (
                            <AgentTableRows
                              key={index}
                              agent={elem}
                              handleRowClick={handleRowClick}
                            />
                          ))}
                        </>
                      }
                    />
                  )}
                </>
              )}
            </>
          )}
          {agentsToShow?.results?.length > 0 && (
            <Pagination
              data={agentsToShow}
              page={handlePageSelect}
              paginate={paginateAgents}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Agents;
