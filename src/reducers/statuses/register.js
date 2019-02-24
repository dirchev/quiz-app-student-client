const DEFAULT_STATE = {
  error: null,
  loading: false,
  success: false
}
const register = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        error: null,
        loading: false,
        success: true
      }
    case 'REGISTER_ERROR':
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

export default register
