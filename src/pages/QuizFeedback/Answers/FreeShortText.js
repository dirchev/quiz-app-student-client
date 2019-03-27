import React, { Component } from "react"
import MultilineText from "components/MultilineText";

class FreeShortText extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onAnswerChange(e.target.value)
  }

  render() {
    return (
      <div className="answer">
        <div className="answer-item">
          <div className="label">Mark</div>
          <p>
            {isNaN(this.props.answerMark) ? 'N/A' : this.props.answerMark} / {this.props.question.points}
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
          <div className="label">Correct Answer</div>
          <p>{ this.props.question.answers.correctAnswer }</p>
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

export default FreeShortText
