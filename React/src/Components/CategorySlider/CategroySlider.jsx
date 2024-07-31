import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import Loader from "../Loader/Loader";

export default function CategorySlider() {

    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }

    const { data, isLoading } = useQuery('categorySlider', getCategories)

    if (isLoading) {
        return <Loader />
    }

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: true
    };
    return <>
        <Slider {...settings}>
            {data.data.data.map((category, idx) => <div key={idx}>
                <img style={{ height: "170px" }} className="w-100 mt-2" src={category.image} alt={category.name} />
                <h6 className="text-center">{category.name}</h6>
            </div>)}
        </Slider>

    </>
}