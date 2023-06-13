import React, { useMemo, useState } from "react";
import { Button, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CONTENT_WIDTH, SETTING_URLS } from "../../../../utils/constants";
import coverImage from "../../../../assets/defaultAssets/podcastBackground.png";
import { useNavigate, useParams } from "react-router";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import AddIcon from "@mui/icons-material/Add";
import lines from "../../../../assets/zSpehere/pattern1.png";
import { followAgent } from "../../../../api/socialApi";
import { setZsphereData } from "../../../../redux/slices/authSlice";

const useStyles = makeStyles(() => ({
  container: {
    width: CONTENT_WIDTH,
    maxWidth: "95%",
    margin: "auto",
  },
  pattern: {
    position: "absolute",
    top: 80,
    right: 150,
    width: "100%",
    zIndex: -1,
  },
  innerContainer: {
    height: 300,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    margin: "10px 0",
  },

  cover: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    zIndex: 10,
    //marginTop: 20,
  },
  editProfile: {
    position: "absolute",
    right: 20,
    marginTop: 20,
    backgroundColor: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    cursor: "pointer",
    height: 40,
    width: 100,
    borderRadius: 10,
    fontFamily: "medium",
    fontSize: 14,
  },
  userContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 10%",
  },
  profileImage: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: 5,
    border: "2px solid #134696",
    marginTop: -100,
    zIndex: 20,
  },
  name: {
    textTransform: "capitalize",
    color: "#134696",
    fontFamily: "medium",
    fontSize: 26,
  },
  username: {
    color: "#B5B5BE",
    fontFamily: "medium",
    fontSize: 18,
  },
  leftContainer: {
    display: "flex",
  },
  rightContainer: {
    display: "flex",
  },
  follow: {
    backgroundColor: "#134696",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    height: 40,
    width: 100,
    borderRadius: 5,
    fontFamily: "medium",
    fontSize: 14,
    marginRight: 5,
  },
  invite: {
    backgroundColor: "#f1f1f5",
    border: "none",
    color: "#696974",
    cursor: "pointer",
    height: 40,
    width: 100,
    borderRadius: 5,
    fontFamily: "medium",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  "@media (max-width: 800px)": {
    userContainer: {
      margin: "0 16px",
    },
  },
  "@media (max-width: 650px)": {
    rightContainer: {
      display: "flex",
      flexDirection: "column",
    },

    profileImage: {
      width: 100,
      height: 100,
      marginTop: -50,
    },
    follow: {
      marginBottom: 5,
    },
  },
  "@media (max-width: 500px)": {
    userContainer: {
      flexDirection: "column",
    },
    rightContainer: {
      display: "flex",
      flexDirection: "row",
      alignSelf: "flex-end",
      margin: "10px 0px",
    },
    follow: {
      marginRight: 5,
    },
    innerContainer: {
      height: "auto",
    },
  },
}));

/* Top profile cover on the member detail container. */
const TopHeader = ({ openEdit }) => {
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedMember } = useSelector((state) => state.zSphereMembers);
  const { currentUser, zsphereData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  // console.log({ selectedMember, currentUser });
  const isFollowing = useMemo(() => {
    // console.log({ currentUser, params, zsphereData });

    let _following = false;
    // console.log({ zsphereData });
    zsphereData?.followingIds?.forEach((element) => {
      if (element + "" === selectedMember?.id + "") _following = true;
    });
    return _following;
  }, [zsphereData?.followingIds, selectedMember]);

  /* Action handler on follow/unfollow */
  const handleFollow = async () => {
    setLoading(true);
    const response = await followAgent({
      token: currentUser?.token,
      id: params?.id,
    });
    if (response) {
      if (response?.Following === "false") {
        dispatch(
          setZsphereData({
            ...zsphereData,
            followingIds: zsphereData?.followingIds?.filter(
              (elem) => elem + "" !== params?.id + ""
            ),
            following: {
              ...zsphereData?.following,
              count: zsphereData?.following?.count - 1,
              results: zsphereData?.following?.results?.filter(
                (elem) => elem?.id + "" !== params?.id + ""
              ),
            },
          })
        );
      } else if (response?.Following === "true") {
        dispatch(
          setZsphereData({
            ...zsphereData,
            followingIds: [...zsphereData?.followingIds, selectedMember?.id],
            following: {
              ...zsphereData?.following,
              count: zsphereData?.following?.count + 1,
              results: [...zsphereData?.following?.results, selectedMember],
            },
          })
        );
      }
      // console.log({ response });
    }
    setLoading(false);
  };
  return (
    <>
      <div className={classes.container}>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            margin: "5px 0",
          }}
        >
          <Button
            sx={{
              background:
                "linear-gradient(90deg, rgba(14,216,100,0.9) 0%, rgba(0,0,0,0) 100%)",
              textTransform: "none",
              color: "#134696",
              width: 150,
              ml: 3,
              mt: 2,
              borderRadius: 0,
            }}
            startIcon={
              <KeyboardBackspaceSharpIcon
                style={{ color: "#134696", marginLeft: -30 }}
              />
            }
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
        <img alt="" src={lines} className={classes.pattern} />
        <div className={classes.innerContainer}>
          <div style={{ position: "relative" }}>
            {currentUser?.id + "" === selectedMember?.id + "" && (
              // <button className={classes.editProfile} onClick={openEdit}>
              //   Edit Profile
              // </button>
              <button
                className={classes.editProfile}
                onClick={() => {
                  navigate(`/settings/${SETTING_URLS?.PROFILE}`);
                }}
              >
                Edit Profile
              </button>
            )}

            <img
              className={classes.cover}
              alt=""
              src={
                currentUser?.cover_photo ? currentUser?.cover_photo : coverImage
              }
            />
          </div>
          <div className={classes.userContainer}>
            <div className={classes.leftContainer}>
              <img
                className={classes.profileImage}
                alt=""
                src={selectedMember?.photo}
              />
              <div style={{ marginLeft: 10 }}>
                <div className={classes.name}>{selectedMember?.full_name}</div>
                <div className={classes.username}>{selectedMember?.handle}</div>
              </div>
            </div>
            <div className={classes.rightContainer}>
              {currentUser?.id + "" !== selectedMember?.id + "" && (
                <>
                  {loading ? (
                    <>
                      <Skeleton
                        height={40}
                        width={100}
                        variant="rectangular"
                        sx={{ marginRight: "5px" }}
                      />
                      <Skeleton height={40} width={100} variant="rectangular" />
                    </>
                  ) : (
                    <>
                      {" "}
                      <button
                        className={classes.follow}
                        onClick={handleFollow}
                        disabled={loading}
                        style={{
                          backgroundColor: isFollowing ? "white" : "#134696",
                          color: isFollowing ? "#415365" : "white",
                          border: isFollowing ? "1px solid #B7C1CF" : "none",
                        }}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                      <button className={classes.invite}>
                        <AddIcon sx={{ color: "#696974", fontSize: 16 }} />
                        <span>Invite</span>
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
