import React, { Component } from "react"
import MultilineText from "../../components/MultilineText";

class QuizDetails extends Component {
  render() {
    return (
      <div className="quiz-details">
        <div className="quiz-details-item-description">
          <div className="content">
            <MultilineText text={this.props.quiz.description} />
          </div>
        </div>
        {
          this.props.quiz.isMandatory
          ? (
            <div className="quiz-details-item">
              <div className="label">Mandatory</div>
              <div className="content">
                This quiz is mandatory
              </div>
            </div>
          )
          : (
            <div className="quiz-details-item">
              <div className="label">Optional</div>
              <div className="content">
                This quiz is optional
              </div>
            </div>
          )
        }
        <div className="quiz-details-item">
          <div className="label">Number of Attempts</div>
          <div className="content">
            This quiz can be attempted {this.props.quiz.noOfAttempts || 'unlimited'} times.
          </div>
        </div>
        <div className="quiz-details-item">
          <div className="label">Time Limit</div>
          <div className="content">
            {
              this.props.quiz.timeLimit
              ? `The time limit for this quiz is ${this.props.quiz.timeLimit} minutes.`
              : `There is no time limit.`
            }
          </div>
        </div>
      </div>
    )
  }
}

export default QuizDetails
