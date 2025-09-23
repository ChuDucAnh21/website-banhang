import { useEffect, useState } from "react";
import { addToCartUserApi } from "../../../service/userApiService";
import { getOrderByUserApi, updateOrderByUserApi } from "../../../service/orderApiService";
import { useSelector } from "react-redux";
import { SelectUser } from "../../../redux/selector";
import { Await, useLocation } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "../../../components/toastMessage/ToastMessage";



const HistoryPage = ()=>{
  const {showToast} = useToast()
  const dataUser = useSelector(SelectUser)
  const [dataHistory,setDataHistory] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const location = useLocation()
  
    useEffect(()=>{
      setIsLoading(true)
      const fetchApi = async()=>{
        const res  =await getOrderByUserApi(dataUser.accessToken)
        console.log("res",res)
        setDataHistory(res.data)
        setIsLoading(false)
      }
      fetchApi()
    },[location])
    const handaleUpdateOrder = async(value)=>{
      try {
        const data =await updateOrderByUserApi(value,dataUser.accessToken)
        const res  =await getOrderByUserApi(dataUser.accessToken)
        setDataHistory(res.data)
        showToast("Hủy đơn hàng thành công")
      } catch (error) {
        showToast("Hủy đơn hàng thất bại","error")
      }
    }
    return (
      <div className="relative">
        <div>
            <div className="w-[80%] m-auto min-h-[500px] overflow-x-auto mb-9">
                <p className="uppercase font-medium text-[20px] text-blue-700 text-center p-2">Lịch sử mua hàng</p>
                <table className="table-auto border-collapse border border-gray-200 w-full text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Ngày đặt hàng</th>
                      <th className="border px-1 py-2">Mã đơn hàng</th>
                      <th className="border px-4 py-2">Thông tin đơn hàng</th>
                      <th className="border px-4 py-2">Sản phẩm</th>
                      <th className="border px-4 py-2">Trạng thái</th>
                      <th className="border px-4 py-2">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataHistory.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="border-2 px-4 py-2">{product.createdAt.slice(0,10)}</td>
                        <td className="border-2 max-w-[90px] truncate px-4 py-2"><span className="w-auto">{product._id}</span></td>
                        <td className="border-2 px-4 py-2 ">
                         <div className="min-w-[200px]">
                          <p>Người nhận : <span className="font-medium">{product.orderBy.userName}</span></p>
                          <p>SĐT: <span className="font-medium">{product.orderBy.phoneNumber}</span></p>
                          <p>Email: <span className="font-medium">{product.orderBy.email}</span></p>
                          <p>Địa chỉ: <span className="font-medium">{product.orderBy.address}</span></p>
                          <p>Cần thanh toán : <span className="font-medium text-blue-600">{product.totalPrice}đ</span></p>
                         </div>
                        </td>
                        <td className="border-2 px-4 py-2">
                          <ul className="mb-[100px] min-w-[200px] overflow-y-auto max-h-[400px]">
                          {
                              product?.products.map((dt,index)=>(
                                  <li key={dt._id+"-"+index} className="flex items-center w-[290px] bg-blue-50 mt-1 min-h-[70px] pl-1 pr-1 border border-solid border-[#ddd] ">
                                    
                                          <img src={dt.product.options?.[0].images?.[0]} className="w-[60px]" alt="" />
                                          <div className="flex items-center justify-between w-full text-[13px] pl-1 pr-1">
                                          <div>
                                                  <p className="text-[15px] font-medium">{dt.product.title}</p>
                                                  <div className="flex">
                                                      <p> size : <span className="font-medium">{dt.size}</span> </p>
                                                      <p className="ml-4"> Màu : <span className="font-medium">{dt.color}</span> </p>
                                                  </div>
                                                  <div className="flex items-center">
                                                      <p> Giá : <span className="text-[15px] font-medium">{dt.price}đ</span></p>
                                                      <p className="ml-4">x{dt.quantity}</p>
                                                  </div>
                                          </div>
                                          
                                          </div>
                                  </li>
                              ))
                          }
                          
                        </ul>
                        </td>
                        <td className="border-2 px-4  py-2">
                          <span
                            className={`px-2 py-1 rounded text-sm  ${
                              product.status === "Hoàn thành"
                                ? "bg-green-100 text-green-600"
                                :
                                product.status === "Hủy" ? 
                                    "bg-red-200 text-red-600" :  "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="border-2 px-4 py-2">
                          { product.status === "Hủy" ?
                            ""
                            :
                          <button onClick={()=>handaleUpdateOrder({"id":product._id , "status" : "Hủy"})} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                            Hủy
                          </button>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

            </div>
        </div>
        {
            isLoading &&
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#cccccc33] z-0 ">
              <AiOutlineLoading3Quarters className="animate-spin text-center m-auto mt-60 text-[38px]  text-blue-500"/>
            </div>
                        
          }
      </div>
    )
}
export default HistoryPage