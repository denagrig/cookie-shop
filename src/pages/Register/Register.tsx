import { Link, useNavigate } from "react-router-dom"
import { register } from "../../slices/userSlice"
import { useDispatch } from "react-redux"
import * as styled from "./Register.styled"


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = () => {
    const inputs = document.getElementsByTagName("input")
    const userData:string[] = []
    for(let i = 0; i < 4;i++) {
      userData[i] = inputs[i].value
    }
    dispatch(register(userData))
    navigate("/login")
  }

  return (
    <styled.Container>
      <styled.Wrapper>
        <styled.Title>Зарегистрироваться</styled.Title>
        <styled.Form>
          <styled.Input type="text" id="name" placeholder="имя" />
          <styled.Input type="password" id="password" placeholder="пароль" />
          <styled.Input type="password" id="password2" placeholder="подтвердите пароль"
          />
          <styled.Input type="text" id="alergen" placeholder="алерген1, алерген2..." />
          <styled.Agreement>
            Нажимая «Продолжить», вы принимаете пользовательское соглашение и
            политику конфиденциальности
          </styled.Agreement>
          <styled.Button onClick={handleRegister}>Зарегистрироваться</styled.Button>
          <styled.LinkContainer>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Уже зарегистрировались?
            </Link>
          </styled.LinkContainer>
        </styled.Form>
      </styled.Wrapper>
    </styled.Container>
  )
}

export default Register
