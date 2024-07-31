import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { tokenContext } from '../../Context/token';
import style from './Login.module.css'
import { jwtDecode } from 'jwt-decode';



export default function Login() {

  const { setToken } = useContext(tokenContext);
  let naviagte = useNavigate();

  async function callRegister(req) {
    setIsLoading(true)
    axios.post(`http://localhost:5000/auth/login`, req)
      .then(function (data) {
        setIsSuccess(true)
        setIsLoading(false);
        localStorage.setItem("token", data.data.token)
        // localStorage.setItem("userID", data.data.user._id)
        setToken(data.data.token);

        setTimeout(function () {
          const role = jwtDecode(data.data.token).role;
          // console.log(role);
          if (role === 'customer') {
            naviagte('/home');
          }
          else if (role === "admin") {
            naviagte('/AdminDashBoard');
          }
        }, 1000);
      })
      .catch(function (data) {
        setIsLoading(false);
        setIsFailed(data.response.data.message);
        setTimeout(function () {
          setIsFailed(undefined);
        }, 3000);
      })
  }


  const validateSchema = yup.object({
    "email": yup.string().email('email is not valid').required('email is required'),
    "password": yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "password is not valid").required('password is required')
  })


  const registerForm = useFormik({
    initialValues: {
      "email": "",
      "password": ""
    },

    validationSchema: validateSchema,
    onSubmit: callRegister
  })


  const [isFailed, setIsFailed] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  return <>

    <div className="container mt-4 w-50">

      {isSuccess ? <div className='alert alert-success text-center'>Logged in successfully</div> : null}
      {isFailed ? <div className='alert alert-danger text-center'>{isFailed}</div> : null}

      <h3 className='mb-3'>Login Now :</h3>
      <form onSubmit={registerForm.handleSubmit}>
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
        <div className='d-flex justify-content-between'>
          <button className='btn bg-main mb-5 text-white' type='submit'>
            {isLoading ? <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['white', 'white', 'white', 'white', 'white']}
            /> : "Login"}
          </button>
          <Link to={'/forgetpass'}>
            <h5 className={style.editLink}>forget your password ?</h5>
          </Link>
        </div>
      </form>

    </div>
  </>
}