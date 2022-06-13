import { combineReducers } from "redux";
import { callsReducer } from './callsReducer.js'
import { paramsReducer } from './paramsReducer.js'
import { dropReducer } from './dropReducer.js'

export const rootReducer = combineReducers({
  callsReducer, paramsReducer, dropReducer,
})
