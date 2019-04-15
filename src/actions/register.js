import axios from 'axios'
import {register as registerEndpoint} from 'endpoints'

export default (registerData) => async dispatch => {
  dispatch({
    type: 'REGISTER_REQUEST',
  })
  try {
    await axios.post(registerEndpoint, registerData)
    dispatch({ type: 'REGISTER_SUCCESS' })
  } catch (err) {
    dispatch({ type: 'REGISTER_ERROR', payload: {error: err.response.data} })
  }
}
