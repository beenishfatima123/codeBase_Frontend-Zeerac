import React, { Suspense, lazy, useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import ComponentLoader from "../../../components/globalComponents/ComponentLoader";

import { getSavedAgents, paginate } from "../../../redux/slices/agentsSlice";
import { useWindowDims } from "../../../utils/useWindowDims";
import { AGENTS_TABLE_COLUMNS } from "../../../utils/constants";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from "../../globalComponents/Pagination";

const NotFound = lazy(() => import("../../globalComponents/NotFound"));
const MobileTable = lazy(() =>
  import("../../globalComponents/Table/MobileTable")
);
const CustomTableContainer = lazy(() =>
  import("../../globalComponents/Table/CustomTableContainer")
);
const AgentTableRows = lazy(() =>
  import("../../agentComponents/AgentTableRows")
);
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    color: "#134696",
    fontSize: 32,
    fontFamily: "heavy",
  },
  slider: {
    margin: "20px 5%",
  },
}));

/* Display agents saved by user in form of a list. */
const SavedAgents = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDims();

  const [iconActions, setIconActions] = useState();

  const { allAgentsApiInfo, savedAgents } = useSelector(
    (state) => state.agents
  );
  const { darkMode } = useSelector((state) => state.global);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    // // console.log({ savedAgents,currentUser });
    // // console.log("sending request");
    dispatch(getSavedAgents({ id: currentUser?.id }));
    // eslint-disable-next-line
  }, [currentUser]);

  /* handleRowClick takes rowData as parameter and navigates to that agent page. */
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
    if (savedAgents?.next) pageSplit = savedAgents?.next?.split("page=");
    else pageSplit = savedAgents?.previous?.split("page=");
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
      style={{ backgroundColor: darkMode ? "#212124" : "" }}
    >
      <Suspense fallback={<ComponentLoader />}>
        {savedAgents?.results?.length === 0 ? (
          <NotFound />
        ) : (
          <>
            {" "}
            {allAgentsApiInfo?.loading ? (
              <ComponentLoader />
            ) : (
              <>
                {width < 600 ? (
                  <div
                    style={{
                      height: 700,
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {savedAgents?.results?.map((item, index) => (
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
                ) : (
                  <CustomTableContainer
                    customStyle={{
                      maxWidth: "100%",
                      width: "100%",
                    }}
                    columns={AGENTS_TABLE_COLUMNS}
                    rows={
                      <>
                        {savedAgents?.results?.map((elem, index) => (
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
      </Suspense>
      {savedAgents?.results?.length > 10 && (
        <Pagination
          data={savedAgents}
          page={handlePageSelect}
          paginate={paginateAgents}
        />
      )}
    </div>
  );
};

export default SavedAgents;
