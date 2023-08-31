import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons"
import { User, AddCookieToUser, MainPageCookie } from "@src/types"
import { useDispatch } from "react-redux"
import {
  Alergic,
  CookieName,
  CookiePrice,
  Image,
  Info,
  Icon,
} from "@src/components/Product/Product.styled"
import { AppDispatch } from "@src/store"
import { addCookie } from "@src/slices/userSlice"
import { useAppSelector } from "@src/hooks"
import { UserStatus } from "@src/data"

const Product = ({ item }: { item: MainPageCookie }) => {
  const dispatch = useDispatch<AppDispatch>()
  const curUser: User = useAppSelector((state) => state.user.userData)
  const userID: number = useAppSelector((state) => state.user.userID)
  let isAlergic: boolean
  let color = "lightGrey"

  if (userID != UserStatus.LogedOut) {
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
        userID: userID,
        cookieID: item.id,
        cookieCount: 1,
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
