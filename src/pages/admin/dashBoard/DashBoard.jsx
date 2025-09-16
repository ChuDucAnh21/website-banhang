import { useNavigate } from "react-router-dom"
import { NavbarAdmin } from "../../../components/index"
import { BiLogoProductHunt } from "react-icons/bi";
import { AiFillShopping } from "react-icons/ai";
import { MdLocalShipping } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { IoCreateSharp } from "react-icons/io5";
import { AiFillFolderAdd } from "react-icons/ai";

const tabs = [
    { id: "2", namePage: "Tạo Sản phẩm", icon: <BiLogoProductHunt />, href: "/admin/createProduct" },
    { id: "3", namePage: "Quản lý sản phẩm", icon: <AiFillShopping />, href: "/productShirt" },
    { id: "4", namePage: "Quản lý đơn hàng", icon: <MdLocalShipping />, href: "/productTrousers" },
    { id: "5", namePage: "Quản lý người dùng", icon: <FaUserGroup />, href: "/notification" },
    { id: "6", namePage: "Tạo bài viết", icon: <IoCreateSharp />, href: "/notification" },
    { id: "7", namePage: "Quản lý bài viết", icon: <AiFillFolderAdd />, href: "/notification" },
];


const DashBoardPage = ()=>{
    const navigate = useNavigate()
    return (
        <div className="flex items-start relative">
            <NavbarAdmin/>
            <div className="flex flex-1 flex-wrap items-start gap-3 p-10 pr-[90px]">
                {
                    tabs.map((item)=>(
                        <div key={item.id} onClick={()=>{navigate(item.href)}}  className="w-[200px] h-[100px] rounded-lg  shadow-xl border-2 border-blue-600 flex items-center justify-center hover:border-red-600 hover:cursor-pointer ">
                            <p className="mr-1 text-[18px] text-blue-600">{item.icon}</p>
                            <p className="text-blue-600 font-medium">{item.namePage}</p>
                        </div>
                    ))
                }
                
               
            </div>
        </div>
    )

}

export default DashBoardPage