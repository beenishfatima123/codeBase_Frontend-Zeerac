import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

export const fetchTrendsData = async (country, city, area) => {
  try {
    const response = await api.get(
      `users/property-trends/?country=${country}&city=${city}&area=${area}`
    );
    if (response?.data?.status) {
      return response?.data?.result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const checkUniqueEmailExists = async (email) => {
  try {
    const response = await api.get(`users/unique-email/?email=${email}`);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const resetPassword = async (email) => {
  try {
    const response = await api.post(`users/password/code`, { email });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const createNewPassword = async (data) => {
  try {
    const response = await api.post(`users/password/reset`, data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const paginateAgents = async (currentPage) => {
  try {
    const response = await api.get(`users/agents/?page=${currentPage}`);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const fetchCompanyAgents = async (id) => {
  try {
    const response = await api.get(`users/company/${id}`);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const checkUniqueValidity = async (email) => {
  try {
    const response = await api.get(`users/unique-email/?email=${email}`);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const checkUniqueUsernameValidity = async (username) => {
  try {
    const response = await api.get(
      `users/unique-username/?username=${username}`
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const checkUniqueIdValidity = async (cnic) => {
  try {
    const response = await api.get(`users/unique-cnic/?cnic=${cnic}`);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const addAgentToDatabase = async (data) => {
  try {
    const response = await api.post(`users/user/`, data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const verifyAgent = async (code) => {
  try {
    const response = await api.post(`users/confirm/verify`, {
      code,
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const reVerify = async (email) => {
  try {
    const response = await api.post(`users/verification/code`, { email });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const fetchTutorialVideo = async (token) => {
  try {
    const response = await api.get(`users/video-course/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (response?.data?.status) {
      return response.data?.result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const submitTutorialResults = async (token, data) => {
  try {
    const response = await api.post(`users/course/performance/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const fetchAllBlogs = async () => {
  try {
    const response = await api.get(`users/blogs/`);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const verifyListingApi = async (data) => {
  try {
    const response = await api.post(`users/property-verify/`, data?.values, {
      headers: {
        Authorization: `token ${data?.token}`,
        "Content-type": "multipart/form-data",
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const verifyAgentApi = async (data) => {
  try {
    const response = await api.post(`users/agent-verify/`, data?.values, {
      headers: {
        Authorization: `token ${data?.token}`,
        "Content-type": "multipart/form-data",
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const verifyAuctionApi = async (data) => {
  try {
    const response = await api.post(
      `users/property-files-verify/`,
      data?.values,
      {
        headers: {
          Authorization: `token ${data?.token}`,
          "Content-type": "multipart/form-data",
        },
      }
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const verifyAgencyApi = async (data) => {
  try {
    const response = await api.post(`users/company-verify/`, data?.values, {
      headers: {
        Authorization: `token ${data?.token}`,
        "Content-type": "multipart/form-data",
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const searchListings = async (query) => {
  try {
    const response = await api.get(`users/property?search=${query}`, {});
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const numberAnalytics = async (data) => {
  try {
    const response = await api.post(
      `users/${data?.type}/${data?.id}/number_reveal_count/`,
      {},
      {
        headers: {
          Authorization: `Token ${data?.token}`,
        },
      }
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const shareAnalytics = async (data) => {
  try {
    const response = await api.post(
      `users/${data?.type}/${data?.id}/share_count/`,
      {},
      {
        headers: {
          Authorization: `Token ${data?.token}`,
        },
      }
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const getListingsCount = async (data) => {
  try {
    const response = await api.get(
      `users/property?search_place=${data?.country}&page_size=1`
    );
    if (response) {
      return response?.data?.result?.count;
    }
  } catch (error) {
    return false;
  }
};
