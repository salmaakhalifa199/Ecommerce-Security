import React from 'react'
import errorImg from './images/error.svg'
import errorAnimation from './images/Animation - 1708434546236.json'
import Lottie from 'lottie-react'


export default function NotFound() {
  return <>
    <div className='container d-flex justify-content-center align-items-center'>
        <img src={errorImg} alt="error Image" className='w-50' />
        {/* <Lottie animationData={errorAnimation} className='w-100'></Lottie> */}
    </div>
  </>
}
