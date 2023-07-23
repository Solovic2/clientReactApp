import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
  reducer: {
    user: persistedReducer
  },
  middleware: [thunk],
}, enhancers())

export const persistor = persistStore(store);