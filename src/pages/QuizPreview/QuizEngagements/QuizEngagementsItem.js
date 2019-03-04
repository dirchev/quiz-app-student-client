import React, { Component } from "react"
import { format, differenceInMilliseconds } from "date-fns";
import { Link } from 'react-router-dom'
import prettyMs from 'pretty-ms'

class QuizEngagementsItem extends Component {
  render() {
    let quizEngagement = this.props.quizEngagement
    if (!quizEngagement.finished) {
      return (
        <div className="item">
          <div className="text">
            <span className="badge badge-warning">Not finished quiz</span> <br/><br/>
            Started at {format(quizEngagement.startedAt, 'HH:mm')}. <br/>
          </div>
          <div className="actions">
            <Link to={`/quiz/${quizEngagement.quiz}/engage/${quizEngagement._id}`} className="button button-small button-primary">Resume Quiz</Link>
          </div>
        </div>
      )
    }
    let timeElapsedInMilliseconds = differenceInMilliseconds(quizEngagement.finishedAt, quizEngagement.startedAt)
    return (
      <div className="item">
        <div className="text">
          Finished at {format(quizEngagement.finishedAt, 'HH:mm')}. <br/>
          Time elapsed: {prettyMs(timeElapsedInMilliseconds)}. <br/>
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
                to={`/quiz/${this.props.quiz._id}/feedback/${quizEngagement._id}`}
                className="button button-small button-success">
                View Feedback
              </Link>
            )
            : null
          }
        </div>
      </div>
    )
  }
}

export default QuizEngagementsItem
