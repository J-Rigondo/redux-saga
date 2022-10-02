import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ticker:[]
}

const tradeSlice = createSlice({
    name:'trade',
    initialState,
    reducers: {
        triggerTicker(){

        },
        setTicker(state,action) {
            console.log('here setTicker in',action)
            state.ticker = action.payload.ticker;
        }
    }
})

export default tradeSlice;