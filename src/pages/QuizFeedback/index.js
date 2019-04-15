import React, { Component, Fragment } from "react"
import { connect } from "react-redux";
import { retrieveQuizEngagement } from "actions/quizEngagement"
import { retrieveQuiz } from "actions/quiz"
import QuizFeedbackQuestion from "./Question";
import Navigation from 'components/Navigation'
import Swipeable from "../../components/Swipeable";

class QuizFeedback extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questionIndex: 0
    }
    this.changeQuestionIndex = this.changeQuestionIndex.bind(this)
  }

  handleQuestionIndexChange (questionIndex) {
    return (event) => {
      event.preventDefault()
      this.changeQuestionIndex(questionIndex)
    }
  }

  changeQuestionIndex (questionIndex) {
    if (questionIndex < 0 || questionIndex > (this.props.questions.length - 1)) return
    this.setState({questionIndex})
  }

  render() {
    let navTitle = (
      <span>
        Quiz Feedback: <strong>{this.props.quiz.name}</strong>
      </span>
    )
    return (
      <Fragment>
        <Navigation leftBackTo={`/quiz/${this.props.quiz._id}/engagements`} title={navTitle} />
        <div className="quiz feedback">
          <div className="info">
            <div className="progress">
              {
                this.props.questions.map((question, index) => {
                  let isActive = this.state.questionIndex === index
                  return (
                    <button
                      key={index}
                      className={`item button button-small button-blue ${isActive ? '' : 'button-outline '}`}
                      onClick={this.handleQuestionIndexChange(index)}
                      >
                      {index + 1}
                    </button>
                  )
                })
              }
            </div>
          </div>
          <Swipeable
            className="questions"
            selectedChildIndex={this.state.questionIndex}
            onSelectedChildIndexChange={this.changeQuestionIndex}
            >
          {
              this.props.questions.map((question) => {
                let answerGiven = this.props.quizEngagement.answersGiven[question._id]
                let answerMark = this.props.quizEngagement.answersMarks[question._id]
                let answerFeedback = this.props.quizEngagement.answersFeedbacks[question._id]
                return (
                  <QuizFeedbackQuestion
                    key={question._id}
                    question={question}
                    answerFeedback={answerFeedback}
                    answerGiven={answerGiven}
                    answerMark={answerMark}
                  />
                )
              })
            }
          </Swipeable>
        </div>
      </Fragment>
    )
  }
}

let mapStateToProps = (state, props) => {
  let quizId = props.match.params.quizId
  let quizEngagementId = props.match.params.quizEngagementId
  return {
    quiz: state.entities.quizess[quizId],
    questions: (state.entities.quizess[quizId].questions || []).map((_id) => state.entities.questions[_id]),
    quizEngagement: {
      ...state.entities.quizEngagements[quizEngagementId],
      answersGiven: state.entities.quizEngagements[quizEngagementId].answersGiven || {},
      answersMarks: state.entities.quizEngagements[quizEngagementId].answersMarks || {},
      answersFeedbacks: state.entities.quizEngagements[quizEngagementId].answersFeedbacks || {},
    }
  }
}

let mapDispatchToProps = (dispatch, props) => {
  let quizId = props.match.params.quizId
  let quizEngagementId = props.match.params.quizEngagementId
  return {
    retrieveQuizEngagementAndQuiz: () => {
      dispatch(retrieveQuiz({quizId}))
      dispatch(retrieveQuizEngagement({quizId, quizEngagementId}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizFeedback)
