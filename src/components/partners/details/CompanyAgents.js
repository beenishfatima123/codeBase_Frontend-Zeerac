import HeadingSvg from "./HeadingSvg";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import AddAgentsModal from "./AddAgentsModal";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../globalComponents/NotFound";
import { useWindowDims } from "../../../utils/useWindowDims";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AgentTableRows from "../../agentComponents/AgentTableRows";
import MobileTable from "../../globalComponents/Table/MobileTable";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import {
  AGENTS_TABLE_COLUMNS,
  HEADER_CONTENT_WIDTH,
} from "../../../utils/constants";
import CustomTableContainer from "../../globalComponents/Table/CustomTableContainer";
import {
  getAllAgents,
  getCompanyAgents,
} from "../../../redux/slices/agentsSlice";
import { TextTranslation } from "../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "90%",
    alignSelf: "center",
    width: HEADER_CONTENT_WIDTH,
    margin: "20px 0px",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "20px 0px",
    minHeight: 100,
    position: "relative",
    width: "100%",
    left: -80,
  },
  horizontal: {
    display: "flex",
    alignSelf: "flex-end",
    minWidth: 250,
    flexDirection: "Column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  bottomBorder: {
    height: 1,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "lightGray",
    marginTop: 20,
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    height: 44,
    marginRight: 20,
    minWidth: "max-content",
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

/* CompanyAgents is the Agents section on partner page where all Agents
who belong an agency are listed. */
const CompanyAgents = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDims();

  const [hovering, setHovering] = useState(false);
  const [iconActions, setIconActions] = useState();
  const [open, setOpen] = useState(false);

  const { langIndex } = useSelector((state) => state.global);
  const { partnerDetails } = useSelector((state) => state.partners);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { allAgents, companyAgents, companyAgentsApiInfo } = useSelector(
    (state) => state.agents
  );

  useEffect(() => {
    if (partnerDetails) {
      dispatch(getCompanyAgents({ id: partnerDetails?.id }));
    }
    // eslint-disable-next-line
  }, [partnerDetails]);

  useEffect(() => {
    if (!allAgents && partnerDetails) {
      dispatch(getAllAgents({ id: partnerDetails?.id }));
    }
    // eslint-disable-next-line
  }, [allAgents, partnerDetails]);

  const handleRowClick = (rowData) => {
    // // console.log({ rowData });
    navigate(`/agents/${rowData?.id}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <HeadingSvg heading={`All Agents of ${partnerDetails?.company_name}`} />
        <div className={classes.horizontal}>
          <Button
            sx={{
              background:
                "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
              textTransform: "none",
              color: "#134696",
              width: 180,
              margin: "10px 5%",
              alignSelf: "flex-end",
              borderRadius: 0,
            }}
            endIcon={<ArrowForwardIcon style={{ color: "#134696" }} />}
            onClick={() => navigate("/agents")}
          >
            {TextTranslation.viewAll[langIndex]}
          </Button>
          {currentUser?.id === partnerDetails?.admin && (
            <div
              className={classes.addBtn}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onClick={() => setOpen(true)}
              style={{
                padding: hovering ? "0px 20px" : "0px 10px",
              }}
            >
              {hovering ? (
                <span className={classes.btnText}>ADD AGENT</span>
              ) : (
                <AddIcon style={{ color: "white" }} />
              )}
            </div>
          )}
          {open && <AddAgentsModal open={open} setOpen={setOpen} />}
        </div>
      </div>
      {companyAgentsApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          {companyAgents?.count > 0 ? (
            width < 600 ? (
              <div
                style={{
                  height: 700,
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                {companyAgents?.results?.map((item, index) => (
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
                    value={item?.total_listings > 1 ? "listings" : "listing"}
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
                    {companyAgents?.results?.map((elem, index) => (
                      <AgentTableRows
                        key={index}
                        agent={elem}
                        handleRowClick={handleRowClick}
                      />
                    ))}
                  </>
                }
              />
            )
          ) : (
            <NotFound label={"No Agents"} />
          )}
        </>
      )}

      <div className={classes.bottomBorder} />
    </div>
  );
};

export default CompanyAgents;
