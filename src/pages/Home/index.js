import React, { Component, Fragment } from "react"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
class Home extends Component {
  render() {
    if (this.props.userAuthenticated) {
      return <Redirect to="/dashboard" />
    }
    return (
      <Fragment>
        <div className="container">
          <div className="title-header">
            <h1>Quiz App</h1>
          </div>
          <div className="div">
            <p>Quiz App is an application developed for the 2019 Honours Project of Dimitar Mirchev</p>
            <p>
              This application was created in order to test whether Progressive Web Applications can be
              used in order to produce an application that immitates a native mobile application experience.
            </p>
          </div>
          <div className="controls separated">
            <Link to="/register" className="button button-success">Register</Link>
            <Link to="/login" className="button button-primary">Login</Link>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    userAuthenticated: state.authentication.loggedIn
  }
}

export default connect(mapStateToProps)(Home)
