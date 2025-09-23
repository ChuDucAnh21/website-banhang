export const ROUTER = {
    PUBLIC : {
        HOME: "/",
        PRODUCT :"/product",
        SHIRT :"/productShirt",
        TROUSERS:"/productTrousers",
        BLOG:"/blog",
        DETAIL_PRODUCT:"/detailProduct/:slug",
        DETAIL_BLOG:"/detailBlog/:id",
        DETAIL_CART:"/detailCart",
        ORDER : "/orderProduct",
    },
    USER:{
        HISTORY : "/history-buy",
        PROFILE :"/profile"
    },
    ADMIN:{
        DASHBOARD : "/admin/dashboard",
        CREATEPRODUCT:"/admin/createProduct",
        PRODUCTMANAGER:"/admin/productManager",
        ORDERMANAGER:"/admin/orderManager",
        USERMANAGER:"/admin/userManager",
        CREATEBLOG:"/admin/createBlog",
        BLOGMANAGER:"/admin/blogManager",
    }
    
}