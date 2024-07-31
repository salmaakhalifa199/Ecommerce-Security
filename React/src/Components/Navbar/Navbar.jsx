import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/freshcart-logo.svg";
import { counterContext } from "../../Context/product";
import { tokenContext } from "../../Context/token";
// import { wishContext } from "../../Context/wishlist";
import style from './Navbar.module.css'
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  let nav = useNavigate();
  const { numOfCartItems } = useContext(counterContext);
  // const { numOfWishItems } = useContext(wishContext);
  const { token, setToken, getPayload } = useContext(tokenContext);


  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    nav("/login");
  }

  async function initializeCart() {
    try {
      await axios.post("http://localhost:5000/cart/init", {userId: getPayload(token).id});
      nav('/Cart')
    } catch(err) {
      toast.error(err.response.data.error);
    }
  }

  async function initializeOrder() {
    try {
      await axios.post("http://localhost:5000/order/init", {userId: getPayload(token).id});
      nav('/allOrders')
    } catch(err) {
      toast.error(err.response.data.error);
    }
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [setToken])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={"home"}>
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to={"home"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to={"products"}>
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to={"categories"}
                  >
                    Categories
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to={"brands"}>
                    Brands
                  </Link>
                </li> */}

                {/* {token ? (
                  <li className="nav-item position-relative">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"wishlist"}
                    >
                      Wishlist
                    </Link>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numOfWishItems ? numOfWishItems : ""}
                    </span>
                  </li>
                ) : null} */}

                <li className="nav-item">
                  <button className={style.cartBtn} onClick={initializeOrder}>
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"allOrders"}
                    >
                      All Orders
                    </Link>
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
          <ul className="ms-auto navbar-nav align-items-center gap-1">
            {token ? (
              <li className="nav-item position-relative">
                <button className={style.cartBtn} onClick={initializeCart}>
                  <Link
                    className="nav-link d-flex justify-content-center align-items-end border-end rounder-right mx-2"
                    aria-current="page"
                    to={"cart"}
                  >
                    <i
                      className="fa-solid fa-cart-shopping text-main mx-2"
                      style={{
                        padding: 8,
                        backgroundColor: "rgba(194, 194, 194, 0.5)",
                        color: "rgb(86, 86, 86)",
                        borderRadius: 25,
                      }}
                    ></i>
                    <div className={style.cartDetails}>
                      <p className={style.cartHeading}>My Cart</p>
                      <p className={style.cart}>
                        {numOfCartItems ? numOfCartItems : "No"} item
                        {numOfCartItems !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </Link>
                </button>
              </li>
            ) : null}

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to={"login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to={"register"}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : null}
            {token ? (
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={logOut}
                >
                  Logout
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </>
  );
}
