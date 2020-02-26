import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { example1Reducer } from "pages/example1/example1.store";
import { example2Reducer } from "pages/example2/example2.store";
import { example3Reducer } from "pages/example3/example3.store";
import { example3SettingsReducer } from "pages/example3/example3.settings.store";
import { useDispatch } from "react-redux";

let store = configureStore({
  reducer: combineReducers({
    ex1: example1Reducer,
    ex2: example2Reducer,
    ex3: example3Reducer,
    ex3Settings: example3SettingsReducer
  }),
  devTools: true
});

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
