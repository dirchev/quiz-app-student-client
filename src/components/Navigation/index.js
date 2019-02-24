import React, { Component } from "react"
import { connect } from "react-redux"

class Navigation extends Component {
  render() {
    return (
      <div className="navbar navbar-primary">
        <div className="left logo">
          <button onClick={this.props.navigateBack} className="button button-small button-outline">
          &lt;
          </button>
        </div>
        <div className="center">
          {this.props.quizApp.name}
        </div>
        <div className="right"></div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    quizApp: state.quizApp
  }
}
const mapDispatchToProps = function (state, {history}) {
  return {
    navigateBack: () => {
      history.goBack()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
