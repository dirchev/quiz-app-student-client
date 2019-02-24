import { combineReducers } from 'redux'
import registerReducer from './register'
import loginReducer from './login'

export default combineReducers({
  register: registerReducer,
  login: loginReducer,
})
