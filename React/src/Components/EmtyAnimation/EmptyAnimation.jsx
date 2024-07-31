import Lottie from 'lottie-react'
import React from 'react'
import img from './Animation - 1709313300851.json'


export default function EmptyAnimation() {
    return <>
        <div className='d-flex flex-column align-items-center'>
            <div className="col-md-4 col-12">
                <div className='text-center'>
                    <h2 className='pt-3'>Empty !</h2>
                    <Lottie animationData={img}></Lottie>
                </div>
            </div>
        </div>
    </>
}
