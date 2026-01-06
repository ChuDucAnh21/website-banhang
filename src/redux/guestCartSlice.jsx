import { createSlice } from "@reduxjs/toolkit";
// cartSlice
const guestCartSlice = createSlice({
    name :"guestCart",
    initialState:{
        products : [],
        total : 0
    },
    reducers:{
        addProduct : (state,action)=>{
            const existingProduct  = state.products.find(product=>(
                product.id === action.payload.id &&
                product.size == action.payload.size &&
                product.color == action.payload.color 
            ))
            if(existingProduct){
                state.products.find(product=>product.id===action.payload.id).quantity += action.payload.quantity
            }
            else{
                state.products.push(action.payload)
            }
            state.total += (action.payload.price * action.payload.quantity)
            
        },
        updateProduct:(state,action)=>{
            if(action.payload.key==="reduce"){
                state.products.find(product=>(
                    product.id === action.payload.id &&
                    product.size == action.payload.size &&
                    product.color == action.payload.color 
                )).quantity -= 1
            }
             if(action.payload.key==="increase"){
                state.products.find(product=>(
                    product.id === action.payload.id &&
                    product.size == action.payload.size &&
                    product.color == action.payload.color 
                )).quantity += 1
            }
             state.total = state.products.reduce((init,product)=>{
                    return init + product.price* product.quantity
            },0)
        },
        removeProduct:(state,action)=>{
            state.products =  state.products.filter(product=>!(
                    product.id === action.payload.id &&
                    product.size === action.payload.size &&
                    product.color === action.payload.color 
                ))
            state.total = state.products.reduce((init,product)=>{
                    return init + product.price* product.quantity
            },0)
        },
        setCart:(state,action)=>{
            state.products = action.serverCart,
             state.total = action.serverCart.reduce((init,product)=>{
                    return init + product.price* product.quantity
            },0)
        },
        clearCart:(state)=>{
            state.products = [],
            state.total = 0
        },
    }
})

export default guestCartSlice