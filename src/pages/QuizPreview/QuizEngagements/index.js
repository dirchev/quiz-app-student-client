import React, { Component } from "react"
import { connect } from "react-redux";
import { listQuizEngagements } from 'actions/quizEngagement'
import { format } from "date-fns";
import { groupBy } from 'lodash'
import QuizEngagementsItem from "./QuizEngagementsItem";

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
      <div className="quiz-engagements">
        <h2 className="quiz-engagements-title">Previous Attempts</h2>
        <div className="quiz-engagements-list">
        {
          Object.keys(groupedQuizEngagements).map((groupId) => {
            return (
              <div className="quiz-engagements-list-group" key={groupId}>
                <div className="date">{groupId}</div>
                <div className="items">
                  {
                    groupedQuizEngagements[groupId].map((quizEngagement) => {
                      return <QuizEngagementsItem key={quizEngagement._id} quiz={this.props.quiz} quizEngagement={quizEngagement} />
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
  return {
    loading: state.loading.QUIZ_ENGAGEMENT_LIST,
    error: state.error.QUIZ_ENGAGEMENT_LIST,
    success: state.success.QUIZ_ENGAGEMENT_LIST,
    quiz: props.quiz,
    quizEngagements: (props.quiz.quizEngagements || []).map((id) => state.entities.quizEngagements[id])
  }
}

let mapDispatchToProps = (dispatch, props) => {
  let quizId = props.quiz._id
  return {
    getQuizEngagements: () => dispatch(listQuizEngagements({quizId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEngagements)
