import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons"
import { User } from "../../types"
import { addToCart } from "../../slices/cartSlice"
import { useDispatch } from "react-redux"
import * as styled from "./Product.styled"

const Product = ({ item }: { item : any }) => {
  const dispatch = useDispatch()
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