import { UserStatus } from "@src/data"
import {
  UserLoginData,
  User,
  UserDataAndId,
  AddCookieToUser,
  Cookies,
} from "@src/types"

export const getUser = async () => {
  return new Promise<UserDataAndId>((resolve) => {
    const userDataAndId: UserDataAndId = {
      user: {
        name: "",
        password: "",
        cart: [],
        alergens: [],
      },
      userID: UserStatus.LogedOut,
    }
    const allUsers: User[] = JSON.parse(
      localStorage.getItem("allUsers") || "[]"
    )
    const userID: number = JSON.parse(localStorage.getItem("userID") || "-1")

    if (userID != UserStatus.LogedOut) {
      userDataAndId.userID = userID
      userDataAndId.user = allUsers[userID]
    }
    resolve(userDataAndId)
    return allUsers
  })
}

export const registerUser = async (userData: User) => {
  return new Promise<UserDataAndId>((resolve) => {
    let doesAlreadyExist = false
    let alergenNum = 0
    const userDataAndID: UserDataAndId = {
      user: userData,
      userID: UserStatus.LogedOut,
    }
    const allUsers: User[] = JSON.parse(
      localStorage.getItem("allUsers") || "[]"
    )

    allUsers.map((user) => {
      if (userData.name == user.name) {
        doesAlreadyExist = true
      }
    })
    if (!doesAlreadyExist) {
      userData.alergens.map((alergen) => {
        userData.alergens[alergenNum] = alergen.replace(/\s/g, "")
        alergenNum++
      })
      allUsers.push(userData)
      userDataAndID.userID = allUsers.length - 1
      localStorage.setItem("allUsers", JSON.stringify(allUsers))
      localStorage.setItem("userID", JSON.stringify(userDataAndID.userID))
    }
    resolve(userDataAndID)
    return userDataAndID
  })
}

export const logInUser = async (nameAndPassword: UserLoginData) => {
  return new Promise<UserDataAndId>((resolve) => {
    const userDataAndID: UserDataAndId = {
      user: {
        name: "",
        password: "",
        cart: [],
        alergens: [],
      },
      userID: UserStatus.LogedOut,
    }
    let curID = 0
    const allUsers: User[] = JSON.parse(
      localStorage.getItem("allUsers") || "[]"
    )

    allUsers.map((user) => {
      if (
        nameAndPassword.name == user.name &&
        nameAndPassword.password == user.password
      ) {
        userDataAndID.userID = curID
      }
      curID++
    })
    if (userDataAndID.userID != UserStatus.LogedOut) {
      userDataAndID.user = allUsers[userDataAndID.userID]
      localStorage.setItem("allUsers", JSON.stringify(allUsers))
      localStorage.setItem("userID", JSON.stringify(userDataAndID.userID))
    }
    resolve(userDataAndID)
    return userDataAndID
  })
}

export const logOutUser = async () => {
  return new Promise<boolean>((resolve) => {
    localStorage.setItem("userID", JSON.stringify(UserStatus.LogedOut))
    resolve(true)
  })
}

export const getUserID = async () => {
  return new Promise<number>((resolve) => {
    const userID: string = JSON.parse(localStorage.getItem("userID") || "-1")
    resolve(parseInt(userID))
    return userID
  })
}

export const setUserID = async (userID: number) => {
  return new Promise<boolean>((resolve) => {
    localStorage.setItem("userID", JSON.stringify(userID))
    resolve(true)
  })
}

export const setUserCart = async (userAndCartData: AddCookieToUser) => {
  return new Promise<User>((resolve) => {
    const userID = userAndCartData.userID
    const cookieID = userAndCartData.cookieID
    const cookieCnt = userAndCartData.cookieCount

    const allUsers: User[] = JSON.parse(
      localStorage.getItem("allUsers") || "[]"
    )
    const curUser = allUsers[userID]
    let alreadyInCart = false
    let curCookie = 0
    const cart = curUser.cart

    cart.map((cookie) => {
      if (cookieID == cookie.id) {
        alreadyInCart = true
        cookie.count += cookieCnt
        if (cookie.count == 0) {
          cart.splice(curCookie, 1)
        }
      }
      curCookie++
    })
    if (!alreadyInCart) {
      const newCookie: Cookies = {
        id: cookieID,
        count: 1,
      }
      cart.push(newCookie)
    }
    curUser.cart = cart
    allUsers[userAndCartData.userID] = curUser
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    resolve(curUser)
    return curUser
  })
}

export const clearUserCart = async (userID: number) => {
  return new Promise<boolean>((resolve) => {
    const allUsers: User[] = JSON.parse(
      localStorage.getItem("allUsers") || "[]"
    )
    const curUser: User = allUsers[userID]
    curUser.cart = []
    allUsers[userID] = curUser
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    resolve(true)
  })
}
