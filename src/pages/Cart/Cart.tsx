import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { cookiesArray } from "../../data"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../../slices/cartSlice"
import * as styled from "./Cart.styled"
import { Cookies } from "../../types"

const Cart = () => {
  const items:Cookies[] = useAppSelector(() =>
    JSON.parse(localStorage.getItem("userCart") || "")
  )
  const dispatch = useDispatch()

  const ClearCart = () => {
    localStorage.setItem("userCart", JSON.stringify(""))
  }

  function handleIncrease(id: number) {
    dispatch(addToCart(id))
  }

  function handleDecrease(id: number) {
    dispatch(removeFromCart(id))
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
          <styled.Button onClick={ClearCart}>Оплатить</styled.Button>
          <Link to="home">
            <styled.Button>Вернуться на главную</styled.Button>
          </Link>
        </styled.Form>
      </styled.Wrapper>
    </styled.Container>
  )
}

export default Cart
