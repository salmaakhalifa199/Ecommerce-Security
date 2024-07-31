import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';


export default function Register() {

  let naviagte = useNavigate();

  async function callRegister(req) {
    setIsLoading(true)
    axios.post(`http://localhost:5000/user/register`, req)
      .then(function (x) {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(function () {
          setIsSuccess(false)
          naviagte('/login');
        }, 2500);
      })
      .catch(function (x) {
        setIsLoading(false);
        // setIsFailed(x.response.message);
        setIsFailed(x.response.data.message);
        setTimeout(function () {
          setIsFailed(undefined);
        }, 3000);
      })
  }


  const validateSchema = yup.object({
    "firstName": yup.string().min(3, "name must be longer than 3 letters").max(10, "name must be shorter than 10 letters").required("name is required"),
    "lastName": yup.string().min(3, "name must be longer than 3 letters").max(10, "name must be shorter than 10 letters").required("name is required"),
    "email": yup.string().email('email is not valid').required('email is required'),
    "password": yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "password is not valid").required('password is required'),
  })


  const registerForm = useFormik({
    initialValues: {
      "firstName": "",
      "lastName": "",
      "email": "",
      "password": ""
    },

    validationSchema: validateSchema,
    onSubmit: callRegister
  })


  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  return <>

    <div className="container mt-4 w-50">

      {isSuccess ? <div className='alert alert-success text-center'>Account hase been created successfully</div> : null}
      {isFailed ? <div className='alert alert-danger text-center'>{isFailed}</div> : null}

      <h3 className='mb-3'>Register Now :</h3>
      <form onSubmit={registerForm.handleSubmit}>
        <div className="mb-2">
          <label htmlFor="firstName" className="form-label">First Name :</label>
          <input type="text" className="form-control" id="firstName" value={registerForm.values.firstName} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
          {registerForm.errors.firstName && registerForm.touched.firstName ? <div className='alert alert-danger mt-2'>{registerForm.errors.firstName}</div> : null}
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="form-label">Last Name :</label>
          <input type="text" className="form-control" id="lastName" value={registerForm.values.lastName} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
          {registerForm.errors.lastName && registerForm.touched.lastName ? <div className='alert alert-danger mt-2'>{registerForm.errors.lastName}</div> : null}
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">email :</label>
          <input type="email" className="form-control" id="email" value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
          {registerForm.errors.email && registerForm.touched.email ? <div className='alert alert-danger mt-2'>{registerForm.errors.email}</div> : null}

        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label">password :</label>
          <input type="password" className="form-control" id="password" value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
          {registerForm.errors.password && registerForm.touched.password ? <div className='alert alert-danger mt-2'>{registerForm.errors.password}</div> : null}

        </div>
        <div className=''>
          <button className='btn bg-main mb-5 text-white d-block ms-auto' type='submit' disabled={!(registerForm.isValid && registerForm.dirty)}>
            {isLoading ? <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['white', 'white', 'white', 'white', 'white']}
            /> : "Register"}
          </button>
        </div>
      </form>

    </div>
  </>
}