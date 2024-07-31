import { Button, duration } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { counterContext } from '../../Context/product';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import img from './Animation - 1709313300851.json'
import { Link } from 'react-router-dom';
import EmptyAnimation from '../EmtyAnimation/EmptyAnimation';

export default function Cart() {

  const { totalCartPrice, allProducts, deleteProduct, clearCart } = useContext(counterContext);
  console.log("all products here", allProducts);
  if (!allProducts) {
    return <EmptyAnimation />
  }

  // function updateProductCount(id, newCount) {
  //   const res = updateCount(id, newCount);
  //   if (res) {
  //     toast.success('Product Updated Successfully', { position: "top-center" })
  //   }
  //   else {
  //     toast.error('Error occuured', { position: "top-center" })
  //   }
  // }

  async function deleteCartProduct(id) {
    const res = await deleteProduct(id)
    if (res) {
      toast.success('Product Deleted Successfully', { position: "top-center" })
    }
    else {
      toast.error('Error occuured', { position: "top-center" })
    }
  }

  function clearCartProducts() {
    const res = clearCart()
    if (res) {
      toast.success('Cart Cleared Successfully', { position: "top-center" })
    }
    else {
      toast.error('Error occured', { position: "top-center" })
    }
  }

  return <>
    <div className="container">

      {allProducts.length ? <div>
        <h1 className='mt-2'>Shopping Cart :</h1>
        <div className='d-flex justify-content-between container'>
          <h5 className='text-main mb-3'>Total Cart Price : {totalCartPrice} LE</h5>
          <button className='btn btn-danger' onClick={() => clearCartProducts()}>Clear Cart</button>
        </div>
        <hr />
        <div className="container">
          {allProducts.map((product, idx) => <div className='row' key={idx}>
            <div className="col-md-1 mb-1">
              <img src={product.imageCover} alt={product.title} className='w-100' />
            </div>
            <div className="col-md-9">
              <h5>{product.title.toUpperCase()}</h5>
              <h5>price : {product.priceAfterDiscount * product.quantity}</h5>
            </div>
            <div className="col-md-2">
              <button className='btn btn-outline-danger' onClick={() => { deleteCartProduct(product._id) }}>Remove  <i className="fa-regular fa-trash-can"></i></button>
              {/* <button className='btn btn-success me-2' onClick={() => updateProductCount(product._id, product.quantity + 1)}>+ </button>
              {product.quantity}
              <button disabled={product.quantity === 1} className='btn btn-danger ms-2' onClick={() => updateProductCount(product._id, product.quantity - 1)}>-</button> */}
            </div> 
            <hr className='mt-2' />
          </div>)}
          <div>
            <Link to="/payment">
              <button className='btn btn-success d-block m-auto'>Confirm Payment</button>
            </Link>
          </div>
        </div>
      </div> : <div className='d-flex flex-column align-items-center'>
        <div className="col-md-5 col-12">
          <div className='text-center'>
            <h2 className='pt-3'>Your Cart is empty !</h2>
            <Lottie animationData={img}></Lottie>
          </div>
        </div>
      </div>}


    </div>
  </>
}
