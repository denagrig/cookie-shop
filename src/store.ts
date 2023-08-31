import { configureStore } from "@reduxjs/toolkit"
import userReducer from "@src/slices/userSlice"
import errorReducer from "@src/slices/errorSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    userDataError: errorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
