import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import userReducer from "./slices/userSlice"
import { save, load} from "./Middleware"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState: load(),
  middleware:[save]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
