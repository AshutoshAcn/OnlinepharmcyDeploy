import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import { thunk } from "redux-thunk";
import { Reducer as AuthReducer } from "./AuthReducer/reducer";
import { Reducer as AppReducer } from "./AppReducer/reducer";
import { Reducer as ItemsReducer } from "./ItemsReducer/reducer";
import { Reducer as SupplyReducer } from "./SupplyReducer/reducer";
import { Reducer as SpecificReducer } from "./SpecificReducer/reducer";
import { Reducer as PageAccessMasterReducer } from "./PageAccessMasterReducer/reducer";
import { Reducer as ReportReducer } from "./ReportReducer/reducer";


import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    AuthReducer,
    AppReducer,
    ItemsReducer,
    SupplyReducer,
    SpecificReducer,
    PageAccessMasterReducer,
    ReportReducer
  },
});
