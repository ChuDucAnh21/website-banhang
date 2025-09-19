import { useCallback, useEffect, useState } from "react"
import { NavbarAdmin } from "../../../components/index"
import { getAllUserApi } from "../../../service/userApiService"
import { useSelector } from "react-redux"
import { SelectUser } from "../../../redux/selector"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { ModalUpdateUser,ModalDeleteUser } from "../../../components/index"


const UserManage = ()=>{
    const [dataAlluser,setDataAlluser] = useState([])
    const [isLoading,setIsLoading]  =useState(true)
    const [showModelUpdate,setShowModelUpdate] = useState(false)
    const [showConfirmDelete,setShowConfirmDelete] = useState(false)
    const [dataModalUpdate,setDataModalUpdate] = useState([])
    const [dataModalDelete,setDataModalDelete] = useState([])
    const dataUserCurrent =  useSelector(SelectUser)

    useEffect(()=>{
        fetchdata()
    },[])

    const fetchdata = useCallback(async()=>{
                try {
                    const dt = await getAllUserApi(dataUserCurrent.accessToken)
                    setDataAlluser(dt.data)
                    console.log("dt",dt)
                } catch (error) {
                    console.error("Lỗi : ",error)
                }
                setIsLoading(false)
        
    },[])

    const handelShowModelUpdate = (value)=>{
        setDataModalUpdate(value)
        setShowModelUpdate(true)
    }
    const handelShowConfirmDelete  =(value)=>{
        setDataModalDelete(value)
        setShowConfirmDelete(true)
    }
   

  
    return (
        <div className="flex items-start relative">
            <NavbarAdmin/>
            <div className="p-3 flex-1">
                <div>
                    <h2 className="bg-blue-50  text-center p-2 text-[20px] mb-2 font-medium underline">Quản lý người dùng</h2>
                </div>

                {
                    isLoading ? 
                    <div className=" mt-20 w-full mb-10 "><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                    :
                    <table className="w-full border-y border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-y border-gray-300 px-4 py-2 text-left">STT</th>
                                <th className="border-y border-gray-300 px-4 py-2 text-left">Username</th>
                                <th className="border-y border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border-y border-gray-300 px-4 py-2 text-left">SĐT</th>
                                <th className="border-y border-gray-300 px-4 py-2 text-left">Địa chỉ</th>
                                <th className="border-y border-gray-300 px-4 py-2 text-left">Chức vụ</th>
                                <th className="border-y border-gray-300 px-4 py-2 text-left">Trạng thái</th>
                                <th className="border-y border-gray-300 px-4 py-2 text-left">Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataAlluser.map((item,index)=>(
                                    <tr key={item._id}>
                                        <td className="border-y border-gray-300 px-4 py-2">{index}</td>
                                        <td className="border-y border-gray-300 px-4 py-2">{item.userName}</td>
                                        <td className="border-y border-gray-300 px-4 py-2">{item.email}</td>
                                        <td className="border-y border-gray-300 px-4 py-2">{item.phoneNumber}</td>
                                        <td className="border-y border-gray-300 px-4 py-2">empty</td>
                                        <td className="border-y border-gray-300 px-4 py-2">{item.role}</td>
                                        <td className={`${item.isBlocked ? "text-red-600" : "text-green-500"} border-y border-gray-300 px-4 py-2`}>{item.isBlocked ? "Chặn" : "Bình thường"}</td>
                                        <td className="border-y flex border-gray-300 px-4 py-2">
                                            <div onClick={()=>handelShowModelUpdate(item)} className="bg-blue-500 pl-3 pr-3 mr-2 text-white rounded-lg cursor-pointer hover:opacity-95">Sửa</div>
                                            <div onClick={()=>handelShowConfirmDelete(item)} className="bg-red-500 pl-3 pr-3 text-white rounded-lg cursor-pointer hover:opacity-95">Xóa</div>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                }
            </div>

            {/* Modal update user */}
            {
                showModelUpdate &&
                 <ModalUpdateUser
                    fetchdata = {fetchdata}
                    dataModalUpdate = {dataModalUpdate}
                    setShowModelUpdate={setShowModelUpdate}
                    setIsLoading={setIsLoading}
                 />
               
            }
            {/* Modal xóa */}
            {
                showConfirmDelete && 
                <ModalDeleteUser
                  setIsLoading = {setIsLoading}
                  fetchdata = {fetchdata}
                  dataModalDelete = {dataModalDelete}
                  setShowConfirmDelete={setShowConfirmDelete}
                />
                
            }
        </div>
    )
}
export default UserManage