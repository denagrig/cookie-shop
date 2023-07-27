import { Cookies, User, UserCartData } from "../types"

export const getUserCart = (id: number) => mockLoadСart(id)
export const setUserCart = (cart: UserCartData) => mockSaveCart(cart)

export const mockLoadСart = async(id:number) => {
  return new Promise<Cookies[]>((resolve)=>{
    const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
    const curUser = allUsers[id]
    resolve(curUser.cookies)
    return curUser.cookies
  })
}

export const mockSaveCart = async(cart: UserCartData) => {
  return new Promise<void>((resolve)=>{
    const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
    const curUser = allUsers[cart.id]
    curUser.cookies = cart.cart
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    resolve()
  })
}