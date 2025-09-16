import {createBrowserRouter } from "react-router-dom";
import Layout from "./components/theme/masterLayout/Layout";
import { ROUTER } from "./utils/router";
import HomePage from "./pages/public/homePage/Home.jsx";
import ProductPage from "./pages/public/productPage/ProductPage";
import NotificationPage from "./pages/public/notificationPage/NotificationPage";
import DetailNotificationPage from "./pages/public/detailPage/detailNotification/detailNotificationPage";
import DetailProductPage from "./pages/public/detailPage/detailProduct/DetailProductPage";
import DetailCart from "./pages/public/detailPage/detailCart/DetailCart";
import OrderPage from "./pages/public/orderPage/OrderPage";
import HistoryPage from "./pages/user/historyBuy/HistoryBuyPage";
import ProfilePage from "./pages/user/profilePage/ProfilePage";
import DashBoardPage from "./pages/admin/dashBoard/DashBoard";
import CreateProduct from "./pages/admin/createProduct/CreateProduct";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {path:ROUTER.PUBLIC.HOME, element:<HomePage/>},
            {path:ROUTER.PUBLIC.PRODUCT, element:<ProductPage category=""/>},
            {path:ROUTER.PUBLIC.SHIRT, element:<ProductPage category="Áo"/>},
            {path:ROUTER.PUBLIC.TROUSERS, element:<ProductPage category="Quần"/>},
            {path:ROUTER.PUBLIC.NOTIFICATION, element:<NotificationPage/>},
            {path:ROUTER.PUBLIC.DETAIL_PRODUCT, element:<DetailProductPage/>},
            {path:ROUTER.PUBLIC.DETAIL_NOTIFICATION, element:<DetailNotificationPage/>},
            {path:ROUTER.PUBLIC.DETAIL_CART, element:<DetailCart/>},
            {path:ROUTER.PUBLIC.ORDER, element:<OrderPage/>},
            {path:ROUTER.USER.HISTORY, element:<HistoryPage/>},
            {path:ROUTER.USER.PROFILE, element:<ProfilePage/>},
            {path:ROUTER.ADMIN.DASHBOARD, element:<DashBoardPage/>},
            {path:ROUTER.ADMIN.CREATEPRODUCT, element:<CreateProduct/>},
        ]
    }
])