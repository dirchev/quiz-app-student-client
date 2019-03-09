import React, { Component } from "react"
import { format, differenceInMilliseconds } from "date-fns";
import { Link } from 'react-router-dom'
import prettyMs from 'pretty-ms'

class QuizEngagementsItem extends Component {
  getMarkString () {
    let totalPoints = 0
    let receivedPoints = 0
    this.props.quiz.questions.forEach((question) => {
      let questionId = question._id
      let totalPointsForQuestion = question.points || 0
      let receivedPointsForQuestion = (this.props.quizEngagement.answersMarks || {})[questionId] || 0
      if (!totalPointsForQuestion) return
      totalPoints += totalPointsForQuestion
      receivedPoints += receivedPointsForQuestion
    })
    return `${receivedPoints} / ${totalPoints}`
  }

  render() {
    let quizEngagement = this.props.quizEngagement
    let markString = this.getMarkString()
    return (
      <div className="item">
        <div className="grade">
          {markString}
        </div>
        <div className="stats">
          {
            this.getStats().map(statsItem => {
              return (
                <div className="stats-item">
                  <div className="name">{statsItem.name}</div>
                  <div className="value">
                    {statsItem.value}
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="controls">
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
          {
            ! quizEngagement.finished
            ? (
              <Link to={`/quiz/${quizEngagement.quiz}/engage/${quizEngagement._id}`} className="button button-small button-primary">Resume Quiz</Link>
            ) : null
          }
        </div>
      </div>
    )
  }

  getStats () {
    let quiz = this.props.quiz
    let quizEngagement = this.props.quizEngagement
    let stats = [
      {
        name: 'Marked',
        value: quizEngagement.marked ? 'Yes' : 'No'
      }
    ]
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
    } else {
      let timePassedMs = differenceInMilliseconds(new Date(), quizEngagement.startedAt)
      let timeLimitMs = quiz.timeLimit * 1000 * 60
      let timeLeftMs = Math.floor((timeLimitMs - timePassedMs) / 1000) * 1000
      stats.push({
        name: 'Time Left',
        value: prettyMs(timeLeftMs)
      })
    }
    stats.push({
      name: 'Mark',
      value: quizEngagement.marked
        ? this.getMarkString(quizEngagement)
        : 'Not Marked'
    })

    return stats
  }
}

export default QuizEngagementsItem
