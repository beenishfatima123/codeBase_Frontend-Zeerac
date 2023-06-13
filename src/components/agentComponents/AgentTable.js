import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import "./agents.css";
import { AGENTS_TABLE_COLUMNS } from "../../utils/constants";
import ComponentLoader from "../globalComponents/ComponentLoader";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMemo } from "react";
import { getRandomAvatar } from "../../utils/helperFunctions";
import IconsContainer from "../propertyComponents/misc/IconsContainer";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fffff",
    color: "#134696",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: 1,
  },

  body: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "10px 5%",
    overflow: "hidden",
    backgroundSize: "cover",
  },

  primaryText: {
    fontSize: 18,
    color: "#000000",
    marginLeft: 20,
    fontFamily: "medium",
    textTransform: "capitalize",
  },
  secondaryText: {
    fontSize: 18,
    color: "#8B8B8B",
    marginLeft: 0,
    fontFamily: "light",
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 210,
    marginRight: 30,
    zIndex: 20,
  },
  "@media (max-width: 500px)": {
    body: {
      alignItems: "center",
      padding: "5% 2%",
    },
  },
}));

/* AgentTable is displayed on agents page. It alters on search query change. */
const AgentTable = ({ agents }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.global);

  const [agentsToShow, setAgentsToShow] = useState([]);
  const [agentActions, setAgentActions] = useState();

  const randomAvatar = useMemo(() => getRandomAvatar(), []);

  const searchAgentsApiInfo = useSelector(
    (state) => state.agents.searchAgentsApiInfo
  );

  /* When agents changes this hook works and sets agents results to setAgentsToShow. */
  useEffect(() => {
    // // console.log({ allPublicPosts });
    setAgentsToShow(agents?.result);
    // eslint-disable-next-line
  }, [agents]);

  /* handleRowClick takes rowData and it navigates to that agents page if
  that agent's row is clicked from the list. */
  const handleRowClick = (agent) => {
    navigate(`/agents/${agent?.id}`);
  };
  return (
    <div className={classes.container}>
      <div className={classes.body}>
        {searchAgentsApiInfo?.loading ? (
          <ComponentLoader />
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: darkMode ? "#303134" : "",
            }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {AGENTS_TABLE_COLUMNS?.map((elem, index) => (
                    <StyledTableCell
                      key={index}
                      style={{
                        color: darkMode ? "#0ed864" : "#134696",
                      }}
                    >
                      {elem}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {agentsToShow?.map((agent, index) => (
                  <StyledTableRow
                    key={index}
                    style={{ cursor: "pointer", zIndex: 10 }}
                    onClick={() => handleRowClick(agent)}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Avatar
                        alt={agent?.full_name}
                        src={agent?.photo ? `${agent?.photo}` : randomAvatar}
                        style={{ height: 60, width: 60 }}
                      />
                      <p
                        className={classes.primaryText}
                        style={{
                          color: darkMode ? "#fff" : "#000000",
                        }}
                      >
                        {agent?.full_name}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <p className={classes.secondaryText}>
                        {`${agent?.city || "city"}, ${
                          agent?.country || "country"
                        }`}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <p className={classes.secondaryText}>{agent?.company}</p>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <p className={classes.secondaryText}>
                        {`${agent?.total_listings || "0"} files`}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconsContainer
                        customStyle={classes.iconsStyle}
                        phoneNumber={agent?.phone_number}
                        setPropertyActions={setAgentActions}
                        propertyActions={agentActions}
                        customColor={darkMode ? "#fff" : "#000000"}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default AgentTable;
