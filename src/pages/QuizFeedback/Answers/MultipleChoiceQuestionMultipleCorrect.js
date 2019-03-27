import React, { Component } from "react"
import MultilineText from "components/MultilineText";

class MultipleChoiceQuestionMultipleCorrect extends Component {
  getAnswerGivenText () {
    return this.props.question.answers.options.filter((answer) => {
      return this.props.answerGiven.indexOf(answer._id)
    }).map(({text}) => text)
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
            this.props.answerGiven && this.props.answerGiven.length
            ? (
              <ul>
              {
                this.getAnswerGivenText().map((answer, index) => {
                  return <li key={index}>{answer}</li>
                })
              }
              </ul>
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
                  <li className={`${answer.isCorrect ? 'correct': 'incorrect'}`} key={answer._id}>{answer.text}</li>
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

export default MultipleChoiceQuestionMultipleCorrect
