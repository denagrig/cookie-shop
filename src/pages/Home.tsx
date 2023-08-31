import Footer from "@src/components/Footer/Footer"
import Navbar from "@src/components/Navbar/Navbar"
import Products from "@src/components/Products/Products"
document.title = "Магазин"

const Home = () => {  
  return (
    <div>
      <Navbar />
      <Products />
      <Footer />
    </div>
  )
}

export default Home
