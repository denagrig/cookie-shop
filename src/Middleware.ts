import { addToCart, removeAll, removeFromCart } from "./slices/cartSlice"
import { register } from "./slices/userSlice"
import { User } from "./types"

export const save = (store) => (next) => (action) => {
  const result = next(action)
  if (addToCart.match(action) || removeFromCart.match(action) || removeAll.match(action)) {
    const allUsers: User[] = JSON.parse(
      localStorage.getItem("allUsers") || "[]"
    )
    const userID: string = JSON.parse(localStorage.getItem("userID") || "-1")
    const curUser = allUsers[parseInt(userID)]
    curUser.cookies = store.getState().cart.items
    allUsers[parseInt(userID)] = curUser
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
  }
  else if(register.match(action)) {
    const allUsers = store.getState().user.users
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
  }
  else{
    const userID = store.getState().user.userID
    localStorage.setItem("userID", userID)
  }
  return result
}

export const load = () => {
  const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
  const userID: string = JSON.parse(localStorage.getItem("userID") || "-1")
  if (parseInt(userID) != -1) {
    const curUser = allUsers[parseInt(userID)]
    return { cart: { items: curUser.cookies }, user: { users: allUsers, userID: parseInt(userID)} }
  }
  else {
    return { user: { users: allUsers, userID: parseInt(userID)}}
  }
}
