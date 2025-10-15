import './style.scss'
import { IoIosSearch } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState, useTransition } from 'react';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
import { GrCart } from "react-icons/gr";
import { GiCoinsPile, GiHamburgerMenu } from "react-icons/gi";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { RiShoppingBag3Line } from "react-icons/ri";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { FiBell } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { CartProduct ,SearchProduct } from '../../../components/index';
import { useSelector,useDispatch } from 'react-redux';
import authSlice from '../../../redux/authSlice';
import { SelectGuestCart,SelectUser, SelectUserCart } from '../../../redux/selector';
import { logoutApiUser } from '../../../service/userApiService';
import { useToast } from '../../../components/toastMessage/ToastMessage';
const tabs = [
    { id: "1", namePage: "Trang chủ", icon: <AiOutlineHome />, href: "/" },
    { id: "2", namePage: "Sản phẩm", icon: <RiShoppingBag3Line />, href: "/product" },
    { id: "3", namePage: "Áo", icon: <IoShirtOutline />, href: "/productShirt" },
    { id: "4", namePage: "Quần", icon: <PiPants />, href: "/productTrousers" },
    { id: "5", namePage: "Thông báo", icon: <FiBell />, href: "/blog" },
];


const Header = ({setShowLogin,setShowRegister})=>{
    const {showToast} = useToast()
    const location = useLocation();
    const [tab,setTab] = useState(location.pathname)   // dùng để set line dưới tab đc chọn
    const [widthWindow,setWidthWindow] = useState("")
    const firstLiRef = useRef(null);
    const refLine = useRef(null)
    const refAccount = useRef(null)
    const cartRef = useRef(null)
    const [shownav,setShownav] = useState(false)
    const [showCart,setShowCart] = useState(false)
    const [showAccout,setShowAccout]  =useState(false)
    const [textSearch,setTextSearch] = useState("")
    const [text,setText] = useState("")
    const [isPending,startTransition] = useTransition()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dataUser = useSelector(SelectUser)
    const listProductCar =dataUser.role === "user" || dataUser.role === "admin" ? useSelector(SelectUserCart) : useSelector(SelectGuestCart)

    const handelToggeNavbar = ()=>{ // đóng/ mở navbar 
        setShownav(!shownav)
    }
    useEffect(() => { //set chiều width của line theo kích thước trình duyệt
        const handleResize = () => {
            setWidthWindow(window.innerWidth);
        };
               window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
     }, []);

      useEffect(() => {  // xử lý ấn ra ngoài icon giỏ hàng thì sẽ ẩn giỏ hàng đi
        function handleClickOutside(event) {
        // nếu click mà không nằm trong cartRef thì ẩn
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setShowCart(false)
            }
        }
        function handleClickOutsideAccount(event) {
        // nếu click mà không nằm trong cartRef thì ẩn
            if (refAccount.current && !refAccount.current.contains(event.target)) {
                setShowAccout(false)
            }
        }
        

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("mousedown", handleClickOutsideAccount)
        return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("mousedown", handleClickOutsideAccount)
        }
    }, [])

    useEffect(()=>{  
       window.scrollTo(0, 0);
        let currentTab = tab;
        const activeTabElement = document.querySelector(
            `.list-nav a[href="${location.pathname}"]`
        );
        if (activeTabElement) {
            setTab(activeTabElement);
            currentTab = activeTabElement
        }
        const line = refLine.current
        line.style.left = tab === "" ? firstLiRef.current?.offsetLeft + "px" : currentTab?.offsetLeft + "px";
        line.style.width = tab === "" ? firstLiRef.current?.offsetWidth + "px" : currentTab?.offsetWidth + "px";
        
    },[location.pathname,widthWindow])


    const handelLogOut = async()=>{
        setShowAccout(!showAccout)
        try {
            const logout = await logoutApiUser()
            dispatch(authSlice.actions.logout())
            showToast("Đăng xuất thành công")
            navigate("/")
        } catch (error) {
            showToast("Đăng xuất thất bại")
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
             setTextSearch(text) // chỉ update sau 1 lúc user ngừng gõ
        }, 1000)

        // clear timeout nếu user gõ tiếp
        return () => clearTimeout(handler)
    }, [text])

    const handelSearch = (value)=>{
        setText(value)
    }
    
    
    return(
       <div className='header-page z-10 pt-1 pb-2 bg-white sticky top-0 left-0 w-full'>

           {/* nav MOBILE */}
           <div className={'containerNavbar  z-20 ' + `${ shownav ? "shownav" : ""}`} onClick={handelToggeNavbar}  >
               <div onClick={(e) => e.stopPropagation()} className='menuNavbar shadow-xl flex flex-col items-center  w-[50%] md:w-[40%] h-svh bg-[#fff]  z-30 absolute top-0'>
                    <img src="/logo.png" alt="" className='ml-2 pt-2 pb-2 mr-9 block w-[70%] md:w-[40%] md:inline'/>
                    <ul className='w-full'>
                        {tabs.map((itemTab)=>(
                            <li className='w-full font-medium hover:text-[#ff0000]' key={itemTab.id}>
                                <Link  to={itemTab.href} 
                                    className='w-full flex items-center p-3 pl-6' 
                                    // ref={itemTab.id === "1" ? firstLiRef : null } 
                                    onClick={()=>{
                                        // setSelectTab(itemTab.id);
                                        setShownav(!shownav)
                                    }} 
                                    style={location.pathname===itemTab.href ? {backgroundColor:"#eee", color:"#ff0000"}:{}}
                                >
                                        <span className='mr-2 relative top-[0.9px] text-[18px]'> {itemTab.icon}</span>
                                         {itemTab.namePage}  
                                </Link>
                            </li>
                        ))}
                        {
                            dataUser.role ==="user" || dataUser.role ==="admin" ? 
                            <li className='itemAccoutNavbarMobile w-full font-medium pt-2 pb-2 border-t border-b overflow-hidden'>

                               <div className='flex  pl-6 items-center '>
                                    <FaUser className='mr-2'/>
                                    <span className='text-blue-500'>Tài khoản</span>
                               </div>
                                <ul className='mt-2'>
                                    <li onClick={()=>{navigate("/profile"); setShownav(!shownav)}} className='pt-2 pb-2 pl-6  hover:text-[#ff0000] hover:cursor-pointer'>Thông tin tài khoản</li>
                                   {
                                     dataUser.role ==="user"? 
                                     <li onClick={()=>{navigate("/history-buy"); setShownav(!shownav)}}  className='pt-2 pb-2 pl-6  hover:text-[#ff0000] hover:cursor-pointer'>Lịch sử mua hàng</li>
                                     :
                                     <li onClick={()=>{navigate("/admin/dashboard"); setShownav(!shownav)}}  className='pt-2 pb-3 pl-6  hover:text-[#ff0000] hover:cursor-pointer '>Quản lý cửa hàng</li>

                                   }
                                </ul>
                            </li>
                            :
                            ""
                        }
                    </ul>
                    {
                        dataUser.role ==="user" || dataUser.role ==="admin" ?
                            
                            <div onClick={()=>{handelLogOut();navigate("/"); setShownav(!shownav)}} className='text-[16px] font-medium absolute bottom-0 bg-[#ff0000] w-full text-center text-white p-3 hover:cursor-pointer hover:opacity-80'>Đăng xuất</div>
                                :
                            <div onClick={()=>{setShowLogin(true); navigate("/") ;setShownav(!shownav)}} className='text-[16px] font-medium absolute bottom-0 bg-[#ff0000] w-full text-center text-white p-3 hover:cursor-pointer hover:opacity-80'>Đăng nhập</div>
                    }
                    <IoClose className='absolute top-3 right-1 text-[24px] hover:cursor-pointer hover:bg-[#dd0505]' onClick={handelToggeNavbar}/>
                </div>
           </div>
           {/*  */}
            <div className='heading flex md:flex-nowrap flex-wrap items-center justify-around w-full lg:max-w-[1240px] '>
                <Link to="/" className='logo-heading ml-2 mr-1 block w-[180px] md:w-[240px] md:inline'>
                    <img src="/logo.png" alt="" className='w-[160px] md:w-[240px]'/>
                </Link>
                <div className='flex flex-1 justify-around items-center'>
                    {/* input tìm kiếm */}
                    <div className='relative search-heading w-[70%] md:w-[50%] lg:w-[40%] min-w-[190px] ml-2'>
                        <input className='input-search' type="text" placeholder='Bạn cần tìm gì ?' value={text} onChange={e=>handelSearch(e.target.value)} />
                        <div className='icon-search flex justify-center items-center'>
                            <IoIosSearch className='w-full' />
                        </div>
                        {textSearch!== "" && <SearchProduct setTextSearch={setTextSearch}  textSearch = {textSearch}/>}
                    </div>
                    {/* liên hệ  */}
                    <div className='contact-heading items-center hidden lg:flex'>
                        <FaPhone />
                        <span className='ml-2'>Hotline : 0987654321</span>
                    </div>
                    
                    {/* Giỏ hàng */}
                    <div ref={cartRef} className='cart-heading relative  w-[60px] flex hover:cursor-pointer ml-3 md:ml-0 '>
                        <GrCart onClick={()=>setShowCart(!showCart)} className='icon-cart size-7'/>
                        {listProductCar.products.length !==0 ? 
                            <p className='quatity_product'>{listProductCar.products.length}</p> 
                            :
                            ""
                        }
                       {showCart && <CartProduct setShowCart = {setShowCart}/>}
                    </div>
                    {/* Tài khoản */}
                    <div className='info-login-heading flex items-center'>
                        
                        {dataUser.role ==="user" || dataUser.role ==="admin" ?
                            //đã login
                            <div ref={refAccount} className='profile-heading items-center hidden sm:flex relative '>

                               <div className='flex items-center cursor-pointer' onClick={()=>setShowAccout(!showAccout)}>
                                  <img src={dataUser.userInfor.avatar}  className='avt-profile size-8  '/>
                                  <BiSolidDownArrow  className='w-3 ml-1' />
                               </div>
                                {showAccout && <div className=' absolute top-full right-[-10px] w-[160px] min-h-[20px] border bg-white z-10 shadow-2xl'>
                                        <ul className='text-center'>
                                            <li onClick={()=>setShowAccout(!showAccout)} className='p-1 cursor-pointer hover:bg-blue-50'><Link to={"/profile"}>Thông tin tài khoản</Link></li>
                                            {
                                                dataUser.role === "admin" ? 
                                                    <li onClick={()=>{navigate("/admin/dashboard"),setShowAccout(!showAccout)}} className='p-1 cursor-pointer hover:bg-blue-50'>Quản lý cửa hàng</li>
                                                    : 
                                                    <li onClick={()=>setShowAccout(!showAccout)} className='p-1 cursor-pointer hover:bg-blue-50'><Link to={"/history-buy"}>Lịch sử mua hàng</Link></li>
                                            }
                                            <li onClick={handelLogOut} className='border-t p-1 cursor-pointer hover:bg-red-50'>đăng xuất</li>
                                        </ul>
                                    </div>
                                }
                            </div>
                                 :
                                //chưa login
                            <div className='hidden sm:flex '>
                                <p onClick={()=>setShowLogin(true)} className='block w-[88px] cursor-pointer hover:text-blue-400'>Đăng nhập |</p>
                                <p onClick={()=>setShowRegister(true)} className='ml-2 block w-[86px] cursor-pointer hover:text-blue-400'>Đăng kí</p>
                            </div>
                        }

                    </div>
                    <div className='block sm:hidden mr-4 hover:cursor-pointer' onClick={handelToggeNavbar}>
                        < GiHamburgerMenu className='size-6'/>
                    </div>
                </div>
            </div>
            {/* nav PC,TABLE */}
            <div className='container-nav hidden translate-x-full sm:translate-x-0  sm:flex justify-center'>
                <ul className='list-nav flex flex-wrap justify-center w-full'>
                    {tabs.map((itemTab)=>(
                         <li className='min-w-[15%] font-medium' key={itemTab.id} >
                            <Link  to={itemTab.href} className='w-full' ref={itemTab.id === "1" ? firstLiRef : null } style={location.pathname === itemTab.href ? {backgroundColor:"#eee", color:"#bf4040"}:{}}>
                               <span className='mr-2 relative top-[0.9px] text-[18px]'> {itemTab.icon}</span>
                                {itemTab.namePage}  
                            </Link>
                        </li>
                    ))}
                <div ref={refLine} className='line'></div>
                </ul>
            </div>
       </div>
    )
}

export default Header