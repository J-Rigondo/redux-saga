import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import createSagaMiddleware from 'redux-saga';
import {all,fork} from 'redux-saga/effects';
import {watchTickerSaga} from "../saga/trade";

const sagaMiddleware = createSagaMiddleware();

function* helloSaga(){
    console.log('hello saga')
}

function* rootSaga() {
    console.log('exec root saga')
    yield all([helloSaga(),watchTickerSaga()])
}


const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware:[sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
