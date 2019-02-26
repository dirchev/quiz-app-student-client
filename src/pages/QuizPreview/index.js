import React, { Component } from "react"
import { connect } from "react-redux";
import { prepareQuiz } from 'actions/quiz'
import QuizEngagements from './QuizEngagements'
import QuizActions from "./QuizActions";
import QuizDetails from "./QuizDetails";
import './index.scss'


class QuizPreview extends Component {
  componentWillMount () {
    this.props.prepareQuiz()
  }

  render() {
    return (
      <div className="quiz-preview">
        <div className="quiz-details">
          <div className="box">
            <QuizDetails quiz={this.props.quiz} />
            <QuizActions quiz={this.props.quiz} />
          </div>
        </div>
        <QuizEngagements quiz={this.props.quiz} />
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  let quizId = props.match.params.quizId
  return {
    loading: state.loading.QUIZ_PREPARE,
    error: state.error.QUIZ_PREPARE,
    quiz: state.entities.quizess[quizId]
  }
}

let mapDispatchToProps = (dispatch, props) => {
  let quizId = props.match.params.quizId
  return {
    prepareQuiz: () => dispatch(prepareQuiz({quizId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizPreview)
