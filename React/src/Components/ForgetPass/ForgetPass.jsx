import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';


export default function ForgetPass(email) {

    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateSchema = yup.object({
        "email": yup.string().email('email is not valid').required('email is required'),
    })

    const registerForm = useFormik({
        initialValues: {
            "email": "",
        },

        validationSchema: validateSchema,
        onSubmit: sendCode
    })


    function sendCode() {
        const { email } = registerForm.values;
        setIsLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
            "email": email
        }).then((res) => {
            toast.success("Code sent successfully")
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(function () {
                nav('/verifycode');
            }, 2500);
        }).catch((err) => {
            toast.error("Error occured")
        })
    }


    return <>
        <div className="container">
            <h2 className='mt-4 fw-bold'>Please Enter Your Email</h2>
            <form onSubmit={registerForm.handleSubmit}>
                <div className="col-md-12 col-sm-4">
                    <input type="email" className="form-control mt-3" id="email" placeholder='Email..' value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                    {registerForm.errors.email && registerForm.touched.email ? <div className='alert alert-danger mt-2'>{registerForm.errors.email}</div> : null}
                    <button className='btn btn-success mt-3' type='submit' disabled={!registerForm.values.email || registerForm.isSubmitting}>
                        {isLoading ? <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['white', 'white', 'white', 'white', 'white']}
                        /> : "Verify"}
                    </button>
                </div>
            </form>
        </div>
    </>
}