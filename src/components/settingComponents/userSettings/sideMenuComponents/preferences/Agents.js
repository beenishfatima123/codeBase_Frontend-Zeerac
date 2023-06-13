import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextTranslation } from "../../../../../utils/translation";
import TopHeader from "./TopHeader";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import CustomTooltip from "../../../../globalComponents/CustomTooltip";
import { Avatar } from "@mui/material";
import {
  getAllAgents,
  paginate,
} from "../../../../../redux/slices/agentsSlice";
import { toast } from "react-toastify";
import PreferenceTableSkeleton from "../../../../loadingSkeletons/PreferenceTableSkeletion";
import ButtonLoader from "../../../../globalComponents/ButtonLoader";
import {
  resetPreferenceCreationApiInfo,
  resetUpdatePreferenceApiInfo,
  updateUserPreferences,
  userPreferences,
} from "../../../../../redux/slices/preferenceSlice";
import Pagination from "../../../../globalComponents/Pagination";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "95%",
  },
  data: {
    fontSize: 17,
    fontFamily: "light",
    color: "#8b8b8b",
  },
  description: {
    fontSize: 17,
    fontFamily: "light",
    color: "#8b8b8b",
    overflow: "hidden",
    textAlign: "center",
    height: 28,
  },
  button: {
    border: "none",
    height: 40,
    backgroundColor: "#134696",
    color: "#fff",
    fontFamily: "medium",
    fontSize: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    cursor: "pointer",
  },
}));

const cols = ["Name", "Location", "Agency Association", "Listings", ""];

const Agents = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { langIndex, darkMode } = useSelector((state) => state.global);
  const { allAgents, allAgentsApiInfo } = useSelector((state) => state.agents);
  const {
    getPreferenceData,
    userPreferenceDataApiInfo,
    updateUserPreferenceDataApiInfo,
  } = useSelector((state) => state.preference);

  let _agents = getPreferenceData?.agents || [];

  useEffect(() => {
    dispatch(getAllAgents());
    // eslint-disable-next-line
  }, []);

  const handleChange = (id) => {
    const index = _agents.indexOf(id);
    if (index !== -1) {
      _agents = _agents.filter((agent) => agent !== id);
    } else {
      _agents = [..._agents, id];
    }
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("agents", JSON.stringify(_agents));

    if (getPreferenceData?.user === null) {
      dispatch(
        userPreferences({
          token: currentUser?.token,
          formData,
        })
      );
    } else {
      dispatch(
        updateUserPreferences({
          token: currentUser?.token,
          id: getPreferenceData?.id,
          formData,
        })
      );
    }
  };
  useEffect(() => {
    if (userPreferenceDataApiInfo?.response) {
      toast.success("Preference added successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetPreferenceCreationApiInfo());
    }
    // eslint-disable-next-line
  }, [userPreferenceDataApiInfo?.response]);
  useEffect(() => {
    if (userPreferenceDataApiInfo?.error) {
      toast.success("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetPreferenceCreationApiInfo());
    }
    // eslint-disable-next-line
  }, [userPreferenceDataApiInfo?.error]);
  useEffect(() => {
    if (updateUserPreferenceDataApiInfo?.response) {
      toast.success("Preference updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetUpdatePreferenceApiInfo());
    }
    // eslint-disable-next-line
  }, [updateUserPreferenceDataApiInfo?.response]);

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
    if (allAgents?.next) pageSplit = allAgents?.next?.split("page=");
    else pageSplit = allAgents?.previous?.split("page=");
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
    <>
      <TopHeader
        heading={TextTranslation.agentPreferences[langIndex]}
        resetFilters={TextTranslation.resetAllFilters[langIndex]}
        subHeading={TextTranslation.checkAgentPreference[langIndex]}
        update
      >
        <button className={classes.button} onClick={handleSubmit}>
          {userPreferenceDataApiInfo?.loading ? (
            <ButtonLoader color={"#fff"} size={16} />
          ) : (
            "Save"
          )}
        </button>
      </TopHeader>
      {allAgentsApiInfo?.loading ? (
        <PreferenceTableSkeleton />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            borderLeft: "1.5px solid #c9c9c9",
            borderRight: "1.5px solid #c9c9c9",
            borderBottom: "1.5px solid #c9c9c9",
            maxWidth: "98%",
            backgroundColor: darkMode ? "#303134" : "",
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              height: "0.2em",
            },
            "&::-webkit-scrollbar-track": {
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              borderRadius: "5px",
            },
            scrollBehavior: "smooth !important",
          }}
        >
          <Table aria-label="simple table">
            <TableHead
              sx={{
                borderTop: "2px solid #707070",
                borderBottom: "2px solid #707070",
              }}
            >
              <TableRow>
                {cols?.map((item, index) => (
                  <TableCell
                    key={index}
                    align={index === 0 ? "left" : "center"}
                    sx={{
                      color: darkMode ? "#0ed864" : "#134696",
                      fontSize: 17,
                      fontFamily: "medium",
                      width: 200,
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {allAgents?.results?.map((agent, index) => {
                const _preference = getPreferenceData?.agents?.find(
                  (elem) => elem === agent?.id
                );
                return (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "1px solid #8b8b8b" }}
                  >
                    <TableCell align="center">
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt={"user"}
                          src={` ${agent?.photo}`}
                          style={{ height: 50, width: 50, marginRight: 10 }}
                        />
                        <CustomTooltip title={agent?.full_name}>
                          <span
                            className={classes.data}
                            style={{
                              color: darkMode ? "#fff" : "#000",
                              height: 28,
                              overflow: "hidden",
                            }}
                          >
                            {agent?.full_name}
                          </span>
                        </CustomTooltip>
                      </span>
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: 200 }}>
                      <CustomTooltip title={agent?.address}>
                        <div className={classes.description}>
                          {agent?.address}
                        </div>
                      </CustomTooltip>
                    </TableCell>
                    <TableCell align="center">
                      <CustomTooltip title={agent?.company}>
                        <div
                          className={classes.data}
                          style={{
                            height: 28,
                            overflow: "hidden",
                          }}
                        >
                          {agent?.company || "NA"}
                        </div>
                      </CustomTooltip>
                    </TableCell>

                    <TableCell align="center">
                      <div className={classes.data}>
                        {agent?.total_listings}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className={classes.data}>
                        <input
                          type="checkbox"
                          defaultChecked={_preference ? true : false}
                          onChange={() => {
                            handleChange(agent?.id);
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {allAgents?.results?.length > 0 && (
        <Pagination
          data={allAgents}
          page={handlePageSelect}
          paginate={paginateAgents}
        />
      )}
    </>
  );
};

export default Agents;
