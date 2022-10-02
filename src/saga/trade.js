import { call, put, take, select, flush, delay,takeEvery  } from "redux-saga/effects";
import {buffers, eventChannel} from "redux-saga";


export function* handleTicker() {
    console.log('is saga?')
    yield delay(2000)
    yield put({type:'trade/setTicker', payload:['sagasaga']})
}

export function* watchTickerSaga() {
    console.log('watch ticker')
    yield takeEvery('trade/triggerTicker', watchOnPings)
}





const createSocket = () => {
    const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
    ws.binaryType = 'arraybuffer';

    return ws;
}

function createSocketChannel(socket) {
    return eventChannel(emit => {
        socket.onopen = ()=> {
            socket.send(
                JSON.stringify([
                    {ticket:'rernarodo'},
                    {type:'ticker', 'codes':['KRW-BTC','KRW-XRP']}
                ])
            )
        }

        socket.onmessage = (event) => {
            const uintData = new Uint8Array(event.data);
            const encoder = new TextDecoder('utf-8');
            const data = JSON.parse(encoder.decode(uintData));

            emit(data);
        }

        socket.onerror = () => {
            socket.close();
        }

        return ()=>{
            socket.close();
        }


    },buffers.expanding(500))
}

export function* watchOnPings(action) {
    const socket = yield call(createSocket);
    const socketChannel = yield call(createSocketChannel, socket);

    while(true) {
        try {
            const datas = yield flush(socketChannel);

            if(datas.length) {

                console.log(datas)


                yield put({type:'trade/setTicker', payload:datas});

            }


            yield delay(2000);

        } catch(error) {
            console.log('watchOnPings socket error: ',error);
            //socketChannel.close();
        }
    }
}