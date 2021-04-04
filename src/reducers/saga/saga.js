import {  call, put, all, takeLatest } from 'redux-saga/effects'
import ApiServices from '../../api/ApiServices'


export const delay = (ms) => new Promise(res => setTimeout(res, ms)) 

export function* addToCounterAsync(){
    yield delay(1000)
    yield ApiServices.getAsyncInfoWithFetchPost()
    yield ApiServices.getAysncInfoWithPost()
    yield ApiServices.getPromiseAsync()
    yield put({type:'ADD_TO_COUNTER'})
}

function* watchAddToCounterAsync(){
    yield takeLatest('ADD_TO_COUNTER_ASYNC',addToCounterAsync)
}

export default function* rootSaga(){
    yield all([
        watchAddToCounterAsync(),
    ])
}
