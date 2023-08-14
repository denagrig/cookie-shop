import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logIn } from "../../slices/userSlice"
import {Container, Wrapper, Title, Form, Input, Button, LinkContainer} from "./Login.styled"
import { AppDispatch, store } from "../../store"
import React, { useCallback, useState } from "react"
import { UserLoginData } from "../../types"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [userData, setUserData] = useState<UserLoginData>({
    name: "", 
    password: ""})

  const handleLogin = () => {
    if (userData.name == "" || userData.password == "") {
      alert("Пожалуйста введите все данные")
    } else {
      dispatch(logIn(userData))
      
      if(store.getState().user.userID != -1){
        navigate("/home")
      } else { 
        alert("Ошибка во введенных данных!")
      }
    }
  }

  const handleInputName = useCallback((event : React.ChangeEvent<HTMLInputElement>) => {
    const newUserData = Object.assign({}, userData)
    newUserData.name = event.target.value
    setUserData(newUserData)  
  }, [userData])

  const handleInputPassword = useCallback((event : React.ChangeEvent<HTMLInputElement>) => {
    const newUserData = Object.assign({}, userData)
    newUserData.password = event.target.value
    setUserData(newUserData)  
  }, [userData])

  return (
    <Container>
      <Wrapper>
        <Title>Добро пожаловать</Title>
        <Form>
          <Input type="text" id="name" onChange = {handleInputName} placeholder="имя" />
          <Input type="password" id="password" onChange = {handleInputPassword} placeholder="пароль" />
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
