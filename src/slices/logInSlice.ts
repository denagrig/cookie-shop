import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "../types"

const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")

export interface UserState {
  userId: number
}

const initialState: UserState = {
  userId: -1
}

const logInSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<Array<string>>) {
      const name = action.payload[0]
      const password = action.payload[1]
      let hasEmptyInput = false
      let hasWrongPassword = false
      let hasWrongName = true
      let userId = -1
      for (let i = 0; i < 2; i++) {
        if (action.payload[i] == "") {
          hasEmptyInput = true
          break
        }
      }

      for (let i = 0; i < allUsers.length; i++) {
        if (name == allUsers[i].name) {
          hasWrongName = false
          break
        }
      }

      if (hasEmptyInput) {
        alert("Пожалуйста введите все данные")
      } else if (hasWrongName) {
        alert("Такого пользователя не существует")
      } else {
        for (let i = 0; i < allUsers.length; i++) {
          if (name == allUsers[i].name) {
            if (password != allUsers[i].password) {
              hasWrongPassword = true
            }
            userId = i
            break
          }
        }
        if (hasWrongPassword) {
          alert("Введен неправильный пароль")
        } else {
          state.userId = userId
          localStorage.setItem("userID", JSON.stringify(state.userId))
        }
      }
    },
    logOut(state) {
      state.userId = -1
      localStorage.setItem("userID", JSON.stringify(state.userId))
    }
  },
})

export const { logIn, logOut } = logInSlice.actions
export default logInSlice.reducer
