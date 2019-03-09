import { omit } from 'lodash'
const DEFAULT_STATE = {
  isOffline: true
}
const globalReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_GLOBAL_VAR':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    case 'DEL_GLOBAL_VAR':
      return omit(state, action.payload.key)
    default:
      return state
  }
}

export default globalReducer
