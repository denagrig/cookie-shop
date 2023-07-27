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
  width: 25%;
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

export const Button = styled.button`
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