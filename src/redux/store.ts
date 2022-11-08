import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["api", "offlineData"],
    debug: true,
    stateReconciler: autoMergeLevel2,
    writeFailHandler: (err) => {
      console.log(err);
    },
  },
  rootReducer
);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default store;
