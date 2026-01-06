import { generatePath, Link } from "react-router-dom";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch,useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import  {Button} from "../../../../components/index";
import { SelectGuestCart, SelectUser, SelectUserCart } from "../../../../redux/selector";
import guestCartSlice from "../../../../redux/guestCartSlice";
import { useToast } from "../../../../components/toastMessage/ToastMessage";
import { removeCartUser,addCartUser } from "../../../../redux/userCartSlice";

const DetailCart = ()=>{
    const dispatch = useDispatch()
    const {showToast} = useToast()
    const dataUser = useSelector(SelectUser)
    const cartUser = useSelector(SelectUserCart)

    const listProductCart = dataUser.role === "admin" || dataUser.role==="user" ? useSelector  (SelectUserCart) : useSelector(SelectGuestCart)
    const handelQuatity = async (e,data)=>{
        e.stopPropagation()
        e.preventDefault()
        try {
            if(dataUser.role === "admin" || dataUser.role==="user"){
                let quantityChange
                data.key === "reduce" ? quantityChange = -1 : quantityChange = 1
                if((data.key === "reduce" && data.quantity) !==1 || (data.key !== "reduce")){

                    await dispatch(addCartUser({
                          value: {
                                   "id":data.id,
                                    "quantity": quantityChange,
                                    "color": data.color,
                                    "size": data.size,
                                    "price": data.price,
                                },
                          token : dataUser.accessToken
                    })).unwrap()
                    showToast("Cập nhật sản phẩm thành công")
                }else{
                    showToast("Số lượng sản phẩm đã là nhỏ nhất","error")
                }
            }
            else{
                 if((data.key === "reduce" && data.quantity) !==1 || (data.key !== "reduce")){
                    dispatch(guestCartSlice.actions.updateProduct(
                        {
                            id:data.id,
                            color:data.color,
                            size:data.size,
                            key:data.key
                        }
                    ))
                    showToast("Cập nhật sản phẩm thành công")
                }
                else{
                    showToast("Số lượng sản phẩm đã là nhỏ nhất","error")
                }
            }
            
        } catch (error) {
            showToast("Cập nhật sản phẩm thất bại","error")
            
        }
    }
    
    const handelRemoveProduct = async(e,data)=>{
         e.stopPropagation()
         e.preventDefault()
        try {
            if(dataUser.role){    // Xóa sản phẩm khi là user || admin
                await dispatch(removeCartUser({
                    "value" : {
                            id:data.id, 
                            color:data.color, 
                            size:data.size
                    },
                    "token" : dataUser.accessToken
                })).unwrap()
          
            }
            else{   //Xóa sản phẩm khi là khách
                dispatch(guestCartSlice.actions.removeProduct({
                    id:data.id,
                    color:data.color,
                    size:data.size,
                }))
            }
            showToast("Xóa sản phẩm thành công")
        } catch (error) {
            showToast("Xóa sản phẩm thất bại","error")
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
            <div className="min-h-[400px] p-2 lg:p-4 lg:w-[84%] m-auto">
                <div className="flex flex-wrap items-center border-b pb-3">
                    <h2 className="uppercase mr-2 text-[20px] font-medium">Chi tiết giỏ hàng</h2>
                    <p>( bạn đang có <span className="font-bold text-blue-600">{listProductCart.products.length}</span> sản phẩm  )</p>
                </div>
                <div className="flex justify-center  lg:justify-around flex-wrap  mt-4">
                    {
                        listProductCart.products.length === 0 ?
                        <div className=" flex justify-center"><img src="/emptyCart.webp" className="w-[250px] mb-2 object-contain"/></div>
                        : 
                        //danh sach sản phẩm
                        <ul className=" basis-[580px]  mr-3 mb-3 max-h-[300px] md:max-h-[400px] overflow-y-auto ">
                            {
                                listProductCart.products.map((product,index)=>(
                                <li key={product.id+"-"+index} className=' mt-1 min-w-[346px] min-h-[70px] pl-1 pr-1 border-b border-solid border-[#ddd] '>
                                    <Link to={generatePath("/detailProduct/:slug",{slug:product.slug||""})} className='flex items-center'>
                                        <img src={product.img} className='w-[60px] h-[60px] object-cover' alt="" />
                                        <div className='flex items-center justify-between w-full text-[13px] pl-1 pr-1'>
                                            <div>
                                                <p className='text-[15px] font-medium'>{product.name}</p>
                                            <div className='flex'>
                                                    <p>size : <span className='font-medium'>{product.size}</span></p>
                                                    <p className='ml-4'>Màu : <span className='font-medium' >{product.color}</span></p>
                                            </div>
                                            <div className=''>
                                                <p>Giá :<span className='text-[15px] font-medium'>{product.price}</span></p>
                                            </div>
                                            </div>
                                        <div className="flex items-center">
                                                <div className="flex">
                                                
                                                        <div className="w-auto h-[30px] flex items-center justify-between  border border-solid border-[#ddd]">
                                                            <button onClick={(e)=>handelQuatity(e,{id:product.id, color:product.color, size:product.size, price:product.price,key:"reduce",quantity:product.quantity})} className={` pl-2 pr-2 h-full border border-solid border-r-[#ccc] font-bold `}>-</button>
                                                            <span className="w-[20px] text-center font-bold">{product.quantity}</span>
                                                            <button onClick={(e)=>handelQuatity(e,{id:product.id, color:product.color, size:product.size, price:product.price,key:"increase",quantity:product.quantity})} className=" pl-[7px] pr-[7px] h-full border border-solid border-l-[#ccc] font-bold ">+</button>
                                                        </div>
                                                
                                                </div>
                                                <div onClick={(e)=> handelRemoveProduct(e,{id:product.id, color:product.color, size:product.size})} className='p-2 hover:bg-red-300'>
                                                            <MdDeleteOutline className='text-[22px] '/>
                                                </div>
                                        </div>
                                        </div>
                                    </Link>
                                </li>
                                ))
                            }
                            
                        </ul>
                    
                    }
                    <div className="flex-1 min-w-[282px] max-w-[590px] min-h-[200px]">
                        <div className=" bg-[#eee] p-3">
                            <p className="uppercase font-medium text-[16px]">Tóm tắt đơn hàng</p>
                            <p className="text-[14px]">Chưa bao gồm phí ship và mã giảm giá (nếu có)</p>
                            <div className="flex justify-between mt-2 pb-4 border-b border-[#ccc]">
                                <p className="font-medium">Tổng tiền</p>
                                <p className="text-[18px] font-bold text-blue-500">{listProductCart.total} VND</p>
                            </div>
                            <p className="text-[14px] mt-3 mb-4">Có thể nhập mã giảm giá ở phần thanh toán</p>
                            <div className="flex flex-col">
                            {/* <Link to={"/orderProduct"}> */}
                                    <Button
                                        navigate = "/orderProduct"
                                        name = "Tiến hành đặt hàng"
                                        style = "uppercase border-[#ff0000] bg-[#ff0000] text-white w-full  p-1"
                                    />
                            {/* </Link> */}
                                {/* <Link to={"/product"}> */}
                                        <Button
                                        navigate = "/product"
                                        name = "Mua thêm sản phẩm"
                                        style = "uppercase border-black mt-3 p-1"
                                        />
                                {/* </Link> */}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center mt-3">
                                <LiaShippingFastSolid className="text-[20px]"/>
                                <p className="uppercase ml-3">Giao hàng trong 24 giờ</p>
                            </div>
                            <div className="flex items-center mt-3">
                                <MdOutlineCurrencyExchange className="text-[20px]"/>
                                <p className="uppercase ml-3">đổi trả trong vòng 30 ngày</p>
                            </div>
                            <div className="flex items-center mt-3">
                                <MdOutlineSupportAgent className="text-[20px]"/>
                                <p className="uppercase ml-3">tổng đài hỗ trợ : 0151852968</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailCart