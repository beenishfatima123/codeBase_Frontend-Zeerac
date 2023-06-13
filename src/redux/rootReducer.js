import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import auctionSlice from "./slices/auctionSlice";
import agentsSlice from "./slices/agentsSlice";
import authSlice from "./slices/authSlice";
import globalSlice from "./slices/globalSlice";
import postsSlice from "./slices/postsSlice";
import projectSlice from "./slices/projectSlice";
import propertiesSlice from "./slices/propertiesSlice";
import trendsSlice from "./slices/trendsSlice";
import userPreferences from "./slices/userPreferences";
import storageSession from "redux-persist/lib/storage/session";
import createPropertySlice from "./slices/createPropertySlice";
import createAccountSlice from "./slices/createAccountSlice";
import partnersSlice from "./slices/partnersSlice";
import courseSlice from "./slices/courseSlice";
import settingsSlice from "./slices/settingsSlice";
import newsSlice from "./slices/newsSlice";
import chatSlice from "./slices/chatSlice";
import contactUsSlice from "./slices/contactUsSlice";
import verificationRequestsSlice from "./slices/verificationRequestsSlice";
import notificationsSlice from "./slices/notificationsSlice";
import preferenceSlice from "./slices/preferenceSlice";
import zSphereMemberSlice from "./slices/zSphereMemberSlice";
import zSphereEventSlice from "./slices/zSphereEventSlice";
import groupsSlice from "./slices/groupsSlice";
import servicesSlice from "./slices/servicesSlice";
import zSphereCEOSlice from "./slices/zSphereCEOSlice";

const authPersistConfig = {
  key: "auth",
  storage: storageSession,
};
export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  preferences: userPreferences,
  global: globalSlice,
  partners: partnersSlice,
  projects: projectSlice,
  properties: propertiesSlice,
  trends: trendsSlice,
  agents: agentsSlice,
  posts: postsSlice,
  auction: auctionSlice,
  createProperty: createPropertySlice,
  createAccount: createAccountSlice,
  course: courseSlice,
  settings: settingsSlice,
  news: newsSlice,
  chat: chatSlice,
  contactUs: contactUsSlice,
  verification: verificationRequestsSlice,
  notification: notificationsSlice,
  preference: preferenceSlice,
  services: servicesSlice,
  zSphereMembers: zSphereMemberSlice,
  zSphereEvents: zSphereEventSlice,
  groups: groupsSlice,
  zSphereCEO: zSphereCEOSlice,
});
