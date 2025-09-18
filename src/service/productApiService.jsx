import { apiFetch } from "./autoAPI"

export const getApiProduct = ()=>{
   return fetch("/api/product")
            .then((res)=>{
                if(!res.ok) throw new Error("Failed to fetch products")
                return res.json()
            })
}
export const getApiDetailProduct = (slug)=>{
    return fetch(`/api/product/${slug}`)
                .then(res=>{
                    if(!res.ok) throw new Error("Failed to fetch products")
                    return res.json()
                })
}
export const getApiCategoryProduct = ()=>{
    return fetch("/api/productCategory")
                .then(res=>{
                    if(!res.ok) throw new Error("Failed to fetch Category Product")
                    return res.json()
                })
}

export const createProductApi = async(token)=>{   //Tạo mới 1 sp bởi ADMIN
    const data = apiFetch("/api/product/create",{
         method:"POST",
        headers:{
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
        },
         body: JSON.stringify({
             "title": "test",
            "price": 11111,
            "description": "<p>abc</p>",
            "category": "66ebed677c9dabee5de0eae5",
            "brand": "Atino",
            "options": "[{\"color\":\"trắng\",\"sizeQuantity\":[{\"size\":\"S\",\"quantity\":12}]}]",
            "option[0][images]": [
                "string"
            ]
         })
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

export const updateProductApi = async(value,token)=>{
    const data = await apiFetch("/api/product/update",{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({
            "_id": "string",
            "title": "string",
            "price": 0,
            "slug": "string",
            "description": "string",
            "brand": "string",
            "stock": 0,
            "category": "string",
            "options": "[{\"color\":\"đen\",\"sizeQuantity\":[{\"size\":\"S\",\"quantity\":22}]}]",
            "images": [
                "string"
            ]
        })
    })
    return data
}