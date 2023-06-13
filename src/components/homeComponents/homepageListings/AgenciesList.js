import React from "react";
import { makeStyles } from "@mui/styles";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { useMemo } from "react";
import { useEffect } from "react";
import { AGENCIES_TABLE_COLUMNS } from "../../../utils/constants";
import AgentsSearchbar from "../../agentComponents/AgentsSearchbar";
import CustomTableContainer from "../../globalComponents/Table/CustomTableContainer";
import { useNavigate } from "react-router-dom";
import {
  getAllPartners,
  paginate,
  queryPartners,
} from "../../../redux/slices/partnersSlice";
import AgencyTableRows from "../../partners/AgencyTableRows";
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
const AgenciesList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDims();

  const [searchQuery, setSearchQuery] = useState("");
  const [iconActions, setIconActions] = useState();

  const {
    allPartners,
    allPartnersApiInfo,
    searchedPartners,
    searchPartnersApiInfo,
  } = useSelector((state) => state.partners);

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (searchQuery?.length >= 3) delayedAgencySearch(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]);
  useEffect(() => {
    // // console.log({ allPartners });
    if (!allPartners) {
      // // console.log("sending request");
      dispatch(getAllPartners());
    }
    // eslint-disable-next-line
  }, [allPartners]);

  const agenciesToShow = useMemo(() => {
    if (searchQuery?.length >= 3 && searchedPartners) {
      return searchedPartners;
    } else {
      return allPartners;
    }
    // eslint-disable-next-line
  }, [searchQuery, searchedPartners, allPartners]);
  const delayedAgencySearch = useMemo(
    () => debounce((query) => searchAgencies(query), 500),
    // eslint-disable-next-line
    []
  );
  const searchAgencies = async (query) => {
    dispatch(
      queryPartners({
        query,
        token: currentUser?.token,
      })
    );
  };
  const handleRowClick = (rowData) => {
    // console.log({ rowData });
    navigate(`/partner/${rowData?.id}`);
  };
  const paginatePartners = (url) => {
    dispatch(
      paginate({
        url,
      })
    );
  };
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
    <div className={classes.container}>
      {allPartnersApiInfo?.loading || searchPartnersApiInfo?.loading ? (
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
              {agenciesToShow?.result?.results?.map((item, index) => (
                <MobileTable
                  key={index}
                  profilePic={
                    <Avatar
                      alt={item?.full_name}
                      src={`${item?.photo}`}
                      style={{ height: 70, width: 70 }}
                    />
                  }
                  full_name={item?.company_name}
                  city={item?.areas || "area"}
                  country={item?.city || "city"}
                  company={item?.interests}
                  total_listings={item?.no_of_employees}
                  value={item?.no_of_employees > 1 ? "Employees" : "Employee"}
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

export default AgenciesList;
