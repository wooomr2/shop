import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./slice/authSlice";
import brandReducer from "./slice/brandSlice";
import cartReducer from "./slice/cartSlice";
import categoryReducer from "./slice/categorySlice";
import collectionReducer from "./slice/collectionSlice";
import lookbookReducer from "./slice/lookbookSlice";
import modalReducer from "./slice/modalSlice";
import productReducer from "./slice/productSlice";
import screenReducer from "./slice/screenSlice";
import userReducer from "./slice/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth", "user","collection","lookbook","modal","product","review","screen"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  brand: brandReducer,
  cart: cartReducer,
  category: categoryReducer,
  collection: collectionReducer,
  lookbook: lookbookReducer,
  modal: modalReducer,
  product: productReducer,
  screen: screenReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
