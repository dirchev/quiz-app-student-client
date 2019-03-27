import React, { Component } from "react"
import { connect } from "react-redux"
import { watch, check } from "is-offline"
import { setVar } from 'actions/global'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { hydrateState } from "actions/hydrate";

class NetworkWatcher extends Component {
  constructor () {
    super()
    this.handleOfflineStatusChange = this.handleOfflineStatusChange.bind(this)
  }
  componentWillMount () {
    check().then((result) => {
      this.handleOfflineStatusChange(result, true)
    })
    this.unwatch = watch(this.handleOfflineStatusChange)
  }
  componentWillUnmount () {
    this.unwatch()
  }
  handleOfflineStatusChange (isOffline) {
    this.props.setOfflineStatus(isOffline)
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

const mapDispatchToProps = function (dispatch, props) {
  return {
    setOfflineStatus: (isOffline, isFirstCheck) => {
      dispatch(setVar({
        key: 'isOffline',
        value: isOffline
      }))
      // changed from offline to online
      if (isOffline === false && !isFirstCheck) {
        dispatch(hydrateState())
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkWatcher)
