import React, { Component } from "react"
import MultilineText from "components/MultilineText";

class MultipleChoiceQuestionOneCorrect extends Component {
  getAnswerGivenText () {
    for (let answer of this.props.question.answers.options) {
      if (this.props.answerGiven === answer._id) {
        return answer.text
      }
    }
  }

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
              <MultilineText text={this.getAnswerGivenText()} />
            )
            :  <div className="alert alert-blue">No answer given</div>
          }
        </div>
        <div className="answer-item">
          <div className="label">Answers</div>
          <ul>
            {
              this.props.question.answers.options.map((answer, index) => {
                return (
                  <li className={`${answer._id === this.props.question.answers.correctId ? 'correct' : 'incorrect'}`} key={answer._id}>{answer.text}</li>
                )
              })
            }
          </ul>
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

MultipleChoiceQuestionOneCorrect.defaultProps = {
  answer: null
}

export default MultipleChoiceQuestionOneCorrect
