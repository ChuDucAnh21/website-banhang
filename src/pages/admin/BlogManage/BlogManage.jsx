import { useEffect, useState } from "react"
import { NavbarAdmin ,ModalDeleteBlog} from "../../../components/index"
import { getApiBlog,getApiDetailBlog,updateBlogApi ,deleteBlogApi} from "../../../service/blogApiService"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useSelector } from "react-redux";
import { SelectUser } from "../../../redux/selector";
import { useToast } from "../../../components/toastMessage/ToastMessage"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const BlogManage = ()=>{
    const [isLoading,setIsLoading] = useState(true)
    const [dataBlog,setDataBlog] = useState([])
    const {showToast}  =useToast()
    const dataUser =  useSelector(SelectUser)
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [img,setImg] = useState()
    const [idBlog,setIdBlog] = useState("")
    const [previewImg,setPreviewImg] = useState("")
    const [showModal,setShowModal]  =useState(false)

    useEffect(()=>{   //Lấy thông tin các blog
        getBlog()
    },[])
    useEffect(()=>{   // gọi khi có blog đc select
        setIsLoading(true)
       if(idBlog!==""){
        getDetailBlog()
        setIsLoading(false)
       }
    },[idBlog])

    const getBlog = async()=>{
            try {
                const dt =await getApiBlog()
                 setDataBlog(dt.data)
                 setIsLoading(false)
            } catch (error) {
                console.error("Lỗi hiển thị Blog",error)
            }
    }


    const getDetailBlog = async()=>{
            try {
                const dt =await getApiDetailBlog(idBlog)
                setTitle(dt.data.title)
                setDescription(dt.data.description)
                setImg(dt.data.image)           //xét ảnh dùng để cập nhật
                 setPreviewImg(dt.data.image)    // xét ảnh hiển thị review
                //  setDataDetailBlog(dt.data)
                //  setIsLoading(false)
            } catch (error) {
                console.error("Lỗi hiển thị Blog",error)
            }
            
        }

    const handleFileChange = (e) => {
        
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            setPreviewImg(URL.createObjectURL(file));  // chuyển dạng Object.file sang dạng URL để hiển thị
        }
    };

    const handelUpdate  = async()=>{
        if(!idBlog){
            showToast("Bạn cần chọn bài viết để sửa","error")
        }
        else{

            if(title==="" || description==="" || img===""){
                showToast("Bạn chưa nhập đủ thông tin","error")
            }
            else{
                 setIsLoading(true)
                 try {
                     const blog = {
                        "id" : idBlog,
                        "title" : title,
                        "description" : description.replace(/<[^>]+>/g, ''),
                        "image" : img
                    }
                    const data = await updateBlogApi(blog,dataUser.accessToken)
                    getBlog()
                    showToast("Tạo blog thành công")
                } catch (error) {
                    console.error(error)
                    showToast("Tạo blog thất bại","error")
                }
                setIsLoading(false)
            }
        }
    }
    
    const showConfirmDelete = ()=>{
        if(idBlog ==="") {
            showToast("Bạn phải chọn bài viết","error")
        }
        else{
            setShowModal(true)
        }
    }

    const handelResetInput = ()=>{  // Xóa dữ liệu trong các trường 
        setTitle("")
        setDescription("")
        setIdBlog("")
        setImg("")
        setPreviewImg("")
    }
    return (
        <div className="flex flex-col sm:flex-row  items-start relative">
            <NavbarAdmin/>
            <div className="flex-1 p-3">
                <div>
                    <h2 className="bg-blue-50  text-center p-2 text-[20px] font-medium underline">Quản lý bài viết</h2>
                </div>
                 {/* Các blog hiện có */}
                  <div className="gap-3 flex flex-wrap justify-center w-full pt-3 pb-6">
                            
                        {
                            dataBlog.map(noti=>(
                                
                                <div key={noti._id} onClick={()=>setIdBlog(noti._id)} className={ `${noti._id === idBlog ? "border-red-600 text-red-600" : ""} min-w-[150px] font-medium h-[50px] cursor-pointer p-2  flex items-center justify-center border-2 border-blue-300 rounded-lg shadow-xl hover:border-2 hover:border-red-600 `}>
                                    {/* <img className="h-[90%] w-full" src={noti.image} alt="" /> */}
                                    <p className="text-center uppercase">{noti.title}</p>
                                </div>
                        
                            ))
                        }
                  </div>
              {
                isLoading ? 
                    <div className=" mt-20 w-full mb-10 "><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                    :
                     <div className="flex-1  min-h-[600px] "> 
                     {/* Chi tiết blog đc select */}
                            <form action="" className="grid grid-cols-1 mt-5">
                                <div className="flex flex-col pb-2">
                                        <label htmlFor="title" className="font-medium">Tiêu đề</label>
                                        <input value={title} onChange={(e)=>setTitle(e.target.value)}  id="title" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="text" placeholder="Tiêu đề" />
                                </div>
                                <div className="flex flex-col pb-2">
                                        <label htmlFor="img" className="font-medium">Ảnh bìa</label>
                                        <input  onChange={e=>handleFileChange(e)}  id="img" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="file" placeholder="image" />
                                    {previewImg && <img className="w-[100px]" src={previewImg} alt="" />}
                                    </div>
                            </form>
                      <div className="min-h-[100px]">
                         <label className="font-medium" htmlFor="">Nhập mô tả</label>
                          <ReactQuill 
                               theme="snow" 
                                value={description} 
                                onChange={setDescription} 
                                placeholder="Nhập mô tả sản phẩm..."
                           />
                       </div>
                       <div className="flex gap-1">
                            <div onClick={handelUpdate} className="bg-blue-500 flex-1 rounded-lg mt-5 hover:opacity-95 cursor-pointer">
                                <p className="text-center text-white p-1">Cập nhật bài viết</p>
                            </div>
                            <div onClick={showConfirmDelete} className="bg-red-500 flex-1 rounded-lg mt-5 hover:opacity-95 cursor-pointer">
                                <p className="text-center text-white p-1">Xóa bài viết</p>
                            </div>
                       </div>
                     </div>
                   
              }
             
            </div>
            {
                showModal &&
                 <ModalDeleteBlog
                    idBlog = {idBlog}
                    setShowModal= {setShowModal}
                    getBlog = {getBlog}
                    handelResetInput={handelResetInput}
                    setIsLoading={setIsLoading}
                 />
            }
        </div>
    )
}
export default BlogManage