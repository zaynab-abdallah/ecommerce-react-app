import React from 'react'
import Product from './Product';
import './slideProduct.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function SlideProduct({ data, title }) {
  // التأكد من أن البيانات موجودة
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className='slide_products slide'>
      <div className="container two">
        
        <div className="top_slide">
          <h2>{title}</h2>
          <p>Browse our collection of {title}</p>
        </div>

        <Swiper
          slidesPerView={5}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20
            }
          }}
        >
          {data.map((product, index) => (
            <SwiperSlide key={product.id}>
              <Product item={product} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </div>
  )
}

export default SlideProduct;
