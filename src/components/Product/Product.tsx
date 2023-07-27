import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons"
import { User, UserCartData } from "../../types"
import { addToCart, saveCart } from "../../slices/cartSlice"
import { useDispatch } from "react-redux"
import { MainPageCookie } from "../../types"
import * as styled from "./Product.styled"
import { AppDispatch, store } from "../../store"

const Product = ({ item }: { item : MainPageCookie}) => {
  const dispatch = useDispatch<AppDispatch>()
  const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
  const userID: string = JSON.parse(localStorage.getItem("userID") || "-1")
  const curUser: User = allUsers[parseInt(userID)]
  let isAlergic: boolean
  let color = "lightGrey"

  if (parseInt(userID) != -1) {
    isAlergic = curUser.alergens.some((r) => item.alergens.includes(r))
    if (curUser.alergens.some((r) => item.alergens.includes(r))) {
      color = "lightRed"
    }
  }

  const handleAddToCart = () => {
    if (isAlergic) {
      alert(
        "Вы не можете добавить этот товар в корзину, так как у вас алергия на один или несколько продуктов в его составе"
      )
    } else {
      dispatch(addToCart(item.id))
      const userCartData: UserCartData = {
        id: parseInt(userID),
        cart: store.getState().cart.items
      }
      dispatch(saveCart(userCartData))
    }
  }

  return (
    <styled.Alergic color={color}>
      <styled.CookieName> {item.name} </styled.CookieName>
      <styled.Image src={item.img} />
      <styled.CookiePrice> {item.price} </styled.CookiePrice>
      <styled.Info>
        <styled.Icon>
          <ShoppingCartOutlined onClick={handleAddToCart} />
        </styled.Icon>
        <styled.Icon>
          <SearchOutlined />
        </styled.Icon>
        <styled.Icon>
          <FavoriteBorderOutlined />
        </styled.Icon>
      </styled.Info>
    </styled.Alergic>
  )
}

export default Product