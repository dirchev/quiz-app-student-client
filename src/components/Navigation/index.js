import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class Navigation extends Component {
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
    navigateBack: () => {
      history.goBack()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
