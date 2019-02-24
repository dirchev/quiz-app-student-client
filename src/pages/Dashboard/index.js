import React, { Component } from "react"
import { Link } from "react-router-dom"
import './index.scss'
import { connect } from "react-redux";
import { loadQuizess } from "actions/quiz"

class Dashboard extends Component {
  constructor () {
    super()
    this.renderQuiz = this.renderQuiz.bind(this)
  }
  componentWillMount () {
    this.props.listQuizess()
  }

  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <div className="quizess-list">
          {
            this.props.quizess.map(this.renderQuiz)
          }
        </div>
      </div>
    )
  }

  renderQuiz (quiz) {
    return (
      <div key={quiz._id} className="assessment-card">
        <div className="title">{quiz.name}</div>
        <div className="info">
          {
            quiz.isMandatory
            ? <div className="info-item yellow">Mandatory</div>
            : null
          }
          <div className="info-item primary">{quiz.noOfAttempts || 'unlimited'} attempts</div>
        </div>
        <div className="controls">
          <Link to={`/quiz/${quiz._id}/engagements`} className="button button-blue button-small button-outline">View Attempts</Link>
          <Link to={`/quiz/${quiz._id}`} className="button button-blue button-small">Complete Quiz</Link>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    quizApp: state.quizApp,
    quizess: (state.quizApp.quizess || []).map(quizId => state.entities.quizess[quizId]).filter(i => i),
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    listQuizess: () => dispatch(loadQuizess())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
