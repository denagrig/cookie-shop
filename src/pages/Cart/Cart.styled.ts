import styled from "styled-components"

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  transform: translateX(75%);
`

export const ProductContainer = styled.div`
  flex-direction: column;
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f5fbfd;
`

export const PriceContainer = styled.div`
  display: flex;
  min-width: 150px;
  position: relative;
  align-items: center;
  justify-content: space-between;
`

export const Image = styled.img`
  height: 50%;
  z-index: 2;
`

export const Text = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
`

export const Count = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
  margin-left: 20px;
`

export const ClickableElement = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 30px;
  margin-left: 20px;
  cursor: pointer;
`

export const Left = styled.div`
  flex: 1;
  display: flex;
`

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
