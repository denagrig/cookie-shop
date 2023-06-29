import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import registerReducer from "./slices/registerSlice"
import loginReducer from "./slices/logInSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    register: registerReducer,
    login: loginReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
