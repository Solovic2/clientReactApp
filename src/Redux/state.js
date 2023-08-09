import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice';
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

export const store = configureStore({
  reducer: {
    monthYear: userSlice
  },

}, enhancers())

export default store;