import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
  
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactApi } from '../services/contacts';
import filterReduser from './filter/filterSlice';

import { userApi } from '../services/users';
import auth from '../redux/auth/authSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
    reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: persistReducer(authPersistConfig, auth),
    [contactApi.reducerPath]: contactApi.reducer,
    filter: filterReduser,
  },
  
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      }).concat(userApi.middleware, contactApi.middleware),
  
    devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);