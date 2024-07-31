import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import Layout from './Components/Layout/Layout'
import { tokenContext } from './Context/token'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Payment from './Components/Payment/Payment'
import UserAllOrders from './Components/UserAllOrders/UserAllOrders'
import Wishlist from './Components/Wishlist/Wishlist'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPass from './Components/ResetPass/ResetPass'
import AdminDashBoard from './Components/AdminDashBoard/AdminDashBoard'
import AddProduct from './Components/AddProduct/AddProduct'
import AddCategory from './Components/AddCategory/AddCategory'
import AdminProtectedRoutes from './Components/AdminProtectedRoutes/AdminProtectedRoutes'
import Home from './Components/Home/Home'


const routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: 'register', element: <Register /> },
      { path: 'ecommerce', element: <Register /> },
      { path: 'forgetpass', element: <ForgetPass /> },
      { path: 'verifycode', element: <VerifyCode /> },
      { path: 'resetpassword', element: <ResetPass /> },
      { path: 'login', element: <Login /> },
      {
        path: 'home', element:
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
      },
      {
        path: '', element:
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
      },
      {
        path: 'products', element:
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
      },
      {
        path: 'cart', element:
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
      },
      {
        path: 'categories', element:
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
      },
      {
        path: 'brands', element:
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
      },
      {
        path: 'ProductDetails/:id', element:
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
      },
      {
        path: 'payment', element:
          <ProtectedRoutes>
            <Payment />
          </ProtectedRoutes>
      },
      {
        path: 'allorders', element:
          <ProtectedRoutes>
            <UserAllOrders />
          </ProtectedRoutes>
      },
      {
        path: 'wishlist', element:
          <ProtectedRoutes>
            <Wishlist />
          </ProtectedRoutes>
      },
      {
        path: 'AdminDashBoard', element:
          <AdminProtectedRoutes>
            <AdminDashBoard />
          </AdminProtectedRoutes>
      },
      {
        path: 'AddProduct', element:
          <AdminProtectedRoutes>
            <AddProduct />
          </AdminProtectedRoutes>
      },
      {
        path: 'AddCategory', element:
          <AdminProtectedRoutes>
            <AddCategory />
          </AdminProtectedRoutes>
      },

      { path: '*', element: <NotFound /> },
    ]
  }
])



export default function App() {

  const { setToken, token } = useContext(tokenContext)

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setToken(localStorage.getItem("token"))
    }
  }, [])



  return <RouterProvider router={routes}>

  </RouterProvider>
}