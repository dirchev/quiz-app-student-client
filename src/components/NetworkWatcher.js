import React, { Component } from "react"
import { connect } from "react-redux"
import { watch, check } from "is-offline"
import { setVar } from 'actions/global'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

class NetworkWatcher extends Component {
  componentWillMount () {
    check().then(this.props.setOfflineStatus)
    this.unwatch = watch(this.props.setOfflineStatus)
  }
  componentWillUnmount () {
    this.unwatch()
  }
  render() {
    if (!this.props.isOffline) return null
    return (
      <div className="offline-message">
        <span>You are offline!</span>&nbsp;
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    isOffline: state.global.isOffline
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    setOfflineStatus: (isOffline) => {
      dispatch(setVar({
        key: 'isOffline',
        value: isOffline
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkWatcher)
