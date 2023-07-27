type Cookies = {
  id: number
  count: number
}

type UserCartData = {
  id: number,
  cart: Cookies[]
}

type User = {
  name: string
  password: string
  cookies: Cookies[]
  alergens: string[]
}

type MainPageCookie = {
  id : number
  img: string
  name: string
  alergens: string[]
  price: string
}

export type { User, UserCartData, Cookies, MainPageCookie }
