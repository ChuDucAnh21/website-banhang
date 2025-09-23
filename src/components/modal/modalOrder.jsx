import { memo, useState } from "react"
import "./style.scss"
import { useSelector } from "react-redux"
import { SelectUser } from "../../redux/selector"
import { updateOrderByAdminApi } from "../../service/orderApiService"
import { useToast } from "../../components/toastMessage/ToastMessage"

const ModalOrder = (prop)=>{
    const {showToast} = useToast()
    const [status,setStatus] = useState(prop.dataModal.status)
    const dataUser = useSelector(SelectUser)

    const handelUpdateStatus  = async()=>{
        prop.setIsLoading(true)
        prop.setShowModal(false)
        try {
            const value = {
                "id" : prop.dataModal._id,
                "status" : status
            }
            const data = await updateOrderByAdminApi(value,dataUser.accessToken)
            showToast("Cập nhật trạng thái thành công")
        } catch (error) {
            console.error("Lỗi : ",error)
            showToast("Cập nhật trạng thái thất bại","error")
        }
        await prop.fethOrder()
        prop.setIsLoading(false)
    }
    return (
        <div>
                <div onClick={()=>prop.setShowModal(false)} className="fixed left-0 right-0 top-0 bottom-0 bg-[#cccccc1e] z-30">
                    <div onClick={(e)=>{e.stopPropagation()}} className="relative modelUser w-[40%]  bg-white m-auto mt-10 rounded-md shadow-xl border border-blue-500 p-3">
                        <h2 className="text-center p-3 font-medium text-[20px] text-blue-500 border-b">Thông tin đơn hàng</h2>
                        <div className="flex text-[12px] justify-between mb-2 pt-2 italic">
                            <p className="font-medium">Tạo ngày :</p>
                            <div >{prop.dataModal.createdAt}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p className="font-medium">Tên người nhận :</p>
                            <div >{prop.dataModal.orderBy.userName}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p className="font-medium">Email :</p>
                            <div >{prop.dataModal.orderBy.email}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p className="font-medium">Địa chỉ :</p>
                            <div >{prop.dataModal.orderBy.address}</div>
                        </div>
                         <div className="flex justify-between mb-2">
                            <p className="font-medium">Phương thức :</p>
                            <div >{prop.dataModal.payment}</div>
                        </div>
                         <div className="flex justify-between mb-2">
                            <p className="font-medium">Phí ship :</p>
                            <div className="font-medium text-blue-600">{prop.dataModal.shippingPrice} đ</div>
                        </div>
                         <div className="flex justify-between mb-2">
                            <p className="font-medium">Tổng Tiền :</p>
                            <div className="font-medium text-blue-600">{prop.dataModal.totalPrice} đ</div>
                        </div>
                        <div >
                            <div className="font-medium">Trạng thái</div>
                          
                            <select  value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full border outline-blue-400 p-1 rounded-xl" name="" id="">
                                <option value="Hủy">Hủy</option>
                                <option value="Đang xử lý">Đang xử lý</option>
                                <option value="Đang chuẩn bị">Đang chuẩn bị</option>
                                <option value="Đang giao hàng">Đang giao hàng</option>
                             </select>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <div onClick={handelUpdateStatus} className="cursor-pointer hover:opacity-90 text-white bg-blue-500 p-1 pl-3 pr-3  min-w-[120px] rounded-lg text-center">Cập nhật</div>
                            <div onClick={()=>prop.setShowModal(false)}  className="cursor-pointer hover:opacity-90 text-white bg-red-500 p-1 pl-3 pr-3 min-w-[120px] rounded-lg text-center">Hủy bỏ</div>
                        </div>
                        
                        <div onClick={()=>prop.setShowModal(false)}  className="absolute top-0 right-0 cursor-pointer p-1 pl-2 pr-2 font-medium hover:bg-red-600 hover:text-white">
                            X
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default memo(ModalOrder)