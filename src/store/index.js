import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import keywordSlice from './reducers/keywordSlice';
import { api } from '../service/api';

const reducers = combineReducers({
  keyword: keywordSlice,
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

setupListeners(store.dispatch);
