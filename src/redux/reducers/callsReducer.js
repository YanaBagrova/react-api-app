import { callsAT } from '../actionTypes/callsAT';

const callsInitialState = {
  calls: []
}

export const callsReducer = (state = callsInitialState, action) => {

  switch (action.type) {
    case callsAT.INIT_CALLS:
      const calls = action.payload.results
      return { ...state, calls: calls };

    default:
      return state
  }

}
