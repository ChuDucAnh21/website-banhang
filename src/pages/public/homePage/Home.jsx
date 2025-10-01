import 'swiper/css';
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { SwiperSlide } from 'swiper/react';
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiOutlineCreditCard } from "react-icons/hi2";

import {slider1,slider2,slider3,slider4,slider5,fullset1,fullset2,fullset3} from "../../../assets/index.jsx"
import { Slider , Product } from "../../../components/index.jsx"
import { getApiProduct } from '../../../service/productApiService.jsx';



const listSliderImg = [slider5,slider2,slider3,slider4,slider1]
const listOufit = [
    {
        id:1,
        name:"outfit trẻ trung",
        img: fullset1
    },
     {
        id:2,
        name:"outfit trưởng thành",
        img: fullset2
    },
     {
        id:3,
        name:"outfit đi chơi",
        img: fullset3
    },
]

const HomePage = ()=>{
    const [dataProduct,setDataProduct] = useState([])
   const [loading,setLoading] = useState(false)

    useEffect(()=>{
           getProduct()
    },[])

    const getProduct = async()=>{
        setLoading(true)
        try {
            const dt = await getApiProduct()
            setDataProduct(dt.data)
        } catch (error) {
             console.error("Fetch error:", error);
        }
        setLoading(false);
    }
   
    return (
        <div className="min-h-[300px] w-[100%]">
             <Slider
                className = 'w-full'
                time = {5000}
                autoPlay = {true}
                slidesPerView = {1}
                pagination={true}
             >
                { listSliderImg.map((dataitem,index)=>(
                        <SwiperSlide key={index}><img className="w-full" src={dataitem} alt="" /></SwiperSlide>
                    ))}
             </Slider>

            {/* Top sản phẩm tuần */}
             <div className="container w-[90%] min-h-[800px] m-auto ">
                   <div className="contentProduct pt-[20px]">
                       <h2 className="title tracking-widest uppercase w-full text-center underline text-[20px] mt-10">Top sản phẩm tuần</h2>
                      {loading ?
                       <div className=" mt-10 w-full"><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                        :
                       <div className={`mt-5`}>
                           <Slider
                                className = 'w-[80%] h-[416px]'
                                time = {5000}
                                autoPlay = {true}
                                slidesPerView = {4}
                                spaceBetween={1}
                                pagination={true}
                            >
                                { dataProduct.slice(0,8)?.map((product)=>(
                                        <SwiperSlide key={product._id}>
                                            <div className=" w-[100%] md:w-[240px]">
                                               <Product
                                                 id = {product._id}
                                                 slug = {product.slug}
                                                  name={product.title}
                                                  price={product.price}
                                                  img = {product?.options[0]?.images[0]}
                                                  oldPrice = {product.oldPrice}
                                               />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Slider>
                       </div>}
                   </div>
                   {/* danh mục sản phẩm */}
                   <div className='contentProduct relative'>
                       <h2 className="title tracking-widest uppercase w-full text-center underline text-[20px] mt-10 ">danh mục sản phẩm</h2>
                            {loading ? 
                            <div className=" mt-10 w-full "><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                             : 
                                <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8'> 
                                       { dataProduct?.slice(0, 8).map((product)=>(
                                            <div key={product._id}  className=" w-[100%]">
                                                <Product
                                                    id ={product._id}
                                                    slug = {product.slug}
                                                    name={product.title}
                                                    price={product.price}
                                                    img = {product?.options[0]?.images[0]}
                                                    oldPrice = {product.oldPrice}
                                                />
                                            </div>
                                        ))}
                                </div>
                                }
                       <Link to={"/product"} className='mt-8 absolute right-0 top-0 hover:cursor-pointer hover:text-[#c23564] underline font-thin'>Xem thêm sản phẩm</Link>
                   </div>
                   <div className='containerProduct mb-10'>
                       <h2 className="title tracking-widest uppercase w-full text-center underline text-[20px] mt-10 mb-6">Outfit of the day</h2>
                       <div className='containerFullset grid grid-cols-3 gap-3'>
                            {listOufit.map((outfit)=>(
                                <div key={outfit.id} className='outfit-product min-h-[300px] w-[100%]   shadow-lg'>
                                    <img src={outfit.img} alt="" />
                                    <p className='uppercase mt-2 mb-2 ml-2'>{outfit.name}</p>
                                    <button className={`border border-[#c23564] rounded bg-white text-[#c23564] p-2 pr-4 pl-4 mb-4 ml-2 focus:bg-[#c23564] focus:text-white`}>Quan tâm</button>
                                </div>
                            ))}
                       </div>
                   </div>
                   <div className='supportProduct flex flex-wrap justify-between mb-[60px] mt-[60px]'>
                       <div className='flex items-center h-[70px] '>
                          <LiaShippingFastSolid className='text-[40px]'/>
                          <div className='ml-3'>
                            <p>Miễn phí vận chuyển</p>
                            <p>Áp dụng cho mọi đơn hàng từ 500k</p>
                          </div>
                       </div>
                       <div className='flex items-center h-[70px] '>
                          <BsBoxSeam className='text-[40px]'/>
                          <div className='ml-3'>
                            <p>Miễn phí vận chuyển</p>
                            <p>Áp dụng cho mọi đơn hàng từ 500k</p>
                          </div>
                       </div>
                        <div className='flex items-center h-[70px] '>
                          <MdOutlineSupportAgent className='text-[40px]'/>
                          <div className='ml-3'>
                            <p>Miễn phí vận chuyển</p>
                            <p>Áp dụng cho mọi đơn hàng từ 500k</p>
                          </div>
                       </div>
                        <div className='flex items-center h-[70px] '>
                          <HiOutlineCreditCard className='text-[40px]'/>
                          <div className='ml-3'>
                            <p>Miễn phí vận chuyển</p>
                            <p>Áp dụng cho mọi đơn hàng từ 500k</p>
                          </div>
                       </div>
                   </div>
             </div>

        </div>
    )
}

export default HomePage