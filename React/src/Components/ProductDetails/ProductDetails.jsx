import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import axios from 'axios';
import { counterContext } from '../../Context/product';
import ProductsSlider from '../ProductsSlider/ProductsSlider';

export default function ProductDetails() {

    const { addProductTCart } = useContext(counterContext)
    const { id } = useParams();

    function getProductDetails() {
        return axios.get(`http://localhost:5000/api/product/${id}`);
    }

    const { isLoading, data, isError, isFetching } = useQuery(`productDetails+${id}`, getProductDetails)

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Navigate to='/notFound' />
    }

    const productData = data.data.data;

    async function addProduct(id) {
        await addProductTCart(id);
    }

    return <>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <figure>
                        <img src={productData.imageCover} alt={productData.title} className='w-100' />
                    </figure>
                </div>
                <div className="col-md-9">
                    <figcaption>
                        <div>
                            <div>
                                <h2>{productData.title}</h2>
                                <p>{productData.description}</p>
                            </div>
                            <div className='d-flex'>
                                <p><button className='btn btn-success mt-3 me-3'><i class="fa-solid fa-sack-dollar pe-1"></i>Price : {productData.price} LE </button></p>
                                <p><button className='btn btn-info mt-3 me-3'> <i class="fa-solid fa-list pe-1"></i>Category : {productData.category.name}</button></p>
                                <p><button className='btn btn-danger mt-3'><i className="fa-solid fa-star pe-1" style={{ color: '#FFD43B' }} />Rating : {productData.ratingsAverage} </button></p>
                            </div>
                        </div>
                        <button className='btn btn-success w-100 mb-5' onClick={() => addProduct(productData._id)}>Add to cart <i class="fa-brands fa-shopify ps-1"></i></button>
                    </figcaption>
                </div>
            </div>
            <ProductsSlider />
        </div>
    </>
}
