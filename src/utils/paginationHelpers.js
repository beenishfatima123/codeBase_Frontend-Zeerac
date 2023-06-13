export const handleScrollPagination = (event, loading, apiCall) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  if (scrollTop + clientHeight === scrollHeight) {
    if (!loading) apiCall();
  }
};
export const updatePaginatedData = (data, setData, paginationUrl) => {
  if (data?.result?.results?.length) {
    if (!data?.result?.previous) setData(data?.result?.results);
    else if (data?.result?.next !== paginationUrl)
      setData((prev) => [...prev, ...data?.result?.results]);
  }
};
