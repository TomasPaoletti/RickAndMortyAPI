import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import modalReducer from './reducers/modalSlice'
import actionsReducer from './reducers/actionsSlice'
import userReducer from "./reducers/userSlice";

export default configureStore({
    reducer: {
        modal: modalReducer,
        actions: actionsReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});