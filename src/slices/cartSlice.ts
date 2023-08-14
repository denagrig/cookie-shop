import { PayloadAction, createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit"
import { Cookies, CurUserIdAndCart } from "../types"
import { RootState } from "../store"
import { getUserCart, setUserCart } from "./cartLocalStorage"


export const loadCart = createAsyncThunk<Cookies[], number>(
  "cartSlice/load",
  async (id: number, thunkAPI) => {
    try {
      return await getUserCart(id)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const saveCart = createAsyncThunk<Cookies[], CurUserIdAndCart>(
  "cartSlice/sace",
  async (cart: CurUserIdAndCart, thunkAPI) => {
    try {
      return await setUserCart(cart)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

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
      let alreadyInCart = false
      const cookies = state.items
      cookies.map(cookie => {
        if (id == cookie.id) {
          alreadyInCart = true
          cookie.count++
        }
      })
      if (!alreadyInCart) {
        const newCookie: Cookies = {
          id: id,
          count: 1,
        }
        state.items.push(newCookie)
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload
      const cookies = state.items
      let curCookie = 0
      cookies.map(cookie => {
        if (id == cookie.id) {
          if (cookie.count > 1) {
            cookie.count--
          } else 
            state.items.splice(curCookie, 1)
        }
        curCookie++
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.items = action.payload
      console.log("cart loaded")
    })
    builder.addCase(saveCart.fulfilled, (state, action) => {
      state.items = action.payload
      console.log("data saved")
    })
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let numItems = 0
    items.map(item => {
      numItems += item.count
    })
    return numItems
  }
)
