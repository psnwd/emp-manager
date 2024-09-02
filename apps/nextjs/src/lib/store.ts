import { combineReducers, configureStore } from "@reduxjs/toolkit";

import employeeSlice from "./features/employeeSlice";

export const makeStore = () => {
  const rootReducer = combineReducers({
    employee: employeeSlice,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  return { store };
};

// Define the type for the store and persistor
export type AppStore = ReturnType<typeof makeStore>["store"];

// Define the RootState and AppDispatch types
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
