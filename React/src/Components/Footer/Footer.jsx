import React from 'react'
import payImg1 from './images/Amazon_Pay-Logo.wine.png'
import payImg2 from './images/MasterCard_Logo.svg.png'
import payImg3 from './images/196539.png'
import payImg4 from './images/paypal-784404_1280.webp'
import download1 from './images/png-transparent-app-store-apple-google-play-apple-text-logo-mobile-phones.png'
import download2 from './images/download (1).png'


export default function Footer() {
  return <>
    <div className='bg-main-light p-3'>
      <div className="container">
        <h4>Get the FreshCart app</h4>
        <p>We will send you a link, open it on your phone to download the app</p>
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <div className="mb-3">
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email ..." />
              </div>
            </div>
            <div className="col-md-2">
              <button className='btn bg-main text-white'>Share App Link</button>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-md-4">
              <div className='d-flex flex-row'>
                <div>
                  <h6 className='pt-4 pe-2 fw-bold'>Payment</h6>
                </div>
                <div className="footerImgs">
                  <img src={payImg1} alt="" className='w-25 pe-3' />
                  <img src={payImg2} alt="" className='w-25 pe-3' />
                  <img src={payImg3} alt="" className='w-25 pe-3' />
                  <img src={payImg4} alt="" className='w-25 pe-3' />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div>
                <div className=''>
                  <div>
                    <h6 className='fw-bold'>Get deliveries with FreshCart</h6>
                  </div>
                  <div className="footerImgs">
                    <img src={download1} alt="" className='w-25' />
                    <img src={download2} alt="" className='w-25 pe-4' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
