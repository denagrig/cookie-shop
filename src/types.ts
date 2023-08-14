type Cookies = {
  id: number
  count: number
}

type CurUserIdAndCart = {
  id: number,
  cart: Cookies[]
}

type User = {
  name: string
  password: string
  cart: Cookies[]
  alergens: string[]
}

type UserRegisterData = {
  name: string
  password: string
  confirmPassword: string
  alergens: string
}

type UserLoginData = {
  name?: string
  password?: string
}

type MainPageCookie = {
  id : number
  img: string
  name: string
  alergens: string[]
  price: string
}

type UserDataAndId = {
  user: User
  userID: number
}


export type { User, UserRegisterData, UserLoginData, CurUserIdAndCart, Cookies, MainPageCookie, UserDataAndId }
