import { useEffect, useState } from "react";
import _debounce from "lodash/debounce";
import { useCallback } from "react";
import { useSelector } from "react-redux";

/*
  Custom hook for debouncing search functionality.

  Parameters:
  - query: Current search query.
  - searchFunction: Function to perform the search.
  - extraArgs: Extra arguments for the search function.

  Returns:
  - loading: Boolean value indicating if the search is in progress.
  - searchResult: Result of the search.
*/
const useDebounceSearch = (query, searchFunction, extraArgs) => {
  // console.log({ extraArgs });
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();

  const { currentUser } = useSelector((state) => state.auth);
  /*
    Debounced function that handles the search with the given query.
  */
  const handleDebounceFn = async (arg) => {
    // console.log({ arg });
    setLoading(true);
    const response = await searchFunction({
      query: arg,
      token: currentUser?.token,
      extraArgs,
    });
    if (response) setSearchResult(response);
    setLoading(false);
  };

  /*
    Create a debounced version of the handleDebounceFn using lodash's debounce function.
  */
  // eslint-disable-next-line
  const debounceFn = useCallback(
    _debounce(handleDebounceFn, extraArgs?.timeout || 500),
    []
  );

  /*
   Effect for conditional debounce function call
   */
  useEffect(() => {
    if (query?.length > (extraArgs?.minLength || 2)) {
      debounceFn(query);
    }
    // eslint-disable-next-line
  }, [query, extraArgs?.minLength]);

  return { loading, searchResult };
};

export default useDebounceSearch;
