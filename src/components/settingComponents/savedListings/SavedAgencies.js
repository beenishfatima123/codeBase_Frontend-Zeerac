import React, { Suspense, lazy, useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import ComponentLoader from "../../../components/globalComponents/ComponentLoader";

import { useWindowDims } from "../../../utils/useWindowDims";
import { AGENCIES_TABLE_COLUMNS } from "../../../utils/constants";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSavedPartners } from "../../../redux/slices/partnersSlice";

const NotFound = lazy(() => import("../../globalComponents/NotFound"));
const MobileTable = lazy(() =>
  import("../../globalComponents/Table/MobileTable")
);
const CustomTableContainer = lazy(() =>
  import("../../globalComponents/Table/CustomTableContainer")
);
const AgencyTableRows = lazy(() => import("../../partners/AgencyTableRows"));
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

/* Display agencies saved by user in form of a list. */
const SavedAgencies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDims();

  const [iconActions, setIconActions] = useState();

  const { savedPartners, allPartnersApiInfo } = useSelector(
    (state) => state.partners
  );
  const { darkMode } = useSelector((state) => state.global);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    // console.log({ savedPartners });
    // // console.log("sending request");
    dispatch(getSavedPartners({ id: currentUser?.id }));
    // eslint-disable-next-line
  }, [currentUser]);

  /* handleRowClick takes rowData as parameter and navigates to that agency page. */
  const handleRowClick = (rowData) => {
    // // console.log({ rowData });
    navigate(`/partner/${rowData?.id}`);
  };
  return (
    <div
      className={classes.container}
      style={{ backgroundColor: darkMode ? "#212124" : "" }}
    >
      <Suspense fallback={<ComponentLoader />}>
        {savedPartners?.result?.results?.length === 0 ? (
          <NotFound />
        ) : (
          <>
            {allPartnersApiInfo?.loadingSaved ? (
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
                    {savedPartners?.result?.results?.map((item, index) => (
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
                        total_listings={item?.user?.length || "0"}
                        value={
                          item?.user?.length > 1 ? "Employees" : "Employee"
                        }
                        phone_number={item?.company_phone}
                        item={item}
                        iconActions={iconActions}
                        setIconActions={setIconActions}
                      />
                    ))}
                    ``
                  </div>
                ) : (
                  <CustomTableContainer
                    customStyle={{
                      maxWidth: "100%",
                      width: "100%",
                    }}
                    columns={AGENCIES_TABLE_COLUMNS}
                    rows={
                      <>
                        {savedPartners?.result?.results?.map((elem, index) => (
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
          </>
        )}
      </Suspense>
    </div>
  );
};

export default SavedAgencies;
