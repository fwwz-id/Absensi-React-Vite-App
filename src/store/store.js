import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

import authReducer from "./auth/auth.slice";
import disicplesReducer from "./data/disciples/disciples.slice";

const reducer = {
	auth: authReducer,
	disciples: disicplesReducer,
};

const store = configureStore({
	reducer,
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
