import { Link } from "react-router-dom";
import styled from "styled-components";
document.title = "Log in"
import CartProduct from "../components/CartProduct";
import { cookies } from "../data";

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

const AllUsers:User[] = JSON.parse(localStorage.getItem("AllUsers") || "[]");
const UserID:string =  JSON.parse(localStorage.getItem("UserID") || "-1");
var curUser = AllUsers[parseInt(UserID)];

const Cart = () => {
    const ClearCart = ()=>{
        curUser.cookies = [];
        localStorage.setItem("AllUsers", JSON.stringify(AllUsers))
    }

    return (
    <Container>
      <Wrapper>
        <Form>
        <Container>
            {curUser.cookies.map((item) => (
            <CartProduct item={item} key={item.id} />
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