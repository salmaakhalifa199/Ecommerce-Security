import axios from 'axios';
import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';

export default function AddProduct() {

    let naviagte = useNavigate();

    function getCategories() {
        return axios.get('http://localhost:5000/api/category')
    }

    const { data, isLoading } = useQuery('getCategories', getCategories);
    

    async function addProduct(body) {
        setStillLoading(true)
        axios.post(`http://localhost:5000/api/product`, body)
            .then(function (x) {
                setStillLoading(false);
                setIsSuccess(true);
                setTimeout(function () {
                    setIsSuccess(false)
                    naviagte('/AdminDashboard');
                }, 2500);
            })
            .catch(function (x) {
                setStillLoading(false);
                console.log(x);
                setTimeout(function () {
                    setIsFailed(undefined);
                }, 3000);
            })
    }


    const validateSchema = yup.object({
        "title": yup.string().required("Title is required"),
        "description": yup.string().required("Description is required"),
        "price": yup.number().required("Price is required"),
        "priceAfterDiscount": yup.number(),
        "quantity": yup.number().required("Quantity is required"),
        "category": yup.string().required("Category is required"),
        "imageCover": yup.string().required("Image Cover is required"),
        "ratingsAverage": yup.number().min(1, "Rating Average is between 1 and 5").max(5, "Rating Average is between 1 and 5").required("Rating Average is required")
    })


    const registerForm = useFormik({
        initialValues: {
            "title": "",
            "description": "",
            "price": "",
            "priceAfterDiscount": "",
            "quantity": "",
            "category": "",
            "imageCover": "",
            "ratingsAverage": "",
        },

        validationSchema: validateSchema,
        onSubmit: addProduct
    })


    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(undefined);
    const [stillLoading, setStillLoading] = useState(false);

    if (isLoading) {
        return <Loader />
    }

    // console.log(data.data.data);

    return <>
        <div className="container mt-4 w-50">

            {isSuccess ? toast.success('Product added successfully', { duration: 2000, position: 'top-center' }) : null}
            {isFailed ? toast.error('Error occured', { duration: 2000, position: 'top-center' }) : null}

            <h3 className='mb-3'>Add Product</h3>
            <form onSubmit={registerForm.handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={registerForm.values.title} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                    {registerForm.errors.title && registerForm.touched.title ? <div className='alert alert-danger mt-2'>{registerForm.errors.title}</div> : null}
                </div>

                <div className="mb-2">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" value={registerForm.values.description} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} rows="3"></textarea>
                    {registerForm.errors.description && registerForm.touched.description ? <div className='alert alert-danger mt-2'>{registerForm.errors.description}</div> : null}
                </div>

                <div className="mb-2">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" aria-label="Default select example" id="category" value={registerForm.values.category} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}>
                        <option selected>Open this select menu</option>
                        {data.data.data.map((category,idx) => <option key={idx} value={category._id}>{category.name}</option>)}
                    </select>
                    {registerForm.errors.category && registerForm.touched.category ? <div className='alert alert-danger mt-2'>{registerForm.errors.category}</div> : null}

                </div>
                <div className="mb-2">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" value={registerForm.values.price} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                    {registerForm.errors.price && registerForm.touched.price ? <div className='alert alert-danger mt-2'>{registerForm.errors.price}</div> : null}

                </div>
                <div className="mb-2">
                    <label htmlFor="priceAfterDiscount" className="form-label">Price After Discount (optional)</label>
                    <input type="number" className="form-control" id="priceAfterDiscount" value={registerForm.values.priceAfterDiscount} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                    {registerForm.errors.priceAfterDiscount && registerForm.touched.priceAfterDiscount ? <div className='alert alert-danger mt-2'>{registerForm.errors.priceAfterDiscount}</div> : null}

                </div>
                <div className="mb-2">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input type="number" className="form-control" id="quantity" value={registerForm.values.quantity} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                    {registerForm.errors.quantity && registerForm.touched.quantity ? <div className='alert alert-danger mt-2'>{registerForm.errors.quantity}</div> : null}

                </div>
                <div className="mb-2">
                    <label htmlFor="imageCover" className="form-label">Image Cover Link</label>
                    <input type="text" className="form-control" id="imageCover" value={registerForm.values.imageCover} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                    {registerForm.errors.imageCover && registerForm.touched.imageCover ? <div className='alert alert-danger mt-2'>{registerForm.errors.imageCover}</div> : null}

                </div>
                <div className="mb-2">
                    <label htmlFor="ratingsAverage" className="form-label">Rating Average</label>
                    <input type="number" className="form-control" id="ratingsAverage" value={registerForm.values.ratingsAverage} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                    {registerForm.errors.ratingsAverage && registerForm.touched.ratingsAverage ? <div className='alert alert-danger mt-2'>{registerForm.errors.ratingsAverage}</div> : null}

                </div>
                <div className=''>
                    <button className='btn bg-main mb-5 text-white d-block ms-auto' type='submit' disabled={!(registerForm.isValid && registerForm.dirty)}>
                        {stillLoading ? <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperclassName="color-ring-wrapper"
                            colors={['white', 'white', 'white', 'white', 'white']}
                        /> : "Add Product"}
                    </button>
                </div>
            </form>

        </div>
    </>
}
