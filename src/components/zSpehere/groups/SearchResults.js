import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import SuggestedGroupCard from "./details/SuggestedGroupCard";
import { useNavigate } from "react-router-dom";
import NotFound from "../../globalComponents/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { resetGroupSearch } from "../../../redux/slices/groupsSlice";
import { paginateGroups } from "../../../api/socialApi";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* when search query is found, display groups as cards. */
const SearchResults = ({ loading, searchResults }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.global);
  const [paginatedSearch, setPaginatedSearch] = useState();
  const [loadingPagination, setLoadingPagination] = useState(false);

  useEffect(() => {
    if (searchResults) setPaginatedSearch(searchResults);
  }, [searchResults]);

  /* opon clicking a group, handleView take group as elem and navigate to that group page. */
  const handleView = (elem) => {
    dispatch(resetGroupSearch());
    navigate(`/zSphere/Groups/${elem?.id}`);
  };

  /* handling next, previous and pagination loading. */
  const handlePagination = async () => {
    // console.log({ searchResults });
    setLoadingPagination(true);
    const paginationResponse = await paginateGroups({
      url: searchResults?.next?.replace("http", "https"),
    });
    // console.log({ paginationResponse });
    setLoadingPagination(false);

    if (paginationResponse) {
      setPaginatedSearch((prev) => ({
        ...prev,
        next: paginationResponse?.next,
        prev: paginationResponse?.prev,
        results: [...prev?.results, ...paginationResponse?.results],
      }));
    }
  };
  return (
    <div className={classes.container}>
      {loading || loadingPagination ? (
        <ComponentLoader />
      ) : (
        <Grid container spacing={2}>
          {paginatedSearch?.count > 0 ? (
            <>
              {paginatedSearch?.results?.map((elem, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <SuggestedGroupCard
                    groupPhoto={elem?.photo}
                    groupName={elem?.name}
                    members={elem?.members?.length + elem?.moderators?.length}
                    posts={elem?.posts_count}
                    events={elem?.events_count}
                    viewClick={() => handleView(elem)}
                    hideJoin={false}
                  />
                </Grid>
              ))}
            </>
          ) : (
            <NotFound label="No Groups Found" />
          )}
        </Grid>
      )}
      {paginatedSearch?.next && (!loading || !loadingPagination) && (
        <Button
          fullWidth
          sx={{
            textTransform: "none",
            backgroundColor: darkMode ? "#212124" : "#fff",
            color: darkMode ? "#0ed864" : "#134696",
            fontSize: 14,
            fontFamily: "medium",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            width: 300,
            maxWidth: "90%",
            height: 40,
            alignSelf: "center",
          }}
          onClick={handlePagination}
        >
          Show More
        </Button>
      )}
    </div>
  );
};

export default SearchResults;
