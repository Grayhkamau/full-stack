import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name:'notification',
    initialState:'',
    reducers:{
        createNotification(state,action){
            let {payload} = action;
            
            return payload;
        },
        removeNotification(state, action){
            return action.payload;
        }
    }
})

export const {createNotification,removeNotification} = notificationSlice.actions;

export default notificationSlice.reducer