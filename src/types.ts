type Cookies = {
  id: number
  count: number
}

type User = {
  name: string
  password: string
  cookies: Cookies[]
  alergens: string[]
}

type Product = {
  id: number
  img: string
  name: string
  alergens: string[]
  price: string
}

export type { User, Cookies, Product }
