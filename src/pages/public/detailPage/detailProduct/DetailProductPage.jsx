import "./style.scss"
import { SwiperSlide } from "swiper/react"
import { useEffect, useState } from "react"
import { FaFacebookSquare } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { useParams,useNavigate } from "react-router-dom";

import { Breadcrumb } from "../../../../components/index.jsx";
import  Slider  from "../../../../components/slider/Slider.jsx"
import {Button} from "../../../../components/index.jsx"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getApiDetailProduct } from "../../../../service/productApiService";
import { useDispatch,useSelector } from "react-redux";
import guestCartSlice from "../../../../redux/guestCartSlice";
import { useToast } from "../../../../components/toastMessage/ToastMessage";
import { addCartUser } from "../../../../redux/userCartSlice";
import { SelectUser, SelectUserCart } from "../../../../redux/selector";

const DetailProductPage = ()=>{
    const navigate = useNavigate()
    const {showToast} = useToast()
    const [dataProduct,setDataProduct] = useState({})
    const [quantity,setQuantity] = useState(0)
    const [count,setCount] = useState(1)
    const [colorSelect,setColorSelect] = useState("")
    const [listColor,setListColor] = useState([])
    const [sizeSelect,setSizeSelect] = useState("")
    const [listSize,setListSize] = useState([])
    const [currentImg,setCurrentImg] = useState()
    const [listImg,setListImg] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const dataUser = useSelector(SelectUser)   // Lấy thông tin của user || admin đăng nhập
    const cartUser = useSelector(SelectUserCart)   // Lấy giỏ hàng cuae user || admin
    
    const { slug } = useParams(); // Lấy slug từ URL
     useEffect(()=>{ // gọi api lấy dữ liệu chi tiết sp
        getDetailDetail()
    },[slug])

    useEffect(()=>{ //hiển thị size theo màu sắc chọn
        if(colorSelect !== ""){
           const optionColor = dataProduct?.options.filter(op => op.color === colorSelect)
            const sizeByColor = optionColor?.[0]?.sizeQuantity.map(x=>x.size)
            const imgByColor =  optionColor?.[0]?.images
          
            setListImg(imgByColor)
            setCurrentImg(imgByColor[0])
            setListSize(sizeByColor)
            if(sizeSelect !== ""){
                const quantityBySize = optionColor?.[0]?.sizeQuantity.filter(x=>x.size === sizeSelect)
                setQuantity(quantityBySize?.[0]?.quantity)
            }
       }
    },[colorSelect,sizeSelect])

    const getDetailDetail = async()=>{
        try {
            const dt = await getApiDetailProduct(slug)
               setDataProduct(dt.data)
               setListSize(dt.data.allSizes)
               setQuantity(dt.data.stock)
               const colors = dt?.data?.options?.map(x=>x.color)
                const imgs = dt?.data?.options?.[0].images
                setListColor(colors)
                setListImg(imgs)
                setCurrentImg(imgs[0])
                setIsLoading(false)
        } catch (error) {
             console.error("getDetailDetail error:", error);
        }
    }
   
                  
     
    const handelAddProductCart = async(data)=>{

        if(sizeSelect ==="" || colorSelect===""){
            showToast("Chọn đủ thông tin cho sản phẩm","error")
        }
        else{
            try{
                if(dataUser.role==="admin" || dataUser.role==="user"){  //thêm giỏ hàng chế độ user || admin
                
                  await dispatch(addCartUser({
                            value: {
                                "id":  dataProduct._id,
                                "quantity": count,
                                "color": colorSelect,
                                "size": sizeSelect,
                                "price":  dataProduct.price
                            },
                            token : dataUser.accessToken
                        })).unwrap()
                       
                }
                else{   // thêm giỏ hàng chế độ khách
                    dispatch(guestCartSlice.actions.addProduct(
                        {
                            id : dataProduct._id,
                            slug : slug,
                            name : dataProduct.title,
                            img : currentImg,
                            size : sizeSelect,
                            color : colorSelect,
                            price : dataProduct.price,
                            quantity : count
                        }
                    ))
                }
                if(data=="paynow"){
                    navigate("/orderProduct")
                }
                showToast("Thêm sản phẩm thành công ")
            }
            catch(err){
                showToast("Thêm sản phẩm thất bại ","error")
            }
          
            
        }
    }

    return (
        <div>
            {
                cartUser.status==="loading" &&
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#cccccc33] z-0 ">
                    <AiOutlineLoading3Quarters className="animate-spin text-center m-auto mt-60 text-[38px]  text-blue-500"/>
                </div>
            }
            <div>   
                <Breadcrumb
                nameCurrent="Chi tiết sản phẩm"
                parentPages = {[
                        {
                            path: "/product",
                            nameParent : "Sản phẩm"
                        }
                ]}
                />
                { isLoading ?
                <div className=" mt-10 w-full mb-10"><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                            :
                <div>
                    <div className="min-h-[500px] flex flex-col md:flex-row border-b border-[#ccc] border-solid">
                        <div className="pb-10  flex flex-col items-center w-full md:w-[40%] h-full  border-r border-[#ccc]">
                            {/* <img src={currentImg} className="w-[80%] h-[500px] mb-5" alt="" /> */}
                            {
                            
                                <div
                                    className="imgProduct bg-contain bg-no-repeat bg-center"
                                    style={{ backgroundImage: `url(${currentImg})` }}
                                ></div>
                            }
                            
                            <div className="w-full slider-detail">
                                    <Slider
                                        className = 'w-[60%] h-auto'
                                        time = {5000}
                                        autoPlay = {false}
                                        slidesPerView = {6}
                                        spaceBetween={0}
                                        pagination={false}
                                    >
                                    { listImg.map((dataitem,index)=>(
                                            <SwiperSlide key={index}>
                                                <img onClick={()=>setCurrentImg(dataitem)} className="w-[55px] h-[55px] hover:cursor-pointer" src={dataitem} alt="" />
                                            </SwiperSlide>
                                        ))}
                                </Slider>
                            </div>
                        </div>
                        <div className="ml-2">
                            <div className="ml-[15px] mr-[15px]">
                                <h2 className="text-[26px] font-medium">{dataProduct.title}</h2>
                                <div className="flex justify-between flex-wrap text-[13px]">
                                    <div>
                                        <span>Mã sản phẩm :</span>
                                        <span className="font-medium">FST{dataProduct._id}VN</span>
                                    </div>
                                    <div>
                                        <span className="ml-3 mr-3">Tình trạng :</span>
                                        <span className="font-medium" > Còn hàng</span>
                                    </div>
                                    <div>
                                        <span className="">Thương hiệu : </span>
                                        <span className="font-medium"> {dataProduct.brand}</span>
                                    </div>

                                </div>
                                {/* Giá */}
                                <div className="flex justify-between pt-[15px] pb-[15px] bg-[#fafafa] mt-5 mb-9">
                                    <p className="font-medium w-[120px] m-auto ">Giá :</p>
                                    <div className="w-full flex justify-start items-center ">
                                        <p className="mr-[15px] text-[20px] text-[#ff0000] font-semibold">{dataProduct.price}đ</p>
                                        <p className="mr-[15px] text-[16px] line-through">200,000đ</p>
                                        <p className="text-[10px] text-white bg-[#ff0000] rounded-xl pl-1 pr-1">-26%</p>
                                    </div>
                                </div>
                                {/* Màu sắc */}
                                <div className="flex justify-between  mb-8">
                                    <p className="font-medium w-[120px] m-auto">Màu sắc :</p>
                                    <div className="w-full  ">
                                        <ul className="mr-0 flex flex-wrap max-w-[400px]">
                                        {
                                            listColor.map((itemColor,index)=>(
                                                <li 
                                                key={index}
                                                onClick={()=>setColorSelect(itemColor)}
                                                className={`hover:cursor-pointer min-w-[50px] text-center p-1 pr-2 pl-2 mr-2 mb-2 border-2 border-solid border-[#bbb] ${itemColor=== colorSelect ? "border-[#ff0000] text-[#ff0000]":""}`}
                                                >
                                                    {itemColor}
                                                </li>
                                            ))
                                        }
                                        
                                        </ul>
                                    </div>
                                </div>
                                {/* Kích thước  */}
                                <div className="flex justify-between mb-8">
                                    <p className="font-medium w-[120px] m-auto">Kích thước :</p>
                                    <div className="w-full">
                                        <ul className="mr-0 flex flex-wrap">
                                        {
                                            listSize?.map((itemSize,index)=>(
                                                <li 
                                                key={index}
                                                onClick={()=>setSizeSelect(itemSize)}
                                                className={`hover:cursor-pointer min-w-[46px] text-center p-1 pr-2 pl-2 mr-2 border-2 border-solid border-[#bbb] ${itemSize === sizeSelect ? "border-[#ff0000] text-[#ff0000]":""}`}
                                                >
                                                    {itemSize}
                                                </li>
                                            ))
                                        }
                                        
                                        </ul>
                                    </div>
                                </div>
                                {/* Số lượng */}
                                <div className="flex  mb-4">
                                    <p className="font-medium w-[120px] m-auto">Số lượng :</p>
                                    <div className="w-full flex items-center">
                                        <div className="w-[150px] h-[30px] flex items-center  border border-solid border-[#ddd]">
                                            <button onClick={()=>setCount(count != 1 ? prev=>prev-1 : 1)} className=" pl-4 pr-4 h-full border border-solid border-r-[#ccc] font-bold ">-</button>
                                            <span className="pl-5 pr-5 text-center font-bold w-full">{count}</span>
                                            <button onClick={()=>setCount(prev=>prev+1)} className=" pl-4 pr-4 h-full border border-solid border-l-[#ccc] font-bold ">+</button>
                                        
                                        </div>
                                        <p className="ml-2 text-[14px] font-medium text-[#aaa]">Còn {quantity} sản phẩm</p>
                                    </div>
                                </div>
                            
                                {/* Thêm vào giỏ hàng */}
                                <div className="flex flex-wrap gap-2 w-full  justify-between mb-1 lg:mt-10">
                                
                                    <button onClick={handelAddProductCart} className=" border rounded  w-full md:w-auto hover:opacity-80  p-2 pl-4 pr-4 min-w-[240px] text-[#ff0000] border-[#ff0000] mt-3 flex-1">Thêm vào giò hàng</button>
                                    <button onClick={()=>{ handelAddProductCart("paynow")}} className=" border rounded  w-full md:w-auto hover:opacity-80  p-2 pl-4 pr-4 bg-red-600 text-white min-w-[240px] mt-3 flex-1">Mua ngay</button>
                                    {/* <Button 
                                        navigate = "/orderProduct"
                                        name ="Mua ngay"
                                        style = "p-2 pl-4 pr-4 bg-red-600 text-white min-w-[240px] mt-3 flex-1"
                                    /> */}
                                </div>
                                <div className="">
                                    <Button 
                                        name ="Nhận ưu đãi tại đây"
                                        style = "p-2 bg-[#333] text-white mt-2 md:w-full border-[#3333]"
                                    />
                                </div>
                                <div className="mt-5 flex">
                                    <p>Chia sẻ :</p>
                                    <div className="text-[20px] flex ml-2">
                                        <FaFacebookSquare className="text-blue-700 mr-1"/>
                                        <FaFacebookMessenger className="text-blue-500 mr-1"/>
                                        <FaTwitter className="text-blue-400 mr-1"/>
                                        <FaPinterest className="text-red-500 mr-1"/>
                                        <FaLink className="text-blue-600"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[90%] min-h-[100px] m-auto  pt-4">
                        <div>
                            <h2 className="text-[16px] font-medium">Chi tiêt sản phẩm :</h2>
                            <div dangerouslySetInnerHTML={{ __html: dataProduct.description }}>

                            </div>
                        </div>
                        <div>
                            <p className="text-[18px] font-medium">Đánh giá sản phẩm</p>
                            <div className=" border-t border-solid border-[#ccc] min-h-[100px]">
                            <div className="flex items-start">
                                    <p className="w-[170px]  mt-2  text-center">0/5</p>
                                    <div className="flex flex-wrap">
                                        <div className="w-[100px]  mt-2 border border-solid border-black text-center mr-2">Tất cả</div>
                                        <div className="w-[100px]  mt-2 border border-solid border-black text-center flex items-center justify-center mr-2">5 <FaStar className="text-yellow-400 ml-1"/></div>
                                        <div className="w-[100px]  mt-2 border border-solid border-black text-center flex items-center justify-center mr-2">4 <FaStar className="text-yellow-400 ml-1"/></div>
                                        <div className="w-[100px]  mt-2 border border-solid border-black text-center flex items-center justify-center mr-2">3 <FaStar className="text-yellow-400 ml-1"/></div>
                                        <div className="w-[100px]  mt-2 border border-solid border-black text-center flex items-center justify-center mr-2">2 <FaStar className="text-yellow-400 ml-1"/></div>
                                        <div className="w-[100px]  mt-2 border border-solid border-black text-center flex items-center justify-center mr-2">1 <FaStar className="text-yellow-400 ml-1"/></div>
                                        
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
         </div>
    )
}
export default DetailProductPage