import styled from "styled-components"

export const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`

export const Alergic = styled.div`
  flex-direction: column;
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }  
  background-color: ${props => props.color === "lightRed" ? "#FFCCCB" : "F5FBFD"}
`

export const Image = styled.img`
  height: 50%;
  z-index: 2;
`

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`

export const CookieName = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
`

export const CookiePrice = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
`