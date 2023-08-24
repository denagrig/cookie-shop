import styled from "styled-components"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`

export const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`

export const Button = styled.button`
  width: 60%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

export const LinkContainer = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`
