import { generatePath, Link } from "react-router-dom"
import { IoMdReturnLeft } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { Button } from "../../../components/index";
import { useSelector,useDispatch } from "react-redux";
import guestCartSlice from "../../../redux/guestCartSlice";
import {SelectGuestCart, SelectUser, SelectUserCart} from "../../../redux/selector";
import { useToast } from "../../../components/toastMessage/ToastMessage";
import { addCartUser, orderCartUser, removeCartUser } from "../../../redux/userCartSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getApiUserCurrent } from "../../../service/userApiService";
import { orderCartApi } from "../../../service/orderApiService";


const OrderPage = ()=>{
    const dataUser = useSelector(SelectUser)
    const cartUser = useSelector(SelectUserCart)
    const {showToast} = useToast()
    const [name,setName] = useState(dataUser.role ?dataUser.userInfor.userName : "")
    const [email,setEmail] = useState(dataUser.role ?dataUser.userInfor.email : "")
    const [address,setAddress] = useState(dataUser.role ?dataUser.userInfor.address : "")
    const [phone,setPhone] = useState(dataUser.role ?dataUser.userInfor.phoneNumber : "")
    const [textNote,setTextNote] = useState("")
    const dispatch = useDispatch()
    const listProductCart =dataUser.role==="user" || dataUser.role==="admin" ?useSelector(SelectUserCart) : useSelector(SelectGuestCart)
     const handelQuatity = async(e,data)=>{
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
    
    const handelOrder  = async()=>{
        if(listProductCart.products.length!==0){
            if(dataUser.role){
                try {
                  const dataUserCurrent = await getApiUserCurrent(dataUser.accessToken)
                  await dispatch(orderCartUser({
                      "value":{...dataUserCurrent.data, note:textNote},
                      "token":dataUser.accessToken
                  })).unwrap()
                   showToast("Đặt hàng thành công")
                } catch (error) {
                   showToast("Đặt hàng thất bại","error")
                }
            }
            else{
                showToast("Bạn cần đăng nhập để đặt hàng","error")
            }
        }
        else{
            showToast("Bạn chưa có sản phẩm nào để đặt","error")
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
        <div className="min-h-[400px] p-4 w-[84%] m-auto">
            <div className="flex flex-wrap-reverse">
                <div className="flex-1 min-h-[300px] bg-white p-2">
                    <h2 className="text-[24px] font-bold   mb-2 ml-2 text-center text-blue-600">Thông tin đặt hàng</h2>
                    <form action="" className=" flex flex-wrap gap-2">
                       <input value={name || ""} onChange={e=>setName(e.target.value)} className="outline-none rounded-t-md border p-1 pl-3 flex-[1_0_5rem]" type="text" placeholder="Họ tên" />
                       <input value={email || ""} onChange={e=>setEmail(e.target.value)} className="outline-none rounded-t-md border p-1 pl-3 flex-[1_0_5rem]" type="text" placeholder="Email" />
                       <input value={phone || ""} onChange={e=>setPhone(e.target.value)} className="outline-none rounded-t-md border p-1 pl-3 flex-[1_0_100%]" type="text" placeholder="Số điện thoại" />
                       <input value={address || ""} onChange={e=>setAddress(e.target.value)} className="outline-none rounded-t-md border p-1 pl-3 flex-[1_0_100%]" type="text" placeholder="Địa chỉ" />
                       <textarea value={textNote} onChange={e=>setTextNote(e.target.value)} className="outline-none rounded-t-md border p-1 pl-3 flex-[1_0_100%] h-[100px]" type="text" placeholder="Ghi chú" />
                    </form>
                    <div>
                       <div className="flex items-center mt-2 flex-wrap">
                         <p className="font-medium ">Hình thức thanh toán</p>
                         <p className="text-[13px] text-[#bbb] ml-2 font-medium">( Mặc định là trả sau khi nhận )</p>
                       </div>
                        <div className="flex items-center">
                            <input type="checkbox" />
                            <p className="text-[13px] text-[#aaa] ml-2 font-medium">Thanh sau trước khi nhận hàng</p>
                        </div>
                       
                       
                    </div>
                </div>
                <div className=" min-h-[400px]  flex-1">
                    {
                        listProductCart.products.length === 0 ? <img src="/emptyCart.webp" className="w-[200px] m-auto"/> : ""
                    }
                        <ul className="flex-1 mr-3 mb-3 max-h-[300px] overflow-y-auto ">
                            {
                                listProductCart.products.map((product,index)=>(
                                    <li key={product.id+"-"+index} className=' mt-2 mb-3 min-w-[346px] min-h-[70px] pl-2 pr-1 border-b border-solid border-[#ddd] '>
                                        <Link to={generatePath("/detailProduct/:slug",{slug:product.slug})} className='flex items-center'>
                                            <img src={product.img} className='w-[60px]' alt="" />
                                            <div className='flex items-center justify-between w-full text-[13px] pl-1 pr-1'>
                                                <div>
                                                    <p className='text-[15px] font-medium'>{product.name}</p>
                                                <div className='flex'>
                                                        <p>size : <span className='font-medium'>{product.size}</span></p>
                                                        <p className='ml-4'>Màu : <span className='font-medium' >{product.color}</span></p>
                                                </div>
                                                <div className=''>
                                                    <p>Giá :<span className='text-[15px] font-medium'>{product.price}đ</span></p>
                                                </div>
                                                </div>
                                            <div className="flex items-center">
                                                    <div className="flex">
                                                        {/* <div className="w-[40px] "> */}
                                                            <div className="w-auto h-[30px] flex items-center justify-between  border border-solid border-[#ddd]">
                                                               <button onClick={(e)=>handelQuatity(e,{id:product.id, color:product.color, size:product.size, price:product.price,key:"reduce",quantity:product.quantity})} className={` pl-2 pr-2 h-full border border-solid border-r-[#ccc] font-bold `}>-</button>
                                                                     <span className="w-[20px] text-center font-bold">{product.quantity}</span>
                                                                <button onClick={(e)=>handelQuatity(e,{id:product.id, color:product.color, size:product.size, price:product.price,key:"increase",quantity:product.quantity})} className=" pl-[7px] pr-[7px] h-full border border-solid border-l-[#ccc] font-bold ">+</button>
                                                            </div>
                                                        {/* </div> */}
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
                        <div className="pl-20 pr-20 flex flex-col">
                            <div className="flex justify-between">
                                <p className="w-[100px]">Tạm tính :</p>
                                <p className="font-medium text-blue-600 text-[18px]">{listProductCart.total}đ</p>
                            </div>
                             <div className="flex justify-between">
                                <p className="w-[100px]">Vận chuyển :</p>
                                <p className="font-medium text-blue-600 text-[18px]">35.000đ</p>
                            </div>
                             <div className="flex justify-between">
                                <p className="w-[100px]">Giảm giá :</p>
                                <p className="font-medium text-blue-600 text-[18px]"> - 0đ</p>
                            </div>
                             <div className="flex justify-between mt-2 border-t-[3px] pt-2">
                                <p className="w-[130px]">Tổng thanh toán :</p>
                                <p className="font-medium text-blue-600 text-[18px]">{listProductCart.total + 35000}đ</p>
                            </div>
                            {
                                 listProductCart.products.length===0
                            }
                            <button onClick={handelOrder} className={`${listProductCart.products.length===0 ? "bg-[#f14444] cursor-not-allowed" : "bg-[#ff0000]"} bg-[#ff0000] border rounded  w-full md:w-auto hover:opacity-80 p-1 pl-10 pr-10 border-[#ff0000]  text-white mt-9`}>Hoàn tất đặt hàng</button>
                             <Link to={"/detailCart"}>
                                <p className="text-blue-600 font-medium mt-8 flex items-center">
                                    <IoMdReturnLeft/>
                                    <span className="ml-2 underline">Quay lại giỏ hàng</span>
                                </p>
                            </Link>
                        </div>
                        
                </div>
            </div>
        </div>
        </div>
    )
}
export default OrderPage