import { callsAT } from '../actionTypes/callsAT'

export const callsInitAC = (payload) => {
  return {
    type: callsAT.INIT_CALLS,
    payload
  }
}

export const getCallsFetchAC = (payload) => {
  return {
    type: callsAT.GET_CALLS_FETCH,
    payload
  }
}
