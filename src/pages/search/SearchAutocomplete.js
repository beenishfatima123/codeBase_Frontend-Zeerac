import React, { useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { SEARCH_OPTIONS } from "../../utils/constants";
import { useSelector } from "react-redux";

const SearchAutocomplete = ({ handleSearch }) => {
  const { langIndex } = useSelector((state) => state.global);

  const searchOptions = useMemo(() => {
    return SEARCH_OPTIONS?.map((elem) => {
      return { label: elem?.label[langIndex] };
    });
  }, [langIndex]);

  return (
    <Autocomplete
      sx={{
        display: "flex",
        flex: 1,
        zIndex: 1510,
      }}
      options={searchOptions}
      // options={[]}
      onChange={(e) => {
        handleSearch(e.target.textContent);
      }}
      renderInput={(params) => (
        <div
          ref={params.InputProps.ref}
          style={{ width: "100%", zIndex: 1510 }}
        >
          <input
            type="text"
            {...params.inputProps}
            className="search-input"
            placeholder="Search Here"
          />
        </div>
      )}
    />
  );
};

export default SearchAutocomplete;
