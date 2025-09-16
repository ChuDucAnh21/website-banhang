
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