import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation'; // css cho mũi tên
import 'swiper/css/pagination'; // css cho chấm tròn nếu dùng
import {Navigation, Pagination,  Autoplay } from "swiper/modules";

import "./style.scss"
import { memo } from 'react';

const Slider  =(prop)=>{
    // Đếm số lượng slide được truyền vào
    const slidesCount = Array.isArray(prop.children) ? prop.children.length : 1;

    return (
        
         <Swiper
                className= {prop.className}
                modules= {prop.autoPlay ? [Navigation, Pagination,Autoplay]:[Navigation, Pagination]}
                
                loop={slidesCount > (prop.slidesPerView || 1)} //Chỉ bật loop khi có nhiều slide hơn slidesPerView
                navigation={true} // bật mũi tên
                pagination={ prop.pagination && { clickable: true }} // bật chấm tròn
                autoplay={{
                    delay: prop.time,              // 3 giây đổi slide
                    disableOnInteraction: false // vẫn auto chạy khi user tương tác
                }}
                spaceBetween={prop.spaceBetween}
                slidesPerView={prop.slidesPerView}
        >
                {prop.children}
        </Swiper>
    )
}

export default memo(Slider)