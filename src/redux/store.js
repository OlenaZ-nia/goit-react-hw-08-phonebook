import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
  
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactApi } from '../services/api';
import filterReduser from './filterSlice';

export const store = configureStore({
    reducer: {
        [contactApi.reducerPath]: contactApi.reducer,
        filter: filterReduser,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        contactApi.middleware,
        // logger,
    ],
    devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);