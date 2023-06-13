import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

export const postNestedComment = async (data) => {
  try {
    const response = await api.post(`zsphere/comments/`, data?.values, {
      headers: {
        Authorization: `token ${data?.token}`,
      },
    });
    if (response) {
      return response.data?.result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const followAgent = async (data) => {
  try {
    const response = await api.post(
      `users/user/${data?.id}/toggle_follow/`,
      {},
      {
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }
    );
    if (response) {
      return response.data?.result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const reactToComment = async (data) => {
  try {
    const response = await api.post(`zsphere/reactions/`, data.values, {
      headers: {
        Authorization: `token ${data?.token}`,
      },
    });
    if (response) {
      return response.data?.result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const updateCommentReaction = async (data) => {
  try {
    const response = await api.put(
      `zsphere/reactions/${data?.reactionId}/`,
      data.values,
      {
        headers: {
          Authorization: `token ${data?.token}`,
        },
      }
    );
    if (response) {
      return response.data?.result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const searchSocialFeed = async (data) => {
  try {
    const response = await api.get(
      `zsphere/posts/?search=${data?.searchQuery}`,
      {
        headers: data?.token
          ? {
              Authorization: `token ${data?.token}`,
            }
          : {},
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
export const fetchReactions = async (data) => {
  try {
    const response = await api.get(`zsphere/reactions/${data?.query}`, {
      headers: data?.token
        ? {
            Authorization: `token ${data?.token}`,
          }
        : {},
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
export const fetchFollowersCount = async (data) => {
  try {
    const response = await api.get(
      `users/user/${data?.id}/followers/?page_size=0`,
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );
    if (response) {
      return response.data?.result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const fetchFollowingCount = async (data) => {
  try {
    const response = await api.get(
      `users/user/${data?.id}/following/?page_size=0`,
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );
    if (response) {
      return response.data?.result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const fetchMemberProfile = async (data) => {
  try {
    const response = await api.get(`users/agents/${data?.id}`);
    if (response) {
      return response.data?.agent;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const fetchSearchedMods = async (data) => {
  try {
    const response = await api.get(
      `zsphere/groups/${data?.id}/moderators/?search=${data?.query}`
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
export const fetchSearchedMembers = async (data) => {
  try {
    const response = await api.get(
      `zsphere/groups/${data?.id}/members/?search=${data?.query}`
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
export const inviteMemberToGroup = async (data) => {
  try {
    const response = await api.post(`zsphere/group-invites/`, data?.values, {
      headers: data?.token
        ? {
            Authorization: `Token ${data.token}`,
          }
        : {},
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const rejectInvite = async (data) => {
  try {
    const response = await api.post(
      `zsphere/group-invites/${data?.id}/reject/`,
      {},
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const acceptInvite = async (data) => {
  try {
    const response = await api.post(
      `zsphere/group-invites/${data?.id}/accept/`,
      {},
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const joinGroup = async (data) => {
  try {
    const response = await api.post(
      `zsphere/groups/${data?.id}/join/`,
      {},
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );
    if (response) {
      return data?.user;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const leaveGroup = async (data) => {
  try {
    const response = await api.post(
      `zsphere/groups/${data?.id}/leave/`,
      {},
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );
    if (response) {
      return data?.user;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const searchNews = async (data) => {
  try {
    const response = await api.get(`users/news/?search=${data?.query}`, {
      headers: data?.token
        ? {
            Authorization: `Token ${data.token}`,
          }
        : {},
    });
    if (response) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const searchBlogs = async (data) => {
  try {
    const response = await api.get(`users/blogs/?search=${data?.query}`, {
      headers: data?.token
        ? {
            Authorization: `Token ${data.token}`,
          }
        : {},
    });
    if (response) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const searchGroups = async (data) => {
  try {
    const response = await api.get(`zsphere/groups/?search=${data?.query}`, {
      headers: data?.token
        ? {
            Authorization: `Token ${data.token}`,
          }
        : {},
    });
    if (response) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const paginateGroups = async (data) => {
  try {
    const response = await axios.get(data.url);
    if (response) {
      return response?.data;
    }
  } catch (error) {
    return (
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    );
  }
};
export const searchPastEvents = async (data) => {
  try {
    const response = await api.get(
      `zsphere/events/?group=${data?.extraArgs?.groupId}&past=true&search=${data?.query}`,
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );
    if (response) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const searchUpcomingEvents = async (data) => {
  try {
    const response = await api.get(
      `zsphere/events/?group=${data?.extraArgs?.groupId}&past=false&search=${data?.query}`,
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );

    if (response) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const searchCEOPastEvents = async (data) => {
  try {
    const response = await api.get(
      `zsphere/events/?past=true&search=${data?.query}&ceo_club=${true}`,
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );
    if (response) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
export const searchCEOUpcomingEvents = async (data) => {
  try {
    const response = await api.get(
      `zsphere/events/?past=false&search=${data?.query}&ceo_club=${true}`,
      {
        headers: data?.token
          ? {
              Authorization: `Token ${data.token}`,
            }
          : {},
      }
    );

    if (response) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
