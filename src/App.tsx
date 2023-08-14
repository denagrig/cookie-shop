import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Admin from "./pages/Admin/Admin"
import Cart from "./pages/Cart/Cart"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store"
import { loadUser } from "./slices/userSlice"
import { loadCart } from "./slices/cartSlice"
import { useAppSelector } from "./hooks"
import { useEffect } from "react"

function App() {
  const dispatch = useDispatch<AppDispatch>()
 
  useEffect(()=>{
    dispatch(loadUser())
  }, [])

  const userID: number = useAppSelector((state) => state.user.userID)

  if (userID >= 0) dispatch(loadCart(userID))

  if(userID != -2)
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
