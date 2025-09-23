import { apiFetch } from "./autoAPI";



export const registerApiUser = async(newUser)=>{
         const data = await apiFetch("/api/user/register",{
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    "email":newUser.email,
                    "password": newUser.password,
                    "userName": newUser.userName,
                    "phoneNumber": newUser.phoneNumber,
                }),
            })
        return data;   
      
}


export const loginApiUser= async(value)=>{
 
       const data =  await apiFetch("/api/user/login",{
          method:"POST",
          headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                "loginValue":value.email,
                "password": value.password,
            }),
           credentials: "include"
       })
       return data
  
}


export const logoutApiUser = async()=>{
  
        const data = await apiFetch("/api/user/logout",{
                method:"POST"
            })
        return data
}


////Cập nhật thông tin User by User
export const updateApiUser = async (value,token)=>{
    const data = await apiFetch("/api/user/current",{
        method:"PUT",
        headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`  //truyền token người dùng vào để gửi lên serve
        },
        // credentials: "include",
        body: JSON.stringify({
                "userName":value.userName,
                "email": value.email,
                "phoneNumber": value.phoneNumber,
                "address": value.address,
                "avatar": value.avatar,
                "password": value.password,
        })
        
    })
    return data
}
//Lấy thông tin user đang đăng nhập  (Bao gồm cả giỏ hàng)
export const getApiUserCurrent  = async(token)=>{
    const data = await apiFetch("/api/user/current",{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
        }
    });
    return data;   // trả về data
}

//Thêm sản phẩm vào giỏ hàng của user trên server
export const addToCartUserApi = async(value,token)=>{
    const data = await apiFetch("/api/user/addToCart",{
         method:"PUT",
        headers: {
             "Content-Type": "application/json",  //đảm bảo chuỗi truyền vào dạng json
             "Authorization": `Bearer ${token}`  //truyền token người dùng vào để gửi lên serve
        },
        body: JSON.stringify({
                "pid":value.id,
                "quantity": value.quantity,
                "color": value.color,
                "size": value.size,
                "price": value.price,
        })
    })
    return data
}

//Xóa sản phẩm khỏi giỏ hàng
export const removeToCartUserApi = async(value,token)=>{
    const data = await apiFetch("/api/user/removeFromCart",{
        method:"PUT",
        headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`  //truyền token người dùng vào để gửi lên serve
        },
        // credentials: "include",
        body: JSON.stringify({
                "pid":value.id,
                "color": value.color,
                "size": value.size,
        })
    })
    return data
}

//lấy thông tin tất cả user bởi admin
export const getAllUserApi = async(token)=>{  
    const data = await apiFetch("/api/user",{
        method:"GET",
        headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`  //truyền token người dùng vào để gửi lên serve
        },
    })
    return data
}

//cập nhật user bởi admin (vai trò, trạng thái)

export const updateUserByAdminApi = async(value,token)=>{
    const data  = await apiFetch(`/api/user/?uid=${value.id}`,{
        method:"PUT",
        headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`  //truyền token người dùng vào để gửi lên serve
        },
        body:JSON.stringify({
            "role" : value.role,
            "isBlocked" : value.isBlocked
        })
    })
    return data
}

//Xóa user bởi admin
export const deleteUserByAdminApi = async(id,token)=>{
    const data  = await apiFetch(`/api/user/?uid=${id}`,{
        method:"DELETE",
        headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`  //truyền token người dùng vào để gửi lên serve
        }
    })
    return data
}