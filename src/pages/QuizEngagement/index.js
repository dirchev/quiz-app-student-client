import React, { Component } from "react"
import { connect } from "react-redux";
import { format } from "date-fns";

class QuizEngagement extends Component {
  render() {
    return (
      <div className="container">
        <h1>
          Quiz Attempt <br/>
          <small>{format(this.props.quizEngagement.startedAt, "[on] DD MMM YYYY [at] HH:mm")}</small>
        </h1>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  let quizEngagementId = props.match.params.quizEngagementId
  return {
    quizEngagement: state.entities.quizEngagements[quizEngagementId]
  }
}

export default connect(mapStateToProps)(QuizEngagement)
