import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { NavbarAdmin } from "../../../components/index"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { SelectUser } from "../../../redux/selector"
import { getOrderByAdminApi } from "../../../service/orderApiService"
import { ModalOrder } from "../../../components/index"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md"

const OrderManage = ()=>{
    const [isLoading,setIsLoading]  =useState(false)
    const  dataUser = useSelector(SelectUser)
    const [dataOrder,setDataOrder] = useState([])
    const [showModal,setShowModal] = useState(false)
    const [dataModal,setDataModal] = useState([])

     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 10;
      const totalPages = Math.ceil(dataOrder.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = dataOrder?.slice(startIndex, startIndex + itemsPerPage);


    useEffect(()=>{
        fethOrder()
    },[])

    const fethOrder = useCallback(async()=>{
        setIsLoading(true)
        try {
            const dt = await getOrderByAdminApi(dataUser.accessToken)
            setDataOrder(dt.data)
        } catch (error) {
            console.error("Lỗi : ",error)
        }
        setIsLoading(false)
    },[])

    const handelShowModalUpdate = (value)=>{
        setDataModal(value)
        setShowModal(true)
    }
    return (
        <div className="flex flex-col sm:flex-row  items-start relative">
            <NavbarAdmin/>
             <div className="p-3 w-full  sm:w-[80%] flex-1">
                <div>
                    <h2 className="bg-blue-50  text-center p-2 text-[20px] mb-2 font-medium underline">Quản lý đơn hàng</h2>
                </div>

                {
                    isLoading ? 
                    <div className=" mt-20 w-full mb-10 "><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                    :
                    <div className="w-full overflow-auto ">
                        <table className="w-full  border-y border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">STT</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Mã đơn hàng</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Tên người mua</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Địa chỉ</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">SĐT</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Tổng tiền</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Trạng thái</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.map((item,index)=>(
                                        <tr key={item._id}>
                                            <td className="border-y border-gray-300 px-4 py-2">{index}</td>
                                            <td className="border-y max-w-[90px] truncate border-gray-300 px-4 py-2">{item._id}</td>
                                            <td className="border-y border-gray-300 px-4 py-2">{item.orderBy.userName}</td>
                                            <td className="border-y max-w-[90px] truncate border-gray-300 px-4 py-2">{item.orderBy.address}</td>
                                            <td className="border-y border-gray-300 px-4 py-2">{item.orderBy.phoneNumber}</td>
                                            <td className="border-y border-gray-300 px-4 py-2 text-blue-600 font-medium">{item.totalPrice}đ</td>
                                            <td className={`${item.status==="Hủy" ? "text-red-600" :item.status==="Đang giao hàng" ? "text-green-500" : "text-yellow-500"} border-y border-gray-300 px-4 py-2`}>{item.status}</td>
                                            <td className="border-y  px-4 py-2">
                                                <div onClick={()=>handelShowModalUpdate(item)} className="bg-blue-500 pl-3 min-w-[90px] pr-3 mr-2 text-white text-center rounded-lg cursor-pointer hover:opacity-95">Cập nhật</div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>
                         <div className="flex justify-end mt-3 ">
                                <button    disabled={currentPage === 1}  onClick={() => setCurrentPage((p) => p - 1)} className="bg-[#ddd] w-[30px] border h-[30px] flex items-center justify-center"><MdKeyboardDoubleArrowLeft/></button>
                                <p className="border">Trang {currentPage}/{totalPages}</p>
                                 <button  disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="bg-[#ddd] w-[30px] border h-[30px] flex items-center justify-center"><MdKeyboardDoubleArrowRight/></button>
                          </div>
                    </div>
                }
            </div>
            {
                showModal &&
                 <ModalOrder
                   setShowModal = {setShowModal}
                   dataModal = {dataModal}
                   setIsLoading={setIsLoading}
                   fethOrder={fethOrder}
                />
            }
        </div>
    )
}
export default OrderManage