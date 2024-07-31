import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';


export default function VerifyCode() {

    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateSchema = yup.object({
        "code": yup.string().matches(/^\d{6}$/, 'Code is not valid or has expired').required('Code is required')
    })

    const registerForm = useFormik({
        initialValues: {
            "code": "",
        },

        validationSchema: validateSchema,
        onSubmit: verifyCode
    })

    function verifyCode() {
        const { code } = registerForm.values;
        setIsLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
            "resetCode": code
        }).then((res) => {
            toast.success("Success")
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(function () {
                nav('/resetpassword');
            }, 2500);
        }).catch((err) => {
            toast.error("Error occured")
        })
    }


    return <>
        <div className="container">
            <h2 className='mt-4 fw-bold'>Please Enter Your Verification Code</h2>
            <form onSubmit={registerForm.handleSubmit}>
                <div className="col-md-12 col-sm-4">
                    <input
                        type="text"
                        className="form-control mt-3"
                        id="code"
                        placeholder="Code.."
                        value={registerForm.values.code}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                    />
                    {registerForm.errors.code && registerForm.touched.code ? <div className='alert alert-danger mt-2'>{registerForm.errors.code}</div> : null}
                    <button className='btn btn-success mt-3' type='submit' disabled={!registerForm.values.code || registerForm.isSubmitting}>
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