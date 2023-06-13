import React from "react";
import Skeleton from "@mui/material/Skeleton";

const MapSkeleton = () => {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        sx={{
          height: 500,
          width: "100%",
        }}
      />
    </div>
  );
};

export default MapSkeleton;
