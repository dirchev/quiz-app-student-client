import axios from 'axios'
import { logout as logoutEndpoint } from 'endpoints'

export default ({history}) => async dispatch => {
  dispatch({
    type: 'LOGOUT_START',
  })
  try {
    let {data} = await axios.post(logoutEndpoint, {})
    axios.defaults.headers.common['authtoken'] = null
    dispatch({ type: 'LOGOUT_SUCCESS', payload: data })
  } catch (err) {
    dispatch({ type: 'LOGOUT_ERROR', payload: {error: err.response.data} })
  }
}
