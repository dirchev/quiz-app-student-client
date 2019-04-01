import React, { Component, Fragment } from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

class QuizActions extends Component {
  render() {
    return (
      <div className="controls quiz-actions">
        {this.renderViewAttemptsButton()}
        {this.renderEngageButton()}
      </div>
    )
  }

  renderViewAttemptsButton () {
    return (
      <Link to={`/quiz/${this.props.quiz._id}/engagements`} className="button button-grey button-with-icon">
        <span className="icon"><FontAwesomeIcon icon={faListUl} /></span>
        <span className="content">View Previous Attempts</span>
      </Link>
    )
  }

  renderEngageButton () {
    if (this.props.quiz.noOfAttempts && this.props.quizEngagementsLoading) return (
      <span>Loading...</span>
    )
    if (!this.props.quiz.__meta.readyToEngage) return null
    if (this.props.quiz.marksReleased && !this.props.quiz.canMarkAutomatically) return null
    if (this.props.quiz.noOfAttempts && (this.props.quiz.quizEngagements || []).length >= this.props.quiz.noOfAttempts) return (
      <div className="alert alert-blue alert-small text-center">
        You have reached the maximum number of attempts for this quiz.
      </div>
    )
    return (
      <Fragment>
        <Link to={`/quiz/${this.props.quiz._id}/engage`} className="button button-primary">Engage Quiz</Link>
      </Fragment>
    )
  }
}

const mapPropsToState = (state, props) => {
  return {
    quizEngagementsLoading: state.loading.QUIZ_ENGAGEMENT_LIST,
  }
}

export default connect(mapPropsToState)(QuizActions)
