import React, { Component } from "react"
import { connect } from "react-redux";
import { format } from "date-fns";
import { retrieveQuizEngagement } from "actions/quizEngagement"
import { retrieveQuiz } from "actions/quiz"
import QuizFeedbackQuestion from "./Question";

class QuizFeedback extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questionIndex: 0,
      requestedFetch: false
    }
  }

  componentDidMount () {
    this.props.retrieveQuizEngagementAndQuiz()
    this.setState({requestedFetch: true})
  }

  handleQuestionIndexChange (questionIndex) {
    return (event) => {
      event.preventDefault()
      if (questionIndex < 0 || questionIndex > (this.props.questions.length - 1)) return
      this.setState({questionIndex})
    }
  }

  render() {
    if (!this.state.requestedFetch || !this.props.loaded) {
      return (
        <span>Loading...</span>
      )
    }
    let question = this.props.questions[this.state.questionIndex]
    let answerGiven = this.props.quizEngagement.answersGiven[question._id]
    let answerMark = this.props.quizEngagement.answersMarks[question._id]
    let answerFeedback = this.props.quizEngagement.answersFeedbacks[question._id]
    return (
      <div className="container">
        <h1>
          Quiz Feedback <br/>
          <small>{format(this.props.quizEngagement.startedAt, "[on] DD MMM YYYY [at] HH:mm")}</small>
        </h1>

        <div className="quiz feedback">
          <h1 className="title">{this.props.quiz.name}</h1>
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
          <QuizFeedbackQuestion
            question={question}
            answerFeedback={answerFeedback}
            answerGiven={answerGiven}
            answerMark={answerMark}
          />
          <div className="controls separated">
            <div className="controls">
              <button
                className="button button-dark button-outline button-small"
                onClick={this.handleQuestionIndexChange(this.state.questionIndex - 1)}
                >
                Previous
              </button>
              <button
                className="button button-dark button-outline button-small"
                onClick={this.handleQuestionIndexChange(this.state.questionIndex + 1)}
                >
                Next
              </button>
            </div>
            <div className="controls">
              <button className="button button-danger button-small" onClick={this.handleFinishQuizEngagement}>Exit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  let quizId = props.match.params.quizId
  let quizEngagementId = props.match.params.quizEngagementId
  return {
    loaded: state.success.QUIZ_RETRIEVE && state.success.QUIZ_ENGAGEMENT_RETRIEVE,
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
