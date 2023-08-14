import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { cookiesRecord } from "../../data"
import { useDispatch } from "react-redux"
import {Container, Wrapper, Form, ProductContainer, Image, PriceContainer, Left, Right, ClickableElement, Text, Count, Button} from "./Cart.styled"
import { AddCookieToUser, Cookies } from "../../types"
import { AppDispatch } from "../../store"
import { addCookie, clearCart } from "../../slices/userSlice"

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  const userID:number = useAppSelector((state) =>
    state.user.userID
  )
  
  const items:Cookies[] = useAppSelector((state) =>
    state.user.userData.cart
  )
  
  const handleClear = () => {
    dispatch(clearCart(userID))
  }

  function handleIncrease(id: number) {
    const addCookieToUser: AddCookieToUser = {
      userID: userID,
      cookieID: id,
      cookieCount: 1
    }
    dispatch(addCookie(addCookieToUser))
  }

  function handleDecrease(id: number) {
    const addCookieToUser: AddCookieToUser = {
      userID: userID,
      cookieID: id,
      cookieCount: -1
    }
    dispatch(addCookie(addCookieToUser))
  }

  return (
    <Container>
      <Wrapper>
        <Form>
          <Container>
            {items.length ? items.map((item) => (
              <ProductContainer key={item.id}>
                <Text> {cookiesRecord[item.id].name} </Text>
                <Image src={cookiesRecord[item.id].img} />
                <PriceContainer>
                  <Left>
                    <Text> {cookiesRecord[item.id].price} </Text>
                  </Left>
                  <Right>
                    <ClickableElement
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </ClickableElement>
                    <Count>{item.count}</Count>
                    <ClickableElement
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </ClickableElement>
                  </Right>
                </PriceContainer>
              </ProductContainer>
            )) : <></>}
          </Container>
          <Button onClick={handleClear}>Оплатить</Button>
          <Link to="home">
            <Button>Вернуться на главную</Button>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Cart
