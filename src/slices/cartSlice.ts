import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit"
import { Cookies } from "../types"
import { RootState } from "../store"


export interface CartState {
  items: Cookies[];
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number>) {
      const id = action.payload
      let AlreadyInCart = false
      for (let i = 0; i < state.items.length; i++) {
        if (id == state.items[i].id) {
          AlreadyInCart = true
          state.items[i].count++
          break
        }
      }
      if (!AlreadyInCart) {
        const newCookie: Cookies = {
          id: id,
          count: 1,
        }
        state.items.push(newCookie)
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload
      for (let i = 0; i < state.items.length; i++) {
        if (id == state.items[i].id) {
          if (state.items[i].count > 1) {
            state.items[i].count--
          } else 
            state.items.splice(i, 1)
        }
      }
    },
    removeAll(state){
      state.items = []
    }
  },
})

export const { addToCart, removeFromCart, removeAll } = cartSlice.actions
export default cartSlice.reducer
export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let numItems = 0
    for (const id in items) {
      numItems += items[id].count
    }
    return numItems
  }
)
