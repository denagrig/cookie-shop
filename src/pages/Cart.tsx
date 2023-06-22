import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../hooks";
import { cookiesArray } from "../data";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { Cookies } from "../types";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items:center;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  transform: translateX(75%);
`;

const ProductContainer = styled.div`
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

const Cart = () => {
  const UserID:string = JSON.parse(localStorage.getItem("UserID") || "-1");
  const Cart:[Cookies[]] = JSON.parse(localStorage.getItem("AllCarts") || "[]");
  var CurUserCart:Cookies[] = Cart[parseInt(UserID)];
  const items = useAppSelector(() => (JSON.parse(localStorage.getItem("UserCart") || "[]")));
  const dispatch = useDispatch();

  const ClearCart = ()=>{
    localStorage.setItem("UserCart", JSON.stringify(""));

  }

  function handleIncrease(id:number){
    dispatch(addToCart(id));
  }

  function handleDecrease(id:number){
    dispatch(removeFromCart(id));
  }
  

  return (
  <Container>
    <Wrapper>
      <Form>
        <Container>
          {Object.entries(items).map(([, cookieData] : any) => (
          <ProductContainer>
            <Text> {cookiesArray[parseInt(cookieData.id)].name} </Text>
            <Image src={cookiesArray[parseInt(cookieData.id)].img} />
            <PriceContainer>
              <Left>
                <Text> {cookiesArray[parseInt(cookieData.id)].price} </Text>
              </Left>
              <Right>
                <ClickableElement onClick = {() => handleIncrease(parseInt(cookieData.id))}>+</ClickableElement>
                <Count>{cookieData.count}</Count>
                <ClickableElement onClick = {() => handleDecrease(parseInt(cookieData.id))}>-</ClickableElement>
              </Right>
            </PriceContainer>
          </ProductContainer>
          ))}
        </Container>
        <Button onClick={ClearCart}>Оплатить</Button>
        <Link to="home">
          <Button >Вернуться на главную</Button>
        </Link> 
      </Form>
    </Wrapper>
  </Container>
  );
};

export default Cart;