import * as styled from "./Admin.styled"

const Login = () => {
  const handleDelete = () => {
    localStorage.clear()
  }

  return (
    <styled.Container>
      <styled.Wrapper>
        <styled.Title>Удалить всех пользователей</styled.Title>
        <styled.Form>
          <styled.Button onClick={handleDelete}>Удалить</styled.Button>
        </styled.Form>
      </styled.Wrapper>
    </styled.Container>
  )
}

export default Login
