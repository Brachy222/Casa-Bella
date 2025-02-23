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
        },
        userOut:(state)=>{
            state.currentUser = null;
        }
    }
});

export const  {userOut,userIn} = userSlice.actions;
export default userSlice.reducer;
