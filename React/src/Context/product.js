import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { tokenContext } from "./token";

export const counterContext = createContext();

export default function ProductProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserID] = useState(null);
  const  { token, getPayload } = useContext(tokenContext);
  console.log("data populated", userId + ',' + token)
  
  function addProductTCart(id) {
    axios
      .post(
        `http://localhost:5000/cart/addItem/${userId}`,
        {
          productId: id,
          quantity: 1,
        }
      )
      .then((res) => {
        toast.success("Added to cart", {
          duration: 1500,
          position: "top-center",
        });
        getUserCart();

        return true;
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err.response.data.error);
        return false;
      });
  }

  async function getUserCart() {
    await axios
      .get(
        `http://localhost:5000/cart/getCart/${userId}`
      )
      .then((res) => {
        setAllProducts(res.data.cart.items);
        setNumOfCartItems(res.data.numberOfItems);
        setTotalCartPrice(res.data.totalPrice);
        setCartId(res.data.cart._id);
        setUserID(getPayload(token).id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateCount(id, newCount) {
    let booleanFlag = false;
    await axios
      .post(
        `http://localhost:5000/cart/addItem/${userId}`,
        {
          productId: id,
          quantity: newCount,
        }
      )
      .then((res) => {
        setTotalCartPrice(res.data.cart.totalCartPrice);
        setNumOfCartItems(res.data.cart.numOfCartItems);
        const { totalCartPrice, numberOfItems, ...rest } = res.data.items;
        setAllProducts(rest);
        booleanFlag = true;
      })
      .catch((err) => {
        booleanFlag = false;
      })
      .finally(() => getUserCart());

    return booleanFlag;
  }

  async function deleteProduct(id) {
    let flag = false;
    try {
      const res = await axios.delete(
        `http://localhost:5000/cart/removeItem/${userId}`,
        { data: { productId: id } }
      );
      const { numberOfItems, totalPrice, items } = res.data.cart;
      console.log("rest is here: ", items, numberOfItems, totalPrice);
      setAllProducts(items);
      setNumOfCartItems(numberOfItems);
      setTotalCartPrice(totalPrice);
      flag = true;
    } catch (err) {
      console.log(err);
      flag = false;
    } finally {
      getUserCart();
      return flag;
    }
  }

  async function clearCart() {
    try {
      const res = await axios.delete("http://localhost:5000/cart/clearCart", {
        data: { userId },
      });
      setAllProducts([]);
      setNumOfCartItems("");
      setTotalCartPrice(0);
      console.log("this is the response", res);
      return true; // Return true after successful deletion
    } catch (err) {
      console.error(err);
      if (err.response) {
        // Check for specific error codes or messages from the server
        console.error("Error status:", err.response.status);
        console.error("Error data:", err.response.data);
      }

      return false; // Return false on error
    }
  }

  useEffect(() => {
    getUserCart();
    if (localStorage.getItem('token')) {
      setUserID(getPayload(localStorage.getItem('token')).id)
    }
  }, []);

  return (
    <counterContext.Provider
      value={{
        numOfCartItems,
        totalCartPrice,
        allProducts,
        addProductTCart,
        getUserCart,
        updateCount,
        deleteProduct,
        clearCart,
        cartId,
      }}
    >
      {children}
    </counterContext.Provider>
  );
}
