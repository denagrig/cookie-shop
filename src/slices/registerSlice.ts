import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "../types"

const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
}

const registerSlice = createSlice({
  name: "register",
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
        for (let i = 0; i < allUsers.length; i++) {
          if (password == allUsers[i].name) {
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
            alergens: alergens.split(","),
          }
          for (let i = 0; i < curUser.alergens.length; i++) {
            curUser.alergens[i] = curUser.alergens[i].replace(/\s/g, "")
          }
          alert("Вы успешно зарегистрировны")
          state.users.push(curUser)
          localStorage.setItem("allUsers", JSON.stringify(state.users))
        }
      } else {
        alert("Введенные пароли не совпадают")
      }
    }
  },
})

export const { register } = registerSlice.actions
export default registerSlice.reducer
