import { Badge } from "@material-ui/core"
import { Search, ShoppingCartOutlined } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMemoizedNumItems } from "../../slices/userSlice"
import { useAppSelector } from "../../hooks"
import { useDispatch } from "react-redux"
import { logOut } from "../../slices/userSlice"
import { Center, Container, Input, Left, MenuItem, Right, SearchContainer, Wrapper } from "./Navbar.styled"
import { AppDispatch } from "../../store"
import { User } from "../../types"

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()

  const curUser: User = useAppSelector((state) => state.user.userData)
  const userID: number = useAppSelector((state) => state.user.userID)

  const [username, setUsername] = useState("")
  const [isSignedIn, setIsSignedIn] = useState(false)
  const curCookiesCnt = useAppSelector(getMemoizedNumItems)

  useEffect(()=>{
    if (userID != -1) {
      setIsSignedIn(true)
      setUsername(curUser.name)
    }
    else {
      setIsSignedIn(false)
    }
  }, [userID])
  

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="название товара" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <h1>COOKIE</h1>
        </Center>
        <Right>
          {isSignedIn ? (
            <>
              <MenuItem>Вы зарегистрированы как {username}</MenuItem>
              <MenuItem id="logout" onClick={handleLogout}>
                ВЫЙТИ
              </MenuItem>
              <MenuItem>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Badge badgeContent={curCookiesCnt} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  РЕГИСТРАЦИЯ
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  ВОЙТИ
                </Link>
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
