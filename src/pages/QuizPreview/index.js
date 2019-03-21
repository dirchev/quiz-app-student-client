import React, { Component, Fragment } from "react"
import Navigation from "components/Navigation";
import { connect } from "react-redux";
import { prepareQuiz, retrieveQuiz } from 'actions/quiz'
import QuizActions from "./QuizActions";
import QuizDetails from "./QuizDetails";
import './index.scss'
import { listQuizEngagements } from "../../actions/quizEngagement";


class QuizPreview extends Component {
  componentWillMount () {
    if (this.props.quiz.marksReleased) {
      this.props.retrieveQuiz()
      this.props.getQuizEngagements()
    } else {
      this.props.prepareQuiz()
    }
  }

  render() {
    let navTitle = (
      <span>
        Quiz: <strong>{this.props.quiz.name}</strong>
      </span>
    )
    return (
      <Fragment>
        <Navigation leftBackTo="/dashboard" title={navTitle}/>
        <div className="quiz-preview-container">
          <QuizDetails quiz={this.props.quiz} />
          <QuizActions quiz={this.props.quiz} />
        </div>
      </Fragment>
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
    prepareQuiz: () => dispatch(prepareQuiz({quizId})),
    retrieveQuiz: () => dispatch(retrieveQuiz({quizId})),
    getQuizEngagements: () => dispatch(listQuizEngagements({quizId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizPreview)
