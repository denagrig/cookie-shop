import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { cookiesArray } from "../../data"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../../slices/cartSlice"
import * as styled from "./Cart.styled"


const Cart = () => {
  const items = useAppSelector(() =>
    JSON.parse(localStorage.getItem("userCart") || "[]")
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
            {Object.entries(items).map(([, cookieData] : any) => (
              <styled.ProductContainer key={cookieData.id}>
                <styled.Text> {cookiesArray[parseInt(cookieData.id)].name} </styled.Text>
                <styled.Image src={cookiesArray[parseInt(cookieData.id)].img} />
                <styled.PriceContainer>
                  <styled.Left>
                    <styled.Text> {cookiesArray[parseInt(cookieData.id)].price} </styled.Text>
                  </styled.Left>
                  <styled.Right>
                    <styled.ClickableElement
                      onClick={() => handleIncrease(parseInt(cookieData.id))}
                    >
                      +
                    </styled.ClickableElement>
                    <styled.Count>{cookieData.count}</styled.Count>
                    <styled.ClickableElement
                      onClick={() => handleDecrease(parseInt(cookieData.id))}
                    >
                      -
                    </styled.ClickableElement>
                  </styled.Right>
                </styled.PriceContainer>
              </styled.ProductContainer>
            ))}
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
