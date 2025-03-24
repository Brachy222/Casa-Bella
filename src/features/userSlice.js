import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentUser:JSON.parse(localStorage.getItem("user")) || null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userIn:(state,action)=>{
            state.currentUser=action.payload;
            console.log("in userSlice",action.payload);
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("token",JSON.stringify(action.payload.token))
            console.log("after localStorage");
        },
        userOut:(state)=>{
            state.currentUser = null;
            localStorage.setItem("user",null)
            localStorage.setItem("token",null)
            localStorage.setItem("cart",[])
        }
    }
});

export const  {userOut,userIn} = userSlice.actions;
export default userSlice.reducer;
