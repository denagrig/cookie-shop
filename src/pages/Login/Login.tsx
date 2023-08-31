import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logIn } from "@src/slices/userSlice"
import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Button,
  LinkContainer,
} from "@src/pages/Login/Login.styled"
import { AppDispatch } from "@src/store"
import React, { useCallback, useEffect, useState } from "react"
import { UserLoginData } from "@src/types"
import { useAppSelector } from "@src/hooks"
import { removeError } from "@src/slices/errorSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const curUserID: number = useAppSelector((state) => state.user.userID)
  const dataHasErors: boolean = useAppSelector((state) => state.userDataError.hasErrorInUserData)
  const [userData, setUserData] = useState<UserLoginData>({
    name: "",
    password: "",
  })

  const handleLogin = () => {
    if (userData.name == "" || userData.password == "") {
      alert("Пожалуйста введите все данные")
    } else {
      dispatch(logIn(userData))
    }
  }

  useEffect(() => {
    if(dataHasErors) {
      alert("Введены неверные данные!")
      dispatch(removeError())
    }
    else if (curUserID != -1) navigate("/home")
  }, [curUserID, dataHasErors])

  const handleInputName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.name = event.target.value
      setUserData(newUserData)
    },
    [userData]
  )

  const handleInputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.password = event.target.value
      setUserData(newUserData)
    },
    [userData]
  )

  return (
    <Container>
      <Wrapper>
        <Title>Добро пожаловать</Title>
        <Form>
          <Input
            type="text"
            id="name"
            onChange={handleInputName}
            placeholder="имя"
          />
          <Input
            type="password"
            id="password"
            onChange={handleInputPassword}
            placeholder="пароль"
          />
          <Button onClick={handleLogin}>Войти</Button>
          <LinkContainer>Забыли пароль?</LinkContainer>
          <LinkContainer>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Зарегистрироваться
            </Link>
          </LinkContainer>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
