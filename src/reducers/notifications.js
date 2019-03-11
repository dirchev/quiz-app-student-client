import { omit } from 'lodash'
const DEFAULT_STATE = {}
const notificationsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        [action.payload.notification._id]: action.payload.notification
      }
    case 'DISMISS_NOTIFICATION':
      return omit(state, action.payload.notificationId)
    default:
      return state
  }
}

export default notificationsReducer
