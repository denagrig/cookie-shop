import { cookiesArray } from "../../data"
import Product from "../Product/Product"
import { Container } from "./Products.styled"

const Products = () => {
  return (
    <Container>
      {Object.keys(cookiesArray).map((key : string) => (
        <Product item={cookiesArray[parseInt(key)]} key={key} />
      ))}
    </Container>
  )
}

export default Products
