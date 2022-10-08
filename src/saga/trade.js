import { call, put, take, select, flush, delay,takeEvery,race,cancelled  } from "redux-saga/effects";
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

function createSocketChannel(socket, codes) {
    return eventChannel(emit => {
        socket.onopen = ()=> {
            console.log('connect to upbit ticker');

            socket.send(
                JSON.stringify([
                    {ticket:'rernarodo'},
                    {type:'ticker', codes}
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

        socket.onclose = () => {
            console.log('disconnect upbit ticker');
        }

        return ()=>{
            socket.close();
        }


    },buffers.expanding(500))
}

export function* handleSocketTicker(codes) {
    let socket;
    let socketChannel;

    try {
         socket = yield call(createSocket);
         socketChannel = yield call(createSocketChannel, socket, codes);

        while(true) {
            const datas = yield flush(socketChannel);

            if(datas.length) {
                const latestObj = {};

                datas.forEach(data=>{
                    const {code} = data;

                    if(latestObj[code]) {
                        latestObj[code] = latestObj[code].timestamp > data.timestamp ?
                        latestObj[code] : data;
                    } else {
                        latestObj[code] = data;
                    }
                })

                console.log('original datas', datas);
                console.log('latest', latestObj);

                yield put({type:'trade/setTicker', payload:{ticker:latestObj}});
            }
            yield delay(300);
        }
    } catch(e) {
        console.log('handlesocketticker eror',e)
    } finally {
        socketChannel.close();
    }

    // const socket = yield call(createSocket);
    // const socketChannel = yield call(createSocketChannel, socket);
    //
    // while(true) {
    //     try {
    //         const datas = yield flush(socketChannel);
    //
    //         if(datas.length) {
    //             console.log(datas)
    //             yield put({type:'trade/setTicker', payload:datas});
    //         }
    //         yield delay(2000);
    //
    //     } catch(error) {
    //         console.log('watchOnPings socket error: ',error);
    //         socketChannel.close();
    //     }
    // }


}

export function* watchOnPings(action) {
    console.log('watchOnPings action',action)
        yield race({
            task: call(handleSocketTicker, action.payload.codes),
            cancel: take('trade/closeTicker')
        })
}