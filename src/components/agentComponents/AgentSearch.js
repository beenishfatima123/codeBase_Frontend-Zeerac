import { makeStyles } from "@mui/styles";
import React, { useEffect, useMemo, useState } from "react";
import swivelWhite from "../../assets/swivelWhite.png";
import { useWindowDims } from "../../utils/useWindowDims";
import SearchIcon from "@mui/icons-material/Search";
import "./agents.css";
import TableHeader from "./TableHeader";
import { AGENTS_TABLE_COLUMNS } from "../../utils/constants";
import TableRow from "./TableRow";
import ComponentLoader from "../globalComponents/ComponentLoader";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../../redux/slices/agentsSlice";
import {
  handleScrollPagination,
  updatePaginatedData,
} from "../../utils/paginationHelpers";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#134696",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  titleContainer: {
    margin: 20,
  },
  title: {
    fontSize: 46,
    color: "white",
    margin: 0,
  },
  tagline: {
    fontSize: 13,
    margin: 0,
    color: "white",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "5% 15%",
    overflow: "hidden",
    backgroundSize: "cover",
  },
  resultInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0px",
  },
  searchArea: {
    fontSize: 36,
    color: "#134696",
    margin: 0,
  },
  searchResult: {
    fontSize: 17,
    color: "#134696",
    margin: 0,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px 20px",
    borderRadius: 30,
    border: "1px solid black",
    height: 30,
    width: "50%",
    maxWidth: 400,
  },
  input: {
    display: "flex",
    flex: 1,
    border: "none",
    fontSize: 14,
    background: "none",
    color: "white",
    "&:focus": {
      outline: "none",
    },
    "&:placeholder": {
      color: "white",
    },
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
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
  "@media (max-width: 500px)": {
    title: {
      fontSize: 26,
    },
    searchContainer: {
      width: "80%",
    },

    body: {
      alignItems: "center",
      padding: "5% 2%",
    },
  },
}));
const AgentSearch = ({
  agents,
  searchQuery,
  setSearchQuery,
  paginationType,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { height, width } = useWindowDims();
  const [expanded, setExpanded] = useState(false);
  const [agentsToShow, setAgentsToShow] = useState([]);

  /* data from search agents API is stored in searchAgentsApiInfo. */
  const searchAgentsApiInfo = useSelector(
    (state) => state.agents.searchAgentsApiInfo
  );
  const paginationApi = useSelector((state) => state.agents.paginationApi);
  const paginationUrl = useMemo(
    () => agents?.result?.next?.replace("http", "https"),
    [agents]
  );
  const currentUser = useSelector((state) => state.auth.currentUser);

  /* This useEffect updates paginated data based on agents variable. */
  useEffect(() => {
    // // console.log({ allPublicPosts });
    updatePaginatedData(agents, setAgentsToShow, paginationUrl);

    // eslint-disable-next-line
  }, [agents]);

  /* getPaginatedAgents dispatches url, token and pagination type using
  paginate reducer. */
  const getPaginatedAgents = async () => {
    dispatch(
      paginate({
        url: paginationUrl,
        token: currentUser?.token,
        destination: paginationType,
      })
    );
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img
          src={swivelWhite}
          alt=""
          className={classes.swivel}
          style={{ height: height * 0.2 || 218, width: width * 0.1 || 150 }}
        />
        <div className={classes.titleContainer}>
          <p className={classes.title}>Search Our Agents</p>
          <p className={classes.tagline}>
            CHECK OUT OUR BEST & FULLY TRAINED AGENTS
          </p>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.searchContainer}>
          <input
            type="text"
            className="agent-input"
            placeholder={'Search by Areas, Cities, Country'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
          <SearchIcon />
        </div>
        <div className={classes.resultInfo}>
          <p className={classes.searchArea}>
            {searchQuery || "Search for a specific agent"}
          </p>
          <p className={classes.searchResult}>
            {agents?.result?.count || 0} Agents found
          </p>
        </div>
        <TableHeader columns={AGENTS_TABLE_COLUMNS} xs={4} />
        {searchAgentsApiInfo?.loading ? (
          <ComponentLoader />
        ) : (
          <div
            className={classes.tableContainer}
            onScroll={(event) =>
              handleScrollPagination(
                event,
                paginationApi?.loading,
                getPaginatedAgents
              )
            }
            style={{
              maxHeight:
                height > 900
                  ? height * 0.4
                  : height > 626
                  ? height * 0.35
                  : height * 0.28 || 400,
            }}
          >
            {agentsToShow?.map((agent, index) => (
              <TableRow
                agent={agent}
                key={index}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            ))}
            {paginationApi?.loading && <ComponentLoader />}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentSearch;
