import React, { Component } from "react"
import { connect } from "react-redux";
import QuizEngageQuestion from "./Question";
import {Link} from 'react-router-dom';
import { createQuizEngagement, updateQuizEngagement, finishQuizEngagement } from "../../actions/quizEngagement";

class QuizEngage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questionIndex: 0
    }

    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleFinishQuizEngagement = this.handleFinishQuizEngagement.bind(this)
  }

  componentWillMount () {
    this.props.createQuizEngagement()
  }

  handleQuestionIndexChange (questionIndex) {
    return (event) => {
      event.preventDefault()
      if (questionIndex < 0 || questionIndex > (this.props.questions.length - 1)) return
      this.setState({questionIndex})
    }
  }

  handleAnswerChange (questionId, answer) {
    this.props.updateQuizEngagement({
      ...this.props.quizEngagement,
      answersGiven: {
        ...this.props.quizEngagement.answersGiven,
        [questionId]: answer
      }
    })
  }

  handleFinishQuizEngagement (e) {
    e && e.preventDefault()
    this.props.finishQuizEngagement(this.props.quizEngagement)
  }

  render() {
    if (!this.props.quizEngagement) {
      return (
        <div className="alert alert-info">
          Starting quiz...
        </div>
      )
    }
    if (this.props.quizEngagement.finished) {
      return (
        <div className="container">
          <div className="alert alert-info">
            Quiz Finished <br/>
            You can now return to <Link to="/dashboard" className="alert-link">dashboard</Link>
          </div>
        </div>
      )
    }
    let question = this.props.questions[this.state.questionIndex]
    return (
      <div className="container">
        <div className="quiz">
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
          <div className="timeleft">
            14:20
          </div>
          <QuizEngageQuestion
            question={question}
            quizEngagement={this.props.quizEngagement}
            onAnswerChange={this.handleAnswerChange}
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
              <button className="button button-danger button-small" onClick={this.handleFinishQuizEngagement}>End Quiz</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  let quizId = props.match.params.quizId
  return {
    quizId: quizId,
    quiz: state.entities.quizess[quizId],
    questions: (state.entities.quizess[quizId].questions || []).map((_id) => state.entities.questions[_id]),
    quizEngagement: state.currentQuizEngagement ? state.entities.quizEngagements[state.currentQuizEngagement] : null
  }
}

let mapDispatchToProps = (dispatch, props) => {
  let quizId = props.match.params.quizId
  return {
    createQuizEngagement: () => dispatch(createQuizEngagement({quizId})),
    updateQuizEngagement: (quizEngagement) => dispatch(updateQuizEngagement({quizEngagement})),
    finishQuizEngagement: (quizEngagement) => dispatch(finishQuizEngagement({quizEngagement})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEngage)
