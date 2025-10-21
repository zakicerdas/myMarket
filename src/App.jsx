import './App.css'
import Navbar from './components/navbar'
import { AuthProvider } from './context/AuthContext'
import SecuredRoute from './components/securedRoute'
import { Routes, Route } from 'react-router-dom'
import { ThemeSetting } from './context/themeContext'
import { CartShopping } from './context/cartContext'
import Home from './pages/home'
import ProductList from './pages/productList'
import Contact from './pages/contact'
import Login from './pages/login'
import Checkout from './pages/checkOut'
import ErrorExlusive from './pages/boundaryError'

function App() {

  return (
    <>
    <div>
      <AuthProvider>
        <ThemeSetting>
          <CartShopping>
      <Navbar />  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/productList' element={
          <SecuredRoute> 
          <ProductList/> 
          </SecuredRoute> 
        }/>
        <Route path='/checkout' element={
          <SecuredRoute> 
          <Checkout/> 
          </SecuredRoute> 
        }/>

        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={
          <SecuredRoute>
          <ErrorExlusive/>
          </SecuredRoute>
          }/>
      </Routes>
          </CartShopping>
        </ThemeSetting>
      </AuthProvider>
    </div>
    </>
  )
}

export default App