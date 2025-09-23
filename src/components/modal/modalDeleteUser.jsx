import { memo, useState } from "react"
import { useSelector } from "react-redux"
import { SelectUser } from "../../redux/selector"
import { useToast } from "../../components/toastMessage/ToastMessage"
import { deleteUserByAdminApi } from "../../service/userApiService"
import "./style.scss"

const ModalDeleteUser = (prop)=>{
    const [name,setName] = useState(prop.dataModalDelete.userName)
    const dataUserCurrent =  useSelector(SelectUser)
    const {showToast} = useToast()

    const handelDeleteUser = async()=>{
        prop.setShowConfirmDelete(false)
        prop.setIsLoading(true)
        try {
            const data =  await deleteUserByAdminApi(prop.dataModalDelete._id,dataUserCurrent.accessToken)
            showToast("xóa người dùng thành công")
            prop.fetchdata()
        } catch (error) {
            showToast("xóa người dùng thất bại","error")
            console.error("Lỗi : ",error)
        }
        prop.setIsLoading(false)
    }
    return(
        <div>
            <div onClick={()=>prop.setShowConfirmDelete(false)} className="fixed left-0 right-0 top-0 bottom-0 bg-[#cccccc1e] z-30">
                    <div onClick={(e)=>{e.stopPropagation()}} className="modelUser relative w-[30%]  bg-white m-auto mt-10 rounded-md shadow-xl border border-blue-500 p-3">
                        <h2 className="text-center p-3 font-medium text-[20px] text-blue-500">Bạn có chắc xóa người dùng</h2>
                        <h2 className="text-center font-medium">{name}</h2>
                        <div className="flex justify-center gap-3 mt-4">
                            <div onClick={handelDeleteUser} className="cursor-pointer hover:opacity-90 text-white bg-blue-500 p-1 pl-3 pr-3  min-w-[120px] rounded-lg text-center">Xác nhận</div>
                            <div onClick={()=>prop.setShowConfirmDelete(false)} className="cursor-pointer hover:opacity-90 text-white bg-red-500 p-1 pl-3 pr-3 min-w-[120px] rounded-lg text-center">Hủy bỏ</div>
                        </div>
                        <div onClick={()=>prop.setShowConfirmDelete(false)} className="absolute top-0 right-0 cursor-pointer p-1 pl-2 pr-2 font-medium hover:bg-red-600 hover:text-white">
                            X
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default memo(ModalDeleteUser)