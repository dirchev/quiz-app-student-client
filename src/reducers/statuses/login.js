const DEFAULT_STATE = {
  error: null,
  loading: false,
  success: false
}
const login = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        error: null,
        loading: false,
        success: true
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        success: false
      }
    default:
      return state
  }
}

export default login
