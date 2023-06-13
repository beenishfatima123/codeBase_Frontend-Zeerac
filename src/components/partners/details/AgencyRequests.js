import HeadingSvg from "./HeadingSvg";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../globalComponents/NotFound";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import CustomTooltip from "../../globalComponents/CustomTooltip";
import { Avatar, IconButton } from "@mui/material";
import ButtonLoader from "../../globalComponents/ButtonLoader";
import { HEADER_CONTENT_WIDTH } from "../../../utils/constants";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import {
  getRequestsToJoinAgency,
  handleRequestsToJoinAgency,
  resetHandleRequestData,
} from "../../../redux/slices/partnersSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
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
  data: {
    fontSize: 14,
    fontFamily: "light",
    color: "#8b8b8b",
  },
  description: {
    fontSize: 14,
    fontFamily: "light",
    color: "#8b8b8b",
    overflow: "hidden",
    textAlign: "center",
    height: 20,
  },

  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

const cols = ["Name", "Location", "Listings", ""];

const AgencyRequests = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);
  const { partnerDetails, allRequestsData, handleRequestsData } = useSelector(
    (state) => state.partners
  );

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (partnerDetails) {
      dispatch(
        getRequestsToJoinAgency({
          agency: partnerDetails?.id,
        })
      );
    }
    // eslint-disable-next-line
  }, [partnerDetails]);

  useEffect(() => {
    if (handleRequestsData?.result?.status === "approved") {
      toast.success(handleRequestsData?.message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      setSelectedId(null);
      dispatch(resetHandleRequestData());
    }
    // eslint-disable-next-line
  }, [handleRequestsData?.result?.status]);
  useEffect(() => {
    if (handleRequestsData?.result?.status === "rejected") {
      toast.error(handleRequestsData?.message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      setSelectedId(null);
      dispatch(resetHandleRequestData());
    }
    // eslint-disable-next-line
  }, [handleRequestsData?.result?.status]);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <HeadingSvg
          heading={`All Requests to join ${partnerDetails?.company_name}`}
        />
      </div>
      {allRequestsData?.loading ? (
        <ComponentLoader />
      ) : allRequestsData?.results?.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            borderLeft: "1.5px solid #c9c9c9",
            borderRight: "1.5px solid #c9c9c9",
            borderBottom: "1.5px solid #c9c9c9",
            maxWidth: "98.5%",
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
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {allRequestsData?.results?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ borderBottom: "1px solid #8b8b8b" }}
                >
                  <TableCell align="center">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        alt={"user"}
                        src={`${row?.user?.photo}`}
                        style={{ height: 50, width: 50, marginRight: 10 }}
                      />
                      <div
                        className={classes.data}
                        style={{ color: darkMode ? "#fff" : "#000" }}
                      >
                        {row?.user?.full_name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center" sx={{ maxWidth: 200 }}>
                    <CustomTooltip
                      title={`${row?.user?.area} ${row?.user?.city}`}
                    >
                      <div className={classes.description}>
                        {row?.user?.area} {row?.user?.city}
                      </div>
                    </CustomTooltip>
                  </TableCell>

                  <TableCell align="center">
                    <div className={classes.data}>
                      {row?.user?.total_listings || 0}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {row?.status === "pending" ? (
                      <div className={classes.data}>
                        {handleRequestsData?.loading &&
                        selectedId === row?.id ? (
                          <ButtonLoader color="#134696" size={20} />
                        ) : (
                          <>
                            <IconButton
                              sx={{
                                backgroundColor: "transparent",
                                borderRadius: 2,
                                height: 30,
                                border: "1px solid #707070",
                                cursor: "pointer",
                                mr: 1,
                                "&:hover": {
                                  backgroundColor: "transparent",
                                },
                              }}
                              onClick={() => {
                                setSelectedId(row?.id);
                                let formData = new FormData();
                                formData.append("status", "approved");
                                dispatch(
                                  handleRequestsToJoinAgency({
                                    id: row?.id,
                                    formData,
                                    token: currentUser?.token,
                                  })
                                );
                              }}
                            >
                              <DoneIcon style={{ color: "#0ed864" }} />
                            </IconButton>
                            <IconButton
                              sx={{
                                backgroundColor: "transparent",
                                borderRadius: 2,
                                border: "1px solid #707070",
                                cursor: "pointer",
                                height: 30,
                                ml: 1,
                                "&:hover": {
                                  backgroundColor: "transparent",
                                },
                              }}
                              onClick={() => {
                                setSelectedId(row?.id);
                                let formData = new FormData();
                                formData.append("status", "rejected");
                                dispatch(
                                  handleRequestsToJoinAgency({
                                    id: row?.id,
                                    formData,
                                    token: currentUser?.token,
                                  })
                                );
                              }}
                            >
                              <CloseIcon style={{ color: "#F31A1A" }} />
                            </IconButton>
                          </>
                        )}
                      </div>
                    ) : row?.status === "approved" ? (
                      <div
                        style={{
                          backgroundColor: "#0ed864",
                          padding: 5,
                          color: "#fff",
                          borderRadius: 5,
                          fontFamily: "light",
                          fontSize: 14,
                          width: 80,
                        }}
                      >
                        Accepted
                      </div>
                    ) : row?.status === "rejected" ? (
                      <div
                        style={{
                          backgroundColor: "#F31A1A",
                          padding: 5,
                          color: "#fff",
                          borderRadius: 5,
                          fontFamily: "light",
                          fontSize: 14,
                          width: 80,
                        }}
                      >
                        Rejected
                      </div>
                    ) : null}
                  </TableCell>
                  {/* <TableCell align="center">
                    <div className={classes.data}>
                      <IconButton
                        sx={{
                          backgroundColor: "transparent",
                          borderRadius: 2,
                          height: 30,
                          border: "1px solid #707070",
                          cursor: "pointer",
                          mr: 1,
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={() => {
                          let formData = new FormData();
                          formData.append("status", "approved");
                          dispatch(
                            handleRequestsToJoinAgency({
                              id: row?.id,
                              formData,
                              token: currentUser?.token,
                            })
                          );
                        }}
                      >
                        {handleRequestsData?.acceptLoading ? (
                          <ButtonLoader />
                        ) : (
                          <DoneIcon style={{ color: "#0ed864" }} />
                        )}
                      </IconButton>
                      <IconButton
                        sx={{
                          backgroundColor: "transparent",
                          borderRadius: 2,
                          border: "1px solid #707070",
                          cursor: "pointer",
                          height: 30,
                          ml: 1,
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={() => {
                          let formData = new FormData();
                          formData.append("status", "rejected");
                          dispatch(
                            handleRequestsToJoinAgency({
                              id: row?.id,
                              formData,
                              token: currentUser?.token,
                            })
                          );
                        }}
                      >
                        <CloseIcon style={{ color: "#F31A1A" }} />
                      </IconButton>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NotFound label={"No Request Found"} />
      )}
    </div>
  );
};

export default AgencyRequests;
