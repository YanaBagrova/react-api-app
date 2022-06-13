import { paramsAT } from '../actionTypes/paramsAT'

export const paramsInitAC = (payload) => {
  return {
    type: paramsAT.INIT_PARAMS,
    payload
  }
}

export const paramsAddAC = (payload) => {
  return {
    type: paramsAT.ADD_PARAMS,
    payload
  }
}
