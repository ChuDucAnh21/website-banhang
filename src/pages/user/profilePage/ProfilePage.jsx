import { useEffect, useState } from "react"
import { getApiUserCurrent ,updateApiUser, getAllUserApi} from "../../../service/userApiService"
import { useSelector,useDispatch } from "react-redux"
import { SelectUser } from "../../../redux/selector"
import { useToast } from "../../../components/toastMessage/ToastMessage"
import { useLocation } from "react-router-dom"
import authSlice from "../../../redux/authSlice"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const ProfilePage = ()=>{
    const dispatch = useDispatch()
    const dataUser = useSelector(SelectUser)
    const {showToast} = useToast()
    const [isLoading,setIsLoading] = useState(false)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [password,setPassWord] = useState("")
    const [checkVali,setCheckValid] = useState(false)
    
   
    useEffect(() => {
        if(dataUser.role){
            setName(dataUser?.userInfor?.userName)
            setEmail(dataUser?.userInfor?.email)
            setPhone(dataUser?.userInfor?.phoneNumber)
        }
      
        const fetchUser = async () => {
            try {
                const data = await getApiUserCurrent(dataUser.accessToken); // chờ Promise resolve
                console.log("getApiUserCurrent",data)
            } catch (err) {
                console.error(err,"lỗi lấy DL user");
            }
        };
        fetchUser();
    },[]);

   
    const handelChangeInfo = async()=>{
       try{
        if(password !== ""){
            if(password === dataUser.userInfor.password){
                setIsLoading(true)
                const dataUpdate = await updateApiUser({
                    userName : name,
                    email : email,
                    phoneNumber : phone,
                    address : dataUser.userInfor.address,
                    avatar : dataUser.userInfor.avatar,
                    password: "123"
                },dataUser.accessToken)
                const userInforServer = await getApiUserCurrent(dataUser.accessToken); // lấy dữ liệu đc cập nhật từ server
                dispatch(authSlice.actions.updateUserInfo({...userInforServer.data,password : dataUser.userInfor.password}))
                showToast("Cập nhật thành công")
                setPassWord("")
                setIsLoading(false)
            }
            else{
                showToast("Mật khẩu không chính xác","error")
            }
        }
        else{
            setCheckValid(true)
            showToast("Bạn chưa nhập đủ thông tin","error")
        }
       }
       catch(err){
        console.error("Lỗi update:",err)
        showToast("Cập nhật thất bại","error")
       }
    }

    return (
        <div className="relative">
            <div className="w-[50%] min-h-[500px] m-auto flex-col">
                <div>
                    <h2 className="text-center pt-2 pb-2 text-[20px] text-blue-700 font-medium uppercase">Thông tin tài khoản</h2>
                </div>
                <div className="min-h-[300px] border-t-2 border-b-2 p-8">
                    <img className="w-[70px] m-auto mb-5 rounded-full" src={dataUser.userInfor.avatar} alt="" />
                    <div className="flex items-center flex-wrap mb-2">
                        <p className="w-[150px] font-medium">Tên người dùng :</p>
                        <input className="flex-1 p-1 pl-4 border rounded-md outline-blue-400" type="text" onChange={e=>setName(e.target.value)} value={name || ""} />
                    </div>
                    <div className="flex items-center flex-wrap mb-2">
                        <p className="w-[150px] font-medium">Email :</p>
                        <input className="flex-1 p-1 pl-4 border rounded-md outline-blue-400" type="text" onChange={e=>setEmail(e.target.value)} value={email || ""} />
                    </div>
                    <div className="flex items-center flex-wrap mb-2">
                        <p className="w-[150px] font-medium">Số điện thoại :</p>
                        <input className="flex-1 p-1 pl-4 border rounded-md outline-blue-400" type="text" onChange={e=>setPhone(e.target.value)} value={phone || ""} />
                    </div>
                    <div className="flex items-center flex-wrap mb-2">
                        <p className="w-[150px] font-medium">Vai trò :</p>
                        <input className="flex-1 p-1 pl-4 border rounded-md outline-blue-400" type="text"  value={dataUser.userInfor.role || ""} readOnly/>
                    </div>
                     <div className="flex items-center flex-wrap mb-2">
                        <p className="w-[150px] font-medium flex flex-col">Nhập PassWord: <span className="text-[12px] text-red-500">(Bắt buộc)</span></p>
                        <input onClick={()=>setCheckValid(false)} autoComplete="new-password" className={ ` ${checkVali ? "border border-red-600" : "border"} flex-1 p-1 pl-4  rounded-md outline-blue-400`} type="password"  value={password} onChange={e=>setPassWord(e.target.value)} />
                    </div>
                <div className="flex justify-center">
                        <button onClick={handelChangeInfo} className=" bg-blue-500 min-w-[180px] mt-2 rounded-lg text-white p-1 pl-4 pr-4 cursor-pointer hover:opacity-90">
                            Lưu thay đổi
                        </button>
                </div>
                </div>
            </div>
           {
                isLoading &&
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#cccccc33] z-0 ">
                    <AiOutlineLoading3Quarters className="animate-spin text-center m-auto mt-60 text-[38px]  text-blue-500"/>
                </div>
                
            }
        </div>
    )
}
export default ProfilePage