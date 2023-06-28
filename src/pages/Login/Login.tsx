import { Link, useNavigate } from "react-router-dom"
import { User } from "../../types"
import * as styled from "./Login.styled"

const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    const inputs = document.getElementsByTagName("input")
    let hasEmptyInput = false
    let hasWrongPassword = false
    let hasWrongName = true
    let UserID = -1

    for (let i = 0; i < 2; i++) {
      if (inputs[i].value == "") {
        hasEmptyInput = true
        break
      }
    }
    for (let i = 0; i < allUsers.length; i++) {
      if (inputs[0].value == allUsers[i].name) {
        hasWrongName = false
        break
      }
    }
    if (hasEmptyInput) {
      alert("Пожалуйста введите все данные")
    } else if (hasWrongName) {
      alert("Такого пользователя не существует")
    } else {
      for (let i = 0; i < allUsers.length; i++) {
        if (inputs[0].value == allUsers[i].name) {
          if (inputs[1].value != allUsers[i].password) {
            hasWrongPassword = true
          }
          UserID = i
          break
        }
      }
      if (hasWrongPassword) {
        alert("Введен неправильный пароль")
      } else {
        localStorage.setItem("userID", JSON.stringify(UserID))
        navigate("/home")
      }
    }
  }

  return (
    <styled.Container>
      <styled.Wrapper>
        <styled.Title>Добро пожаловать</styled.Title>
        <styled.Form>
          <styled.Input type="text" id="name" placeholder="имя" />
          <styled.Input type="password" id="password" placeholder="пароль" />
          <styled.Button onClick={handleLogin}>Войти</styled.Button>
          <styled.LinkContainer>Забыли пароль?</styled.LinkContainer>
          <styled.LinkContainer>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Зарегистрироваться
            </Link>
          </styled.LinkContainer>
        </styled.Form>
      </styled.Wrapper>
    </styled.Container>
  )
}

export default Login
