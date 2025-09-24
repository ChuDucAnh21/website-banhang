
import { memo, useEffect, useRef, useState } from "react";
import FilterCategory from "./filterCategory/FilterCategory.jsx"
import { getApiCategoryProduct } from "../../service/productApiService.jsx";

const sizes = ["XXL","XL","L","M","S","XS"]
const FilterNavbar = (prop)=>{
    const [listCategory,setListCategory] = useState([])
    const [filterCategory,setFilterCategory] = useState([])
    const [filterSize,setFilterSize] = useState([])
    const [filterPrice,setFilterPrice] =useState(300000)
    const [filterArrange,setFilterArrange] = useState("1")
    const filterRef = useRef(null)


    useEffect(()=>{  //gọi API để lấy dữ tên các loại sp
        getApiCategoryProduct()
            .then((dt)=>{
                const categorys = dt.data.map(x=>x.categoryName)
                const filterCategory = categorys.filter(x=>x.includes(prop.name))
                setListCategory(filterCategory)
            })
    },[prop.name])

    useEffect(()=>{   // run khi bất cứ filter nào thay đổi
        prop.handelFilterChange({
            category:filterCategory,
            size : filterSize,
            price:filterPrice,
            arrange:filterArrange
        })
    },[filterCategory,filterSize,filterPrice,filterArrange])

    const handelCatetory = (e)=>{  //Xử lý khi chọn loại sp
        filterCategory.includes(e.target.value) ?
                setFilterCategory(filterCategory.filter(x=>x !== e.target.value))
                          : 
                setFilterCategory([...filterCategory,e.target.value])
    }
    const handelSize= (e)=>{  //xử lý khi chọn size sp
        filterSize.includes(e.target.value) ?
                setFilterSize(filterSize.filter(x=>x !== e.target.value))
                          : 
                setFilterSize([...filterSize,e.target.value])
    }

     useEffect(() => {  // xử lý ấn ra ngoài icon giỏ hàng thì sẽ ẩn giỏ hàng đi
        function handleClickOutside(event) {
        // nếu click mà không nằm trong cartRef thì ẩn
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                prop.setShowFilter(false)
            }
        }

          document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div ref={filterRef} className={`${prop.showFilter?"block" :"hidden"} transition-opacity bg-red-100  md:block min-w-[16%] min-h-[800px] shadow-xl overflow-y-auto`}>
         
                <p className="w-full text-center p-2 font-medium">Danh mục</p>
                <FilterCategory   //Lọc theo loại sp
                   name = "Sản phẩm"
                >
                    <ul className="ml-5">
                       {listCategory.map((category,index)=>(
                            <li key={index} className="flex w-full ml-  mt-1 mb-1">
                                <input type="checkbox" value={category || ""} onChange={(e)=>handelCatetory(e)}/>
                                <p className="ml-2">{category}</p>
                            </li>
                        ))}
                    </ul>
                </FilterCategory>
                <FilterCategory  //lọc theo giá
                   name = "Giá"
                >
                   <input type="range" min="0" max="300000" step="10000" value={filterPrice || ""} onChange={(e)=>setFilterPrice(e.target.value)} className="ml-2 w-[90%]"/>
                   <div className="flex justify-between w-[90%] ml-2">
                    <p className="font-medium">0đ</p>
                    <p className="font-medium">{filterPrice}đ</p>
                   </div>
                   <div className="flex flex-wrap items-center justify-end mr-3 mt-4 ">
                    <p className="mr-2">Sắp xếp</p>
                    <select value={filterArrange} name="" id="" className="outline-none rounded-md pl-2 pr-2 border border-solid border-[#ccc]" onChange={e=>setFilterArrange(e.target.value)}>
                        <option value="1">Mặc định</option>
                        <option value="2">Giảm dần</option>
                        <option value="3">Tăng dần</option>
                    </select>
                   </div>
                </FilterCategory>
                 <FilterCategory  //Lọc theo size sp
                   name = "Size"
                >
                    <ul className="ml-5">
                     
                       {
                       sizes.map((size,index)=>(
                         <li key={index} className="flex w-full mb-1">
                            <input value={size | ""} onChange={e=>handelSize(e)} type="checkbox" />
                            <p className="ml-2">{size}</p>
                        </li>
                       ))
                       }
                    </ul>
                </FilterCategory>
        </div>
    )
}
export default memo(FilterNavbar)