import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
  import styled from "styled-components";
  import { User } from "../types";
  import { addToCart } from "../slices/cartSlice";
  import { useDispatch } from "react-redux";

  const Info = styled.div`
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
  `;

  const Alergic = styled.div`
  flex-direction: column;
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
    background-color: ${props => props.color || '#FFCCCB'};
  `;
  
  const Image = styled.img`
    height: 50%;
    z-index: 2;
  `;
  
  const Icon = styled.div`
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
    };
  `

  const CookieName = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  `

  const CookiePrice = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
  `

const Product = ({ item } : {item : any}) => {
  const dispatch = useDispatch();
  const AllUsers:User[] = JSON.parse(localStorage.getItem("AllUsers") || "[]");
  const UserID:string = JSON.parse(localStorage.getItem("UserID") || "-1");
  var CurUser:User = AllUsers[parseInt(UserID)];
  var IsAlergic:boolean;
  const lightGrey = '#f5fbfd';
  const lightRed = '#FFCCCB';
  var color:string = lightGrey;

  if(parseInt(UserID) == -1)
  {
    color = lightGrey;
  }
  else
  {
    IsAlergic = CurUser.alergens.some(r => item.alergens.includes(r))
    if(CurUser.alergens.some(r => item.alergens.includes(r)))
    {
      color = lightRed;
    }
  }

  const handleAddToCart = ()=>{
    if(IsAlergic)
    {
      alert("Вы не можете добавить этот товар в корзину, так как у вас алергия на один или несколько продуктов в его составе");
    }
    else
    {
      dispatch(addToCart(item.id));
    }
  }

  return (
        <Alergic color = {color}>
          <CookieName> {item.name} </CookieName>
          <Image src={item.img} />
          <CookiePrice> {item.price} </CookiePrice>
          <Info>
            <Icon>
              <ShoppingCartOutlined 
              id = {item.id} 
              onClick = {handleAddToCart}/>
            </Icon>
            <Icon>
              <SearchOutlined />
            </Icon>
            <Icon>
              <FavoriteBorderOutlined />
            </Icon>
          </Info>
        </Alergic>
  )
}
  
  export default Product