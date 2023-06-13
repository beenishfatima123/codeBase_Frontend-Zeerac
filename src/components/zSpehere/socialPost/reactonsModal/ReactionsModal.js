import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Modal } from "@mui/material";
import { useSelector } from "react-redux";
import LoginContainer from "../../../loginComponents/LoginContainer";
import { fetchReactions } from "../../../../api/socialApi";
import { EMOJI_REACTIONS } from "../../../../utils/constants";
import UserCard from "../../suggestions/UserCard";
import UserSkeleton from "../../../loadingSkeletons/UserSkeleton";
import Top from "./Top";

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    maxHeight: "90%",
    maxWidth: "95%",
    overflowY: "scroll",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0px",
    borderBottom: "1px solid lightGray",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 16px",
  },
  heading: {
    color: "#014493",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "heavy",
  },
  contentContainer: {
    display: "flex ",
    padding: "4px 16px",
    flexDirection: "column",
    height: 380,
    overflow: "scroll",
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  subText: {
    color: "#014493",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    width: "100%",
    margin: "10px 0px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 30,
    backgroundColor: "#F0F2F5",
    flex: 1,
    height: 40,
    margin: 10,
  },
  input: {
    display: "flex",
    flex: 1,
    border: "none",
    backgroundColor: "#F0F2F5",
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
  },
  profileMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    position: "relative",
  },
  postImg: {
    margin: "auto",
    width: "100%",
    height: 170,
    borderRadius: 8,
    border: "2px solid #014493",
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "cover",
    position: "relative",
  },
  fileUpload: {
    position: "absolute",
    color: "#fff",
    backgroundColor: "#014493",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 1,
  },
  noResults: {
    color: "#014493",
    fontFamily: "Poopins-Bold",
    fontSize: 30,
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

/* By clicking on reaction count container on the post we can see who reacted with which reaction on the post on this Modal. */
const ReactionsModal = ({ isOpen, setOpen, post, comment }) => {
  const classes = useStyles();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { darkMode } = useSelector((state) => state.global);

  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState({});

  /* gets all the filtered reactions made on the post. */
  const reactionsToShow = useMemo(() => {
    return EMOJI_REACTIONS?.filter((elem) => {
      if (post?.reactions?.[`${elem?.label}`] > 0) {
        return true;
      } else if (comment?.reactions?.[`${elem?.label}`] > 0) {
        return true;
      } else return false;
    });
  }, [post, comment]);

  /* retrieve all the reactions made on post or a comment when it appears. */
  useEffect(() => {
    if (post)
      getAllReactions(
        `?post_id=${post?.id}${
          selectedTab !== "All" ? `&reaction=${selectedTab}` : ""
        } `
      );
    else if (comment)
      getAllReactions(
        `?comment_id=${comment?.id}${
          selectedTab !== "All" ? `&reaction=${selectedTab}` : ""
        } `
      );
    // eslint-disable-next-line
  }, [post, comment, selectedTab]);

  /* fetch reactions and people accounts from the store, until then, load. */
  const getAllReactions = async (query) => {
    // console.log({ query, selectedTab });
    if (!people?.[selectedTab]) {
      setLoading(true);
      const reactionsResponse = await fetchReactions({
        query,
        token: currentUser?.token,
      });
      if (reactionsResponse) {
        // console.log({ reactionsResponse });
        setPeople((prev) => ({
          ...prev,
          [selectedTab]: reactionsResponse?.result,
        }));
      }
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen(false)}
      disableEnforceFocus
      disableAutoFocus
      disablePortal
    >
      <div
        className={classes.container}
        style={{
          backgroundColor: darkMode ? "#212124" : "#fff",
          width: currentUser ? 500 : "",
        }}
      >
        {currentUser ? (
          <>
            <Top
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
              reactionsToShow={reactionsToShow}
              post={post}
              comment={comment}
              handleClose={() => setOpen(false)}
            />
            <div className={classes.contentContainer}>
              {loading ? (
                <>
                  {Array.from(new Array(5))?.map((elem, index) => (
                    <UserSkeleton key={index} />
                  ))}
                </>
              ) : (
                <>
                  {people?.[selectedTab]?.results?.map((elem, index) => (
                    <UserCard
                      user={elem?.user_fk}
                      key={index}
                      customStyle={{ maxWidth: "100%" }}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        ) : (
          <LoginContainer
            style={{ backgroundColor: "white", alignSelf: "center" }}
          />
        )}
      </div>
    </Modal>
  );
};

export default ReactionsModal;
