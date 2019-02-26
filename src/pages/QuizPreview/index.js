import React, { Component } from "react"
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { prepareQuiz } from 'actions/quiz'
import MultilineText from "../../components/MultilineText";

class QuizPreview extends Component {
  componentWillMount () {
    this.props.prepareQuiz()
  }

  render() {
    return (
      <div className="container">
        <section>
          <h1>{this.props.quiz.name}</h1>
          <MultilineText text={this.props.quiz.description} />
          <p>
            You have <strong>{this.props.quiz.noOfAttempts}</strong> attempts for this quiz.
            {
              this.props.quiz.isMandatory
              ? (
                <span>The quiz is <strong>mandatory</strong>.</span>
              ) : null
            }
          </p>
          {
            this.props.quiz.timeLimit
            ? (
              <p>This quiz is time limited. You have <strong>{this.props.quiz.timeLimit}</strong> minutes to complete. The time will start counting from the moment you see the first question.</p>
            ) : null
          }
        </section>
        <div className="controls separated">
          <Link to="/dashboard" className="button button-grey">Back</Link>
          {
            this.renderEngageButton()
          }
        </div>
      </div>
    )
  }

  renderEngageButton () {
    if (this.props.loading) {
      return (
        <span>Loading...</span>
      )
    } else if (this.props.error) {
      return (
        <div className="alert alert-danger">Error: {this.props.error.toString()}</div>
      )
    } else if (this.props.success) {
      return (
        <Link to={`/quiz/${this.props.quiz._id}/engage`} className="button button-primary">Engage Quiz</Link>
      )
    }
  }
}

let mapStateToProps = (state, props) => {
  let quizId = props.match.params.quizId
  return {
    loading: state.loading.QUIZ_PREPARE,
    error: state.error.QUIZ_PREPARE,
    success: state.success.QUIZ_PREPARE,
    quizId: quizId,
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
