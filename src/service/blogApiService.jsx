import { apiFetch } from "./autoAPI"

export const getApiBlog = async()=>{
    const data = await apiFetch("/api/blog",{
        method :"GET"
    })
    return data

    // return fetch("/api/blog")
    //     .then(res=>{
    //         if(!res.ok) throw new Error("Failed to fetch Blog")
    //         return res.json()
    //     })
}
export const getApiDetailBlog = async(id)=>{
    const data = await apiFetch(`/api/blog/${id}`,{
        method :"GET"
    })
    return data
    // return fetch(`/api/blog/${id}`)
    //     .then(res=>{
    //         if(!res.ok) throw new Error("Failed to fetch detail Blog")
    //         return res.json()
    //     })
}
export const createBlogApi = async(value,token)=>{
    const formData = new FormData();   
        formData.append("title", value.title);
        formData.append("description", value.description);
        formData.append("image", value.image); // value.image là File object
    const data = await apiFetch("/api/blog/create",{
        method : "POST",
        headers: { 
             "Authorization": `Bearer ${token}`  //truyền token người dùng vào để gửi lên serve
        },
        body: formData   //data truyền vào body dạng form-data
    })
    return data 
}

export const updateBlogApi = async(value,token)=>{
     const formData = new FormData();
        formData.append("title", value.title);
        formData.append("description", value.description);
        formData.append("image", value.image);
    const data = await apiFetch(`/api/blog/update/${value.id}`,{
        method :"PUT",
        headers:{
            "Authorization": `Bearer ${token}`
        },
        body: formData//data truyền vào body dạng form-data
    })
    return data
}
export const deleteBlogApi = async(id,token)=>{
    const data = await apiFetch(`api/blog/delete/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
    return data
}