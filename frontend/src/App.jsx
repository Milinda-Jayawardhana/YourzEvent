import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FlowerBouquets from './pages/FlowerBouquets'
import Services from './pages/Services'
import Events from './pages/Events'
import GiftPackages from './pages/GiftPackages'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Login from './pages/Login'
import About from './pages/About'
import WhatsAppFloat from './components/WhatsappFloat'
import Terms from './pages/Terms'
import Returns from './pages/Returns'
import ScrollToTop from './components/ScrollToTop'
import {ToastContainer} from 'react-toastify'//used for notifications
import 'react-toastify/dist/ReactToastify.css'
import Policy from './pages/Policy'

const App = () => {
  return (
    <div className='min-h-screen bg-transparent'>
      <ToastContainer/>
      <ScrollToTop />
      <div className='mx-auto max-w-[1920px] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Navbar />
        <div className="mt-[90px]">
          <SearchBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<FlowerBouquets />} />
            <Route path='/services' element={<Services />} />
            <Route path='/services/events' element={<Events />} />
            <Route path='/services/floral-arrangements/flower-bouquets' element={<FlowerBouquets />} />
            <Route path='/services/floral-arrangements/gift-items-packages' element={<GiftPackages />} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/about' element={<About />} />
            <Route path='/product/:productId' element={<Product/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/place-order' element={<PlaceOrder/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/terms-and-conditions' element={<Terms/>} />
            <Route path='/privacy-and-policy' element={<Policy/>} />
            <Route path='/return-policy' element={<Returns/>} />               
          </Routes>  
        </div>
        <WhatsAppFloat />
        <Footer/>
      </div>
   </div>
  )
}

export default App
