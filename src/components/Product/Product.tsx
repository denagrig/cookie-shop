import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons"
import { User, AddCookieToUser} from "../../types"
import { useDispatch } from "react-redux"
import { MainPageCookie } from "../../types"
import { Alergic, CookieName, CookiePrice, Image, Info, Icon} from "./Product.styled"
import { AppDispatch } from "../../store"
import { addCookie } from "../../slices/userSlice"

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
      const addCookieToUser: AddCookieToUser = {
        userID: parseInt(userID),
        cookieID: item.id,
        cookieCount: 1
      }
      dispatch(addCookie(addCookieToUser))
    }
  }

  return (
    <Alergic color={color}>
      <CookieName> {item.name} </CookieName>
      <Image src={item.img} />
      <CookiePrice> {item.price} </CookiePrice>
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={handleAddToCart} />
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