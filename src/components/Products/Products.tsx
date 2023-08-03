import { cookiesRecord } from "../../data"
import Product from "../Product/Product"
import { Container } from "./Products.styled"

const Products = () => {
  return (
    <Container>
      {Object.keys(cookiesRecord).map((key : string) => (
        <Product item={cookiesRecord[parseInt(key)]} key={key} />
      ))}
    </Container>
  )
}

export default Products
