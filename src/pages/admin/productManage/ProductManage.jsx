import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { NavbarAdmin } from "../../../components/index"
import { useEffect, useState } from "react"
import { getApiProduct } from "../../../service/productApiService"
import { FaStar } from "react-icons/fa"
import { ModalDeleteProduct ,ModalUpdateProduct} from "../../../components/index"
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom"

const ProductManage = ()=>{
    const [isLoading,setIsLoading]  =useState(false)
    const [dataProduct,setDataProduct] = useState([])
    const [showConfirm,setShowConfirm] = useState(false)
    const [showModalUpdate,setShowModalUpdate] = useState(false)
    const [idDelete,setIdDelete] = useState("")
    const [dataModalUpdate,setDataModalUpdate] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 10;
      const totalPages = Math.ceil(dataProduct.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = dataProduct?.slice(startIndex, startIndex + itemsPerPage);

    useEffect(()=>{
        fetchProduct()
    },[])
    const fetchProduct = async()=>{
        setIsLoading(true)
        try {
            const dt= await getApiProduct()
            setDataProduct(dt.data)
        } catch (error) {
            console.error("error",error)
        }   
        setIsLoading(false)
        
    }
    const handelConfirmDelete = (id)=>{
        setIdDelete(id)
        setShowConfirm(true)
    }
    const handelShowModalUpdate = (data)=>{
        setDataModalUpdate(data)
        setShowModalUpdate(true)
    }

    return (
        <div className="flex flex-col sm:flex-row  items-start relative">
            <NavbarAdmin/>
            <div className="p-3  w-[80%]  flex-1">
                <div>
                    <h2 className="bg-blue-50  text-center p-2 text-[20px] mb-2 font-medium underline">Quản lý sản phẩm</h2>
                </div>

                {
                    isLoading ? 
                    <div className=" mt-20 w-full mb-10 "><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                    :
                    <div className="w-full overflow-auto "> 
                        <table className="w-full border-y border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">STT</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Ảnh</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Tên sản phẩm</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Giá</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Số lượng</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Đã bán</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Đánh giá</th>
                                    <th className="border-y border-gray-300 px-4 py-2 text-left">Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.map((item,index)=>(
                                        <tr key={item._id}>
                                            <td className="border-y border-gray-300 px-4 py-2">{index}</td>
                                            <td className="border-y border-gray-300 px-4 py-2">
                                                <img src={item.options[0].images[0]} alt="" className="w-[50px]" />
                                            </td>
                                            <td className="border-y border-gray-300 px-4 py-2">{item.title}</td>
                                            <td className="border-y border-gray-300 px-4 py-2">{item.price}</td>
                                            <td className="border-y border-gray-300 px-4 py-2">{item.stock}</td>
                                            <td className="border-y border-gray-300 px-4 py-2">0</td>
                                            <td className="border-y border-gray-300 px-4 py-2 ">
                                                <div className="flex items-center">
                                                    <p>{item.totalRatings}</p>
                                                    <FaStar className="text-yellow-400 ml-1"/>
                                                </div>
                                            </td>
                                            <td className="border-y flex border-gray-300 px-4 py-2">
                                                <div onClick={()=>handelShowModalUpdate(item)} className="bg-blue-500 pl-3 pr-3 mr-2 text-white rounded-lg cursor-pointer hover:opacity-95">Sửa</div>
                                                <div onClick={()=>handelConfirmDelete(item._id)} className="bg-red-500 pl-3 pr-3 text-white rounded-lg cursor-pointer hover:opacity-95">Xóa</div>
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
                showConfirm && 
                <ModalDeleteProduct
                    fetchProduct={fetchProduct}
                     setIsLoading={setIsLoading}
                    idDelete={idDelete}
                    setShowConfirm = {setShowConfirm}
                />
            }
            {
                showModalUpdate &&
                <ModalUpdateProduct
                    fetchProduct={fetchProduct}
                     setIsLoading={setIsLoading}
                    dataModalUpdate={dataModalUpdate}
                    setShowModalUpdate = {setShowModalUpdate}
                />
            }         
        </div>
    )
}
export default ProductManage