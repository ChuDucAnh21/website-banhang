import { useEffect, useState } from "react"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { NavbarAdmin } from "../../../components/index"
import { getApiCategoryProduct } from "../../../service/productApiService"

const CreateProduct = ()=>{
    const [listCategory,setListCategory] = useState([])
    const [name,setName] = useState("")
    const [price,setPrice] = useState(null)
    const [category,setCategory] = useState("")
    const [description,setDescription] = useState("")

    useEffect(()=>{
        getApiCategoryProduct()
            .then((dt)=>{
                const categorys = dt.data.map(x=>x.categoryName)
                setListCategory(categorys)
            })
    },[])

    const handelSubmit = ()=>{
        console.log("submit form")
    }
    return (
        <div className="flex items-start relative ">
            <NavbarAdmin/>
            <div className="flex-1 border-l-2 min-h-[600px]">
                <h2 className="bg-blue-50  text-center p-2 text-[20px] font-medium underline">Tạo sản phẩm mới</h2>
                <form action="" className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-2" onSubmit={handelSubmit}>
                    <div className="flex flex-col pb-2">
                        <label htmlFor="name" className="font-medium">Tên sản phẩm</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} id="name" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="text" placeholder="Tên sản phẩm" />
                    </div>
                    <div className="flex flex-col pb-2">
                        <label htmlFor="price" className="font-medium">Giá sản phẩm</label>
                        <input value={price} onChange={(e)=>setPrice(e.target.value)} id="price" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="text" placeholder="Giá sản phẩm" />
                    </div>
                    <div className="flex flex-col  ">
                        <label className="font-medium" htmlFor="">Danh mục</label>
                        <select className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" name="" id="">
                            {
                                listCategory.map((item,index)=>(
                                    <option className="text-blue-500" key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium" htmlFor="">Thương hiệu</label>
                        <select className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" name="" id="">
                           <option value="Torano">Torano</option>
                        </select>
                    </div>
                     
                </form>
                    <div className="p-3">
                        <label className="font-medium" htmlFor="">Nhập mô tả</label>
                        <ReactQuill 
                            theme="snow" 
                            value={description} 
                            onChange={setDescription} 
                            placeholder="Nhập mô tả sản phẩm..."
                        />
                    </div>
            </div>
        </div>
    )
}
export default CreateProduct