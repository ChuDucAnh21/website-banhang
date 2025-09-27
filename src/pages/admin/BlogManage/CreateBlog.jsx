import { useState } from "react";
import { NavbarAdmin } from "../../../components/index"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { SelectUser } from "../../../redux/selector";
import { createBlogApi } from "../../../service/blogApiService";
import { useToast } from "../../../components/toastMessage/ToastMessage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const CreateBlog= ()=>{
    const {showToast}  =useToast()
    const dataUser =  useSelector(SelectUser)
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [img,setImg] = useState()
    const [previewImg,setPreviewImg] = useState("")

    const [isLoading,setIsLoading] = useState(false)

     const handleFileChange = (e) => {
        
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            setPreviewImg(URL.createObjectURL(file));  // chuyển dạng Object.file sang dạng URL để hiển thị
        }
    };

    const handelSubmit = async()=>{
        setIsLoading(true)
        try {
            const blog = {
                "title" : title,
                "description" : description.replace(/<[^>]+>/g, ''),
                "image" : img
            }
            const data = await createBlogApi(blog,dataUser.accessToken)
            setDescription("")
            setImg("")
            setPreviewImg("")
            setTitle("")
            showToast("Tạo blog thành công")
        } catch (error) {
            console.error(error)
            showToast("Tạo blog thất bại","error")
        }
        setIsLoading(false)
    }
    return (
        
          <div className="flex flex-col sm:flex-row  items-start relative ">
                    <NavbarAdmin/>
                    <div className="flex-1 border-l-2 min-h-[600px] p-3 ">
                        <h2 className="bg-blue-50  text-center p-2 text-[20px] font-medium underline">Tạo bài viết mới</h2>
                        {
                            isLoading ? 
                            <div className=" mt-20 w-full mb-10 "><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                            :
                            <div>
                                <form action="" className="grid grid-cols-1 mt-5" onSubmit={handelSubmit}>
                                    <div className="flex flex-col pb-2">
                                        <label htmlFor="title" className="font-medium">Tiêu đề</label>
                                        <input value={title} onChange={(e)=>setTitle(e.target.value)}  id="title" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="text" placeholder="Tiêu đề" />
                                    </div>
                                    <div className="flex flex-col pb-2">
                                        <label htmlFor="img" className="font-medium">Ảnh bìa</label>
                                        <input  onChange={e=>handleFileChange(e)}  id="img" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="file" placeholder="Ảnh" />
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
                                <div onClick={handelSubmit} className="bg-blue-500 rounded-lg mt-5 hover:opacity-95 cursor-pointer">
                                    <p className="text-center text-white p-1">Tạo bài viết</p>
                                </div>
                            </div>
                        }
                    </div>
          </div>
    )
}
export default CreateBlog