import { dropAT } from '../actionTypes/dropAT'

export const dropInitAC = (payload) => {
  return {
    type: dropAT.INIT_DROP,
    payload
  }
}
