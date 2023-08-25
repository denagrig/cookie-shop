import { Link, useNavigate } from "react-router-dom"
import { register } from "@slices/userSlice"
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
import { AppDispatch } from "@src/store"
import React, { useCallback, useEffect, useState } from "react"
import { User, UserRegisterData } from "@src/types"
import { useAppSelector } from "@src/hooks"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const curUserID: number = useAppSelector((state) => state.user.userID)
  const [userData, setUserData] = useState<UserRegisterData>({
    name: "",
    password: "",
    confirmPassword: "",
    alergens: "",
  })

  const handleRegister = () => {
    if (userData.password != userData.confirmPassword)
      alert("Введенные пароли не совпадают")
    else if (
      userData.name == "" ||
      userData.password == "" ||
      userData.confirmPassword == ""
    )
      alert("Пожалуйста введите все данные")
    else {
      const registerData: User = {
        name: userData.name,
        password: userData.password,
        alergens: userData.alergens.split(","),
        cart: [],
      }

      dispatch(register(registerData))
    }
  }

  useEffect(() => {
    if (curUserID != -1) navigate("/home")
  }, [dispatch])

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

  const handleInputConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.confirmPassword = event.target.value
      setUserData(newUserData)
    },
    [userData]
  )

  const handleInputAlergens = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUserData = Object.assign({}, userData)
      newUserData.alergens = event.target.value
      setUserData(newUserData)
    },
    [userData]
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
