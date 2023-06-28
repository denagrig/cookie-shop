import { cookiesArray } from "../../data"
import Product from "../Product/Product"
import { Container } from "./Products.styled"

const Products = () => {
  return (
    <Container>
      {cookiesArray.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default Products
