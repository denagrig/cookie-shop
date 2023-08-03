import { Link, useNavigate } from "react-router-dom"
import { register, saveUserID, saveUsers } from "../../slices/userSlice"
import { useDispatch } from "react-redux"
import {
  Agreement,
  Button,
  Container,
  Form,
  Input,
  LinkContainer,
  Title,
  Wrapper,
} from "./Register.styled"
import { AppDispatch, store } from "../../store"
import React, { useCallback } from "react"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  let name = ""
  let password = ""
  let confirmPassword = ""
  let alergens = ""

  const handleRegister = () => {
    const userData: string[] = []
    let hasEmptyInput = false

    userData[0] = name
    userData[1] = password
    userData[2] = confirmPassword
    userData[3] = alergens

    if (userData[1] != userData[2]) {
      alert("Введенные пароли не совпадают")
    } else {
      for (let i = 0; i < 4; i++) {
        if (userData[i] == "") {
          hasEmptyInput = true
          break
        }
      }
      if (hasEmptyInput) {
        alert("Пожалуйста введите все данные")
      } else {
        dispatch(register(userData))
        dispatch(saveUsers(store.getState().user.users))
        dispatch(saveUserID(store.getState().user.userID))


        if (store.getState().user.userID == -1) {
          alert("Такое имя пользователя уже существует")
        } else {
          alert("Вы успешно зарегистрировны")
          navigate("/home")
        }
      }
    }
  }

  const handleInputName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      name = event.target.value
    },
    []
  )

  const handleInputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      password = event.target.value
    },
    []
  )

  const handleInputConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      confirmPassword = event.target.value
    },
    []
  )

  const handleInputAlergens = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      alergens = event.target.value
    },
    []
  )

  return (
    <Container>
      <Wrapper>
        <Title>Зарегистрироваться</Title>
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
          <Input
            type="password"
            id="password2"
            onChange={handleInputConfirmPassword}
            placeholder="подтвердите пароль"
          />
          <Input
            type="text"
            id="alergen"
            onChange={handleInputAlergens}
            placeholder="алерген1, алерген2..."
          />
          <Agreement>
            Нажимая «Продолжить», вы принимаете пользовательское соглашение и
            политику конфиденциальности
          </Agreement>
          <Button onClick={handleRegister}>Зарегистрироваться</Button>
          <LinkContainer>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Уже зарегистрировались?
            </Link>
          </LinkContainer>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
