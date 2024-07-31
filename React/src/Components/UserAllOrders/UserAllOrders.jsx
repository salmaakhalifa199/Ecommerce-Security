import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { wishContext } from "../../Context/wishlist";
import Lottie from "lottie-react";
import img from './Animation - 1709313300851.json'
import { tokenContext } from "../../Context/token";


export default function UserAllOrders() {
  const [UserAllOrders, setUserAllOrders] = useState([]);
  const {token, getPayload} = useContext(tokenContext);

  useEffect(() => {
    (function getUserOrders() {
      axios
        .get(`http://localhost:5000/order/get`, {params: {userId: getPayload(token).id}})
        .then((res) => {
          setUserAllOrders(res.data.orders);
          console.log("orders here:", res.data.orders);
        })
        .catch((err) => {
          console.log("failed: ", err);
        });
    })();
  }, []);

  if (!UserAllOrders) {
    return <Loader />;
  }

  if (UserAllOrders.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-4">
        <div className="col-md-4 col-12">
          <div className="text-center">
            <Lottie animationData={img}></Lottie>
            <h2>No orders yet!</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div>
          <h1 className="mt-2 text-center">All Your Orders</h1>
          <div className="d-flex justify-content-between container"></div>
          <hr />
          <div className="container text-center">
            <div className="row">
              {UserAllOrders.map((order, idx) => (
                <div key={idx} className="col-md-4">
                  <div className="bg-body-secondary order m-2 p-2">
                    <h5>
                      <i className="fa-solid fa-clock pe-2"></i>Order Date :{" "}
                      {order.creationDate.substring(0, 10)}
                    </h5>
                    <h5>
                      <i class="fa-solid fa-hand-holding-dollar pe-2"></i>Total
                      Price : {order.totalPrice}
                    </h5>
                    <h5>
                      <i class="fa-solid fa-list-ol pe-2"></i>Number of items :{" "}
                      {order.numberOfItems}
                    </h5>
                    <h5>
                      <i class="fa-solid fa-credit-card pe-2"></i>Payment Method
                      : {order.paymentMethod}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
