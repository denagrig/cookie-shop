import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logIn, saveUserID } from "../../slices/userSlice"
import {Container, Wrapper, Title, Form, Input, Button, LinkContainer} from "./Login.styled"
import { AppDispatch, store } from "../../store"
import React, { useCallback } from "react"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  let name = ""
  let password = ""

  const handleLogin = () => {
    const userData:string[] = []
    let hasEmptyInput = false
    
    userData[0] = name
    userData[1] = password

    userData.map((input) => {
      if (input == "") {
        hasEmptyInput = true
      }
    })

    if (hasEmptyInput) {
      alert("Пожалуйста введите все данные")
    } else {
      dispatch(logIn(userData))
      dispatch(saveUserID(store.getState().user.userID))

      if(store.getState().user.userID != -1){
        navigate("/home")
      } else { 
        alert("Ошибка во введенных данных!")
      }
    }
  }

  const handleInputName = useCallback((event : React.ChangeEvent<HTMLInputElement>) => {
    name = event.target.value
  }, [])

  const handleInputPassword = useCallback((event : React.ChangeEvent<HTMLInputElement>) => {
    password = event.target.value
  }, [])

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
