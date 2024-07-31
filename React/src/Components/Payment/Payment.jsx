import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { counterContext } from '../../Context/product';
import MyModal from "../CreditCard/CreditCardForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import { tokenContext } from '../../Context/token';


export default function Payment() {
    const [showModal, setShowModal] = useState(false);
    const { clearCart } = useContext(counterContext);
    const {token, getPayload} = useContext(tokenContext);
    const nav = useNavigate();
    

    function confrimCashPayment() {

        const details = document.getElementById('details').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;

        const shippingData = {
            "shippingAddress": {
                details,
                phone,
                city
            }
        }
        axios.post(`http://localhost:5000/order/add/${getPayload(token).id}`, {paymentMethod: 'cash'}).then((res) => {
            if (res.data.status === "success") {
                toast.success("Payment completed successfully");
                clearCart();
                setTimeout(() => {
                    nav('/allOrders');
                }, 1500)
            }
        }).catch((err) => {
            toast.error("Error occured");
        })
    }

    function confrimOnlinePayment() {

        const details = document.getElementById('details').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;

        const shippingData = {
            "shippingAddress": {
                details,
                phone,
                city
            }
        }
        axios.post(`http://localhost:5000/order/add/${getPayload(token).id}`, {paymentMethod: 'card'}).then((res) => {
            if (res.data.status === "success") {
                // toast.success("Payment completed successfully");
                // getUserCart();
                // setTimeout(() => {
                //     nav('/home');
                // }, 2000)
                clearCart();
                setTimeout(() => {
                    nav('/allOrders');
                }, 1500)
            }
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return <>
        <div className="container">
            <h2 className='mt-3  text-center'>Payment</h2>
            <div className="row justify-content-center ">
                <div className="col-md-8">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" placeholder="Cairo.." />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="phone" placeholder="0123.." />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Details</label>
                        <textarea className="form-control" id="details" rows="3" placeholder='address..'></textarea>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center text-center gap-2'>
                <div className="col-md-3">
                    <button onClick={confrimCashPayment} className='btn btn-primary w-100'>Confirm Cash Payment <i className="fa-solid fa-coins ps-1"></i></button>
                </div>
                <MyModal show={showModal} hide={handleCloseModal} onClick={confrimOnlinePayment} />
                <div className="col-md-3">
                    <button
                        className="btn btn-success w-100"
                        onClick={handleShowModal}
                    >
                        Confirm Card Payment{" "}
                        <i className="fa-regular fa-credit-card ps-1"></i>
                    </button>
                </div>
            </div>
        </div>
    </>
}
