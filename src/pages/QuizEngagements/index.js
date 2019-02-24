import React, { Component } from "react"
import { connect } from "react-redux";
import { listQuizEngagements } from 'actions/quizEngagement'
import { format, differenceInSeconds } from "date-fns";
import { Link } from 'react-router-dom'
import { groupBy } from 'lodash'

class QuizEngagements extends Component {
  componentWillMount () {
    this.props.getQuizEngagements()
  }

  getQuizEnagagementsGrouped () {
    return groupBy(this.props.quizEngagements, (item) => {
      return format(item.startedAt, 'DD MMM YYYY')
    })
  }

  render() {
    let groupedQuizEngagements = this.getQuizEnagagementsGrouped()
    return (
      <div className="container">
        <h1>Quiz Attempts</h1>
        <div className="quiz-engagements-list">
        {
          Object.keys(groupedQuizEngagements).map((groupId) => {
            return (
              <div className="quiz-engagements-list-group" key={groupId}>
                <div className="date">{groupId}</div>
                <div className="items">
                  {
                    groupedQuizEngagements[groupId].map((quizEngagement) => {
                      let timeElapsedInSeconds = differenceInSeconds(quizEngagement.finishedAt, quizEngagement.startedAt)
                      let timeElapsedString = [
                        Math.round(timeElapsedInSeconds / 60),
                        timeElapsedInSeconds % 60
                      ].join(':')
                      return (
                        <div className="item" key={quizEngagement._id}>
                          <div className="text">
                            Finished at {format(quizEngagement.finishedAt, 'HH:mm')}. <br/>
                            Time elapsed {timeElapsedString} minutes.
                          </div>
                          <div className="actions">
                            <Link
                              to={`/quiz/${this.props.quiz._id}/engagement/${quizEngagement._id}`}
                              className="button button-small button-primary">
                              View Attempt
                            </Link>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  let quizId = props.match.params.quizId
  return {
    loading: state.loading.QUIZ_ENGAGEMENT_LIST,
    error: state.error.QUIZ_ENGAGEMENT_LIST,
    success: state.success.QUIZ_ENGAGEMENT_LIST,
    quiz: state.entities.quizess[quizId],
    quizEngagements: (state.entities.quizess[quizId].quizEngagements || []).map((id) => state.entities.quizEngagements[id])
  }
}

let mapDispatchToProps = (dispatch, props) => {
  let quizId = props.match.params.quizId
  return {
    getQuizEngagements: () => dispatch(listQuizEngagements({quizId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEngagements)
