import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "../types"

export interface UserState {
  users: User[],
  userID: number
}

const initialState: UserState = {
  users: [],
  userID: -1
}

const userSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {
    register(state, action: PayloadAction<Array<string>>) {
      const name = action.payload[0]
      const password = action.payload[1]
      const confirmPassword = action.payload[2]
      const alergens = action.payload[3]
      let doesAlreadyExist = false
      let hasEmptyInput = false
      if (password == confirmPassword) {
        for (let i = 0; i < 4; i++) {
          if (action.payload[i] == "") {
            hasEmptyInput = true
            break
          }
        }
        for (let i = 0; i < state.users.length; i++) {
          if (name == state.users[i].name) {
            doesAlreadyExist = true
            break
          }
        }
        if (doesAlreadyExist) {
          alert("Такое имя пользователя уже существует")
        } else if (hasEmptyInput) {
          alert("Пожалуйста введите все данные")
        } else {
          const curUser: User = {
            name: name,
            password: password,
            cookies: [],
            alergens: alergens.split(",")
          }
          for (let i = 0; i < curUser.alergens.length; i++) {
            curUser.alergens[i] = curUser.alergens[i].replace(/\s/g, "")
          }
          alert("Вы успешно зарегистрировны")
          state.users.push(curUser)
        }
      } else {
        alert("Введенные пароли не совпадают")
      }
    },
    logIn(state, action: PayloadAction<Array<string>>) {
      const name = action.payload[0]
      const password = action.payload[1]
      let hasEmptyInput = false
      let hasWrongPassword = false
      let hasWrongName = true
      let userID = -1
      for (let i = 0; i < 2; i++) {
        if (action.payload[i] == "") {
          hasEmptyInput = true
          break
        }
      }

      for (let i = 0; i < state.users.length; i++) {
        if (name == state.users[i].name) {
          hasWrongName = false
          break
        }
      }

      if (hasEmptyInput) {
        alert("Пожалуйста введите все данные")
      } else if (hasWrongName) {
        alert("Такого пользователя не существует")
      } else {
        for (let i = 0; i < state.users.length; i++) {
          if (name == state.users[i].name) {
            if (password != state.users[i].password) {
              hasWrongPassword = true
            }
            userID = i
            break
          }
        }
        if (hasWrongPassword) {
          alert("Введен неправильный пароль")
        } else {
          state.userID = userID
        }
      }
    },
    logOut(state) {
      state.userID = -1
    }
  },
})

export const { logIn, logOut, register } = userSlice.actions
export default userSlice.reducer
