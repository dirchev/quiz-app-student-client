const DEFAULT_STATE = {
  token: null,
  loggedIn: false,
  user: null
}
const authentication = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loggedIn: true,
      }
    default:
      return state
  }
}

export default authentication
