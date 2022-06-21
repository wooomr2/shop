import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/authSlice";
import brandReducer from "./slice/brandSlice";
import cartReducer from "./slice/cartSlice";
import categoryReducer from "./slice/categorySlice";
import collectionReducer from "./slice/collectionSlice";
import lookbookReducer from "./slice/lookbookSlice";
import productReducer from "./slice/productSlice";
import reviewReducer from "./slice/reviewSlice";
import userReducer from "./slice/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    "auth",
    // "brand",
    // "cart",
    // "category",
    "collection",
    "lookbook",
    "product",
    "review",
    "user",
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  brand: brandReducer,
  cart: cartReducer,
  category: categoryReducer,
  collection: collectionReducer,
  lookbook: lookbookReducer,
  product: productReducer,
  review: reviewReducer,
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
