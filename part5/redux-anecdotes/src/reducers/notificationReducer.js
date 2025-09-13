import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name:'notification',
    initialState:'',
    reducers:{
        createNotification(state,action){
            console.log('reaching')
            let {payload} = action;
            
            return payload;
        },
        removeNotification(state, action){
            return action.payload;
        }
    }
})

const {createNotification,removeNotification} = notificationSlice.actions;

export const notificationHelper = (notification,timer)=>{
    return (dispatch)=>{
        dispatch(createNotification(notification));

        setTimeout(()=>{
            dispatch(removeNotification(''))
        },timer)
    }
}
export default notificationSlice.reducer