import React, { Component } from "react"
import { connect } from "react-redux"
import { dismissNotification } from "actions/notifications"

class NotificationsManager extends Component {
  render () {
    let notificationsRendered = this.props.notifications.map((notification) => {
      if (notification.type === 'newVersion') {
        return (
          <div key={notification._id} className="notification notification-primary">
            <div className="notification-title">New version available!</div>
            <p className="notification-text">New version of the app is available. Click the button below to refresh the app.</p>
            <div className="controls">
              <button onClick={() => window.location.reload(false)} className="button button-notification">Refresh</button>
            </div>
          </div>
        )
      }
      return null
    })
    return (
      <div className="notifications">
        {notificationsRendered}
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    notifications: Object.keys(state.notifications).map(notificationId => state.notifications[notificationId])
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    dismissNotification: (notificationId) => {
      dispatch(dismissNotification({notificationId}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsManager)
