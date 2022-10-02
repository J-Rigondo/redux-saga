import {createSlice} from "@reduxjs/toolkit";
import {merge, keyBy, values} from 'lodash';

const initialState = {
    ticker:[]
}

const tradeSlice = createSlice({
    name:'trade',
    initialState,
    reducers: {
        triggerTicker(){

        },
        closeTicker(){

        },
        setTicker(state, action) {
            console.log('here setTicker in',action)

            const merged = merge(keyBy(state.ticker, 'code'), action.payload.ticker);

            state.ticker = values(merged);
        }
    }
})

export default tradeSlice;