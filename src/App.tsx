import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Admin from "./pages/Admin/Admin"
import Cart from "./pages/Cart/Cart"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store"
import { loadUserID, loadUsers } from "./slices/userSlice"
import { loadCart } from "./slices/cartSlice"
import { useAppSelector } from "./hooks"
import { User } from "./types"
import { useEffect } from "react"
import React from "react"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const [state, ] = React.useState({})
  
  useEffect(()=>{
    dispatch(loadUserID())
    dispatch(loadUsers())
  }, [dispatch, state])

  const allUsers: User[] = useAppSelector((state) => state.user.users)
  const userID: number = useAppSelector((state) => state.user.userID)

  if (allUsers.length == 0) {

    return
  } else {


    if (userID != -1) dispatch(loadCart(userID))

    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
