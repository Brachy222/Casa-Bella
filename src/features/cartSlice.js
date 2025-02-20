
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    arr: [],
    sum: 0,
    count: 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let { _id, qty } = action.payload; 
            let index = state.arr.findIndex(item => item._id == _id);
            if (index > -1) {
                state.arr[index].qty += qty; 
            } else {
                state.arr.push({ ...action.payload ,qty:qty});
            }
        }
    }
});

export const  {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
