import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

export default function AddCategory() {
  let naviagte = useNavigate();
  const [stillLoading, setStillLoading] = useState(false);


  async function addCategory(body) {
    setStillLoading(true)
    axios.post(`http://localhost:5000/api/category`, body)
      .then(function (x) {
        setStillLoading(true);
        setTimeout(function () {
          setStillLoading(false);
          toast.success('Category added successfully', { duration: 2000, position: 'top-center' });
          naviagte('/AdminDashBoard');
        }, 2500);
      })
      .catch(function (x) {
        setStillLoading(true);
        console.log(x);
        setTimeout(function () {
          setStillLoading(false);
          toast.error('Error occured', { duration: 2000, position: 'top-center' });
        }, 3000);
      })
  }


  const validateSchema = yup.object({
    "name": yup.string().required("Category Name is required")
  })


  const categoryForm = useFormik({
    initialValues: {
      "name": ""
    },

    validationSchema: validateSchema,
    onSubmit: addCategory
  })


  return <>
    <div className="container mt-4 w-50">

      <h3 className='mb-3'>Add Category</h3>
      <form onSubmit={categoryForm.handleSubmit}>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">Category Name</label>
          <input type="text" className="form-control" id="name" value={categoryForm.values.name} onChange={categoryForm.handleChange} onBlur={categoryForm.handleBlur} />
          {categoryForm.errors.name && categoryForm.touched.name ? <div className='alert alert-danger mt-2'>{categoryForm.errors.name}</div> : null}
        </div>
        <div className=''>
          <button className='btn bg-main mb-5 text-white d-block ms-auto' type='submit' disabled={!(categoryForm.isValid && categoryForm.dirty)}>
            {stillLoading ? <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperclassName="color-ring-wrapper"
              colors={['white', 'white', 'white', 'white', 'white']}
            /> : "Add Category"}
          </button>
        </div>
      </form>

    </div>
  </>
}
