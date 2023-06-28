import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Admin from "./pages/Admin"
import Cart from "./pages/Cart/Cart"

function App() {
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

export default App
