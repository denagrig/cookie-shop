  import styled from "styled-components";
  import { cookies } from "../data";
  import { useState } from "react";

  const Container = styled.div`
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
  `;

  const PriceContainer = styled.div`
  display: flex;
  min-width: 150px;
  position: relative;
  align-items: center;
  justify-content: space-between;
  `;
  
  const Image = styled.img`
    height: 50%;
    z-index: 2;
  `;

  const Text = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
  `

  const Count = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
  margin-left:20px;
  `

  const ClickableElement = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 30px;
  margin-left:20px;
  cursor: pointer;
  `

  const Left = styled.div`
  flex: 1;
  display: flex;
  `
  const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  `

const CartProduct = ({ item } : {item : any}) => {
  const AllUsers:User[] = JSON.parse(localStorage.getItem("AllUsers") || "[]");
  const UserID:string = JSON.parse(localStorage.getItem("UserID") || "-1");
  var CurUser:User = AllUsers[parseInt(UserID)];
  const [count, setCount] = useState(item.count)
  type cookies = {
    id:number,
    count:number,
  }
  
  type User = {
    name:string,
    password: string,
    alergens: string[],
    cookies: cookies[], 
  }

  const HandleIncrease = ()=>{
    setCount(count + 1);
    for(let i = 0; i <  CurUser.cookies.length; i++)
    {
        if(item.id == CurUser.cookies[i].id)
        {
            CurUser.cookies[i].count = count;
            break;
        }
    }
    
    localStorage.setItem("AllUsers", JSON.stringify(AllUsers))
  }
  const HandleDecrease = ()=>{}

  return (
        <Container>
          <Text> {cookies[item.id].name} </Text>
          <Image src={cookies[item.id].img} />
          <PriceContainer>
            <Left>
              <Text> {cookies[item.id].price} </Text>
            </Left>
            <Right>
              <ClickableElement onClick={HandleIncrease}>+</ClickableElement>
              <Count>{item.count}</Count>
              <ClickableElement onClick={HandleDecrease}>-</ClickableElement>
            </Right>
          </PriceContainer>
        </Container>
  )
}
  
  export default CartProduct