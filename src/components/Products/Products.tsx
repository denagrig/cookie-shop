import { cookiesRecord } from "@src/data"
import Product from "@components/Product/Product"
import { Container } from "@components/Products/Products.styled"

const Products = () => {
  return (
    <Container>
      {Object.keys(cookiesRecord).map((key: string) => (
        <Product item={cookiesRecord[parseInt(key)]} key={key} />
      ))}
    </Container>
  )
}

export default Products
