import { combineReducers, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

// 持久化存储 state
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { connectStatusReducers, egmDataReducers } from "./reducers/egmReducer";
import { memberReducer } from "./reducers/memberReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["member"], // only member will be persisted
};

const reducer = combineReducers({
  connectionStatus: connectStatusReducers,
  egmData: egmDataReducers,
  member: memberReducer,
});

// 持久化根reducers
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools());

export const persisStore = persistStore(store);

export default store;
