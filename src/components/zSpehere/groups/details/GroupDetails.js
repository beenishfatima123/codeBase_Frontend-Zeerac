import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupMembers,
  getGroupModerators,
  getSelectedGroup,
  setGroupAdmin,
} from "../../../../redux/slices/groupsSlice";
import { useNavigate, useParams } from "react-router-dom";
import TopDetails from "./TopDetails";
import MembersAndEvents from "./MembersAndEvents";
import {
  GROUP_DETAIL_CONTENT,
  SOCIAL_CONTENT_SELECTION,
} from "../../../../utils/constants";
import GroupPosts from "./GroupPosts";
import GroupMembers from "./GroupMembers";
import GroupEvents from "./GroupEvents";
import { fetchMemberProfile } from "../../../../api/socialApi";
import GroupSettings from "./GroupSettings";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import ViewEvent from "../modals/events/ViewEvent";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));

const GroupDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup, groupsApi } = useSelector((state) => state.groups);
  const [selectedContent, setSelectedContent] = useState(
    GROUP_DETAIL_CONTENT.POSTS
  );
  //   console.log({ groupMembers });
  useEffect(() => {
    setSelectedContent(GROUP_DETAIL_CONTENT.POSTS);
    if (selectedGroup?.id) {
      dispatch(
        getGroupMembers({
          id: selectedGroup?.id,
          token: currentUser?.token,
        })
      );
      dispatch(
        getGroupModerators({
          id: selectedGroup?.id,
          token: currentUser?.token,
        })
      );
    }
    if (selectedGroup?.admin === currentUser?.id) {
      dispatch(setGroupAdmin(currentUser));
    } else {
      getGroupAdmin();
    }
    // eslint-disable-next-line
  }, [selectedGroup, currentUser]);
  useEffect(() => {
    if (params?.id)
      dispatch(getSelectedGroup({ id: params?.id, token: currentUser?.token }));
    // eslint-disable-next-line
  }, [params?.id, currentUser]);

  // console.log({ selectedGroup });

  /* render specific content based on the selected content, it can be posts, members, events etc. Checking view control at each level. */
  const renderContent = useMemo(() => {
    switch (selectedContent) {
      case GROUP_DETAIL_CONTENT.POSTS:
        if (
          selectedGroup?.visibility === "Public" ||
          selectedGroup?.admin === currentUser?.id ||
          (selectedGroup?.visibility === "Private" &&
            (selectedGroup?.members?.includes(currentUser?.id) ||
              selectedGroup?.moderators?.includes(currentUser?.id)))
        ) {
          return <GroupPosts />;
        } else {
          return (
            <>
              <h3
                style={{ color: "#707070", textAlign: "center", marginTop: 20 }}
              >
                This group is Private. And you are not a member of this group
              </h3>
              <h5 style={{ color: "#707070", textAlign: "center" }}>
                You can join the group to see the group post's
              </h5>
            </>
          );
        }

      case GROUP_DETAIL_CONTENT.MEMBERS:
        return <GroupMembers setSelectedContent={setSelectedContent} />;
      case GROUP_DETAIL_CONTENT.EVENTS:
        return (
          <GroupEvents
            selectedContent={selectedContent}
            setSelectedContent={setSelectedContent}
          />
        );
      case GROUP_DETAIL_CONTENT.SETTINGS:
        return <GroupSettings setSelectedContent={setSelectedContent} />;

      default:
        return <GroupPosts />;
    }
  }, [selectedContent, selectedGroup, currentUser]);

  /* return group admin of selected group. */
  const getGroupAdmin = async () => {
    const res = await fetchMemberProfile({ id: selectedGroup?.admin });
    if (res) dispatch(setGroupAdmin(res));
  };

  return (
    <div className={classes.container}>
      {groupsApi?.loadingSelected ? (
        <ComponentLoader />
      ) : (
        <>
          <TopDetails setSelectedContent={setSelectedContent} />
          {(selectedContent === GROUP_DETAIL_CONTENT.POSTS &&
            selectedGroup?.visibility === "Public") ||
          selectedGroup?.admin === currentUser?.id ||
          (selectedGroup?.visibility === "Private" &&
            (selectedGroup?.members?.includes(currentUser?.id) ||
              selectedGroup?.moderators?.includes(currentUser?.id))) ? (
            <MembersAndEvents setSelectedContent={setSelectedContent} />
          ) : null}

          {renderContent}
          {params?.eventId && (
            <ViewEvent
              viewEvent={Boolean(params?.eventId)}
              handleClose={() =>
                navigate(
                  `/zSphere/${SOCIAL_CONTENT_SELECTION[4]}/${params?.id}/`
                )
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default GroupDetails;
