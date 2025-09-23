import { useCallback, useEffect, useState } from "react"
import { getApiProduct } from "../../service/productApiService"
import { generatePath, Link } from "react-router-dom"
import { MdDeleteOutline } from "react-icons/md"


const SearchProduct  =(prop)=>{
    const [dataFiler,setDataFilter]  = useState([])
    
    useEffect(()=>{
        getApiProduct()
        .then((dt)=>{
            let dataFilter = dt.data.filter(x=>x.title.includes(prop.textSearch))
            setDataFilter(dataFilter)
        })

    },[prop.textSearch])
    return (
        <div className="w-[150%] bg-white shadow-xl  absolute top-full z-30">
            <ul className={`${dataFiler.length ===0 ? "" : " border "} basis-[580px] max-h-[400px] overflow-y-auto`} >
                            {
                                dataFiler.map((product,index)=>(
                                <li key={product._id+"-"+index} className=' mt-1 min-w-[346px] h-[70px] pl-1 pr-1 border-b border-solid border-[#ddd] hover:bg-blue-50'>
                                    <Link to={generatePath("/detailProduct/:slug",{slug:product.slug})} className='flex items-center' onClick={()=>prop.setTextSearch("")}>
                                        <img src={product?.options?.[0].images?.[0]} className='w-[60px]' alt="" />
                                        <div className='flex items-center justify-between w-full text-[13px] pl-1 pr-1'>
                                            <div>
                                                <p className='text-[15px] font-medium'>{product.title}</p>
                                           
                                            <div className=''>
                                                <p>Giá :<span className='text-[15px] font-medium'>{product.price}đ</span></p>
                                            </div>
                                            </div>
                                        
                                        </div>
                                    </Link>
                                </li>
                                ))
                            }
                            
            </ul>           
        </div>
    )
}
export default SearchProduct