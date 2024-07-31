import React from 'react'
import {TailSpin } from 'react-loader-spinner'

export default function Loader() {
    return <>
        <div className='d-flex bg-opacity-50 vh-100 bg-main justify-content-center align-items-center'>
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    </>
}
