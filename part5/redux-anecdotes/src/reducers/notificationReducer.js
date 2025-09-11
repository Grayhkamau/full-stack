import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name:'notification',
    initialState:'',
    reducers:{
        createNotification(state,action){
            let {payload} = action;
            
            return payload;
        }
    }
})

export const {createNotification} = notificationSlice.actions;

export default notificationSlice.reducer