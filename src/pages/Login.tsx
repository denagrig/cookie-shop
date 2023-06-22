import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const LinkContainer = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const AllUsers:User[] = JSON.parse(localStorage.getItem("AllUsers") || "[]");


const Login = () => {
  const navigate = useNavigate();


  const handleLogin = ()=>{
    var inputs = document.getElementsByTagName("input");
    var EmptyInput = false;
    var WrongPassword = false;
    var UserID = -1;
    var WrongName = true;

    for(let i = 0; i < 2; i++)
    {
      if(inputs[i].value == '')
      {
        EmptyInput = true;
        break;
      }
    }
    for(let i = 0; i < AllUsers.length; i++)
    {
      if(inputs[0].value == AllUsers[i].name)
      {
        WrongName = false;
        break;
      }
    }
    if(EmptyInput)
    {
      alert("Пожалуйста введите все данные")
    }
    else if(WrongName)
    {
      alert("Такого пользователя не существует")
    }
    else
    {
      for(let i = 0; i < AllUsers.length; i++)
      {
        if(inputs[0].value == AllUsers[i].name)
        {
          if(inputs[1].value != AllUsers[i].password)
          {
            WrongPassword = true;
          }
          UserID = i;
          break;
        }
      }
      if(WrongPassword)
      {
        alert("Введен неправильный пароль")
      }
      else
      {
        localStorage.setItem("UserID", JSON.stringify(UserID))
        navigate("/home")
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Добро пожаловать</Title>
        <Form>
          <Input type = "text" id = "name" placeholder="имя" />
          <Input type = "password" id = "password" placeholder="пароль" />
          <Button onClick={handleLogin}>Войти</Button>
          <LinkContainer>Забыли пароль?</LinkContainer>
          <LinkContainer>
            <Link to="/register" style={{ textDecoration: 'none', color: 'inherit'}}>Зарегистрироваться</Link>
          </LinkContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;