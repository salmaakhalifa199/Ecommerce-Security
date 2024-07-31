import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import style from "./ProductSlider.module.css";

export default function ProductsSlider() {
  function getAllProducts() {
    return axios.get("http://localhost:5000/api/product");
  }
  const { data, isLoading } = useQuery("getProducts", getAllProducts);

  if (isLoading) {
    return <Loader />;
  }

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider {...settings} className={style.sliderStyle}>
      {data.data.data.length <= 3
        ? []
        : data.data.data.map((product, idx) => (
            <div key={idx} className="overflow-hidden mb-3">
              <Link to={`/productDetails/${product._id}`}>
                <div className="cursor-pointer">
                  <figure className="position-relative">
                    <img
                      src={product.imageCover}
                      className="w-100"
                      alt={product.title}
                      style={{ height: "250px" }}
                    />
                  </figure>
                  <figcaption className="ps-2 pe-2">
                    <h4 className="text-center">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h4>

                    <div className="d-flex justify-content-between">
                      {product.priceAfterDiscount ? (
                        <p>
                          <span className="text-decoration-line-through text-danger">
                            {product.price}
                          </span>{" "}
                          - {product.priceAfterDiscount} LE
                        </p>
                      ) : (
                        <p>{product.price} LE</p>
                      )}
                      <div className="d-flex">
                        <p>{product.ratingsAverage}</p>
                        <i
                          className="fa-solid fa-star pt-1 ps-1"
                          style={{ color: "#FFD43B" }}
                        />
                      </div>
                    </div>
                  </figcaption>
                </div>
              </Link>
            </div>
          ))}
    </Slider>
  );
}

{
  /* <div>
    <div class={style.jobCard + " text-center bg-white rounded-3 p-4 shadow-sm m-1"}>
        <div class="service-icon d-flex justify-content-center align-items-center m-auto">
            <i class="fa-solid fa-user-plus fs-4"></i>
        </div>
        <h4 class="pt-4 pb-1">Junior Web Developer</h4>
        <p>Value<i class={style.checkIcon + " fa-solid fa-circle-check ps-2"}></i></p>
        <div className="mb-3">
            <button className={style.jobBtnBlack + " btn rounded-3 me-1"}>Maddi</button>
            <button className={style.jobBtnBlack + " btn rounded-3 me-1"}>$ 1000 - 1,500</button>
            <button className={style.jobBtnBlack + " btn rounded-3 me-1 mb-1"}>With Perks</button>
            <button className={style.jobBtnBlack + " btn rounded-3 me-1"}>Part time</button>
        </div>
        <div>
            <button className={style.jobBtnApply + " btn rounded-3 me-1 rounded-3 fs-5"}>Apply<i class="fa-solid fa-link ps-1"></i></button>
        </div>
    </div>
</div> */
}
