
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    arr: [],
    sum: 0,
    count: 0,
    isOpen: false,
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let { _id, qty } = action.payload; 
            let index = state.arr.findIndex(item => item._id == _id);
            let productPrice = action.payload.price; 
            let productCost = productPrice * qty; 
            if (index > -1) {
                state.arr[index].qty += qty; 
            } else {
                state.arr.push({ ...action.payload ,qty:qty});
            }
            state.isOpen = true;
        },
        updateQuantity: (state, action) => {
            let { _id, qty } = action.payload; 
            let index = state.arr.findIndex(item => item._id == _id);
            if (index > -1) {
            state.arr[index].qty = qty;
            } 
        },
        deleteFromCart: (state, action) => {
            const { _id } = action.payload;
            const itemToRemove = state.arr.find(item => item._id === _id);
    
            if (itemToRemove) {
            state.arr = state.arr.filter(item => item._id !== _id);
            state.count -= itemToRemove.qty;
            state.sum -= itemToRemove.qty * itemToRemove.price;
        }
      },
      closeCartDialog: (state) => {
        state.isOpen = false;
      },
    }
});

export const  {addToCart,updateQuantity,deleteFromCart,closeCartDialog,openCartDialog} = cartSlice.actions;
export default cartSlice.reducer;
