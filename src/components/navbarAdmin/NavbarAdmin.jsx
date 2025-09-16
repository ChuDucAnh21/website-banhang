import { Link } from "react-router-dom"
import { IoMdHome } from "react-icons/io";
import { BiLogoProductHunt } from "react-icons/bi";
import { AiFillShopping } from "react-icons/ai";
import { MdLocalShipping } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { IoCreateSharp } from "react-icons/io5";
import { AiFillFolderAdd } from "react-icons/ai";

import "./style.scss"
import { useState } from "react";
const tabs = [
    { id: "1", namePage: "Trang chủ", icon: <IoMdHome />, href: "/admin/dashboard" },
    { id: "2", namePage: "Tạo Sản phẩm", icon: <BiLogoProductHunt />, href: "/admin/createProduct" },
    { id: "3", namePage: "Quản lý sản phẩm", icon: <AiFillShopping />, href: "/productShirt" },
    { id: "4", namePage: "Quản lý đơn hàng", icon: <MdLocalShipping />, href: "/productTrousers" },
    { id: "5", namePage: "Quản lý người dùng", icon: <FaUserGroup />, href: "/notification" },
    { id: "6", namePage: "Tạo bài viết", icon: <IoCreateSharp />, href: "/notification" },
    { id: "7", namePage: "Quản lý bài viết", icon: <AiFillFolderAdd />, href: "/notification" },
];


const NavbarAdmin = ()=>{
    const [tabSelect,setTabSelect] = useState("1")
    return (
        // <div className="w-[200px] h-svh bg-blue-100 ">
            <div className='w-[300px] h-svh bg-blue-100'>
                          <div className='shadow-xl flex flex-col items-center h-full  bg-[#fff] '>
                               <img src="/logo.png" alt="" className='ml-2 pt-2 pb-2 mr-9 block w-[40%] md:inline'/>
                               <ul className='w-full'>
                                   {tabs.map((itemTab)=>(
                                       <li className={`${tabSelect === itemTab.id ? "bg-[#ffecec] text-red-500" : ""} w-full border font-medium hover:text-[#ff0000] `} key={itemTab.id}  >
                                           <Link  to={itemTab.href} 
                                               className='w-full flex items-center p-3 pl-6' 
                                               // ref={itemTab.id === "1" ? firstLiRef : null } 
                                               onClick={()=>{
                                                   setTabSelect(itemTab.id)
                                               }}
                                           >
                                                   <span className='mr-2 relative top-[0.9px] text-[18px]'> {itemTab.icon}</span>
                                                    {itemTab.namePage}  
                                           </Link>
                                       </li>
                                   ))}
                               </ul>
                           </div>
             </div>
        // </div>
    )
}
export default NavbarAdmin