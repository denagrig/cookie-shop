import cookie from "@src/assets/cookie.png"
import { MainPageCookie } from "@src/types"

export const enum UserStatus { LogedOut = -1, UsersArrayNotLoaded = -2}

export const cookiesRecord : Record <number, MainPageCookie>= {
  1:
  {
    id: 1,
    img: cookie,
    name: "название",
    alergens: ["rty"],
    price: "100 Р",
  },
  2:
  {
    id: 2,
    img: cookie,
    name: "название",
    alergens: ["q"],
    price: "100 Р",
  },
  3:
  {
    id: 3,
    img: cookie,
    name: "название",
    alergens: ["q"],
    price: "100 Р",
  },
  4:
  {
    id: 4,
    img: cookie,
    name: "название",
    alergens: ["q"],
    price: "100 Р",
  },
  5:
  {
    id: 5,
    img: cookie,
    name: "название",
    alergens: ["q"],
    price: "100 Р",
  },
  6:
  {
    id: 6,
    img: cookie,
    name: "название",
    alergens: ["q"],
    price: "100 Р",
  },
  7:
  {
    id: 7,
    img: cookie,
    name: "название",
    alergens: ["q"],
    price: "100 Р",
  },
  8:
  {
    id: 8,
    img: cookie,
    name: "название",
    alergens: ["qwe"],
    price: "100 Р",
  },
}
