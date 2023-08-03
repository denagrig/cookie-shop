import {Container, Wrapper, Title, Form, Button} from "./Admin.styled"

const Login = () => {
  const handleDelete = () => {
    localStorage.clear()
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
  )
}

export default Login
