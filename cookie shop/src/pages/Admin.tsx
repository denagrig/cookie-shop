import styled from "styled-components";

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


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: red;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;
  transform: translateX(33%);
`

const Login = () => {


  const handleDelete = ()=>{
   localStorage.clear();
  }

  return (
    <Container>
      <Wrapper>
        <Title>Удалить всех пользователей</Title>
        <Form>
          <Button onClick={handleDelete}>Удалить</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;