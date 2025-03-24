
import { createSlice } from "@reduxjs/toolkit"

const savedCart = localStorage.getItem("cart");
const parsedCart = savedCart ? JSON.parse(savedCart) : [];  // אם יש ערך -> מפרש, אם לא -> מחזיר []

const initialState = {
    arr: Array.isArray(parsedCart) ? parsedCart : [], // לוודא שהערך הוא מערך
    sum: parsedCart.reduce((acc, item) => acc + (item.qty * item.price), 0),
    count: parsedCart.reduce((acc, item) => acc + item.qty, 0),
    isOpen: false,
};

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
            state.count += qty;
            state.sum += productCost;
            state.isOpen = true;
            localStorage.setItem("cart", JSON.stringify(state.arr));
        },
        updateQuantity: (state, action) => {
            let { _id, qty } = action.payload;
            let index = state.arr.findIndex(item => item._id === _id);
            
            if (index > -1) {
                state.arr[index].qty = qty;
            } 
            
            state.count = state.arr.reduce((acc, item) => acc + item.qty, 0);
            state.sum = state.arr.reduce((acc, item) => acc + (item.qty * item.price), 0);
            
            localStorage.setItem("cart", JSON.stringify(state.arr));
        },
        deleteFromCart: (state, action) => {
            const { _id } = action.payload;
            const itemToRemove = state.arr.find(item => item._id === _id);
    
            if (itemToRemove) {
            state.arr = state.arr.filter(item => item._id !== _id);
            state.count -= itemToRemove.qty;
            state.sum -= itemToRemove.qty * itemToRemove.price;
        }
        localStorage.setItem("cart", JSON.stringify(state.arr));

      },
      openCartDialog: (state) => {
        state.isOpen = true;
        console.log("is open dialog ",state.isOpen);
      },
      closeCartDialog: (state) => {
        state.isOpen = false;
      },
      clearCart: (state) => { // אקשן חדש לאיפוס העגלה
        state.arr = [];
        state.count = 0;
        state.sum = 0;
        state.isOpen = false;
        localStorage.removeItem("cart");
    }
    }
});

export const  {addToCart,updateQuantity,deleteFromCart,closeCartDialog,openCartDialog,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
