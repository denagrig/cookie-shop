import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logIn } from "../../slices/logInSlice"
import * as styled from "./Login.styled"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleLogin = () => {
    const inputs = document.getElementsByTagName("input")
    const userData:string[] = []
    for(let i = 0; i < 2;i++) {
      userData[i] = inputs[i].value
    }
    dispatch(logIn(userData))
    navigate("/home")
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
