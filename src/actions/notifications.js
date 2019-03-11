import uuid from 'uuid'

export let dismissNotification = ({notificationId}) => async dispatch => {
  dispatch({
    type: 'DISMISS_NOTIFICATION',
    payload: {notificationId}
  })
}
export let addNotification = ({notification}) => async dispatch => {
  dispatch({
    type: 'ADD_NOTIFICATION',
    payload: {
      notification: {
        _id: uuid.v4(), // add id in case one is not set
        ...notification
      }
    }
  })
}
