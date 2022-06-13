import { paramsAT } from '../actionTypes/paramsAT';

const paramsInitialState = {
  params: '',
  arr: []
}

export const paramsReducer = (state = paramsInitialState, action) => {

  switch (action.type) {
    case paramsAT.INIT_PARAMS:
      return { ...state, params: action.payload, arr: [] }

    case paramsAT.ADD_PARAMS:
      if (!action.payload.length) {
        if (state.arr.length === 2) {
          const str = state.arr.filter((el) => el.length !== 41)
          return { ...state, params: str[0], arr: [str[0]] }
        } else {
          return { ...state, params: '', arr: [] }
        }
      } else if (!state.arr.length && action.payload.length) {
        return { ...state, params: action.payload, arr: [action.payload] }
      } else if (state.arr.length === 1 && state.params === action.payload) {
        return state
      } else if (state.arr.length === 1 && state.params.length === action.payload.length && state.params !== action.payload) {
        return { ...state, params: action.payload, arr: [action.payload] }
      } else if (state.arr.length === 1 && state.params.length !== action.payload.length) {
        return { ...state, params: `${state.params}&${action.payload}`, arr: [state.params, action.payload] }
      } else if (state.arr.length === 2 && state.arr.find((el) => el.length === action.payload.length)) {
        if (!state.arr.find((el) => el === action.payload)) {
          const newArr = state.arr.map((el) => {
            if (el.length === action.payload.length) {
              el = action.payload
            }
            return el
          })
          return { ...state, params: `${newArr[0]}&${newArr[1]}`, arr: newArr }
        } else if (state.arr.find((el) => el === action.payload)) {
          return state
        }
      } 
      return state //obrabotatj, pochemy '&' ostajetsja

    default:
      return state
  }

}

export default paramsReducer;
