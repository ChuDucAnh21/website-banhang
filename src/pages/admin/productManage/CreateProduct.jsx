import { useEffect, useState } from "react"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "../../../components/toastMessage/ToastMessage";
import { useSelector } from "react-redux";
import { SelectUser } from "../../../redux/selector";
import { NavbarAdmin } from "../../../components/index"
import { getApiCategoryProduct ,createProductApi} from "../../../service/productApiService"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
const sizeList = ["S", "M", "L", "XL", "XXL"];
const CreateProduct = ()=>{
    const [isLoading,setIsloading] = useState(false)
    const dataUser = useSelector(SelectUser)
    const {showToast} = useToast()
    const [listCategory,setListCategory] = useState([])
    const [title,setTitle] = useState("")
    const [price,setPrice] = useState("")
    const [brand,setBrand]  = useState("")
    const [category,setCategory] = useState("")
    const [description,setDescription] = useState("")
     const [checkValid,setCheckValid] = useState({})
    
    const [options,setOptions] = useState([
        {
            id: Date.now(),
            color : "",
            sizeQuantity : [],  //[{ size: size, quantity: "" }]
            images: [] // ["url1","url2"]
        }
    ])
     useEffect(()=>{   //Lấy danh sách danh mục từ CSDL
       getCategoryProduct()
    },[])

    const getCategoryProduct = async()=>{
        try {
            const dt = await getApiCategoryProduct()
            setListCategory(dt.data)
        } catch (error) {
            console.error("get category failed",error)
        }
    }

    const handleAddOption = ()=>{
        if(options.length >= 4){
            showToast("Bạn đã thêm tối đa option")
        }
        else{
            setOptions([...options,{
                id: Date.now(),
                color : "",
                sizeQuantity : [],
                images: []
            }])
        }
    }
    const handleDeleteOption = (id)=>{
        if(options.length===1){
            showToast("Bạn phải có ít nhất 1 option","error")
        }
        else{
            let optionsCopy = [...options]  //copy options cũ 
            optionsCopy  = optionsCopy.filter((x)=> (x.id !== id))
            setOptions(optionsCopy)
        }
    }

    const handleChangeColor = (id,value)=>{   
        setOptions(prev=>{
            const newOptions = [...prev] // copy options cũ 
            newOptions.forEach(op=>{
                if(op.id === id){
                    op.color = value
                }
            })
            return newOptions
        })
    }
    const handleChangeImage = (id, e) => {
        const files = Array.from(e.target.files); // chuyển về dạng mảng [ {name, type, size,...} , {} ]
        
         // check định dạng
        const invalid = files.some(file => !(file.type === "image/jpeg" || file.type === "image/png"));

        if (invalid) {
            showToast("Sai định dạng ảnh (chỉ hỗ trợ .jpeg || .png)","error");
        }
       else{
           setOptions(prev => {
               return prev.map(op => {
                   if (op.id === id) {
                       op.images = [...op.images, ...files];
                   }
                   return op;
                });
           });
       }
        
    };
    const hanldelDeleteImg = (idOption,file)=>{
        console.log("file",file)
        setOptions(prev => {
               return prev.map(op => {
                   if (op.id === idOption) {
                       op.images = op.images.filter(img=>img.name !== file.name)
                   }
                   return op;
                });
           });
    }
    const handleChangeQuantity = (id, size, value) => {
    //    if(value !== "" || Number(value) > 0){
            setOptions(prev => {
                return prev.map(op => {
                    if (op.id === id) {
                        // Nếu chưa có size đó thì thêm mới
                        const existIndex = op.sizeQuantity.findIndex(sq => sq.size === size);
                        if (existIndex !== -1) {
                            // op.sizeQuantity[existIndex].quantity = Number(value);
                              if(value ==="" || Number(value) <= 0 ){
                                    op.sizeQuantity =  op.sizeQuantity.filter(sq=>sq.size !== size )
                                }
                             else{
                                    op.sizeQuantity[existIndex].quantity = Number(value);
                                }
                        } else {
                            op.sizeQuantity.push({ size, quantity: Number(value) });
                        }
                    }
                    return op;
                });
            });
    //    }
    };
    const validateForm = ()=>{
        const error = {}
        if(!title){
            error.title = "Title không được bỏ trống"
        }
        if(!price){
            error.price = "Giá bán không được bỏ trống"
        }
        if(!category){
            error.category = "Danh mục không được bỏ trống"
        }
        if(!brand){
            error.brand = "Thương hiệu không được bỏ trống"
        }
        if(!description.replace(/<[^>]+>/g, '')){
             error.description = "Mô tả không được bỏ trống"
        }
        options.forEach(option=>{
            
            if(!option.color){
               error.color = "Màu không được bỏ trống"
           }
            if(option.sizeQuantity.length <=0){
                error.sizeQuantity = "Size không được bỏ trống"
                
            }
            if(option.sizeQuantity.length >=0){
                option.sizeQuantity.forEach(op=>{
                    if(op.quantity <= 0) {
                        error.quantity = "Số lượng không nhỏ hơn 0"
                    }
                })
            }
            if(option.images.length <=0){
               error.image = "Ảnh không được bỏ trống"
           }
           
        })
        setCheckValid(error)
        return error

    }

    const handleSubmit = async () => {
       const error = validateForm()

        if(  Object.keys(error).length !== 0){
            for (let key in error) {
                if (error.error(key)) {   // tránh kế thừa prototype
                   showToast(checkValid[key],"error")
                }
            }
        }
        else{
            setIsloading(true)
            const formData = new FormData();
            formData.append("title", title);
            formData.append("price", Number(price));
            formData.append("description",description);
            formData.append("category", category);
            formData.append("brand", brand);
    
            // stringify options (không bao gồm ảnh)
            const optionsWithoutImages = options.map(op => ({
                color: op.color,
                sizeQuantity: op.sizeQuantity
            }));
            formData.append("options", JSON.stringify(optionsWithoutImages));
    
            // đẩy ảnh theo từng option
            options.forEach((op, idx) => {
                op.images.forEach(file => {
                  formData.append(`option[${idx}][images]`, file);
                });
            });
    
            // gọi API
            try {
                await createProductApi(dataUser.accessToken,formData)
                showToast("Tạo sản phẩm thành công ")
                setTitle("")
                setPrice("")
                setCategory("")
                setDescription("")
                setOptions([
                    {
                        id: Date.now(),
                        color : "",
                        sizeQuantity : [],  //[{ size: size, quantity: "" }]
                        images: [] // ["url1","url2"]
                    }
                ])
                
            } catch (error) {
                console.error("Failed",error)
                showToast("Tạo sản phẩm thất bại","error")
    
            }
            setIsloading(false)
        }
      
        

    };
  
    
    return (
        <div className="flex flex-col sm:flex-row  items-start relative ">
            <NavbarAdmin/>
            <div className="flex-1 border-l-2 min-h-[600px] mb-5">
                <h2 className="bg-blue-50  text-center p-2 text-[20px] font-medium underline">Tạo sản phẩm mới</h2>
                 {
                    isLoading?
                    <div className=" mt-20 w-full mb-10 "><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                    :
                    <div>
                       
                        <form action="" className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-2" >
                            <div className="flex flex-col pb-2">
                                <label htmlFor="name" className="font-medium">Tên sản phẩm</label>
                                    <p className="text-[12px] text-red-500">{checkValid.title}</p>
                                <input value={title} onChange={(e)=>setTitle(e.target.value)} id="name" className={`border ${checkValid.title ? "border-red-500" : " border-[#bbb]"} rounded-lg p-1 pl-3 forcus:outline outline-blue-500`} type="text" placeholder="Tên sản phẩm" />

                            </div>
                            <div className="flex flex-col pb-2">
                                <label htmlFor="price" className="font-medium">Giá sản phẩm</label>
                                <p className="text-[12px] text-red-500">{checkValid.price}</p>
                                <input value={price} onChange={(e)=>setPrice(e.target.value)} id="price" className={`border ${checkValid.price ? "border-red-500" : " border-[#bbb]"} rounded-lg p-1 pl-3 forcus:outline outline-blue-500`} type="number" placeholder="Giá sản phẩm" />

                            </div>
                            {/* Danh mục */}
                            <div className="flex flex-col">
                                <label className="font-medium" htmlFor="">Danh mục</label>
                                <p className="text-[12px] text-red-500">{checkValid.category}</p>
                                <select value={category} onChange={(e)=>setCategory(e.target.value)}  className={`border ${checkValid.category ? "border-red-500" : " border-[#bbb]"} rounded-lg p-1 pl-3 forcus:outline outline-blue-500`} name="" id="">
                                    <option value={""} className="text-[#ccc]">Chọn</option>
                                    {
                                        listCategory.map((item,index)=>(
                                            <option className="text-blue-500" key={index} value={item._id}>{item.categoryName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {/* Thương hiệu */}
                            <div className="flex flex-col">
                                <label className="font-medium" htmlFor="">Thương hiệu</label>
                                <p className="text-[12px] text-red-500">{checkValid.brand}</p>
                                <select value={brand} onChange={e=>setBrand(e.target.value)} className={`border  ${checkValid.brand ? "border-red-500" : " border-[#bbb]"} rounded-lg p-1 pl-3 forcus:outline outline-blue-500`} name="" id="">
                                    <option className="text-[#ccc]" value="">Chọn</option>
                                    <option value="Torano">Torano</option>
                                    <option value="Atino">Atino</option>
                                </select>

                            </div>
                            
                        </form>
                        <div className="p-3">
                                <label className="font-medium" htmlFor="">Nhập mô tả</label>
                                <p className="text-[12px] text-red-500">{checkValid.description}</p>
                                <ReactQuill 
                                    theme="snow" 
                                    value={description} 
                                    onChange={setDescription} 
                                    placeholder="Nhập mô tả sản phẩm..."
                                />

                        </div>
                        <div className="p-3">
                        <div className="flex">
                            <h2 className="mr-2">Chi tiết sản phẩm</h2>
                        </div>
                            <ul className=" mt-2 flex items-center gap-2 flex-wrap">
                                {
                                options && options.map((option,indexOption)=>(
                                        <li key={option.id} className="relative w-[400px] min-h-[90px]">
                                            <div className=" border-2 p-3">
                                                {/* màu sắc */}
                                                <div className="flex">
                                                    <p className="font-medium mr-2">Màu sắc :</p>
                                                    <input value={option.color} onChange={(e)=>handleChangeColor(option.id,e.target.value)} type="text" placeholder="màu sắc sản phẩm" className={`border ${checkValid.color ? "border-red-500" : ""}  pl-2 rounded-md outline-blue-400`}/>
                                                    
                                                </div>
                                                <p className="text-[12px] text-red-500">{checkValid.color}</p>
                                                {/* size sản phẩm */}
                                                <div className="mt-3">
                                                    <p className="font-medium mr-2">Kích thước & số lượng :</p>
                                                    <p className="text-[12px] text-red-500">{checkValid.sizeQuantity}</p>
                                                    {/* <ul className="flex">
                                                        <li className="border-2 min-w-[30px] text-center">S</li>
                                                        <li className="ml-1 border-2 w-[30px] text-center">M</li>
                                                        <li className="ml-1 border-2 w-[30px] text-center">L</li>
                                                        <li className="ml-1 border-2 w-[40px] text-center">XL</li>
                                                        <li className="ml-1 border-2 w-[40px] text-center">XXL</li>
                                                    </ul> */}
                                                </div>
                                                {/* Số lượng các size */}
                                                <div className="mt-3"> 
                                                <ul>
                                                        {sizeList.map(size => {
                                                            const sq = option.sizeQuantity.find(s => s.size === size);
                                                            return (
                                                                <li key={size} className="flex mt-1">
                                                                    <p className="border border-blue-400 w-[40px] text-center font-medium mr-3">{size}</p>
                                                                    <input 
                                                                    type="number" 
                                                                    placeholder="số lượng" 
                                                                    value={sq ? sq.quantity : ""} 
                                                                    onChange={(e) => handleChangeQuantity(option.id, size, e.target.value)}
                                                                    className="border pl-2 flex-1 rounded-md outline-blue-400"
                                                                    />
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                                {/* ảnh sản phẩm */}
                                                <div className="mt-3">
                                                    <p className="font-medium">Ảnh sản phẩm</p>
                                                    <input multiple type="file" onChange={(e)=>handleChangeImage(option.id,e)}/>
                                                    <p className="text-[12px] text-red-500">{checkValid.image}</p>

                                                <div className="flex gap-2 flex-wrap mt-2">
                                                    {option.images.map((file, i) => (
                                                        <div className="relative">
                                                            <img
                                                                key={i}
                                                                className="w-[80px] h-[80px] object-cover border"
                                                                src={URL.createObjectURL(file)}
                                                                alt=""
                                                            />
                                                            <p onClick={()=>hanldelDeleteImg(option.id,file)} className="pl-1 pr-1 cursor-pointer absolute top-0 right-0 hover:bg-red-400">x</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                                                    
                                                </div>
                                            </div>
                                            <div onClick={()=>handleDeleteOption(option.id)} className="absolute top-0 right-0 p-1 pl-2 pr-2 cursor-pointer hover:bg-red-500 hover:text-white">X</div>
                                        </li>
                                    ))
                                }
                                <button onClick={handleAddOption} className="bg-blue-600 flex items-center text-white p-3 rounded-md cursor-pointer hover:opacity-85"><IoIosAddCircle className="text-[18px]"/> <span className="ml-1">Thêm option</span></button>
                            </ul>
                        </div>
                    </div>
                }
                 <div className="flex justify-end">
                            <h3 onClick={handleSubmit} className="bg-green-600 text-white flex-1 text-center mt-3 mr-3 rounded-md pt-2 pb-2 hover:opacity-90 cursor-pointer">Tạo Sản phẩm</h3>
                 </div>
            </div>
        </div>
    )
}
export default CreateProduct