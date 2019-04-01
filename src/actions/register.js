import axios from 'axios'
import {register as registerEndpoint} from 'endpoints'
import { setUserTestProgress } from './userTest';

export default (registerData) => async dispatch => {
  dispatch({
    type: 'REGISTER_REQUEST',
  })
  try {
    await axios.post(registerEndpoint, registerData)
    dispatch({ type: 'REGISTER_SUCCESS' })
    dispatch(setUserTestProgress('RegistrationComplete'))
  } catch (err) {
    dispatch({ type: 'REGISTER_ERROR', payload: {error: err.response.data} })
  }
}
