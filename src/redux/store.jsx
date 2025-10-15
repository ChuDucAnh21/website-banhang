import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import authSlice from "./authSlice";
import guestCartSlice from "./guestCartSlice";
import userCartSlice  from "./userCartSlice";
import storage from 'redux-persist/lib/storage'; // mặc định dùng localStorage

const persistConfigCart = {
  key: 'guestCart',        // key lưu trong storage
  storage,            // nơi lưu (localStorage)
};
const persistConfigUser = {
  key: 'user',        // key lưu trong storage
  storage,            // nơi lưu (localStorage)
};
const persistedCartReducer = persistReducer(persistConfigCart, guestCartSlice.reducer); // tạo 1 reducer mới có khả năng lưu vào storage
const persistedUsertReducer = persistReducer(persistConfigUser, authSlice.reducer);

const store = configureStore({  
    reducer :{  // các state con được quản lý bởi các slice khác nhau 
      auth : persistedUsertReducer,
      guestCart : persistedCartReducer,
      userCart :userCartSlice.reducer
    },
     middleware: (getDefaultMiddleware) =>  //redux-persist khi chạy sẽ dispatch một số action đặc biệt như:==>cần để hết warning
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST']
            },
        }),

})
export const persistor = persistStore(store);  // tạo persistor để kết nối store với storage 
export default store