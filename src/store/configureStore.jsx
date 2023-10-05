import { combineReducers, configureStore } from '@reduxjs/toolkit';
import login from './login';
import localStorageMiddleware from './middleware/localStorage';

const reducer = combineReducers({ login });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    localStorageMiddleware,
  ],
});

export default store;
