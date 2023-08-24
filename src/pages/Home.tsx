import Footer from "@components/Footer/Footer"
import Navbar from "@components/Navbar/Navbar"
import Products from "@components/Products/Products"
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
