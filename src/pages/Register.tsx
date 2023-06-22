import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  width: 30%;
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
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 60%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const LinkContainer = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const AllUsers:User[] = JSON.parse(localStorage.getItem("AllUsers") || "[]");

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = ()=>{
    var inputs = document.getElementsByTagName("input");
    var AlreadyExists = false;
    var EmptyInput = false;
    if(inputs[1].value == inputs[2].value)
    {
      for(let i = 0; i < 4; i++)
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
          AlreadyExists = true;
          break;
        }
      }
      if(AlreadyExists)
      {
        alert("Такое имя пользователя уже существует")
      }
      else if(EmptyInput)
      {
        alert("Пожалуйста введите все данные")
      }
      else
      {
        const curUser:User={
          name: inputs[0].value,
          password: inputs[1].value,
          alergens: inputs[3].value.split(','),
        }
        for(let i = 0; i < curUser.alergens.length; i++)
        {
          curUser.alergens[i] =  curUser.alergens[i].replace(/\s/g,'')
        }
        alert("Вы успешно зарегистрировны")
        AllUsers.push(curUser);
        localStorage.setItem("AllUsers", JSON.stringify(AllUsers))
        navigate("/login")
      }
    }
    else
    {
      alert("Введенные пароли не совпадают")
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Зарегистрироваться</Title>
        <Form>
          <Input type = "text" id = "name" placeholder="имя" />
          <Input type = "password" id = "password" placeholder="пароль" />
          <Input type = "password" id = "password2" placeholder="подтвердите пароль" />
          <Input type = "text" id = "alergen" placeholder="алерген1, алерген2..." />
          <Agreement>
          Нажимая «Продолжить», вы принимаете 
          пользовательское соглашение и политику конфиденциальности
          </Agreement>
          <Button onClick = {handleRegister}>Зарегистрироваться</Button>
          <LinkContainer>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit'}}>Уже зарегистрировались?</Link>
          </LinkContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};


export default Register;