import { IoCloseSharp } from "react-icons/io5";
import "./style.scss"
import { registerApiUser } from "../../service/userApiService";
import { useEffect, useState } from "react";
import {validateForm} from "./validateForm"
import { useToast } from "../../components/toastMessage/ToastMessage";
const Register = ({setShowRegister,showRegister,setShowLogin})=>{
      const {showToast} = useToast()
      const [email,setEmail] = useState("")
      const [phoneNumber,setPhoneNumber] = useState("")
      const [userName,setUserName] = useState("")
      const [password,setPassword] = useState("")
      const [confirmPassword,setConfirmPassword] = useState("")
      const [checkPass,setCheckPass] = useState(false)
      const [validate,setValidate] = useState({})
      const handelCheckPassword = (value)=>{
            value!==password ?  setCheckPass(true) :  setCheckPass(false)
      }
      const handelRegister = async()=>{
            try{

                  const validate = validateForm({ "email":email, "phone" : phoneNumber,"name" : userName, "password":password, "confirmPassword":confirmPassword },"register")
                  setValidate(validate)
                  if(email ==="" || phoneNumber ==="" || userName==="" || password==="" || confirmPassword===""){
                        showToast("Bạn cần nhập đủ thông tin","error")
                  }
                  else{
                        if(Object.keys(validate).length === 0){
                              const data = await registerApiUser({
                                     email,
                                     phoneNumber,
                                     userName,
                                     password
                               })
                               showToast("Đăng kí thành công ok")
                               setShowRegister(false)
                               setShowLogin(true)
                        }
                  }
            }
            catch(err){
                  showToast("Đăng kí thất bại","error")
                  console.error("Lỗi : ",err)
            }
      }
    return (
        <div onClick={()=>setShowRegister(false)} className=" bg-[#a19a9a56] absolute top-0 bottom-0 left-0 right-0 z-20 flex justify-center">
            <div onClick={(e)=>{e.stopPropagation()  }} className={ `${showRegister===true ? " show " : ""} modelLogin fixed shadow-xl rounded-lg w-[90%] lg:w-[50%] min-h-[80%] md:min-h-[50%]  bg-white m-auto mt-10 pl-3 pr-3 pb-20`}>
                  <h2 className=" text-center p-4 text-[30px] font-bold text-blue-700 uppercase">Đăng KÝ</h2>
                  <div className="flex flex-wrap">
                        <span className="mt-3 mb-2 font-medium min-w-[160px] ">Email :</span>
                        <input value={email || ""} onChange={(e)=>setEmail(e.target.value)} className={ `${validate.email ? "outline-red-500 border-red-500 " : "outline-blue-400 border-[#ccc]" } pt-1 pb-1 pl-3 rounded-lg flex-1 min-w-[300px] border border-solid `} type="email" placeholder="Email"  />

                  </div>
                  <p className="text-[12px] text-red-500">{validate.email}</p>
                  <div className=" flex flex-wrap mt-2">
                        <span className="mt-3 mb-2 font-medium min-w-[160px]">Số điện thoại :</span>
                        <input value={phoneNumber || ""} onChange={(e)=>setPhoneNumber(e.target.value)} className={ `${validate.phone ? "outline-red-500 border-red-500 " : "outline-blue-400 border-[#ccc]" } pt-1 pb-1 pl-3 rounded-lg flex-1 min-w-[300px] border border-solid `} type="text" placeholder="Số điện thoại"  />
                  </div>
                  <p className="text-[12px] text-red-500">{validate.phone}</p>

                  <div className=" flex flex-wrap mt-2">
                        <span className="mt-3 mb-2 font-medium min-w-[160px]">Họ và tên :</span>
                        <input autoComplete="new-password" value={userName|| ""} onChange={(e)=>setUserName(e.target.value)} className={ `${validate.name ? "outline-red-500 border-red-500 " : "outline-blue-400 border-[#ccc]" } pt-1 pb-1 pl-3 rounded-lg flex-1 min-w-[300px] border border-solid `} type="text" placeholder="Họ và tên"  />
                  </div>
                  <p className="text-[12px] text-red-500">{validate.name}</p>

                  <div className=" flex flex-wrap items-center mt-2">
                        <span className="mb-2 font-medium min-w-[160px]">Mật khẩu :</span>
                        <input autoComplete="new-password" value={password|| ""} onChange={(e)=>setPassword(e.target.value)} className={ `${validate.password ? "outline-red-500 border-red-500 " : "outline-blue-400 border-[#ccc]" } pt-2 pb-2 pl-3 rounded-lg flex-1 min-w-[300px] border border-solid `} type="password" placeholder="Mật khẩu"  />
                  </div>
                  <p className="text-[12px] text-red-500">{validate.password}</p>

                  <div className=" flex flex-wrap items-center mt-2">
                        <span className="mb-2 font-medium min-w-[160px]">Nhập lại mật khẩu :</span>
                        <input value={confirmPassword ||""}  onChange={(e)=> setConfirmPassword(e.target.value)} className={ `${validate.confirmPassword ? "outline-red-500 border-red-500 " : "outline-blue-400 border-[#ccc]" } pt-2 pb-2 pl-3 rounded-lg flex-1 min-w-[300px] border border-solid `} type="password" placeholder="Nhập lại mật khẩu"  />
                  </div>
                  <p className="text-[12px] text-red-500">{validate.confirmPassword}</p>

                  {/* <p className={`${checkPass ? "" : "hidden"} text-red-500 text-[12px]`}>Mật khẩu không trùng khớp</p> */}
                  <div className="flex flex-wrap justify-center p-5 border-b border-solid border-[#ccc]">
                    <button onClick={handelRegister} className="bg-blue-600 w-[80%] m-auto text-white rounded-lg p-2">Đăng kí</button>
                  </div>
                  <div className="flex justify-around mt-2">
                     <p>
                        Bạn đã có tài khoản ? 
                        <span onClick={()=>{setShowLogin(true); setShowRegister(false)}} className="cursor-pointer underline text-blue-400"> Đăng nhập</span>

                     </p>
                  </div>
                <IoCloseSharp onClick={()=>setShowRegister(false)} className="absolute top-2 right-2 text-[24px] hover:bg-red-500 hover:cursor-pointer"/>
            </div>
        </div>
    )
}
export default Register