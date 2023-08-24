import styled from "styled-components"

export const Container = styled.div`
  height: 60px;
`

export const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Left = styled.div`
  flex: 1;
  display: flex;
`

export const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  color: "gray";
  fontsize: 16;
`

export const Input = styled.input`
  border: 0;
`

export const Center = styled.div`
  flex: 1;
  text-align: center;
`

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: "black";
`
