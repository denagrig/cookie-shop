import {PayloadAction, createSlice, createSelector} from "@reduxjs/toolkit"
import { RootState } from "../store";
import { Cookies } from "../types";

const UserID:string = JSON.parse(localStorage.getItem("UserID") || "-1");
const Cart:[Cookies[]] = JSON.parse(localStorage.getItem("AllCarts") || "[]");
var CurUserCart:Cookies[] = Cart[parseInt(UserID)];

export interface CartState{
    items: Cookies[]
}

const initialState: CartState = {
    items: [] 
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<number>){
            const id = action.payload;
            var AlreadyInCart = false;
            for(var i = 0; i < state.items.length; i++)
            {
              if(id == state.items[i].id)
              {
                AlreadyInCart = true;
                state.items[i].count++;
                break;
              }
            }
            if (!AlreadyInCart)
            {
                const newCookie:Cookies={
                    id: id,
                    count: 1,
                }
                state.items.push(newCookie);
            }
            CurUserCart = state.items.slice(); 
            localStorage.setItem("UserCart", JSON.stringify(state.items))
        },
        removeFromCart(state, action: PayloadAction<number>){
            const id = action.payload;
            for(var i = 0; i < state.items.length; i++)
            {
              if(id == state.items[i].id)
              {
                if(state.items[i].count > 1)
                {
                  state.items[i].count--;
                }
                else
                {
                  state.items.splice(i, 1);
                }
              }
            }  
            CurUserCart = state.items.slice(); 
            localStorage.setItem("UserCart", JSON.stringify(state.items))
        },
    },
})

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
export const getMemoizedNumItems = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
      let numItems = 0;
      for (let id in items) {
        numItems += items[id].count;
      }
      return numItems;
    }
  );