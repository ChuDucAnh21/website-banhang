import { memo, useState } from "react"
import "./style.scss"
import { updateUserByAdminApi } from "../../service/userApiService"
import { useSelector } from "react-redux"
import { SelectUser } from "../../redux/selector"
import { useToast } from "../../components/toastMessage/ToastMessage"

const ModalUpdateUser = (prop)=>{
    const [name,setName] = useState(prop.dataModalUpdate.userName)
    const [email,setEmail] = useState(prop.dataModalUpdate.email)
    const [phone,setPhone] = useState(prop.dataModalUpdate.phoneNumber)
    const [role,setRole] = useState(prop.dataModalUpdate.role)
    const [isBlocked,setIsBlocked] = useState(prop.dataModalUpdate.isBlocked)
    const {showToast} = useToast()
    const dataUserCurrent =  useSelector(SelectUser)

     const handelUpdateUser = async()=>{
        prop.setShowModelUpdate(false)
        prop.setIsLoading(true)
        try {
            const value = {
                id : prop.dataModalUpdate._id,
                "role" : role,
                "isBlocked" : isBlocked
            }
            const data = await updateUserByAdminApi(value,dataUserCurrent.accessToken)
            await prop.fetchdata()
            showToast("Cập nhật thành công")
        } catch (error) {
            console.error("Lỗi : ",error)
            showToast("Cập nhật thất bại","error")
        }
        prop.setIsLoading(false)
    }
    return(
        <div>
            <div onClick={()=>prop.setShowModelUpdate(false)} className="fixed left-0 right-0 top-0 bottom-0 bg-[#cccccc1e] z-30">
                    <div onClick={(e)=>{e.stopPropagation()}} className="relative modelUser w-[40%] min-h-[400px] bg-white m-auto mt-10 rounded-md shadow-xl border p-3">
                        <h2 className="text-center p-3 font-medium text-[20px] text-blue-500">Thông tin người dùng</h2>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="" className="font-medium">Tên người dùng</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="border-2 rounded-lg outline-blue-500 p-1 pl-2" readOnly  placeholder="username" />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="" className="font-medium">Email</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="border-2 rounded-lg outline-blue-500 p-1 pl-2" readOnly placeholder="email"/>
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="" className="font-medium">Số điện thoại</label>
                            <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" className="border-2 rounded-lg outline-blue-500 p-1 pl-2" readOnly placeholder="phone"/>
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="" className="font-medium">Địa chỉ</label>
                            <input type="text" className="border-2 rounded-lg outline-blue-500 p-1 pl-2" readOnly placeholder="address"/>
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="" className="font-medium">Chức vụ</label>
                            <select value={role} onChange={(e)=>setRole(e.target.value)} className="border-2 rounded-lg outline-blue-500 p-1 pl-2" name="" id="">
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="" className="font-medium">Trạng thái</label>
                            <select value={isBlocked} onChange={(e)=>setIsBlocked(e.target.value)} className="border-2 rounded-lg outline-blue-500 p-1 pl-2" name="" id="">
                                <option value="true">Chặn</option>
                                <option value="false">Bình thường</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <div onClick={handelUpdateUser} className="cursor-pointer hover:opacity-90 text-white bg-blue-500 p-1 pl-3 pr-3  min-w-[120px] rounded-lg text-center">Lưu thay đổi</div>
                            <div onClick={()=>prop.setShowModelUpdate(false)} className="cursor-pointer hover:opacity-90 text-white bg-red-500 p-1 pl-3 pr-3 min-w-[120px] rounded-lg text-center">Hủy bỏ</div>
                        </div>
                        <div onClick={()=>prop.setShowModelUpdate(false)} className="absolute top-0 right-0 cursor-pointer p-1 pl-2 pr-2 font-medium hover:bg-red-600 hover:text-white">
                            X
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default memo(ModalUpdateUser)