import { takeEvery, takeLatest } from 'redux-saga'
import { put } from 'redux-saga/effects'

export function* helloSaga() {
    console.log('Hello Sagas!');
}

// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsync() {
    yield delay(1000);
    console.log('saga....');
    yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
    // yield* takeEvery('INCREMENT_ASYNC', incrementAsync)
    yield* takeLatest('INCREMENT_ASYNC', incrementAsync)
    /*
     * 这里值得注意的是，
     * takeEvery 是处理每一个任务，依次处理
     * takeLatest 是只处理最后一个任务，其他任务完全拒绝
     * 一个很复杂的事情在这里变得非常简单
     * 让我觉得，这个saga是一种融合了redux-trunk和RxJS思想的一种内容
     * */
}
