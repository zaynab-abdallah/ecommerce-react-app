import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
// Import images
import banner1 from '../img/banner_Hero1.jpg';
import banner2 from '../img/banner_Hero2.jpg';
import banner3 from '../img/banner_Hero3.jpg';


function HeroSilder() {
    return (
        <>
            <div className="hero">
                <div className="container">

                    <Swiper
                    loop={true}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="content">
                                <h4>Introducing The New</h4>
                                <h3>Microsoft Xbox <br /> 360 Controller</h3>
                                <p>Windows Xp 10/7/8 Ps3, Tv Box</p>
                                <Link to="/" className="btn">Shop New</Link>
                            </div>
                            <img src={banner1} alt="slider hero 1" />
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="content">
                                <h4>Introducing The New</h4>
                                <h3>Microsoft Xbox <br /> 360 Controller</h3>
                                <p>Windows Xp 10/7/8 Ps3, Tv Box</p>
                                <Link to="/" className="btn">Shop New</Link>
                            </div>
                            <img src={banner2} alt="slider hero 2" />
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="content">
                                <h4>Introducing The New</h4>
                                <h3>Microsoft Xbox <br /> 360 Controller</h3>
                                <p>Windows Xp 10/7/8 Ps3, Tv Box</p>
                                <Link to="/" className="btn">Shop New</Link>
                            </div>
                            <img src={banner3} alt="slider hero 3" />
                        </SwiperSlide>
                    </Swiper>

                </div>
            </div>





        </>
    );
}

export default HeroSilder
