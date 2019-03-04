import React, { Component } from "react"
import MultilineText from "components/MultilineText";

class FreeLongText extends Component {
  render() {
    return (
      <div className="answer">
        <div className="answer-item">
          <div className="label">Mark</div>
          <p>
            {this.props.answerMark || 'N/A'} / {this.props.question.points}
          </p>
        </div>
        <div className="answer-item">
          <div className="label">Answer Given</div>
          {
            this.props.answerGiven
            ? (
              <MultilineText text={this.props.answerGiven} />
            )
            : (
              <div className="alert alert-blue">No answer given</div>
            )
          }
        </div>
        <div className="answer-item">
          <div className="label">Feedback</div>
          {
            this.props.answerFeedback
            ? (
              <MultilineText text={this.props.answerFeedback} />
            )
            : (
              <div className="alert alert-blue">No feedback provided</div>
            )
          }
        </div>
      </div>
    )
  }
}

export default FreeLongText
