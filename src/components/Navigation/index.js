import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import logout from "actions/logout";

class Navigation extends Component {
  constructor () {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout (e) {
    e.preventDefault()
    this.props.logoutUser()
  }
  render() {
    return (
      <div className="navbar navbar-primary">
        {
          this.props.leftBackTo
            ? (
              <div className="left back">
                <Link to={this.props.leftBackTo} className="button button-small button-outline">
                  &lt;
              </Link>
              </div>
            )
            : <div className="left" />
        }
        <div className="center">
          {
            this.props.title
              ? this.props.title
              : (
                <span>
                  Quiz App: <strong>{this.props.quizApp.name}</strong>
                </span>
              )
          }
        </div>
        <div className="right logout">
            <button onClick={this.handleLogout} className="button button-small button-outline">
              logout
          </button>
          </div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    quizApp: state.quizApp
  }
}
const mapDispatchToProps = function (dispatch, { history }) {
  return {
    logoutUser: () => {
      dispatch(logout({history}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
