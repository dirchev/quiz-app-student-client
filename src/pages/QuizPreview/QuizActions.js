import React, { Component } from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class QuizActions extends Component {
  render() {
    return (
      <div className="controls">
        {this.renderEngageButton()}
      </div>
    )
  }

  renderEngageButton () {
    if (this.props.quizEngagementsLoading) return null
    if (!this.props.quiz.quizEngagements) return null
    if (this.props.quiz.noOfAttempts && this.props.quiz.quizEngagements.length >= this.props.quiz.noOfAttempts) return null
    return (
      <Link to={`/quiz/${this.props.quiz._id}/engage`} className="button button-small button-primary">Engage Quiz</Link>
    )
  }
}

const mapPropsToState = (state, props) => {
  return {
    quizEngagementsLoading: state.loading.QUIZ_ENGAGEMENT_LIST,
  }
}

export default connect(mapPropsToState)(QuizActions)
