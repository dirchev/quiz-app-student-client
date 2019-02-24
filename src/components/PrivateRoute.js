import React from "react";
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from "react-redux"

function PrivateRoute ({ component: Component, loggedIn, ...restProps }) {
  let renderFunc = (props) => {
    if (!loggedIn) return <Redirect to="/login" />
    return <Component {...props} />
  }
  return (
    <Route
      {...restProps}
      loggedIn={loggedIn}
      render={renderFunc}
    />
  )
}

let mapStateToProps = (state) => {
  return {
    loggedIn: state.authentication.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
