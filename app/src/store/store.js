import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import { api } from "./api/base";

const reducers = combineReducers({
    auth: userReducer,
    [api.reducerPath]: api.reducer
})

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaulMiddleware) => (
        getDefaulMiddleware().concat(api.middleware)
    )
})

export default store;
