import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../types"
import { getUserID, getUsers, setUserID, setUsers } from "./userLoacalStorage"

export const loadUsers = createAsyncThunk<User[], void>(
  "userSlice/loadUsers",
  async (params: void, thunkAPI) => {
    try {
      return await getUsers()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const saveUsers = createAsyncThunk<void, User[]>(
  "userSlice/saveUsers",
  async (users: User[], thunkAPI) => {
    try {
      return await setUsers(users)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const loadUserID = createAsyncThunk<number, void>(
  "userSlice/loadUserID",
  async (params: void, thunkAPI) => {
    try {
      return await getUserID()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const saveUserID = createAsyncThunk<void, number>(
  "userSlice/saveUserID",
  async (userID: number, thunkAPI) => {
    try {
      return await setUserID(userID)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)



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
      const inputs = action.payload
      const allUsers = state.users
      let alergenNum = 0

      if (password == confirmPassword) {
        inputs.map(input => {
          if (input == "") {
            hasEmptyInput = true
          }
        })

        allUsers.map(user => {
          if (name == user.name) {
            doesAlreadyExist = true
          }
        })

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
          curUser.alergens.map(alergen => {
            curUser.alergens[alergenNum] = alergen.replace(/\s/g, "")
            alergenNum++
          })
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
      let curID = 0
      const inputs = action.payload
      const allUsers = state.users

      inputs.map(input => {
        if (input == "") {
          hasEmptyInput = true
        }
      }) 

      allUsers.map(user => {
        if (name == user.name) {
          hasWrongName = false
        }
      })

      if (hasEmptyInput) {
        alert("Пожалуйста введите все данные")
      } else if (hasWrongName) {
        alert("Такого пользователя не существует")
      } else {
        allUsers.map(user => {
          if (name == user.name) {
            if (password != user.password) {
              hasWrongPassword = true
            }
            userID = curID
          }
          curID++
        })

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
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload
      console.log("users loaded")
    })
    builder.addCase(saveUsers.fulfilled, () => {
      console.log("users saved")
    })
    builder.addCase(loadUserID.fulfilled, (state, action) => {
      state.userID = action.payload
      console.log("id loaded")
    })
    builder.addCase(saveUserID.fulfilled, () => {
      console.log("id saved")
    })
  }
})

export const { logIn, logOut, register } = userSlice.actions
export default userSlice.reducer
