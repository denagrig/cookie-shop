import Login from "@src/pages/Login/Login"
import Register from "@src/pages/Register/Register"
import Home from "@src/pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Admin from "@src/pages/Admin/Admin"
import Cart from "@src/pages/Cart/Cart"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@src/store"
import { loadUser } from "@src/slices/userSlice"
import { useAppSelector } from "@src/hooks"
import { useEffect } from "react"
import { UserStatus } from "@src/data"

function App() {
  const dispatch = useDispatch<AppDispatch>()
 
  useEffect(()=>{
    dispatch(loadUser())
  }, [])

  const userID: number = useAppSelector((state) => state.user.userID)

  if(userID != UserStatus.UsersArrayNotLoaded)
  {
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
