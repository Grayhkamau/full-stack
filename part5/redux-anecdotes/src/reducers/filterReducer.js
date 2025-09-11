import { configureStore, createSlice } from "@reduxjs/toolkit";



const filterSlice = createSlice({
    name:'filter',
    initialState:'ALL',
    reducers:{
        filterCreator(state,action){
            let {payload} = action;
            return payload
            }
    }
})

export const {filterCreator} = filterSlice.actions
export default filterSlice.reducer;

