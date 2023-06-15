import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'

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