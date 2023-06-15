import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
  import styled from "styled-components";
  
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
    background-color: #FFCCCB;
  `;

  const NotAlergic = styled.div`
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
    background-color: #f5fbfd;
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

const Product = ({ item } : {item : any}) => {
  const AllUsers:User[] = JSON.parse(localStorage.getItem("AllUsers") || "[]");
  const UserID:string = JSON.parse(localStorage.getItem("UserID") || "-1");
  var CurUser:User = AllUsers[parseInt(UserID)];
  var IsAlergic:boolean;
  
  if(parseInt(UserID) == -1)
  {
    IsAlergic = false;
  }
  else
  {
    IsAlergic = CurUser.alergens.some(r => item.alergens.includes(r));
  }

  const handleAddToCart = ()=>{
    const newCookie:cookies={
      id: item.id,
      count: 1,
    }

    var AlreadyInCart = false;

    for(var i = 0; i < CurUser.cookies.length; i++)
    {
      if(CurUser.cookies[i].id == newCookie.id)
      {
        AlreadyInCart = true;
        break;
      }
    }
    if(AlreadyInCart)
    {
      CurUser.cookies[i].count += 1;
    }
    else
    {
      CurUser.cookies.push(newCookie);
    }
    localStorage.setItem("AllUsers", JSON.stringify(AllUsers))
  }

  const handleAddToCartIfAlergic = () => {
    alert("Вы не можете добавить этот товар в корзину, так как у вас алергия на один или несколько продуктов в его составе");
  }

  return (
    <>
      {IsAlergic ? (
        <Alergic>
          <CookieName> {item.name} </CookieName>
          <Image src={item.img} />
          <CookiePrice> {item.price} </CookiePrice>
          <Info>
            <Icon>
              <ShoppingCartOutlined onClick = {handleAddToCartIfAlergic}/>
            </Icon>
            <Icon>
              <SearchOutlined />
            </Icon>
            <Icon>
              <FavoriteBorderOutlined />
            </Icon>
          </Info>
        </Alergic>
      ):(
        <NotAlergic>
          <CookieName> {item.name} </CookieName>
          <Image src={item.img} />
          <CookiePrice> {item.price} </CookiePrice>
          <Info>
            <Icon>
              <ShoppingCartOutlined onClick = {handleAddToCart}/>
            </Icon>
            <Icon>
              <SearchOutlined />
            </Icon>
            <Icon>
              <FavoriteBorderOutlined />
            </Icon>
          </Info>
        </NotAlergic>
      )}
    </>
  )
}
  
  export default Product