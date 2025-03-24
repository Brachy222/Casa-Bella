import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentUser:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userIn:(state,action)=>{
            state.currentUser=action.payload;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token",JSON.stringify(user.token))
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
