import React, { Component } from "react"
import { format, differenceInMilliseconds } from "date-fns";
import { Link } from 'react-router-dom'
import prettyMs from 'pretty-ms'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

class QuizEngagementsItemSimple extends Component {
  render() {
    let quizEngagement = this.props.quizEngagement
    return (
      <div className="item">
        <div className="grade">
          Not Graded Attempt
        </div>
        <div className="stats">
          {
            this.getStats().map(statsItem => {
              return (
                <div key={statsItem.name} className="stats-item">
                  <div className="name">{statsItem.name}</div>
                  <div className="value">
                    {statsItem.value}
                  </div>
                </div>
              )
            })
          }
          {
            quizEngagement.__meta.startedOffline && !quizEngagement.__meta.synced
            ? (
              <div className="stats-item">
                <div className="name">
                  <span className="icon icon-red"><FontAwesomeIcon icon={faExclamationTriangle} /></span>
                </div>
                <div className="value">
                  This attempt will be synced when you are back online.
                </div>
              </div>
            ) : null
          }
        </div>
        {
          !quizEngagement.finished
            ? (
              <div className="controls">
                <Link to={`/quiz/${quizEngagement.quiz}/engage/${quizEngagement._id}`} className="button button-small button-primary">Resume Quiz</Link>
              </div>
            ) : null
        }
      </div>
    )
  }

  getStats() {
    let quiz = this.props.quiz
    let quizEngagement = this.props.quizEngagement
    let stats = []
    stats.push({
      name: 'Started At',
      value: format(quizEngagement.startedAt, 'Do MMMM YYYY HH:mm')
    })
    if (quizEngagement.finished) {
      stats.push({
        name: 'Finished At',
        value: format(quizEngagement.finishedAt, 'Do MMMM YYYY HH:mm')
      })
      stats.push({
        name: 'Time Elapsed',
        value: prettyMs(differenceInMilliseconds(quizEngagement.finishedAt, quizEngagement.startedAt))
      })
    } else if (quiz.timeLimit) {
      let timePassedMs = differenceInMilliseconds(new Date(), quizEngagement.startedAt)
      let timeLimitMs = quiz.timeLimit * 1000 * 60
      let timeLeftMs = Math.floor((timeLimitMs - timePassedMs) / 1000) * 1000
      stats.push({
        name: 'Time Left',
        value: prettyMs(timeLeftMs)
      })
    }

    return stats
  }
}

export default QuizEngagementsItemSimple
