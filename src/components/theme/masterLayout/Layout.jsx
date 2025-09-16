import Footer from "../footer/Footer";
import Header from "../header/Header";
import LoginModel from "../../login/Login";
import Register from "../../login/Register";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SelectUser } from "../../../redux/selector";
import { useSelector,useDispatch } from "react-redux";
import authSlice from "../../../redux/authSlice";
const Layout = ()=>{
    const location = useLocation()
    const dispatch = useDispatch()
    const dataUser = useSelector(SelectUser)
    useEffect(()=>{
        const tokenLocal = localStorage.getItem("accessToken")  //lấy accessToken trong localStorage
        if(tokenLocal !== dataUser.accessToken){   //kiểm tra accessToken trong localStorage và trong store Redux
            dispatch(authSlice.actions.setAccessToken(tokenLocal))   //set lại trong store
        } 
    },[location])
    const [showLogin,setShowLogin] = useState(false)
    const [showRegister,setShowRegister] = useState(false)
    return (

        <div className="relative">
            <Header setShowLogin = {setShowLogin} setShowRegister={setShowRegister}/>
            <Outlet/>     
            <Footer/>
            {showLogin && <LoginModel showLogin={showLogin} setShowLogin = {setShowLogin} setShowRegister = {setShowRegister}/>}
            {showRegister && <Register showRegister={showRegister} setShowRegister = {setShowRegister} setShowLogin = {setShowLogin}/>}
        </div>

    )
}

export default Layout