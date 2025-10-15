import { apiFetch } from "./autoAPI"

export const getApiProduct = ()=>{
   const data =  apiFetch("/api/product",{
        method :"GET"
   })
   return data
}

export const getApiDetailProduct = (slug)=>{
    const data =  apiFetch(`/api/product/${slug}`,{
        method :"GET"
    })
    return data
}

export const getApiCategoryProduct = ()=>{
    const data =  apiFetch("/api/productCategory",{
        method :"GET"
    })
    return data
}

// export const getApiProduct = ()=>{
//    return fetch("/api/product")
//             .then((res)=>{
//                 if(!res.ok) throw new Error("Failed to fetch products")
//                 return res.json()
//             })
// }



export const createProductApi = async(token ,value)=>{   //Tạo mới 1 sp bởi ADMIN
    console.log("Value form Data", value)
    const data = apiFetch("/api/product/create",{
         method:"POST",
        headers:{
             "Authorization": `Bearer ${token}`,
        },
         body: value
    })
    return data
}

export const deleteProductApi = async(id,token)=>{  //Xóa 1 sản phẩm bới ADMIN
    const data = await apiFetch("/api/product/delete",{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({
            "pid" : id
        })
    })
    return data
}

export const updateProductApi = async(token,value)=>{
    const data = await apiFetch("/api/product/update",{
        method:"PUT",
        headers:{
             "Authorization": `Bearer ${token}`,
        },
        body: value
    })
    return data
}