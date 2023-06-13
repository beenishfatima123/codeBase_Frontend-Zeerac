import React, { useMemo } from "react";
import { ReactComponent as Like } from "../../../assets/icons/property/like.svg";
import { ReactComponent as Liked } from "../../../assets/icons/property/likeFocused.svg";
import { ReactComponent as Call } from "../../../assets/icons/property/call.svg";
import { ReactComponent as CallFocused } from "../../../assets/icons/property/callFocused.svg";
import { ReactComponent as Chat } from "../../../assets/icons/property/chat.svg";
import { ReactComponent as ChatFocused } from "../../../assets/icons/property/chatFocused.svg";
import { ReactComponent as Share } from "../../../assets/icons/property/share.svg";
import { ReactComponent as ShareFocused } from "../../../assets/icons/property/shareFocused.svg";
import { IconButton } from "@mui/material";
import { useState } from "react";
import CallMenu from "./CallMenu";
import { useEffect } from "react";
import ChatMenu from "./ChatMenu";
import ShareModal from "../../globalComponents/misc/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { favoriteProperty } from "../../../redux/slices/propertiesSlice";
import { toast } from "react-toastify";
import { favoriteAgent } from "../../../redux/slices/agentsSlice";
import { favoriteProject } from "../../../redux/slices/projectSlice";
import {
  favoriteAgency,
  setAllPartnerListings,
} from "../../../redux/slices/partnersSlice";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { numberAnalytics, shareAnalytics } from "../../../api/dataApi";

const IconsContainer = ({
  customStyle,
  propertyActions,
  setPropertyActions,
  phoneNumber,
  customSize,
  customColor,
  property,
  agent,
  project,
  agency,
  event,
}) => {
  const dispatch = useDispatch();
  const [callAnchor, setCallAnchor] = useState(null);
  const [chatAnchor, setChatAnchor] = useState(null);

  const { currentUser } = useSelector((state) => state.auth);
  const {
    allGlobalPropertiesApiInfo,
    allRegionalPropertiesApiInfo,
    searchedPropertyApiInfo,
  } = useSelector((state) => state.properties);

  const { allAgentsApiInfo, searchAgentsApiInfo } = useSelector(
    (state) => state.agents
  );
  const { allPartnersApiInfo, searchPartnersApiInfo, allPartnerListings } =
    useSelector((state) => state.partners);

  const { getEventData } = useSelector((state) => state.zSphereEvents);
  const { selectedGroup } = useSelector((state) => state.groups);

  useEffect(() => {
    setPropertyActions((prev) => ({ ...prev, called: Boolean(callAnchor) }));
    // eslint-disable-next-line
  }, [callAnchor]);
  useEffect(() => {
    setPropertyActions((prev) => ({ ...prev, messaged: Boolean(chatAnchor) }));
    // eslint-disable-next-line
  }, [chatAnchor]);

  const isLiked = useMemo(() => {
    if (project) return project?.liked_by?.includes(currentUser?.id);
    else if (property)
      return property?.favorites_count?.includes(currentUser?.id);
    else if (agency) return agency?.favourited_by?.includes(currentUser?.id);
    else if (agent) return agent?.favourited_by?.includes(currentUser?.id);
    else return false;
  }, [project, property, agent, agency, currentUser]);
  // // console.log({ isLiked });
  const loadingPropertyFavorite = useMemo(() => {
    let _loading = false;
    if (
      allGlobalPropertiesApiInfo?.loadingFavorite !== undefined &&
      allGlobalPropertiesApiInfo?.loadingFavorite === property?.id
    ) {
      _loading = true;
    } else if (
      allRegionalPropertiesApiInfo?.loadingFavorite !== undefined &&
      allRegionalPropertiesApiInfo?.loadingFavorite === property?.id
    ) {
      _loading = true;
    } else if (
      searchedPropertyApiInfo?.loadingFavorite !== undefined &&
      searchedPropertyApiInfo?.loadingFavorite === property?.id
    ) {
      _loading = true;
    } else _loading = false;
    return _loading;
  }, [
    allGlobalPropertiesApiInfo?.loadingFavorite,
    allRegionalPropertiesApiInfo?.loadingFavorite,
    searchedPropertyApiInfo?.loadingFavorite,
    property,
  ]);
  const loadingAgentFavorite = useMemo(() => {
    let _loading = false;
    if (
      allAgentsApiInfo?.loadingFavorite !== undefined &&
      allAgentsApiInfo?.loadingFavorite === agent?.id
    ) {
      _loading = true;
    } else if (
      searchAgentsApiInfo?.loadingFavorite !== undefined &&
      searchAgentsApiInfo?.loadingFavorite === agent?.id
    ) {
      _loading = true;
    } else _loading = false;
    return _loading;
  }, [
    allAgentsApiInfo?.loadingFavorite,
    searchAgentsApiInfo?.loadingFavorite,
    agent,
  ]);
  const loadingAgencyFavorite = useMemo(() => {
    let _loading = false;
    if (
      allPartnersApiInfo?.loadingFavorite !== undefined &&
      allPartnersApiInfo?.loadingFavorite === agency?.id
    ) {
      _loading = true;
    } else if (
      searchPartnersApiInfo?.loadingFavorite !== undefined &&
      searchPartnersApiInfo?.loadingFavorite === agency?.id
    ) {
      _loading = true;
    } else _loading = false;
    return _loading;
  }, [
    allPartnersApiInfo?.loadingFavorite,
    searchPartnersApiInfo?.loadingFavorite,
    agency,
  ]);
  const disableInteraction = useMemo(() => {
    let disable = false;
    if (project) {
      if (project?.company?.admin === currentUser?.id) disable = true;
    } else if (property) {
      if (property?.user?.id === currentUser?.id) disable = true;
    } else if (agent) {
      if (agent?.admin) {
        if (agent?.admin === currentUser?.id) disable = true;
      } else if (agent?.id === currentUser?.id) disable = true;
    } else if (
      loadingPropertyFavorite ||
      loadingAgentFavorite ||
      loadingAgencyFavorite
    )
      disable = true;

    return disable;
  }, [
    project,
    property,
    agent,
    currentUser,
    loadingPropertyFavorite,
    loadingAgentFavorite,
    loadingAgencyFavorite,
  ]);
  const handleLike = (status) => {
    if (currentUser) {
      if (project) {
        dispatch(
          favoriteProject({
            id: project?.id,
            token: currentUser?.token,
            user: currentUser?.id,
          })
        );
      } else if (property) {
        dispatch(
          favoriteProperty({
            id: property?.id,
            token: currentUser?.token,
            user: currentUser?.id,
          })
        ).then((res) => {
          dispatch(
            setAllPartnerListings({
              ...allPartnerListings,
              results: allPartnerListings?.results?.map((elem) => {
                if (res?.payload?.propertyId === elem?.id) {
                  if (res?.payload?.result === "Property favorited")
                    return {
                      ...elem,
                      favorites_count: elem?.favorites_count?.length
                        ? [...elem?.favorites_count, res.payload?.user]
                        : [res?.payload?.user],
                    };
                  else if (res?.payload?.result === "Property un-favorite")
                    return {
                      ...elem,
                      favorites_count: elem?.favorites_count?.length
                        ? elem?.favorites_count?.filter(
                            (filterElem) => filterElem !== res.payload?.user
                          )
                        : [],
                    };
                  else return elem;
                } else return elem;
              }),
            })
          );
        });
        // setIsLiked((prev) => !prev);
      } else if (agency) {
        dispatch(
          favoriteAgency({
            id: agency?.id,
            token: currentUser?.token,
            user: currentUser?.id,
          })
        );
      } else
        dispatch(
          favoriteAgent({
            id: agent?.id,
            token: currentUser?.token,
            user: currentUser?.id,
          })
        );
    } else
      toast.error("You need to login first", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
  };
  return (
    <div className={customStyle}>
      {/* LIKE */}
      <IconButton
        onClick={() => {
          handleLike(!propertyActions?.liked);
        }}
        sx={{ color: customColor || "black" }}
        disabled={disableInteraction}
      >
        {loadingPropertyFavorite ||
        loadingAgentFavorite ||
        loadingAgencyFavorite ? (
          <ComponentLoader
            customImageStyle={{
              height: customSize || 20,
              width: customSize || 20,
            }}
          />
        ) : (
          <>
            {isLiked ? (
              <Liked
                style={{
                  height: customSize || 20,
                  width: customSize || 20,
                  fill: customColor || "black",
                }}
              />
            ) : (
              <Like
                style={{
                  height: customSize || 20,
                  width: customSize || 20,
                  fill: customColor || "black",
                }}
              />
            )}
          </>
        )}
      </IconButton>
      {/* SHARE */}
      <IconButton
        onClick={() => {
          setPropertyActions((prev) => ({ ...prev, shared: !prev?.shared }));
          // if (agent) {
          //   shareAnalytics({ type: 'user', id: agent?.id });
          // } else if (agency) {
          //   shareAnalytics({ type: 'company', id: agency?.id });
          // } else {
          //   shareAnalytics({ type: 'property', id: property?.id });
          // }
        }}
      >
        {propertyActions?.shared ? (
          <ShareFocused
            style={{
              height: customSize || 20,
              width: customSize || 20,
              fill: customColor || "black",
            }}
          />
        ) : (
          <Share
            style={{
              height: customSize || 20,
              width: customSize || 20,
              fill: customColor || "black",
            }}
          />
        )}
      </IconButton>
      {/* CALL */}
      <IconButton
        onClick={(event) => {
          setCallAnchor(event.currentTarget);
          if (agent && !project) {
            numberAnalytics({
              type: "user",
              id: agent?.id,
              token: currentUser?.token,
            });
          } else if (agency) {
            numberAnalytics({
              type: "company",
              id: agency?.id,
              token: currentUser?.token,
            });
          } else if (project && agent) {
            numberAnalytics({
              type: "new-project",
              id: project?.id,
              token: currentUser?.token,
            });
          } else {
            numberAnalytics({
              type: "property",
              id: property?.id,
              token: currentUser?.token,
            });
          }
        }}
        disabled={disableInteraction}
      >
        {propertyActions?.called ? (
          <CallFocused
            style={{
              height: customSize || 20,
              width: customSize || 20,
              fill: customColor || "black",
            }}
          />
        ) : (
          <Call
            style={{
              height: customSize || 20,
              width: customSize || 20,
              fill: customColor || "black",
            }}
          />
        )}
      </IconButton>
      {/* MESSAGE */}
      <IconButton
        onClick={(event) => setChatAnchor(event.currentTarget)}
        disabled={disableInteraction}
      >
        {propertyActions?.messaged ? (
          <ChatFocused
            style={{
              height: customSize || 20,
              width: customSize || 20,
              fill: customColor || "black",
            }}
          />
        ) : (
          <Chat
            style={{
              height: customSize || 20,
              width: customSize || 20,
              fill: customColor || "black",
            }}
          />
        )}
      </IconButton>

      <CallMenu
        anchorEl={callAnchor}
        setAnchorEl={setCallAnchor}
        phone={phoneNumber}
      />
      <ChatMenu
        anchorEl={chatAnchor}
        setAnchorEl={setChatAnchor}
        property={property}
        agent={agent}
        agency={agency}
      />

      {property && propertyActions?.shared && (
        <ShareModal
          open={propertyActions?.shared}
          setOpen={(value) => {
            setPropertyActions((prev) => ({ ...prev, shared: value }));
            shareAnalytics({
              type: "property",
              id: property?.id,
              token: currentUser?.token,
            });
          }}
          property={property}
        />
      )}
      {agent && propertyActions?.shared && (
        <ShareModal
          open={propertyActions?.shared}
          setOpen={(value) => {
            setPropertyActions((prev) => ({ ...prev, shared: value }));
            shareAnalytics({
              type: "user",
              id: agent?.id,
              token: currentUser?.token,
            });
          }}
          agent={agent}
        />
      )}
      {agency && propertyActions?.shared && (
        <ShareModal
          open={propertyActions?.shared}
          setOpen={(value) => {
            setPropertyActions((prev) => ({ ...prev, shared: value }));
            shareAnalytics({
              type: "company",
              id: agency?.id,
              token: currentUser?.token,
            });
          }}
          agency={agency}
        />
      )}
      {project && propertyActions?.shared && (
        <ShareModal
          open={propertyActions?.shared}
          setOpen={(value) => {
            setPropertyActions((prev) => ({ ...prev, shared: value }));
            shareAnalytics({
              type: "new-project",
              id: project?.id,
              token: currentUser?.token,
            });
          }}
          project={project}
        />
      )}
      {event && propertyActions?.shared && (
        <ShareModal
          open={propertyActions?.shared}
          setOpen={(value) => {
            setPropertyActions((prev) => ({ ...prev, shared: value }));
            shareAnalytics({
              type: "event",
              groupId: selectedGroup?.id,
              eventId: getEventData?.id,
              token: currentUser?.token,
            });
          }}
          event={event}
        />
      )}
    </div>
  );
};

export default IconsContainer;
