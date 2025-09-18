import { useState } from "react";
import { NavbarAdmin } from "../../../components/index"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { SelectUser } from "../../../redux/selector";
import { createBlogApi } from "../../../service/blogApiService";
import { useToast } from "../../../components/toastMessage/ToastMessage";
const CreateBlog= ()=>{
    const {showToast}  =useToast()
    const dataUser =  useSelector(SelectUser)
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [img,setImg] = useState()
    const handelSubmit = async()=>{
        try {
            const blog = {
                "title" : title,
                "description" : description.replace(/<[^>]+>/g, ''),
                "image" : img
            }
            const data = await createBlogApi(blog,dataUser.accessToken)
            showToast("Tạo blog thành công")
        } catch (error) {
            console.error(error)
            showToast("Tạo blog thất bại","error")
        }
    }
    return (
        
          <div className="flex items-start relative ">
                    <NavbarAdmin/>
                    <div className="flex-1 border-l-2 min-h-[600px] p-3 ">
                        <h2 className="bg-blue-50  text-center p-2 text-[20px] font-medium underline">Tạo bài viết mới</h2>
                        <form action="" className="grid grid-cols-1 mt-5" onSubmit={handelSubmit}>
                            <div className="flex flex-col pb-2">
                                <label htmlFor="title" className="font-medium">Tiêu đề</label>
                                <input value={title} onChange={(e)=>setTitle(e.target.value)}  id="title" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="text" placeholder="Tiêu đề" />
                            </div>
                            <div className="flex flex-col pb-2">
                                <label htmlFor="img" className="font-medium">Ảnh bìa</label>
                                <input  onChange={e=>setImg(e.target.files[0])}  id="img" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="file" placeholder="Ảnh" />
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
          </div>
    )
}
export default CreateBlog