import React, { Component } from "react"
import { format, differenceInSeconds } from "date-fns";
import { Link } from 'react-router-dom'

class QuizEngagementsItem extends Component {
  render() {
    let quizEngagement = this.props.quizEngagement
    let timeElapsedInSeconds = differenceInSeconds(quizEngagement.finishedAt, quizEngagement.startedAt)
    let timeElapsedString = [
      Math.round(timeElapsedInSeconds / 60),
      timeElapsedInSeconds % 60
    ].join(':')
    return (
      <div className="item" key={quizEngagement._id}>
        <div className="text">
          Finished at {format(quizEngagement.finishedAt, 'HH:mm')}. <br/>
          Time elapsed {timeElapsedString} minutes. <br/>
          {
            quizEngagement.marked
            ? 'Marked'
            : 'Not marked'
          }
        </div>
        <div className="actions">
        {
            quizEngagement.marked
            ? (
              <Link
                to={`/quiz/${this.props.quiz._id}/engagement/${quizEngagement._id}/feedback`}
                className="button button-small button-success">
                View Feedback
              </Link>
            )
            : null
          }
          <Link
            to={`/quiz/${this.props.quiz._id}/engagement/${quizEngagement._id}`}
            className="button button-small button-primary">
            View Attempt
          </Link>
        </div>
      </div>
    )
  }
}

export default QuizEngagementsItem
