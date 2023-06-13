import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useMemo } from "react";
import NotFound from "../../../../globalComponents/NotFound";
import { TextTranslation } from "../../../../../utils/translation";
import NotificationTabs from "../../../../globalComponents/Header/NotificationsMenu/NotificationTabs";
import NotificationSkeleton from "../../../../loadingSkeletons/NotificationSkeleton";
import NotificationCard from "../../../../globalComponents/Header/NotificationsMenu/NotificationCard";
import {
  NOTIFICATION_MENU_SUB_TABS,
  NOTIFICATION_MENU_TABS,
} from "../../../../../utils/constants";
import {
  clearAllNotifications,
  readAllNotifications,
} from "../../../../../redux/slices/notificationsSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    height: "max-content",
    maxHeight: 385,
    minWidth: 330,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  list: {
    padding: "0",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    backgroundColor: "transparent",
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const UnreadNotifications = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState({
    tab: NOTIFICATION_MENU_TABS[0],
    subTab: NOTIFICATION_MENU_SUB_TABS[0],
  });

  const { currentUser } = useSelector((state) => state.auth);
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const { allNotifications, unreadNotifications, notificationsApiInfo } =
    useSelector((state) => state.notification);

  const notificationsToShow = useMemo(() => {
    let _notifications = [];
    if (unreadNotifications?.results?.length > 0)
      _notifications = [
        ...unreadNotifications?.results?.filter(
          (elem) => elem?.is_active && !elem?.is_read
        ),
      ];
    return _notifications;
  }, [unreadNotifications]);

  const notificationsBadgeCount = useMemo(() => {
    // console.log({ allNotifications });
    if (allNotifications?.results?.length > 0)
      return allNotifications?.results?.filter(
        (elem) => elem?.is_active && !elem?.is_read
      )?.length;
  }, [allNotifications]);

  const handleReadAll = () => {
    let _ids = "";
    allNotifications?.results?.forEach((elem, index) => {
      if (index === 0) _ids = `${elem?.id}`;
      else _ids = `${_ids},${elem?.id}`;
    });
    dispatch(
      readAllNotifications({
        token: currentUser?.token,
        ids: _ids,
      })
    );
  };
  const handleClearAll = () => {
    let _ids = "";
    allNotifications?.results?.forEach((elem, index) => {
      if (index === 0) _ids = `${elem?.id}`;
      else _ids = `${_ids},${elem?.id}`;
    });
    dispatch(
      clearAllNotifications({
        token: currentUser?.token,
        ids: _ids,
      })
    );
  };

  return (
    <div>
      <div className={classes.container}>
        <NotificationTabs
          count={notificationsBadgeCount}
          selected={selectedTab?.tab}
          setSelected={(value) =>
            setSelectedTab((prev) => ({ ...prev, tab: value }))
          }
        />
        <div className={classes.btnContainer}>
          <Button
            sx={{
              color: "#fff",
              fontSize: 14,
              textTransform: "none",
              backgroundColor: "#134696",
              height: 30,
              m: 1,
              padding: "0 10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#134696",
              },
            }}
            onClick={handleClearAll}
          >
            {TextTranslation.clearAll[langIndex]}
          </Button>
          <Button
            sx={{
              color: "#fff",
              fontSize: 14,
              textTransform: "none",
              backgroundColor: "#134696",
              height: 30,
              m: 1,
              padding: "0 10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#134696",
              },
            }}
            onClick={handleReadAll}
          >
            {TextTranslation.markRead[langIndex]}
          </Button>
        </div>
        {notificationsApiInfo?.loadingAllNotifications ||
        notificationsApiInfo?.loadingUnread ||
        notificationsApiInfo?.loadingReadAll ||
        notificationsApiInfo?.loadingClearAll ? (
          <div
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
              padding: "10px 16px",
            }}
          >
            <NotificationSkeleton customSize={{ height: 40, width: 40 }} />
          </div>
        ) : (
          <div
            className={classes.cardContainer}
            style={{
              backgroundColor: darkMode ? "#212124" : "#fff",
            }}
          >
            {notificationsToShow?.length > 0 ? (
              <>
                {notificationsToShow?.map((elem, index) => (
                  <NotificationCard
                    notification={elem}
                    key={index}
                    // handleClose={handleClose}
                  />
                ))}
              </>
            ) : (
              <NotFound
                label={TextTranslation.allCaughtUp[langIndex]}
                customTextStyle={{
                  margin: "8px 16px",
                  fontFamily: "medium",
                  fontSize: 16,
                }}
              />
            )}
          </div>
        )}

        {/* <div className={classes.bottom}>
          <Button
            fullWidth
            sx={{
              color: "#fff",
              fontSize: 14,
              textTransform: "none",
              p: 0,
              width: "45%",
            }}
            //onClick={handleClearAll}
          >
            {TextTranslation.clearAll[langIndex]}
          </Button>
          <div style={{ height: 20, width: 2, backgroundColor: "#fff" }} />
          <Button
            fullWidth
            sx={{
              color: "#fff",
              fontSize: 14,
              textTransform: "none",
              p: 0,
              width: "45%",
            }}
            //onClick={handleReadAll}
          >
            {TextTranslation.markRead[langIndex]}
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default UnreadNotifications;
