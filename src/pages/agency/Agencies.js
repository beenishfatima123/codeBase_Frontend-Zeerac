import { makeStyles } from "@mui/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useWindowDims } from "../../utils/useWindowDims";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  AGENCIES_TABLE_COLUMNS,
  HEADER_CONTENT_WIDTH,
} from "../../utils/constants";
import AgentsTop from "../../components/agentComponents/AgentsTop";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AgentsSearchbar from "../../components/agentComponents/AgentsSearchbar";
import {
  getAllPartners,
  queryPartners,
  paginate,
} from "../../redux/slices/partnersSlice";
import CustomTableContainer from "../../components/globalComponents/Table/CustomTableContainer";
import AgencyTableRows from "../../components/partners/AgencyTableRows";
import MobileTable from "../../components/globalComponents/Table/MobileTable";
import { Avatar } from "@mui/material";
import Pagination from "../../components/globalComponents/Pagination";
import AgentsTableSkeleton from "../../components/loadingSkeletons/AgentsTableSkeleton";
import { TextTranslation } from "../../utils/translation";

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
    alignSelf: "center",
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

/* Agencies is the main component for listing agencies along with header, search bar
and pagination. */
const Agencies = () => {
  const classes = useStyles();
  const { height, width } = useWindowDims();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [hovering, setHovering] = useState(false);
  const [iconActions, setIconActions] = useState();

  const {
    allPartners,
    allPartnersApiInfo,
    searchedPartners,
    searchPartnersApiInfo,
  } = useSelector((state) => state.partners);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { darkMode, langIndex } = useSelector((state) => state.global);

  /* this useEffect delays agency search when something is typed in search bar. */
  useEffect(() => {
    if (searchQuery?.length >= 3) delayedAgencySearch(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]);

  /* this useEffect gets partners from store if allPartners is null. */
  useEffect(() => {
    if (!allPartners) {
      dispatch(getAllPartners());
    }
    // eslint-disable-next-line
  }, [allPartners]);

  /* when search query characters are more than 2 then agencyToShow gets the partners
  that are matching with searched query.  */
  const agenciesToShow = useMemo(() => {
    if (searchQuery?.length >= 3 && searchedPartners) {
      return searchedPartners;
    } else {
      return allPartners;
    }
    // eslint-disable-next-line
  }, [searchQuery, searchedPartners, allPartners]);

  /* delayedAgencySearch delays searc results using debounce and stores it in
  memory. */
  const delayedAgencySearch = useMemo(
    () => debounce((query) => searchAgencies(query), 500),
    // eslint-disable-next-line
    []
  );

  /* searchAgencies takes typed query and dispatches searched string to 
  queryPartners in slice. */
  const searchAgencies = async (query) => {
    dispatch(
      queryPartners({
        query,
        token: currentUser?.token,
      })
    );
  };

  /* handleRowClick navigates to the agency page when clicked on its row. */
  const handleRowClick = (rowData) => {
    navigate(`/partner/${rowData?.id}`);
  };

  /* paginatePartners takes url and dispatches it to paginate method in slice. */
  const paginatePartners = (url) => {
    dispatch(
      paginate({
        url,
      })
    );
  };

  /* handlePageSelect takes the pageNumber and handles pagination views and 
  redirection, it creates a new link based on condition of pageNumber and
  calls paginatePartners for that pageNumber. */
  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (agenciesToShow?.result?.next)
      pageSplit = agenciesToShow?.result?.next?.split("page=");
    else pageSplit = agenciesToShow?.result?.previous?.split("page=");
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
    paginatePartners(newLink.replace("http", "https"));
  };

  return (
    <div
      className={classes.container}
      style={{
        minHeight: height - 64 || 500,
      }}
    >
      <AgentsTop agency />
      <div className={classes.titleContainer}>
        <span
          className={classes.title}
          style={{
            color: darkMode ? "#0ED864" : "#134696",
          }}
        >
          {TextTranslation.featuredAgencies[langIndex]}
        </span>
        <div
          className={classes.divider}
          style={{
            backgroundColor: darkMode ? "#fff" : "#0ED864",
          }}
        />
        {currentUser?.user_type === 2 &&
          currentUser?.company === "Private Agent" && (
            <div
              className={classes.addBtn}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{
                padding: hovering ? "10px 40px" : 10,
              }}
              onClick={() => navigate("/signup")}
            >
              {hovering ? (
                <span className={classes.btnText}>ADD AGENCY</span>
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
          display: "flex",
          alignSelf: "center",
        }}
      >
        <AgentsSearchbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      {allPartnersApiInfo?.loading || searchPartnersApiInfo?.loading ? (
        <AgentsTableSkeleton />
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
              {agenciesToShow?.result?.results?.map((item, index) => (
                <MobileTable
                  key={index}
                  onClick={() => {
                    navigate(`/partner/${item?.id}`);
                  }}
                  profilePic={
                    <Avatar
                      alt={item?.full_name}
                      src={` ${item?.company_logo}`}
                      style={{ height: 70, width: 70 }}
                    />
                  }
                  full_name={item?.company_name}
                  city={item?.areas || "area"}
                  country={item?.city || "city"}
                  company={item?.interests}
                  total_listings={item?.user?.length || "0"}
                  value={item?.user?.length > 1 ? "Employees" : "Employee"}
                  phone_number={item?.company_phone}
                  item={item}
                  iconActions={iconActions}
                  setIconActions={setIconActions}
                />
              ))}
            </div>
          ) : (
            <CustomTableContainer
              columns={AGENCIES_TABLE_COLUMNS}
              rows={
                <>
                  {agenciesToShow?.result?.results?.map((elem, index) => (
                    <AgencyTableRows
                      key={index}
                      agency={elem}
                      handleRowClick={handleRowClick}
                    />
                  ))}
                </>
              }
            />
          )}
        </>
      )}

      {agenciesToShow?.result?.results?.length > 0 && (
        <Pagination
          data={agenciesToShow?.result}
          page={handlePageSelect}
          paginate={paginatePartners}
        />
      )}
    </div>
  );
};

export default Agencies;
