import { Swiper } from 'swiper/react';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "./style.scss";
import { memo } from 'react';

const Slider = (prop) => {
    const slidesCount = Array.isArray(prop.children) ? prop.children.length : 1;

    return (
        <Swiper
            className={prop.className}
            modules={prop.autoPlay ? [Navigation, Pagination, Autoplay] : [Navigation, Pagination]}
            loop={slidesCount > (prop.slidesPerView || 1)}
            navigation={true}
            pagination={prop.pagination && { clickable: true }}
            autoplay={prop.autoPlay ? {
                delay: prop.time || 3000,
                disableOnInteraction: false
            } : false}
            spaceBetween={prop.spaceBetween || 10}
            
            // 👇 Thay đổi số lượng hiển thị theo kích thước màn hình
            breakpoints={{
                320: {  // màn hình nhỏ (mobile)
                    slidesPerView:prop.slidesPerView || 1,
                    spaceBetween: 10
                },
                640: {  // tablet nhỏ
                    slidesPerView: prop.slidesPerView || 2,
                    spaceBetween: 15
                },
                1024: { // tablet lớn / desktop
                    slidesPerView:prop.slidesPerView || 3,
                    spaceBetween: 20
                },
                1280: { // màn hình rộng
                    slidesPerView: prop.slidesPerView || 4,
                    spaceBetween: 30
                }
            }}
        >
            {prop.children}
        </Swiper>
    );
};

export default memo(Slider);
