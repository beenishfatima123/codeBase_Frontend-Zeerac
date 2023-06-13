import React, { useState } from "react";
import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import LightBox from "../../globalComponents/LightBox";

/* Display images associated with a post. */
const PostImages = ({ images }) => {
  const [showLightBox, setShowLightBox] = useState();

  return (
    <Box sx={{ width: "100%" }}>
      <ImageList variant="quilted" cols={images?.length >= 2 ? 2 : 1} gap={8}>
        {images?.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={` ${item?.image}`}
              alt={item.name}
              loading="lazy"
              style={{
                borderRadius: 4,
                cursor: "pointer",
              }}
              onClick={() => setShowLightBox(true)}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {showLightBox && (
        <LightBox
          open={showLightBox}
          images={images?.map((elem) => {
            return ` ${elem?.image}`;
          })}
          setOpen={setShowLightBox}
        />
      )}
    </Box>
  );
};

export default PostImages;
