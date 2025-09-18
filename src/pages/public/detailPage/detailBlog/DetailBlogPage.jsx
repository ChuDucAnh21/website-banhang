import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useParams } from "react-router-dom"

import { getApiDetailBlog } from "../../../../service/blogApiService"

const DetailBlogPage = ()=>{
    const [isLoading,setIsLoading] = useState(true)
    const {id} = useParams()
    const [dataDetail,setDataDetail] = useState([])
    useEffect(()=>{
        const getDetailBlog = async(id)=>{
            try {
                const dt =await getApiDetailBlog(id)
                setDataDetail(dt.data)
                 setIsLoading(false)
            } catch (error) {
                 console.error("Lỗi hiển thị Blog",error)
            }
        }
        getDetailBlog(id)
        // getApiDetailBlog(id)
        // .then(dt=>{
        //     setDataDetail(dt.data)
        //     setIsLoading(false)
        // })
    },[])
    return (
        <div className="min-h-[600px] w-[80%] m-auto  pt-2 border-t border-solid border-[#ccc]">
            {
                isLoading ? 
                    <div className=" mt-10 w-full mb-10"><AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500"/></div>
                    :
                    <div className="pt-3 pb-3">
                        <div>
                            <img className="w-[30%] float-left p-3" src={dataDetail.image} alt="" />
                        </div>
                        <div className="font-serif" dangerouslySetInnerHTML={{ __html: dataDetail?.description }}>

                        </div>
                    </div>
            }
        </div>
    )
}
export default DetailBlogPage