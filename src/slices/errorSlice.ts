import {
  createSlice,
} from "@reduxjs/toolkit"
import { logIn, register } from "./userSlice"
import { UserStatus } from "@src/data"

export interface ErrorState {
    hasErrorInUserData: boolean;
}

const initialState: ErrorState = {
  hasErrorInUserData: false,
}

const errorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    removeError(state) {
      state.hasErrorInUserData = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload.userID == UserStatus.LogedOut)
        state.hasErrorInUserData = true
    })
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.userID == UserStatus.LogedOut) 
        state.hasErrorInUserData = true
    })
  },
})

export const { removeError } = errorSlice.actions
export default errorSlice.reducer
