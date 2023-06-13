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
import Pagination from "../../../../globalComponents/Pagination";
import {
  resetPreferenceCreationApiInfo,
  resetUpdatePreferenceApiInfo,
  updateUserPreferences,
  userPreferences,
} from "../../../../../redux/slices/preferenceSlice";
import PreferenceTableSkeleton from "../../../../loadingSkeletons/PreferenceTableSkeletion";
import ButtonLoader from "../../../../globalComponents/ButtonLoader";
import {
  getAllPartners,
  paginate,
} from "../../../../../redux/slices/partnersSlice";
import { toast } from "react-toastify";

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

const cols = ["Name", "Location", "Agents", "Listings", ""];

const Agencies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { langIndex, darkMode } = useSelector((state) => state.global);

  const { allPartners, allPartnersApiInfo } = useSelector(
    (state) => state.partners
  );
  const {
    getPreferenceData,
    userPreferenceDataApiInfo,
    updateUserPreferenceDataApiInfo,
  } = useSelector((state) => state.preference);

  // console.log({ getPreferenceData });

  let _agencies = getPreferenceData?.agencies || [];

  useEffect(() => {
    dispatch(getAllPartners());
    // eslint-disable-next-line
  }, []);

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
    if (allPartners?.result?.next)
      pageSplit = allPartners?.result?.next?.split("page=");
    else pageSplit = allPartners?.result?.previous?.split("page=");
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

  const handleChange = (id) => {
    const index = _agencies.indexOf(id);
    if (index !== -1) {
      _agencies = _agencies.filter((agent) => agent !== id);
    } else {
      _agencies = [..._agencies, id];
    }
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("agencies", JSON.stringify(_agencies));

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

  return (
    <>
      <TopHeader
        heading={TextTranslation.agencyPreferences[langIndex]}
        resetFilters={TextTranslation.resetAllFilters[langIndex]}
        subHeading={TextTranslation.checkAgencyPreference[langIndex]}
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
      {allPartnersApiInfo?.loading ? (
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
              {allPartners?.result?.results?.map((agency, index) => {
                const _preference = getPreferenceData?.agencies?.find(
                  (elem) => elem === agency?.id
                );
                return (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "1px solid #8b8b8b" }}
                  >
                    <TableCell align="center">
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          alt={"user"}
                          src={`${agency?.company_logo}`}
                          style={{ height: 50, width: 50, marginRight: 10 }}
                        />
                        <CustomTooltip title={agency?.company_name}>
                          <div
                            className={classes.data}
                            style={{
                              color: darkMode ? "#fff" : "#000",
                              height: 28,
                              overflow: "hidden",
                            }}
                          >
                            {agency?.company_name}
                          </div>
                        </CustomTooltip>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <CustomTooltip title={agency?.company_address}>
                        <div className={classes.description}>
                          {agency?.company_address || " "}
                        </div>
                      </CustomTooltip>
                    </TableCell>
                    <TableCell align="center">
                      <div className={classes.data}>
                        {agency?.user?.length || 0}
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      <div className={classes.data}>
                        {agency?.total_listings}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="checkbox"
                        defaultChecked={_preference ? true : false}
                        onChange={() => {
                          handleChange(agency?.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {allPartners?.result?.results?.length > 0 && (
        <Pagination
          data={allPartners?.result}
          page={handlePageSelect}
          paginate={paginatePartners}
        />
      )}
    </>
  );
};

export default Agencies;
