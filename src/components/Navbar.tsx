import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { User } from "../types";
import { getMemoizedNumItems } from '../slices/cartSlice';
import { useAppSelector } from '../hooks';

const Container = styled.div`
  height: 60px;
`

const  Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
  flex: 1;
  display: flex;
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`

const Input = styled.input`
  border: 0;
`


const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: 'black';
`

const Navbar = () => {
  const AllUsers:User[] = JSON.parse(localStorage.getItem("AllUsers") || "[]");
  const UserID:string =  JSON.parse(localStorage.getItem("UserID") || "-1");
  const [username, setUsername] = useState('');
  const [SignedIn, setSignedIn] = useState(false);
  var CurCookiesCnt = useAppSelector(getMemoizedNumItems);
  var curUser = AllUsers[parseInt(UserID)];
  
  if(parseInt(UserID) != -1 && !SignedIn)
  {
    setSignedIn(true);
    setUsername(curUser.name);
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder='название товара'/>
            <Search style={{color: 'gray', fontSize: 16}}/>
          </SearchContainer>
        </Left>
        <Center>
          <h1>COOKIE</h1>
        </Center>
        <Right>
          {SignedIn ? (
          <>
            <MenuItem>Вы зарегистрированы как {username}</MenuItem>
            <MenuItem id = "logout" onClick = {handleLogout}>ВЫЙТИ</MenuItem>
            <MenuItem>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Badge badgeContent = {CurCookiesCnt} color = 'primary'>
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
          </>) : (
          <><MenuItem>
              <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>РЕГИСТРАЦИЯ</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>ВОЙТИ</Link>
            </MenuItem>
          </>
          )}
        </Right>
      </Wrapper>
    </Container>
  )
}

function handleLogout() {
  localStorage.setItem("UserID", JSON.stringify(-1));
  location.reload();
}

export default Navbar
