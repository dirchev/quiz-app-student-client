import React, { Component, Fragment } from "react"
import Navigation from "components/Navigation";
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
    return groupBy(this.props.quizEngagements.filter(({marked}) => marked), (item) => {
      return format(item.startedAt, 'DD MMM YYYY')
    })
  }

  render() {
    let navTitle = (
      <span>
        Quiz Attempts: <strong>{this.props.quiz.name}</strong>
      </span>
    )
    let groupedQuizEngagements = this.getQuizEnagagementsGrouped()
    return (
      <Fragment>
        <Navigation leftBackTo={`/quiz/${this.props.quiz._id}`} title={navTitle} />
        <div className="quiz-engagements">
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
      </Fragment>
    )
  }
}

let mapStateToProps = (state, props) => {
  let quizId = props.match.params.quizId
  let quiz = state.entities.quizess[quizId]
  return {
    loading: state.loading.QUIZ_ENGAGEMENT_LIST,
    error: state.error.QUIZ_ENGAGEMENT_LIST,
    success: state.success.QUIZ_ENGAGEMENT_LIST,
    quiz: {
      ...quiz,
      questions: (quiz.questions || []).map(_id => state.entities.questions[_id])
    },
    quizEngagements: (quiz.quizEngagements || []).map((id) => state.entities.quizEngagements[id])
  }
}

let mapDispatchToProps = (dispatch, props) => {
  let quizId = props.match.params.quizId
  return {
    getQuizEngagements: () => dispatch(listQuizEngagements({quizId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEngagements)
