import { Cookies, User, CurUserIdAndCart } from "../types"

export const getUserCart = async(id:number) => {
  return new Promise<Cookies[]>((resolve)=>{
    const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
    const curUser = allUsers[id]
    resolve(curUser.cart)
    return curUser.cart
  })
}

export const setUserCart = async(cart: CurUserIdAndCart) => {
  return new Promise<Cookies[]>((resolve)=>{
    const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
    const curUser = allUsers[cart.id]
    curUser.cart = cart.cart
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    resolve(curUser.cart)
    return curUser.cart
  })
}