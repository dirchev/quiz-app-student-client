import React, { Component } from "react"
import { connect } from "react-redux"

class Navigation extends Component {
  render() {
    return (
      <div className="navbar navbar-primary">
        <div className="center">
          {this.props.quizApp.name}
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

export default connect(mapStateToProps)(Navigation)
