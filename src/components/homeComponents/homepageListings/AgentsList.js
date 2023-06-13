import React from "react";
import { makeStyles } from "@mui/styles";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { useMemo } from "react";
import { useEffect } from "react";
import { AGENTS_TABLE_COLUMNS } from "../../../utils/constants";
import AgentsSearchbar from "../../agentComponents/AgentsSearchbar";
import CustomTableContainer from "../../globalComponents/Table/CustomTableContainer";
import AgentTableRows from "../../agentComponents/AgentTableRows";
import {
  getAllAgents,
  paginate,
  queryAgents,
} from "../../../redux/slices/agentsSlice";
import { useNavigate } from "react-router-dom";
import { useWindowDims } from "../../../utils/useWindowDims";
import MobileTable from "../../globalComponents/Table/MobileTable";
import { Avatar } from "@mui/material";
import Pagination from "../../globalComponents/Pagination";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const AgentsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDims();

  const [searchQuery, setSearchQuery] = useState("");
  const [iconActions, setIconActions] = useState();

  const { allAgents, searchedAgents, allAgentsApiInfo, searchAgentsApiInfo } =
    useSelector((state) => state.agents);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const agentsToShow = useMemo(() => {
    if (searchQuery?.length >= 3 && searchedAgents) {
      return searchedAgents;
    } else {
      return allAgents;
    }
    // eslint-disable-next-line
  }, [searchQuery, searchedAgents, allAgents]);

  const delayedAgentSearch = useMemo(
    () => debounce((query) => searchAgents(query), 500),
    // eslint-disable-next-line
    []
  );
  useEffect(() => {
    // // console.log({ allAgents });
    if (!allAgents) {
      // // console.log('sending request');
      dispatch(getAllAgents());
    }
    // eslint-disable-next-line
  }, [allAgents]);
  useEffect(() => {
    if (searchQuery?.length >= 3) delayedAgentSearch(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]);

  const searchAgents = async (query) => {
    dispatch(
      queryAgents({
        query,
        token: currentUser?.token,
      })
    );
  };
  const handleRowClick = (rowData) => {
    // // console.log({ rowData });
    navigate(`/agents/${rowData?.id}`);
  };

  const paginateAgents = (url) => {
    dispatch(
      paginate({
        url,
      })
    );
  };
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
    <div className={classes.container}>
      {allAgentsApiInfo?.loading || searchAgentsApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          <AgentsSearchbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {width < 600 ? (
            <div
              style={{
                height: 700,
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {agentsToShow?.results?.map((item, index) => (
                <MobileTable
                  key={index}
                  profilePic={
                    <Avatar
                      alt={item?.full_name}
                      src={`${item?.photo}`}
                      style={{ height: 70, width: 70 }}
                    />
                  }
                  full_name={item?.full_name}
                  city={item?.city || "city"}
                  country={item?.country || "country"}
                  company={item?.company}
                  total_listings={item?.total_listings}
                  value={item?.total_listings > 1 ? "Files" : "File"}
                  phone_number={item?.phone_number}
                  item={item}
                  iconActions={iconActions}
                  setIconActions={setIconActions}
                />
              ))}
            </div>
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
      {agentsToShow?.results?.length > 0 && (
        <Pagination
          data={agentsToShow}
          page={handlePageSelect}
          paginate={paginateAgents}
        />
      )}
    </div>
  );
};

export default AgentsList;
