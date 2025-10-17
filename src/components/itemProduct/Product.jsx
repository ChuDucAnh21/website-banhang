import { memo } from "react"
import { FaStar } from "react-icons/fa";
import { generatePath, Link } from "react-router-dom";
import Button from "../button/Button";

const Product = (prop)=>{
    return(
        <Link to={generatePath("/detailProduct/:slug",{slug:prop.slug })} className="hover:bg-blue-50 w-full h-full bg-white flex flex-col shadow-lg pb-1">
           <div className="">
             <img 
               src={prop.img || "https://media.istockphoto.com/id/1392886556/vector/image-not-available-photo-coming-soon.jpg?s=170667a&w=0&k=20&c=hvhd43sMPAhtyfhIManqHBspHH6YOE_9ikIaLEdy7Bc=" }
               alt="" 
               className="w-full h-[260px] object-contain lg:object-cover"
            />
           </div>
           <div className="pl-2 pr-2 relative flex-1  ">
                <p className="mt-2 truncate ">{prop.name}</p>
                <div className="flex justify-start items-end">
                    <h2 className="text-[15px] line-through opacity-70">1.000.000đ</h2>
                     <h2 className="ml-2 text-[17px] font-semibold">{prop.price}đ</h2>
                </div>
                <div className="flex mt-2 items-center justify-between">
                   <p className="flex">
                        <FaStar className="text-yellow-400 text-[10px]"/>
                        <FaStar className="text-yellow-400 text-[10px]"/>
                        <FaStar className="text-yellow-400 text-[10px]"/>
                        <FaStar className="text-yellow-400  text-[10px]"/>
                        <FaStar className="text-[#ccc] text-[10px]"/>
                   </p>
                   <p className="text-[14px]">Đã bán 125</p>
                </div>
                <Button 
                    navigate = {`/DetailProduct/${prop.slug}`}
                    name = "Thêm vào giỏ"
                    style = "border-[#ff0000]  p-1 pr-3 pl-3 float-right mt-3 mb-3 text-[#ff0000] hover:bg-[#ff0000] hover:text-white"
                />
           </div>

        </Link>
    )
}

export default memo(Product)