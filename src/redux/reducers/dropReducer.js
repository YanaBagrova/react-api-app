import { dropAT } from '../actionTypes/dropAT';

const dropInitialState = {
  drop: false
}

export const dropReducer = (state = dropInitialState, action) => {

  switch (action.type) {
    case dropAT.INIT_DROP:
      const drop = action.payload
      return { ...state, drop: drop };

    default:
      return state
  }

}
