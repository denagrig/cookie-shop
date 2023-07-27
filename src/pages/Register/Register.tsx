import { Link, useNavigate } from "react-router-dom"
import { register, saveUsers } from "../../slices/userSlice"
import { useDispatch } from "react-redux"
import * as styled from "./Register.styled"
import { AppDispatch, store } from "../../store"
import { useRef } from "react"


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const name = useRef<HTMLInputElement>(null)
  const password = useRef(null)
  const confirmPassword = useRef(null)
  const alergens = useRef(null)
 
  const handleRegister = () => {
    const inputs = document.getElementsByTagName("input")
    const userData:string[] = []
    //userData[0] = name.current

    for(let i = 0; i < 4;i++) {
      userData[i] = inputs[i].value
    }
    dispatch(register(userData))
    dispatch(saveUsers(store.getState().user.users))
    navigate("/login")
  }

  return (
    <styled.Container>
      <styled.Wrapper>
        <styled.Title>Зарегистрироваться</styled.Title>
        <styled.Form>
          <styled.Input type="text" id="name" ref = {name} placeholder="имя" />
          <styled.Input type="password" id="password" ref = {password} placeholder="пароль" />
          <styled.Input type="password" id="password2" ref = {confirmPassword} placeholder="подтвердите пароль"
          />
          <styled.Input type="text" id="alergen" ref = {alergens} placeholder="алерген1, алерген2..." />
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
