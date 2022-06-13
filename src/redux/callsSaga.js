import { call, put, takeEvery } from 'redux-saga/effects'
import { callsInitAC } from './actionCreators/callsAC'

const fetchCalls = async ({ params }) => {
  const response = await fetch(`https://api.skilla.ru/mango/getList?${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
    }
  })
  const calls = await response.json()
  return calls
}

function* getCallsFetch(action) {
  const calls = yield call(fetchCalls, { params: action.payload })
  yield put(callsInitAC(calls))
}
export function* callsSaga() {
  yield takeEvery('GET_CALLS_FETCH', getCallsFetch);
}

export default callsSaga;
