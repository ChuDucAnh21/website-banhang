import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { memo, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { SelectUser } from "../../redux/selector";
import { useToast } from "../../components/toastMessage/ToastMessage";
import { getApiCategoryProduct,updateProductApi } from "../../service/productApiService";
import { IoIosAddCircle } from "react-icons/io";


const sizeList = ["S", "M", "L", "XL", "XXL"];
const ModalUpdateProduct = (prop)=>{
    const dataProduct = prop.dataModalUpdate
    console.log("dataProduct",dataProduct)
     const [isLoading,setIsloading] = useState(false)
    const dataUser = useSelector(SelectUser)
    const {showToast} = useToast()
    const [listCategory,setListCategory] = useState([])
    const [title,setTitle] = useState(dataProduct.title)
    const [price,setPrice] = useState(dataProduct.price)
    const [brand,setBrand]  = useState(dataProduct.brand)
    const [category,setCategory] = useState(dataProduct.category._id)
    const [description,setDescription] = useState(dataProduct.description)
    const checkValid = {}

    useEffect(()=>{   //lấy danh sách "Danh mục"
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
     const [options,setOptions] = useState(dataProduct.options)
     console.log("options",options)
     const handleAddOption = ()=>{
         if(options.length === 4){
             showToast("Bạn đã thêm tối đa option")
         }
         else{
             setOptions([...options,{
                 _id: Date.now().toString(),
                 color : "",
                 sizeQuantity : [],
                 images: []
             }])
         }
     }
     const handleDeleteOption = (_id)=>{
         if(options.length===1){
             showToast("Bạn phải có ít nhất 1 option","error")
         }
         else{
 
             let optionsCopy = [...options]
             optionsCopy  = optionsCopy.filter((x)=> (x._id !== _id))
             setOptions(optionsCopy)
         }
     }
     const handleChangeColor = (_id,value)=>{
         setOptions(prev=>{
             const newOptions = [...prev]
             newOptions.forEach(op=>{
                 if(op._id === _id){
                     op.color = value
                 }
             })
             return newOptions
         })
     }
     const handleChangeImage = (_id, e) => {
        console.log("img")
         const files = Array.from(e.target.files);
          // check định dạng
         const invalid = files.some(file => 
             !(file.type === "image/jpeg" || file.type === "image/png")
         );
 
         if (invalid) {
             showToast("Sai định dạng ảnh (chỉ hỗ trợ .jpeg || .png)","error");
         }
        else{
            setOptions(prev => {
                return prev.map(op => {
                    if (op._id === _id) {
                        op.images = [...op.images, ...files];
                    }
                    return op;
                 });
            });
        }
         
     };
     const hanldelDeleteImg = (idOption,file)=>{
        setOptions(prev => {
               return prev.map(op => {
                   if (op.id === idOption) {
                       op.images = op.images.filter(img=>{
                            if(typeof img !== "string"){
                                return img.name !== file.name
                            }
                            else{
                               return img !== file
                            }
                       })
                   }
                   return op;
                });
           });
    }
     const handleChangeQuantity = (_id, size, value) => {
         setOptions(prev => {
             return prev.map(op => {
                //  const totalQuantity = op.sizeQuantity.reduce((gtkt,item)=>{
                //     return gtkt + item.quantity
                //  },0)
                //  setStock(totalQuantity+value)
                 if (op._id === _id) {
                     // Nếu chưa có size đó thì thêm mới
                     const existIndex = op.sizeQuantity.findIndex(sq => sq.size === size);
                     if (existIndex !== -1) {
                        if(value ==="" || Number(value) <= 0 ){
                            op.sizeQuantity =  op.sizeQuantity.filter(sq=>sq.size !== size )
                        }
                        else{

                            op.sizeQuantity[existIndex].quantity = Number(value);
                        }
                     } else {
                       op.sizeQuantity.push({ size, quantity:  Number(value) });
                     }
                 }
                  return op;
             });
         });
     };
     const validateForm = ()=>{
         if(!title){
             checkValid.title = "Title không được bỏ trống"
         }
         if(!price){
             checkValid.price = "Giá bán không được bỏ trống"
         }
         if(!category){
             checkValid.category = "Danh mục không được bỏ trống"
         }
         if(!brand){
             checkValid.brand = "Thương hiệu không được bỏ trống"
         }
         if(!description.replace(/<[^>]+>/g, '')){
              checkValid.brand = "Mô tả không được bỏ trống"
         }
         options.forEach(option=>{
             
             if(!option.color){
                checkValid.description = "Màu không được bỏ trống"
            }
             if(option.sizeQuantity.length <=0){
                 checkValid.sizeQuantity = "Size không được bỏ trống"
             }
             if(option.images.length <=0){
                checkValid.image = "Ảnh không được bỏ trống"
            }
            option.sizeQuantity.forEach(q=>{
                if(q.quantity <=0){
                    checkValid.quantity = "Số lượng không được nhỏ hơn 0"
                }
            })
         })

     }
 
     const handleSubmit = async () => {
            let stock = 0;
            options.forEach((option)=>{
                const totalQuantityOp = option.sizeQuantity.reduce((init,item)=>{
                        return init +item.quantity
                },0)
                stock += totalQuantityOp
            })
            console.log("stock",stock)

         validateForm()

         if(  Object.keys(checkValid).length !== 0){
             for (let key in checkValid) {
                 if (checkValid.hasOwnProperty(key)) {   // tránh kế thừa prototype
                    showToast(checkValid[key],"error")
                 }
             }
         }
         else{
             prop.setIsLoading(true)
            prop.setShowModalUpdate(false)
             const formData = new FormData();
             formData.append("_id", dataProduct._id);
             formData.append("title", title);
             formData.append("price", price);
             formData.append("slug", dataProduct.slug);
             formData.append("description",description);
             formData.append("brand", brand);
             formData.append("stock", stock);
             formData.append("category", category);
             
     
             // stringify options (không bao gồm ảnh)
             const optionsWithoutImages = options.map(op => ({
                 color: op.color,
                 sizeQuantity: op.sizeQuantity,
                 images : op.images.filter(img => typeof img === "string" )
             }));
             formData.append("options", JSON.stringify(optionsWithoutImages));
     
             // đẩy ảnh theo từng option
             options.forEach((op, idx) => {
                 op.images.forEach(file => {
                    if(file instanceof File){

                        formData.append(`option[${idx}][images]`, file);
                    }
                 });
             });
             
             // gọi API
             try {
                 await updateProductApi(dataUser.accessToken,formData)
                 prop.setShowModalUpdate(false)
                 prop.fetchProduct()
                 showToast("Sửa sản phẩm thành công ")
             } catch (error) {
                 console.error("Failed",error)
                 showToast("Sửa sản phẩm thất bại","error")
     
             }
             prop.setIsloading(false)
         }
     };
   

    return (
        <div>
            <div onClick={()=>prop.setShowModalUpdate(false)} className="fixed left-0 right-0 top-0 bottom-0 bg-[#cccccc1e] z-30">
                    <div onClick={(e)=>{e.stopPropagation()}} className="modelUser overflow-auto relative w-[90%] h-[650px]  bg-white m-auto mt-10 rounded-md shadow-xl border border-blue-500 p-3">
                        {/* / */}
                        <div>
                            <div className="text-[22px] font-medium text-center underline text-blue-500">Sửa thông tin sản phẩm</div>
                            
                            <form action="" className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-2" >
                                <div className="flex flex-col pb-2">
                                    <label htmlFor="name" className="font-medium">Tên sản phẩm</label>
                                    <input value={title} onChange={(e)=>setTitle(e.target.value)} id="name" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="text" placeholder="Tên sản phẩm" />
                                </div>
                                <div className="flex flex-col pb-2">
                                    <label htmlFor="price" className="font-medium">Giá sản phẩm</label>
                                    <input value={price} onChange={(e)=>setPrice(e.target.value)} id="price" className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" type="text" placeholder="Giá sản phẩm" />
                                </div>
                                <div className="flex flex-col  ">
                                    <label className="font-medium" htmlFor="">Danh mục</label>
                                    <select value={category} onChange={(e)=>setCategory(e.target.value)}  className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" name="" id="">
                                        <option value={""} className="text-[#ccc]">Chọn</option>
                                        {
                                            listCategory.map((item,index)=>(
                                                <option  className="text-blue-500" key={index} value={item._id}>{item.categoryName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium" htmlFor="">Thương hiệu</label>
                                    <select value={brand} onChange={e=>setBrand(e.target.value)} className="border border-[#bbb] rounded-lg p-1 pl-3 forcus:outline outline-blue-500" name="" id="">
                                        <option className="text-[#ccc]" value="">Chọn</option>
                                        <option value="Torano">Torano</option>
                                        <option value="Atino">Atino</option>
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
                            <div className="p-3">
                            <div className="flex">
                                <h2 className="mr-2">Chi tiết sản phẩm</h2>
                            </div>
                                <ul className=" mt-2 flex gap-2 items-center flex-wrap">
                                {
                                   
                                options && options.map((option,indexOption)=>(
                                        <li key={option._id} className="relative w-[400px] min-h-[90px]">
                                            <div className=" border-2 p-3">
                                                {/* màu sắc */}
                                                <div className="flex">
                                                    <p className="font-medium mr-2">Màu sắc :</p>
                                                    <input value={option.color} onChange={(e)=>handleChangeColor(option._id,e.target.value)} type="text" placeholder="màu sắc sản phẩm" className="border pl-2 rounded-md outline-blue-400" />
                                                </div>
                                                {/* size sản phẩm */}
                                                <div className="mt-3">
                                                    <p className="font-medium mr-2">Kích thước & số lượng :</p>
                                                
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
                                                                    onChange={(e) => handleChangeQuantity(option._id, size, e.target.value)}
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
                                                    <input multiple type="file" onChange={(e)=>handleChangeImage(option._id,e)}/>
                                                <div className="flex gap-2 flex-wrap mt-2">
                                                    {option.images.map((file, i) => (
                                                       <div className="relative">
                                                            <img
                                                                key={i}
                                                                className="w-[80px] h-[80px] object-cover border"
                                                                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                                                                alt=""
                                                            />
                                                            <p onClick={()=>hanldelDeleteImg(option.id,file)} className="pl-1 pr-1 cursor-pointer absolute top-0 right-0 hover:bg-red-400">x</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                                                    
                                                </div>
                                            </div>
                                            <div onClick={()=>handleDeleteOption(option._id)} className="absolute top-0 right-0 p-1 pl-2 pr-2 cursor-pointer hover:bg-red-500 hover:text-white">X</div>
                                        </li>
                                    ))
                                }
                                <button onClick={handleAddOption} className="bg-blue-600 flex items-center text-white p-3 rounded-md cursor-pointer hover:opacity-85"><IoIosAddCircle className="text-[18px]"/> <span className="ml-1">Thêm option</span></button>
                                </ul>

                            </div>
                        </div>      
                        <div className="flex justify-end gap-1 flex-wrap">
                                <h3 onClick={handleSubmit} className="bg-green-600 text-white flex-1 text-center mt-3 mr-3 rounded-md pt-2 pb-2 hover:opacity-90 cursor-pointer">Sửa Sản phẩm</h3>
                                <h3 onClick={handleSubmit} className="bg-red-600 text-white flex-1 text-center mt-3 mr-3 rounded-md pt-2 pb-2 hover:opacity-90 cursor-pointer">Hủy bỏ</h3>
                        </div>    
                        {/*  */}
                        <div onClick={()=>prop.setShowModalUpdate(false)} className="absolute top-0 right-0 cursor-pointer p-1 pl-2 pr-2 font-medium hover:bg-red-600 hover:text-white">
                                X
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default memo(ModalUpdateProduct)