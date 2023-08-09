import { createSlice } from '@reduxjs/toolkit'
export const monthYearSlice = createSlice({
  name: 'monthYear',
  initialState :{
    monthYear: '',
  },
  reducers: {
    setMonthYear: (state, action) => {
        state.monthYear =  action.payload
    },
    
  },
})



// Action creators are generated for each case reducer function
export const { setMonthYear } = monthYearSlice.actions

export default monthYearSlice.reducer