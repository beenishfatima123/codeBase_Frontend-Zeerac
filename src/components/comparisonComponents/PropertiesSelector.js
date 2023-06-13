import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import SmallSearchbar from "../../components/globalComponents/misc/SmallSearchbar";
import defaultImage from "../../assets/home/footer/post_1.png";
import CardSvg from "./svgs/CardSvg";
import { currencyFormatInitials } from "../../utils/helperFunctions";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import {
  getAllGlobalProperties,
  queryProperties,
} from "../../redux/slices/propertiesSlice";
import { useState } from "react";
import { useMemo } from "react";
import { debounce } from "lodash";
import NotFound from "../globalComponents/NotFound";
import OriginalPriceInfo from "../globalComponents/OriginalPriceInfo";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #707070",
    borderRadius: 10,
    padding: "20px 10px",
    height: 920,
    marginLeft: 10,
    overflowY: "scroll",
    overflowX: "hidden",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #707070",
    paddingBottom: 10,
    margin: "10px 0px",
    cursor: "pointer",
  },
  thumbnail: {
    height: 85,
    width: 110,
    borderRadius: 5,
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  location: {
    color: "#1A2954",
    fontSize: 12,
  },
  description: {
    color: "#1A2954",
    fontSize: 12,
    fontFamily: "heavy",
    textTransform: "capitalize",
  },
  price: {
    color: "#134696",
    fontSize: 12,
    fontFamily: "heavy",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

const PropertiesSelector = ({ add }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode } = useSelector((state) => state.global);

  const { allGlobalProperties, allGlobalPropertiesApiInfo } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    // // console.log({ allGlobalProperties });
    if (!allGlobalProperties) {
      // // console.log("sending request");
      dispatch(getAllGlobalProperties());
    }
    // eslint-disable-next-line
  }, [allGlobalProperties]);
  useEffect(() => {
    // // console.log({ searchQuery });
    if (searchQuery?.length >= 3) delayedSearch(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]);
  const delayedSearch = useMemo(
    () => debounce((query) => searchProperties(query), 500),
    // eslint-disable-next-line
    []
  );
  const searchProperties = async (query) => {
    dispatch(
      queryProperties({
        query,
        destination: "global",
      })
    );
  };
  // eslint-disable-next-line
  const getImage = (property) => {
    if (property?.image?.length) return `${property?.image[0]?.image}`;
    else if (property?.floor_image?.length)
      return `${property?.floor_image[0]?.floor_image}`;
    else return defaultImage;
  };

  return (
    <div className={classes.container}>
      <SmallSearchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        style={{
          color: darkMode ? "#fff" : "#000",
        }}
      />
      <div style={{ margin: "10px 0px" }}>
        {allGlobalPropertiesApiInfo?.loading ? (
          <ComponentLoader />
        ) : (
          <>
            {allGlobalProperties?.result?.results?.length > 0 ? (
              allGlobalProperties?.result?.results?.map((elem, index) => (
                <div
                  key={index}
                  className={classes.card}
                  onClick={() => add(elem)}
                >
                  <img
                    src={getImage(elem)}
                    alt=""
                    className={classes.thumbnail}
                  />

                  <div className={classes.contentContainer}>
                    <CardSvg property={elem} />
                    <span
                      className={classes.location}
                      style={{
                        color: darkMode ? "#fff" : "#1A2954",
                      }}
                    >
                      {`${elem?.street}, ${elem?.area}, ${elem?.city}`}
                    </span>
                    <span
                      className={classes.description}
                      style={{
                        color: darkMode ? "#fff" : "#1A2954",
                      }}
                    >
                      {`${elem?.title}`}
                    </span>
                    <span
                      className={classes.price}
                      style={{
                        color: darkMode ? "#0ed864" : "#134696",
                        display: "flex",
                      }}
                    >
                      {`${currencyFormatInitials(elem?.price, elem?.currency)}`}
                      <span style={{ marginLeft: 5 }}>
                        <OriginalPriceInfo
                          customStyle={{ width: "15px", height: "13px" }}
                          price={elem?.price}
                          currency={elem?.currency}
                        />
                      </span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <NotFound label={"No Results Found"} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesSelector;
