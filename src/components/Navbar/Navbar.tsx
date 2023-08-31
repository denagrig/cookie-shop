import { Badge } from "@material-ui/core"
import { Search, ShoppingCartOutlined } from "@material-ui/icons"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMemoizedNumItems, logOut } from "@src/slices/userSlice"
import { useAppSelector } from "@src/hooks"
import { useDispatch } from "react-redux"
import {
  Center,
  Container,
  Input,
  Left,
  MenuItem,
  Right,
  SearchContainer,
  Wrapper,
} from "@src/components/Navbar/Navbar.styled"
import { AppDispatch } from "@src/store"
import { User } from "@src/types"
import { UserStatus } from "@src/data"

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [isSignedIn, setIsSignedIn] = useState(false)
  const curUser: User = useAppSelector((state) => state.user.userData)
  const userID: number = useAppSelector((state) => state.user.userID)
  const curCookiesCnt = useAppSelector(getMemoizedNumItems)

  useEffect(() => {
    if (userID != UserStatus.LogedOut) {
      setIsSignedIn(true)
      setUsername(curUser.name)
    } else {
      setIsSignedIn(false)
    }
  }, [userID])

  const handleLogout = () => {
    dispatch(logOut())
  }

  const moveToCart = () => {
    navigate("/cart")
  }

  const moveToLogin = () => {
    navigate("/login")
  }

  const moveToRegister = () => {
    navigate("/register")
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="название товара" />
            <Search />
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
              <MenuItem onClick={moveToCart}>
                <Badge badgeContent={curCookiesCnt} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={moveToRegister}>РЕГИСТРАЦИЯ</MenuItem>
              <MenuItem onClick={moveToLogin}>ВОЙТИ</MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
