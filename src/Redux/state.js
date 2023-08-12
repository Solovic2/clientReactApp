import { configureStore } from '@reduxjs/toolkit'
import monthYearSlice from './monthYearSlice';
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

export const store = configureStore({
  reducer: {
    monthYear: monthYearSlice
  },

}, enhancers())

export default store;