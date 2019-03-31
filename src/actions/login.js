import axios from 'axios'
import {login as loginEndpoint} from 'endpoints'

export default (registerData) => async dispatch => {
  dispatch({
    type: 'LOGIN_START',
  })
  try {
    let {data} = await axios.post(loginEndpoint, registerData)
    axios.defaults.headers.common['authtoken'] = data.token
    dispatch({ type: 'LOGIN_SUCCESS', payload: data })
    dispatch({
      type: 'SET_USER_TEST_PROGRESS',
      payload: { key: 'LoginComplete' }
    })
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: {error: err.response.data} })
  }
}
