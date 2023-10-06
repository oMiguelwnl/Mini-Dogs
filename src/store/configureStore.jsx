import { combineReducers, configureStore } from '@reduxjs/toolkit';
import login from './login';
import photos from './photos';

import localStorageMiddleware from './middleware/localStorage';

const reducer = combineReducers({ login, photos });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    localStorageMiddleware,
  ],
});

export default store;
