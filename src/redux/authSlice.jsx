import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({  //kết hợp action và reducer trong 1 nơi
    name :"user",
    initialState:{ 
        isLoggedIn:false,
        accessToken : null,
        userInfor : {},
        role:null
    },
    reducers:{  // nơi viết các action xử lý các thao tác đồng bộ
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.userInfor = action.payload.dataUser;
            state.role = action.payload.role; 
        },
        setAccessToken:(state,action)=>{
            state.accessToken = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.accessToken = null;
            state.userInfor = {};
            state.role = null;
        },
        updateUserInfo:(state,action)=>{
            state.userInfor = action.payload
        }
    }
})
export const {setAccessToken}  = authSlice.actions 
export default authSlice 