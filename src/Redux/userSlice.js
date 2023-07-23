import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
  name: 'user',
  initialState :{
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
        state.user =  action.payload
    },
    removeUser: (state) => {
        state.user =  null
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer