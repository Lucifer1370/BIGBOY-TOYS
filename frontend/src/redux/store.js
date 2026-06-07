import { configureStore } from  "@reduxjs/toolkit"
import userSlice from "./userSlice"
import compareSlice from "./compareSlice"
const store = configureStore({
    reducer:{
        user:userSlice,
        compare:compareSlice
    }
})
export default store