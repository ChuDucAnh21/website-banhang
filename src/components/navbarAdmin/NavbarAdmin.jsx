import { Link ,useLocation} from "react-router-dom"
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
    { id: "1", namePage: "Dashboard", icon: <IoMdHome />, href: "/admin/dashboard" },
    { id: "2", namePage: "Tạo Sản phẩm", icon: <BiLogoProductHunt />, href: "/admin/createProduct" },
    { id: "3", namePage: "Quản lý sản phẩm", icon: <AiFillShopping />, href: "/admin/productManager" },
    { id: "4", namePage: "Quản lý đơn hàng", icon: <MdLocalShipping />, href: "/admin/orderManager" },
    { id: "5", namePage: "Quản lý người dùng", icon: <FaUserGroup />, href: "/admin/userManager" },
    { id: "6", namePage: "Tạo bài viết", icon: <IoCreateSharp />, href: "/admin/createBlog" },
    { id: "7", namePage: "Quản lý bài viết", icon: <AiFillFolderAdd />, href: "/admin/BlogManager" },
];
 

const NavbarAdmin = ()=>{
    const location = useLocation()
    const [tabSelect,setTabSelect] = useState("/admin/dashboard")
    return (
        // <div className="w-[200px] h-svh bg-blue-100 ">
            <div className='w-[150px] sm:w-[30%] md:w-[20%] sm:border-r-2 max-h-[46px] overflow-hidden sm:max-h-full sm:min-h-[600px]'>
                          <div className=' flex flex-row sm:flex-col items-center h-full  bg-[#fff] '>
                               <img src="/logo.png" alt="" className='hidden  ml-2 pt-2 pb-2 mr-9 w-[40%] sm:inline'/>
                               <ul className=' w-full sm:w-full'>
                                   {tabs.map((itemTab)=>(
                                       <li className={` ${location.pathname === itemTab.href ? "sm:bg-[#ffecec] text-red-500" : ""}  w-full border-t border-b font-medium hover:text-[#ff0000] `} key={itemTab.id}  >
                                           <Link  to={itemTab.href} 
                                               className='w-full flex items-center p-3 pl-6 ' 
                                               
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