import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit"
import { UserLoginData, User, UserDataAndId, AddCookieToUser } from "@src/types"
import {
  getUser,
  setUserID,
  registerUser,
  logInUser,
  logOutUser,
  setUserCart,
  clearUserCart,
} from "@slices/userLocalStorage"
import { RootState } from "@src/store"
import { UserStatus } from "@src/data"

export const loadUser = createAsyncThunk<UserDataAndId, void>(
  "userSlice/loadUser",
  async (params: void, thunkAPI) => {
    try {
      return await getUser()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const register = createAsyncThunk<UserDataAndId, User>(
  "userSlice/register",
  async (user: User, thunkAPI) => {
    try {
      return await registerUser(user)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const logIn = createAsyncThunk<UserDataAndId, UserLoginData>(
  "userSlice/logIn",
  async (nameAndPassword: UserLoginData, thunkAPI) => {
    try {
      return await logInUser(nameAndPassword)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const logOut = createAsyncThunk<boolean, void>(
  "userSlice/logOut",
  async (params: void, thunkAPI) => {
    try {
      return await logOutUser()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const saveUserID = createAsyncThunk<boolean, number>(
  "userSlice/saveUserID",
  async (userID: number, thunkAPI) => {
    try {
      return await setUserID(userID)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const addCookie = createAsyncThunk<User, AddCookieToUser>(
  "userSlice/addCookie",
  async (userAndCartData: AddCookieToUser, thunkAPI) => {
    try {
      return await setUserCart(userAndCartData)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const clearCart = createAsyncThunk<boolean, number>(
  "userSlice/clearCart",
  async (userID: number, thunkAPI) => {
    try {
      return await clearUserCart(userID)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export interface UserState {
  userData: User;
  userID: number;
}

const initialState: UserState = {
  userData: { name: "", password: "", cart: [], alergens: [] },
  userID: -2,
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logOut(state) {
      state.userID = UserStatus.LogedOut
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.userData = action.payload.user
      state.userID = action.payload.userID
      console.log("user loaded")
    })
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload.userID != UserStatus.LogedOut) {
        state.userData = action.payload.user
        state.userID = action.payload.userID
      }
      console.log("user registred")
    })
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.userID != UserStatus.LogedOut) {
        state.userData = action.payload.user
        state.userID = action.payload.userID
      }
      console.log("user logedIn")
    })
    builder.addCase(logOut.fulfilled, (state) => {
      (state.userData = { name: "", password: "", cart: [], alergens: [] }),
      (state.userID = UserStatus.LogedOut)
      console.log("user logedOut")
    })
    builder.addCase(saveUserID.fulfilled, () => {
      console.log("id saved")
    })
    builder.addCase(addCookie.fulfilled, (state, action) => {
      state.userData = action.payload
      console.log("cart saved")
    })
    builder.addCase(clearCart.fulfilled, (state) => {
      state.userData.cart = []
      console.log("users cart cleared")
    })
  },
})

export default userSlice.reducer
export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.user.userData.cart,
  (items) => {
    let numItems = 0
    items.map((item) => {
      numItems += item.count
    })
    return numItems
  }
)
