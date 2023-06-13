import BlogsContainer from "../components/zSpehere/blogs/BlogsContainer";
import CeoClubContainer from "../components/zSpehere/ceoClub/CeoClubContainer";
import FeedContainer from "../components/zSpehere/feed/FeedContainer";
import GroupsContainer from "../components/zSpehere/groups/GroupsContainer";
import NewsContainer from "../components/zSpehere/news/NewsContainer";
import PodcastsContainer from "../components/zSpehere/podcast/PodcastsContainer";
import { SOCIAL_CONTENT_SELECTION } from "./constants";

export const getCorrespondingContent = (path) => {
  switch (path) {
    case SOCIAL_CONTENT_SELECTION[0]:
      return <FeedContainer />;
    case SOCIAL_CONTENT_SELECTION[1]:
      return <NewsContainer />;
    case SOCIAL_CONTENT_SELECTION[2]:
      return <BlogsContainer />;
    case SOCIAL_CONTENT_SELECTION[3]:
      return <PodcastsContainer />;
    case SOCIAL_CONTENT_SELECTION[4]:
      return <GroupsContainer />;
    case SOCIAL_CONTENT_SELECTION[5]?.replace(" ", "_"):
      return <CeoClubContainer />;
    default:
      return <FeedContainer />;
  }
};
