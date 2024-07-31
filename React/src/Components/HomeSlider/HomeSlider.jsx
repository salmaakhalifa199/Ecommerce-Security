import React from "react";
import Slider from "react-slick";
import img3 from '../Products/images/shopping cover.avif'
import img4 from '../Products/images/Malls-in-Mumbai.webp'
import img5 from '../Products/images/Online-vs-In-Store-Shopping-blog.jpg'


export default function HomeSlider() {
    var settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 3
    };
    return (
        <Slider {...settings}>
            <div>
                <img style={{height: "300px"}} src={img5} alt="foodImage" className="w-100"/>
            </div>
            <div>
                <img style={{height: "300px"}} src={img4} alt="foodImage" className="w-100"/>
            </div>
            <div>
                <img style={{height: "300px"}} src={img3} alt="foodImage" className="w-100"/>
            </div>
        </Slider>
    );
}