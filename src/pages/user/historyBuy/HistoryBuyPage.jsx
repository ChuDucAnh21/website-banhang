import { useEffect, useState } from "react";
import { addToCartUserApi } from "../../../service/userApiService";
import { getOrderByUserApi } from "../../../service/orderApiService";
import { useSelector } from "react-redux";
import { SelectUser } from "../../../redux/selector";
import { useLocation } from "react-router-dom";




const HistoryPage = ()=>{
  const dataUser = useSelector(SelectUser)
  const [dataHistory,setDataHistory] = useState([])
  const location = useLocation()
  // console.log(dataUser)
    useEffect(()=>{
      // console.log("chay effec")
      const fetchApi = async()=>{
        const res  =await getOrderByUserApi(dataUser.accessToken)
        setDataHistory(res.data)
        //  const dt = await fetch("/api/user/refreshAccessToken", {
        //   method: "GET",
        //     "Authorization": `Bearer ${dataUser.userInfor.refreshToken}`,
        //     // credentials: "include",
        //   });
        //   const data = dt.json()
        //   console.log("refreshAccessToken",data)
      }
      fetchApi()
      
    },[location])
    return (
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
                        <td className="border-2 px-4 py-2"><span className="w-auto">{product._id}</span></td>
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
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="border-2 px-4 py-2">
                          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                            Hủy
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

            </div>
        </div>
    )
}
export default HistoryPage