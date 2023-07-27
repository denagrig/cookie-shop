import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { cookiesArray } from "../../data"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart, removeAll, saveCart} from "../../slices/cartSlice"
import * as styled from "./Cart.styled"
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
    <styled.Container>
      <styled.Wrapper>
        <styled.Form>
          <styled.Container>
            {items.length ? items.map((item) => (
              <styled.ProductContainer key={item.id}>
                <styled.Text> {cookiesArray[item.id].name} </styled.Text>
                <styled.Image src={cookiesArray[item.id].img} />
                <styled.PriceContainer>
                  <styled.Left>
                    <styled.Text> {cookiesArray[item.id].price} </styled.Text>
                  </styled.Left>
                  <styled.Right>
                    <styled.ClickableElement
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </styled.ClickableElement>
                    <styled.Count>{item.count}</styled.Count>
                    <styled.ClickableElement
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </styled.ClickableElement>
                  </styled.Right>
                </styled.PriceContainer>
              </styled.ProductContainer>
            )) : <></>}
          </styled.Container>
          <styled.Button onClick={clearCart}>Оплатить</styled.Button>
          <Link to="home">
            <styled.Button>Вернуться на главную</styled.Button>
          </Link>
        </styled.Form>
      </styled.Wrapper>
    </styled.Container>
  )
}

export default Cart
