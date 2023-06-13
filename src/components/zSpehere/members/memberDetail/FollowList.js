import React, { useState } from "react";
import editIcon from "../../../../assets/zSpehere/edit.png";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MemberCard from "../membersList/MemberCard";
import { Button } from "@mui/material";
import { useWindowDims } from "../../../../utils/useWindowDims";
import PaginationContainer from "./PaginationContainer";
import { useSelector } from "react-redux";
import {
  paginateFollowers,
  paginateFollowing,
} from "../../../../redux/slices/zSphereMemberSlice";

const backSx = {
  fontSize: 16,
  color: "#134696",
  textTransform: "none",
  maxWidth: 150,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "left",
  padding: "8px 0px",
};
const useStyles = makeStyles(() => ({
  container: {
    padding: 20,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    margin: "10px 0",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 20,
    color: "#134696",
    fontFamily: "medium",
  },
  icon: {
    cursor: "pointer",
  },
  infoContainer: {
    display: "flex",
    margin: "10px 0",
  },
  name: {
    textTransform: "capitalize",
    color: "#134696",
    fontFamily: "medium",
    fontSize: 20,
  },
  username: {
    color: "#B5B5BE",
    fontFamily: "medium",
    fontSize: 14,
  },

  seeMore: {
    backgroundColor: "#fff",
    border: "none",
    color: "#134696",
    cursor: "pointer",
    height: 40,
    width: "100%",
    borderRadius: 10,
    fontFamily: "medium",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    marginTop: 20,
  },
  notFound: {
    fontFamily: "medium",
    fontSize: 16,
    marginTop: 20,
    color: "#000",
    alignSelf: "center",
    textAlign: "center",
  },
}));

/*  */
const FollowList = ({ users, following, label, setShowMore, full }) => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { zSphereMembersApi, selectedMember } = useSelector(
    (state) => state.zSphereMembers
  );
  const { currentUser } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);

  // console.log({ users });
  return (
    <div className={classes.container}>
      {full && width > 850 && (
        <Button
          onClick={() => setShowMore({})}
          sx={backSx}
          startIcon={<ArrowBackIosNewIcon style={{ fontSize: 16 }} />}
        >
          Back
        </Button>
      )}
      <div className={classes.header}>
        <div className={classes.heading}>{`${label} (${users?.count || 0 })`}</div>
        {!following && currentUser?.id === selectedMember?.id && (
          <img
            alt="edit"
            src={editIcon}
            className={classes.icon}
            onClick={() => setEditing((prev) => !prev)}
          />
        )}
      </div>
      {users?.results?.map((item, index) => (
        <MemberCard
          key={index}
          user={item}
          following={following}
          editing={editing}
        />
      ))}
      {full && users?.count > 10 && (
        <PaginationContainer
          paginationData={users}
          loading={
            following
              ? zSphereMembersApi?.loadingFollowingPagination
              : zSphereMembersApi?.loadingFollowerPagination
          }
          paginationFunction={following ? paginateFollowing : paginateFollowers}
          label={{
            title: "You are all caught up",
          }}
        />
      )}

      {users?.count >= 3 && !full && (
        <button
          className={classes.seeMore}
          onClick={() => setShowMore({ [label]: true })}
        >
          See More
        </button>
      )}
      {users?.length === 0 && (
        <p className={classes.notFound}>
          <span> {following ? "" : "No followers yet"}</span>
          <br />
          {following
            ? "Follow people to see them here"
            : "Get some followers to see them here"}
        </p>
      )}
    </div>
  );
};

export default FollowList;
