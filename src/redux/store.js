import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "auction",
    "projects",
    "posts",
    "auth",
    // "global",
    "agents",
    "createProperty",
    "createAccount",
    "course",
    "news",
    "chat",
    "partners",
    "properties",
    "settings",
    // "trends",
    "verification",
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // .concat(logger),
});
export const persistedStore = persistStore(store);
