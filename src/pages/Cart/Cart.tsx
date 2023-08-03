import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { cookiesRecord } from "../../data"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart, removeAll, saveCart} from "../../slices/cartSlice"
import {Container, Wrapper, Form, ProductContainer, Image, PriceContainer, Left, Right, ClickableElement, Text, Count, Button} from "./Cart.styled"
import { Cookies, UserCartData } from "../../types"
import { AppDispatch, store } from "../../store"

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  const userID:number = useAppSelector((state) =>
    state.user.userID
  )

  const items:Cookies[] = useAppSelector((state) =>
    state.cart.items
  )
  
  const clearCart = () => {
    dispatch(removeAll())
    const userCartData: UserCartData = {
      id: userID,
      cart: store.getState().cart.items
    }
    dispatch(saveCart(userCartData))
  }

  function handleIncrease(id: number) {
    dispatch(addToCart(id))
    const userCartData: UserCartData = {
      id: userID,
      cart: store.getState().cart.items
    }
    dispatch(saveCart(userCartData))
  }

  function handleDecrease(id: number) {
    dispatch(removeFromCart(id))
    const userCartData: UserCartData = {
      id: userID,
      cart: store.getState().cart.items
    }
    dispatch(saveCart(userCartData))
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
          <Button onClick={clearCart}>Оплатить</Button>
          <Link to="home">
            <Button>Вернуться на главную</Button>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Cart
