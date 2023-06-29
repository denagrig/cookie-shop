import { Badge } from "@material-ui/core"
import { Search, ShoppingCartOutlined } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useState } from "react"
import { User } from "../../types"
import { getMemoizedNumItems } from "../../slices/cartSlice"
import { useAppSelector } from "../../hooks"
import { useDispatch } from "react-redux"
import { logOut } from "../../slices/logInSlice"
import * as styled from "./Navbar.styled"

const Navbar = () => {
  const dispatch = useDispatch()

  const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
  const userID: string = JSON.parse(localStorage.getItem("userID") || "-1")
  const [username, setUsername] = useState("")
  const [isSignedIn, setIsSignedIn] = useState(false)
  const curCookiesCnt = useAppSelector(getMemoizedNumItems)
  const curUser = allUsers[parseInt(userID)]

  if (parseInt(userID) != -1 && !isSignedIn) {
    setIsSignedIn(true)
    setUsername(curUser.name)
  }

  const handleLogout = () => {
    dispatch(logOut())
    
    // location.reload()
  }

  return (
    <styled.Container>
      <styled.Wrapper>
        <styled.Left>
          <styled.SearchContainer>
            <styled.Input placeholder="название товара" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </styled.SearchContainer>
        </styled.Left>
        <styled.Center>
          <h1>COOKIE</h1>
        </styled.Center>
        <styled.Right>
          {isSignedIn ? (
            <>
              <styled.MenuItem>Вы зарегистрированы как {username}</styled.MenuItem>
              <styled.MenuItem id="logout" onClick={handleLogout}>
                ВЫЙТИ
              </styled.MenuItem>
              <styled.MenuItem>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Badge badgeContent={curCookiesCnt} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </Link>
              </styled.MenuItem>
            </>
          ) : (
            <>
              <styled.MenuItem>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  РЕГИСТРАЦИЯ
                </Link>
              </styled.MenuItem>
              <styled.MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  ВОЙТИ
                </Link>
              </styled.MenuItem>
            </>
          )}
        </styled.Right>
      </styled.Wrapper>
    </styled.Container>
  )
}

export default Navbar
