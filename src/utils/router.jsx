export const ROUTER = {
    PUBLIC : {
        HOME: "/",
        PRODUCT :"/product",
        SHIRT :"/productShirt",
        TROUSERS:"/productTrousers",
        NOTIFICATION:"/notification",
        DETAIL_PRODUCT:"/detailProduct/:slug",
        DETAIL_NOTIFICATION:"/detailNotification/:id",
        DETAIL_CART:"/detailCart",
        ORDER : "/orderProduct",
    },
    USER:{
        HISTORY : "/history-buy",
        PROFILE :"/profile"
    },
    ADMIN:{
        DASHBOARD : "/admin/dashboard",
        CREATEPRODUCT:"/admin/createProduct"
    }
    
}