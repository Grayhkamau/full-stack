import { filterCreator } from "./reducers/anecdoteReducer";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
        filter:filterCreator
    }
});


export default store;