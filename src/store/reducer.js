import {combineReducers} from "@reduxjs/toolkit";
import tradeSlice from "../slices/trade";

const rootReducer = combineReducers({
    trade:tradeSlice.reducer
})

export default rootReducer;