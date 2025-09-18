import { apiFetch } from "./autoAPI"

export const getOrderByUserApi= async(token)=>{     //Lấy thông tin mà user đã đặt hàng
    const data =await apiFetch("/api/order/getOrderByUser",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            //  credentials: "include"
    })
    return data
}
export const getOrderByAdminApi= async(token)=>{     //Lấy thông tin mà user đã đặt hàng
    const data =await apiFetch("/api/order/getOrderByAdmin",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            //  credentials: "include"
    })
    return data
}

export const orderCartApi = async(value,token)=>{   //đặt sản phẩm
    const data = apiFetch("/api/order",{
        method:"POST",
        headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            "products": value.cart,
            "note": value.note,
             "shippingPrice": 35000,
            "discount": 0,
            "orderBy": {
                "address": value.address,
                "email": value.email,
                "phoneNumber": value.phoneNumber,
                "userName": value.userName
            }  
        }),

    })
    return data
}

export const orderCartGuestApi = async(value)=>{   //đặt sản phẩm
    const data = apiFetch("/api/order/guest",{
        method:"POST",
        headers:{
                "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "products": value.cart,
            "note": value.note,
             "shippingPrice": 35000,
            "discount": 0,
            "orderBy": {
                "address": value.address,
                "email": value.email,
                "phoneNumber": value.phoneNumber,
                "userName": value.userName
            }  
        }),

    })
    return data
}

export const updateOrderByUserApi = async(value,token)=>{
    const data = await apiFetch("/api/order/updateOrderByUser",{
        method :"PUT",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({
            "oid" :value.id,
            "status" : value.status
        })
    })
    return data
}
export const updateOrderByAdminApi = async(value,token)=>{
    const data = await apiFetch("/api/order/updateOrderByAdmin",{
        method :"PUT",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({
            "oid" :value.id,
            "status" : value.status
        })
    })
    return data
}