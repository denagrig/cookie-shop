import { Link, useNavigate } from "react-router-dom"
import { User } from "../../types"
import * as styled from "./Register.styled"

const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")

const Register = () => {
  const navigate = useNavigate()

  const handleRegister = () => {
    const inputs = document.getElementsByTagName("input")
    let doesAlreadyExist = false
    let hasEmptyInput = false
    if (inputs[1].value == inputs[2].value) {
      for (let i = 0; i < 4; i++) {
        if (inputs[i].value == "") {
          hasEmptyInput = true
          break
        }
      }
      for (let i = 0; i < allUsers.length; i++) {
        if (inputs[0].value == allUsers[i].name) {
          doesAlreadyExist = true
          break
        }
      }
      if (doesAlreadyExist) {
        alert("Такое имя пользователя уже существует")
      } else if (hasEmptyInput) {
        alert("Пожалуйста введите все данные")
      } else {
        const curUser: User = {
          name: inputs[0].value,
          password: inputs[1].value,
          alergens: inputs[3].value.split(","),
        }
        for (let i = 0; i < curUser.alergens.length; i++) {
          curUser.alergens[i] = curUser.alergens[i].replace(/\s/g, "")
        }
        alert("Вы успешно зарегистрировны")
        allUsers.push(curUser)
        localStorage.setItem("allUsers", JSON.stringify(allUsers))
        navigate("/login")
      }
    } else {
      alert("Введенные пароли не совпадают")
    }
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
