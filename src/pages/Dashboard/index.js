import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import './index.scss'
import { connect } from "react-redux";
import { loadQuizess } from "actions/quiz"
import Navigation from 'components/Navigation'

class Dashboard extends Component {
  constructor() {
    super()
    this.renderQuiz = this.renderQuiz.bind(this)
  }
  componentWillMount() {
    this.props.listQuizess()
  }

  render() {
    return (
      <Fragment>
        <Navigation />
        <div className="container">
          <h1>Dashboard</h1>
          <div className="quizess-list">
            {
              this.props.quizess.map(this.renderQuiz)
            }
          </div>
        </div>
      </Fragment>
    )
  }

  renderQuiz(quiz) {
    return (
      <div key={quiz._id} className="assessment-card">
        <h2 className="title">{quiz.name}</h2>
        <div className="info">
          {
            quiz.isMandatory
              ? <div className="info-item yellow">Mandatory</div>
              : null
          }
          <div className="info-item primary">{quiz.noOfAttempts || 'unlimited'} attempts</div>
        </div>
        <div className="description">
          {
            !quiz.marksReleased
              ? (
                <span className="badge badge-blue">Marks are pending for this quiz.</span>
              )
              : null
          }
        </div>
        <div className="controls">
          <Link to={`/quiz/${quiz._id}`} className="button button-blue button-small">View Quiz</Link>
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
