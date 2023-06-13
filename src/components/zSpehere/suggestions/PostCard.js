import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  image: {
    width: "100%",
    minHeight: 200,
    borderRadius: 5,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
    margin: "10px 0px",
  },
  text: {
    fontSize: 16,
    color: "#415365",
  },
  "@media (max-width: 1200px)": {
    container: {
      margin: "0px 10px",
    },
    image: {
      width: 250,
      height: 100,
    },
    text: {
      fontSize: 12,
    },
  },
}));

/* contains latest posts in suggested posts. */
const PostCard = ({ post }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  /* get description of post upto 30 characters. */
  const getDescription = () => {
    if (post?.description?.length > 30)
      return `${post?.description?.slice(0, 30)}...`;
    else return post?.description;
  };
  return (
    <div className={classes.container}>
      {post?.images?.length > 0 && (
        <img
          src={` ${post?.images[0]?.image}`}
          alt=""
          className={classes.image}
        />
      )}

      <div className={classes.textContainer}>
        <span
          className={classes.text}
          style={{
            color: darkMode ? "#fff" : "#415365",
          }}
        >
          {getDescription()}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="24"
          viewBox="0 0 128 24"
        >
          <g
            id="Group_6081"
            data-name="Group 6081"
            transform="translate(-1272 -686)"
          >
            <g id="Group_31" data-name="Group 31">
              <g id="Group_59" data-name="Group 59">
                <rect
                  id="Rectangle_31"
                  data-name="Rectangle 31"
                  width="24"
                  height="24"
                  transform="translate(1344 686)"
                  fill="rgba(196,196,196,0)"
                />
                <g id="Group_58" data-name="Group 58">
                  <path
                    id="Vector"
                    d="M0,0H4.78"
                    transform="translate(1357.461 696.826) rotate(180)"
                    fill="none"
                    stroke="#545454"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.2"
                  />
                  <path
                    id="Vector-2"
                    data-name="Vector"
                    d="M0,0H5.29"
                    transform="translate(1359.971 700.116) rotate(180)"
                    fill="#fff"
                    stroke="#545454"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.2"
                  />
                  <path
                    id="Vector-3"
                    data-name="Vector"
                    d="M14.331,14.346a8.4,8.4,0,1,0-13.02-1.43L.231,15.6a.754.754,0,0,0,.98.98l2.68-1.08A8.39,8.39,0,0,0,14.331,14.346Z"
                    transform="translate(1348 690)"
                    fill="none"
                    stroke="#545454"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.2"
                  />
                </g>
              </g>
              <text
                id="_214"
                data-name="214"
                transform="translate(1376 689)"
                fill={darkMode ? "#fff" : "#545454"}
                fontSize="14"
                fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
              >
                <tspan x="0" y="15">
                  {post?.comments_count}
                </tspan>
              </text>
            </g>
            <g id="Group_33" data-name="Group 33">
              <g id="Group_57" data-name="Group 57">
                <rect
                  id="Rectangle_31-2"
                  data-name="Rectangle 31"
                  width="24"
                  height="24"
                  transform="translate(1272 686)"
                  fill="rgba(196,196,196,0)"
                />
                <path
                  id="Vector-4"
                  data-name="Vector"
                  d="M11.8,0A4.22,4.22,0,0,0,8,2.423,4.2,4.2,0,0,0,0,4.242c0,3.353,4.835,7.652,6.985,9.4a1.607,1.607,0,0,0,2.029,0C11.173,11.885,16,7.586,16,4.242A4.213,4.213,0,0,0,11.8,0Z"
                  transform="translate(1276 690)"
                  fill="none"
                  stroke="#545454"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                />
              </g>
              <text
                id="_512"
                data-name="512"
                transform="translate(1304 689)"
                fill={darkMode ? "#fff" : "#545454"}
                fontSize="14"
                fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
              >
                <tspan x="0" y="15">
                  {post?.likes_count}
                </tspan>
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PostCard;
